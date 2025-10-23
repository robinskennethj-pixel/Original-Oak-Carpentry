import Docker from "dockerode";

const logger = console;

export class SelfHealingManager {
  private docker: Docker;
  private enabled: boolean = true;
  private retryCounts: Map<string, number> = new Map();
  private maxRetries: number = 3;

  constructor(_eventBus: any, _logger: any) {
    this.docker = new Docker({ socketPath: process.env.DOCKER_SOCKET_PATH || "/var/run/docker.sock" });
  }

  public enable(): void {
    this.enabled = true;
    logger.info("Self-healing enabled");
  }

  public disable(): void {
    this.enabled = false;
    logger.info("Self-healing disabled");
  }

  public getStatus(): { enabled: boolean; retryCounts: Record<string, number> } {
    return {
      enabled: this.enabled,
      retryCounts: Object.fromEntries(this.retryCounts)
    };
  }

  public async handleContainerFailure(containerName: string, eventData: any): Promise<void> {
    if (!this.enabled) {
      logger.warn(`Self-healing disabled, not handling container failure for ${containerName}`);
      return;
    }

    const retryCount = this.retryCounts.get(containerName) || 0;

    if (retryCount >= this.maxRetries) {
      logger.error(`Max retries reached for container ${containerName}, manual intervention required`);
      return;
    }

    this.retryCounts.set(containerName, retryCount + 1);

    try {
      logger.info(`Attempting self-healing for container ${containerName} (retry ${retryCount + 1})`);

      // Wait a moment before attempting restart
      await new Promise(resolve => setTimeout(resolve, 5000));

      const result = await this.restartContainer(containerName);

      if (result.success) {
        logger.info(`Successfully restarted container ${containerName}`);
        this.retryCounts.delete(containerName); // Reset retry count on success
      } else {
        logger.error(`Failed to restart container ${containerName}: ${result.error}`);
      }
    } catch (error) {
      logger.error(`Self-healing failed for container ${containerName}:`, error);
    }
  }

  public async handleHealthCheckFailure(healthData: any): Promise<void> {
    if (!this.enabled) return;

    const { service } = healthData;

    try {
      logger.info(`Attempting self-healing for unhealthy service ${service}`);

      // Simple restart for web service
      await this.restartContainer(service);
    } catch (error) {
      logger.error(`Self-healing failed for service ${service}:`, error);
    }
  }

  public async restartContainer(containerName: string): Promise<{ success: boolean; error?: string }> {
    try {
      const containers = await this.docker.listContainers({ all: true, filters: { name: [containerName] } });

      if (!containers || containers.length === 0) {
        return { success: false, error: `Container ${containerName} not found` };
      }

      const container = this.docker.getContainer(containers[0].Id);
      await container.restart();

      logger.info(`Container ${containerName} restarted successfully`);
      return { success: true };
    } catch (error) {
      logger.error(`Failed to restart container ${containerName}:`, error);
      return { success: false, error: (error as Error).message };
    }
  }

  public async initialize(): Promise<void> {
    logger.info("Initializing self-healing manager");
    logger.info("Self-healing manager initialized");
  }
}