"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaudeAutoPatch = void 0;
const child_process_1 = require("child_process");
const util_1 = require("util");
const eventBus_js_1 = require("./eventBus.js");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const logger = console;
const execAsync = (0, util_1.promisify)(child_process_1.exec);
class ClaudeAutoPatch {
    constructor() {
        this.patchLog = [];
        this.patchLogPath = path_1.default.join(__dirname, "..", "patches", "patch-log.json");
        this.loadPatchLog();
    }
    async loadPatchLog() {
        try {
            const data = await fs_1.promises.readFile(this.patchLogPath, "utf8");
            this.patchLog = JSON.parse(data);
            logger.info(`Loaded ${this.patchLog.length} patch records`);
        }
        catch (error) {
            logger.info("No existing patch log found, starting fresh");
            this.patchLog = [];
        }
    }
    async savePatchLog() {
        try {
            await fs_1.promises.mkdir(path_1.default.dirname(this.patchLogPath), { recursive: true });
            await fs_1.promises.writeFile(this.patchLogPath, JSON.stringify(this.patchLog, null, 2));
        }
        catch (error) {
            logger.error("Failed to save patch log:", error);
        }
    }
    async requestPatch(patchRequest) {
        try {
            logger.info(`Requesting patch for service ${patchRequest.service}`, {
                error: patchRequest.error,
                logsLength: patchRequest.logs.length
            });
            // Publish patch request event for Claude to process
            await (0, eventBus_js_1.publish)("patch.requested", {
                ...patchRequest,
                id: this.generatePatchId(),
                requestTime: Date.now()
            });
            // Wait for patch response (Claude should respond via MCP)
            const patch = await this.waitForPatchResponse(patchRequest.service, 30000); // 30 second timeout
            if (patch) {
                logger.info(`Received patch for ${patchRequest.service}`);
                return patch;
            }
            else {
                logger.warn(`No patch received for ${patchRequest.service} within timeout`);
                return null;
            }
        }
        catch (error) {
            logger.error("Patch request failed:", error);
            return null;
        }
    }
    async applyPatch(service, patch, description) {
        const patchId = this.generatePatchId();
        const patchLog = {
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
            await fs_1.promises.writeFile(patchFile, patch);
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
                await (0, eventBus_js_1.publish)("patch.applied", {
                    patchId,
                    service,
                    gitCommit,
                    timestamp: Date.now()
                });
                // Rebuild and restart service
                await this.rebuildService(service);
            }
            else {
                patchLog.status = "failed";
                logger.error(`Patch ${patchId} failed tests`);
                await (0, eventBus_js_1.publish)("patch.failed", {
                    patchId,
                    service,
                    timestamp: Date.now()
                });
            }
            this.patchLog.push(patchLog);
            await this.savePatchLog();
            return testResults;
        }
        catch (error) {
            patchLog.status = "failed";
            patchLog.error = error.message;
            this.patchLog.push(patchLog);
            await this.savePatchLog();
            logger.error(`Failed to apply patch ${patchId}:`, error);
            await (0, eventBus_js_1.publish)("patch.failed", {
                patchId,
                service,
                error: error.message,
                timestamp: Date.now()
            });
            return false;
        }
    }
    async rollbackPatch(patchId) {
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
            await (0, eventBus_js_1.publish)("patch.rolled_back", {
                patchId,
                service: patchLog.service,
                timestamp: Date.now()
            });
            logger.info(`Patch ${patchId} rolled back successfully`);
            return true;
        }
        catch (error) {
            logger.error(`Failed to rollback patch ${patchId}:`, error);
            return false;
        }
    }
    async applyGitPatch(patchFile) {
        try {
            // Check if we're in a git repository
            await execAsync("git rev-parse --git-dir");
            // Apply patch
            await execAsync(`git apply ${patchFile}`);
        }
        catch (error) {
            throw new Error(`Failed to apply git patch: ${error.message}`);
        }
    }
    async testPatch(service) {
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
        }
        catch (error) {
            logger.error(`Patch tests failed for ${service}:`, error);
            return false;
        }
    }
    async commitPatch(_service, description) {
        try {
            const commitMessage = `🩹 Auto-patch: ${description} (${new Date().toISOString()})`;
            await execAsync(`git add -A`);
            const { stdout } = await execAsync(`git commit -m "${commitMessage}"`);
            // Extract commit hash
            const match = stdout.match(/\[\w+ ([a-f0-9]{7,})\]/);
            const commitHash = match ? match[1] : "unknown";
            logger.info(`Committed patch: ${commitHash}`);
            return commitHash;
        }
        catch (error) {
            throw new Error(`Failed to commit patch: ${error.message}`);
        }
    }
    async rebuildService(service) {
        try {
            logger.info(`Rebuilding service ${service}`);
            // Stop the service
            await execAsync(`docker-compose stop ${service}`);
            // Rebuild the service
            await execAsync(`docker-compose build ${service}`);
            // Start the service
            await execAsync(`docker-compose up -d ${service}`);
            logger.info(`Service ${service} rebuilt and restarted`);
        }
        catch (error) {
            throw new Error(`Failed to rebuild service ${service}: ${error.message}`);
        }
    }
    async waitForPatchResponse(_service, timeout) {
        return new Promise((resolve) => {
            // This would be implemented with the event bus
            // For now, we'll use a simple timeout
            setTimeout(() => resolve(null), timeout);
        });
    }
    generatePatchId() {
        return `patch_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
    }
    getPatchHistory() {
        return [...this.patchLog].reverse(); // Most recent first
    }
    getPatchById(patchId) {
        return this.patchLog.find(p => p.id === patchId);
    }
}
exports.ClaudeAutoPatch = ClaudeAutoPatch;
//# sourceMappingURL=claudeAutoPatch.js.map