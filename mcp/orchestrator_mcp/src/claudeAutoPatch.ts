import { exec } from "child_process";
import { promisify } from "util";
import { publish } from "./eventBus";
import { promises as fs } from "fs";
import path from "path";

const logger = console;

const execAsync = promisify(exec);

interface PatchRequest {
  service: string;
  error: string;
  logs: string[];
  containerId?: string;
  timestamp: number;
}

interface PatchLog {
  id: string;
  timestamp: number;
  service: string;
  error: string;
  patch: string;
  status: "pending" | "applied" | "failed" | "rolled_back";
  gitCommit?: string;
  testResults?: boolean;
}

export class ClaudeAutoPatch {
  private patchLog: PatchLog[] = [];
  private patchLogPath = path.join(__dirname, "..", "patches", "patch-log.json");

  constructor() {
    this.loadPatchLog();
  }

  async loadPatchLog() {
    try {
      const data = await fs.readFile(this.patchLogPath, "utf8");
      this.patchLog = JSON.parse(data);
      logger.info(`Loaded ${this.patchLog.length} patch records`);
    } catch (error) {
      logger.info("No existing patch log found, starting fresh");
      this.patchLog = [];
    }
  }

  async savePatchLog() {
    try {
      await fs.mkdir(path.dirname(this.patchLogPath), { recursive: true });
      await fs.writeFile(this.patchLogPath, JSON.stringify(this.patchLog, null, 2));
    } catch (error) {
      logger.error("Failed to save patch log:", error);
    }
  }

  async requestPatch(patchRequest: PatchRequest): Promise<string | null> {
    try {
      logger.info(`Requesting patch for service ${patchRequest.service}`, {
        error: patchRequest.error,
        logsLength: patchRequest.logs.length
      });

      // Publish patch request event for Claude to process
      await publish("patch.requested", {
        ...patchRequest,
        id: this.generatePatchId(),
        requestTime: Date.now()
      });

      // Wait for patch response (Claude should respond via MCP)
      const patch = await this.waitForPatchResponse(patchRequest.service, 30000); // 30 second timeout

      if (patch) {
        logger.info(`Received patch for ${patchRequest.service}`);
        return patch;
      } else {
        logger.warn(`No patch received for ${patchRequest.service} within timeout`);
        return null;
      }
    } catch (error) {
      logger.error("Patch request failed:", error);
      return null;
    }
  }

  async applyPatch(service: string, patch: string, description: string): Promise<boolean> {
    const patchId = this.generatePatchId();
    const patchLog: PatchLog = {
      id: patchId,
      timestamp: Date.now(),
      service,
      error: description,
      patch,
      status: "pending"
    };

    try {
      logger.info(`Applying patch ${patchId} to ${service}`);

      // Save patch to temporary file
      const patchFile = `/tmp/patch-${patchId}.patch`;
      await fs.writeFile(patchFile, patch);

      // Apply patch using git
      await this.applyGitPatch(patchFile);

      // Test the patch
      const testResults = await this.testPatch(service);
      patchLog.testResults = testResults;

      if (testResults) {
        // Commit the patch
        const gitCommit = await this.commitPatch(service, description);
        patchLog.gitCommit = gitCommit;
        patchLog.status = "applied";

        logger.info(`Patch ${patchId} applied successfully`);

        await publish("patch.applied", {
          patchId,
          service,
          gitCommit,
          timestamp: Date.now()
        });

        // Rebuild and restart service
        await this.rebuildService(service);
      } else {
        patchLog.status = "failed";
        logger.error(`Patch ${patchId} failed tests`);

        await publish("patch.failed", {
          patchId,
          service,
          timestamp: Date.now()
        });
      }

      this.patchLog.push(patchLog);
      await this.savePatchLog();

      return testResults;
    } catch (error) {
      patchLog.status = "failed";
      patchLog.error = (error as Error).message;
      this.patchLog.push(patchLog);
      await this.savePatchLog();

      logger.error(`Failed to apply patch ${patchId}:`, error as Error);

      await publish("patch.failed", {
        patchId,
        service,
        error: (error as Error).message,
        timestamp: Date.now()
      });

      return false;
    }
  }

  async rollbackPatch(patchId: string): Promise<boolean> {
    try {
      const patchLog = this.patchLog.find(p => p.id === patchId);
      if (!patchLog || patchLog.status !== "applied") {
        logger.warn(`Cannot rollback patch ${patchId}: not found or not applied`);
        return false;
      }

      logger.info(`Rolling back patch ${patchId}`);

      // Revert git commit
      if (patchLog.gitCommit) {
        await execAsync(`git revert --no-edit ${patchLog.gitCommit}`);
      }

      patchLog.status = "rolled_back";
      await this.savePatchLog();

      // Rebuild service
      await this.rebuildService(patchLog.service);

      await publish("patch.rolled_back", {
        patchId,
        service: patchLog.service,
        timestamp: Date.now()
      });

      logger.info(`Patch ${patchId} rolled back successfully`);
      return true;
    } catch (error) {
      logger.error(`Failed to rollback patch ${patchId}:`, error);
      return false;
    }
  }

  private async applyGitPatch(patchFile: string): Promise<void> {
    try {
      // Check if we're in a git repository
      await execAsync("git rev-parse --git-dir");

      // Apply patch
      await execAsync(`git apply ${patchFile}`);
    } catch (error: any) {
      throw new Error(`Failed to apply git patch: ${error.message}`);
    }
  }

  private async testPatch(service: string): Promise<boolean> {
    try {
      logger.info(`Testing patch for service ${service}`);

      // Run linting
      await execAsync("npm run lint");

      // Run tests
      await execAsync("npm test");

      // Build the service
      await execAsync("docker-compose build");

      // Test container startup
      await execAsync(`docker-compose up -d ${service}`);

      // Wait for service to be ready
      await new Promise(resolve => setTimeout(resolve, 10000));

      // Health check
      const healthResponse = await fetch(`http://${service}:3000/health`);
      if (!healthResponse.ok) {
        throw new Error("Health check failed");
      }

      logger.info(`Patch tests passed for ${service}`);
      return true;
    } catch (error) {
      logger.error(`Patch tests failed for ${service}:`, error);
      return false;
    }
  }

  private async commitPatch(_service: string, description: string): Promise<string> {
    try {
      const commitMessage = `🩹 Auto-patch: ${description} (${new Date().toISOString()})`;
      await execAsync(`git add -A`);
      const { stdout } = await execAsync(`git commit -m "${commitMessage}"`);

      // Extract commit hash
      const match = stdout.match(/\[\w+ ([a-f0-9]{7,})\]/);
      const commitHash = match ? match[1] : "unknown";

      logger.info(`Committed patch: ${commitHash}`);
      return commitHash;
    } catch (error) {
      throw new Error(`Failed to commit patch: ${(error as Error).message}`);
    }
  }

  private async rebuildService(service: string): Promise<void> {
    try {
      logger.info(`Rebuilding service ${service}`);

      // Stop the service
      await execAsync(`docker-compose stop ${service}`);

      // Rebuild the service
      await execAsync(`docker-compose build ${service}`);

      // Start the service
      await execAsync(`docker-compose up -d ${service}`);

      logger.info(`Service ${service} rebuilt and restarted`);
    } catch (error) {
      throw new Error(`Failed to rebuild service ${service}: ${(error as Error).message}`);
    }
  }

  private async waitForPatchResponse(_service: string, timeout: number): Promise<string | null> {
    return new Promise((resolve) => {
      // This would be implemented with the event bus
      // For now, we'll use a simple timeout
      setTimeout(() => resolve(null), timeout);
    });
  }

  private generatePatchId(): string {
    return `patch_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
  }

  getPatchHistory(): PatchLog[] {
    return [...this.patchLog].reverse(); // Most recent first
  }

  getPatchById(patchId: string): PatchLog | undefined {
    return this.patchLog.find(p => p.id === patchId);
  }
}