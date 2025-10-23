export declare class SelfHealingManager {
    private docker;
    private enabled;
    private retryCounts;
    private maxRetries;
    constructor(_eventBus: any, _logger: any);
    enable(): void;
    disable(): void;
    getStatus(): {
        enabled: boolean;
        retryCounts: Record<string, number>;
    };
    handleContainerFailure(containerName: string, eventData: any): Promise<void>;
    handleHealthCheckFailure(healthData: any): Promise<void>;
    restartContainer(containerName: string): Promise<{
        success: boolean;
        error?: string;
    }>;
    initialize(): Promise<void>;
}
//# sourceMappingURL=selfHealingManager.d.ts.map