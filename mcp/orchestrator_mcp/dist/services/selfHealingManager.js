"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelfHealingManager = void 0;
const dockerode_1 = __importDefault(require("dockerode"));
const logger = console;
class SelfHealingManager {
    constructor(_eventBus, _logger) {
        this.enabled = true;
        this.retryCounts = new Map();
        this.maxRetries = 3;
        this.docker = new dockerode_1.default({ socketPath: process.env.DOCKER_SOCKET_PATH || "/var/run/docker.sock" });
    }
    enable() {
        this.enabled = true;
        logger.info("Self-healing enabled");
    }
    disable() {
        this.enabled = false;
        logger.info("Self-healing disabled");
    }
    getStatus() {
        return {
            enabled: this.enabled,
            retryCounts: Object.fromEntries(this.retryCounts)
        };
    }
    async handleContainerFailure(containerName, eventData) {
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
            }
            else {
                logger.error(`Failed to restart container ${containerName}: ${result.error}`);
            }
        }
        catch (error) {
            logger.error(`Self-healing failed for container ${containerName}:`, error);
        }
    }
    async handleHealthCheckFailure(healthData) {
        if (!this.enabled)
            return;
        const { service } = healthData;
        try {
            logger.info(`Attempting self-healing for unhealthy service ${service}`);
            // Simple restart for web service
            await this.restartContainer(service);
        }
        catch (error) {
            logger.error(`Self-healing failed for service ${service}:`, error);
        }
    }
    async restartContainer(containerName) {
        try {
            const containers = await this.docker.listContainers({ all: true, filters: { name: [containerName] } });
            if (!containers || containers.length === 0) {
                return { success: false, error: `Container ${containerName} not found` };
            }
            const container = this.docker.getContainer(containers[0].Id);
            await container.restart();
            logger.info(`Container ${containerName} restarted successfully`);
            return { success: true };
        }
        catch (error) {
            logger.error(`Failed to restart container ${containerName}:`, error);
            return { success: false, error: error.message };
        }
    }
    async initialize() {
        logger.info("Initializing self-healing manager");
        logger.info("Self-healing manager initialized");
    }
}
exports.SelfHealingManager = SelfHealingManager;
//# sourceMappingURL=selfHealingManager.js.map