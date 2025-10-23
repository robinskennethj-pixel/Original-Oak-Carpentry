declare const logger: any;
declare class OrchestratorServer {
    private app;
    private server;
    private io;
    private eventBus;
    private dockerWatcher;
    private builderWebhook;
    private ragBridge;
    private claudeClient;
    private selfHealingManager;
    private versionManager;
    private healthMonitor;
    private metricsCollector;
    private isShuttingDown;
    private serverStartTime;
    constructor();
    private setupMiddleware;
    private setupRoutes;
    private setupEventHandlers;
    private setupScheduledTasks;
    private setupSocketHandlers;
    private setupGracefulShutdown;
    private getSystemStatus;
    private testContentSync;
    start(): Promise<void>;
    private initializeServices;
}
export { OrchestratorServer, logger };
//# sourceMappingURL=server.d.ts.map