"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.OrchestratorServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const dotenv = __importStar(require("dotenv"));
const winston_1 = __importDefault(require("winston"));
const node_cron_1 = __importDefault(require("node-cron"));
// Import our modules
const dockerWatcher_1 = require("./watchers/dockerWatcher");
const builderWebhook_1 = require("./bridges/builderWebhook");
const ragBridge_1 = require("./bridges/ragBridge");
const claudeClient_1 = require("./bridges/claudeClient");
const eventBus_1 = require("./events/eventBus");
const selfHealingManager_1 = require("./services/selfHealingManager");
const versionManager_1 = require("./services/versionManager");
const healthMonitor_1 = require("./services/healthMonitor");
const metricsCollector_1 = require("./services/metricsCollector");
// Load environment variables
dotenv.config();
// Configure Winston logger
const logger = winston_1.default.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.errors({ stack: true }), winston_1.default.format.json()),
    defaultMeta: { service: 'orchestrator-mcp' },
    transports: [
        new winston_1.default.transports.File({ filename: 'logs/error.log', level: 'error' }),
        new winston_1.default.transports.File({ filename: 'logs/combined.log' }),
        new winston_1.default.transports.Console({
            format: winston_1.default.format.combine(winston_1.default.format.colorize(), winston_1.default.format.simple())
        })
    ]
});
exports.logger = logger;
class OrchestratorServer {
    constructor() {
        this.app = (0, express_1.default)();
        this.server = (0, http_1.createServer)(this.app);
        this.io = new socket_io_1.Server(this.server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });
        // Server state
        this.isShuttingDown = false;
        this.serverStartTime = Date.now();
        logger.info('🚀 Initializing Orchestrator MCP Service...');
        // Initialize core components
        this.eventBus = new eventBus_1.EventBus(logger);
        this.dockerWatcher = new dockerWatcher_1.DockerWatcher(this.eventBus, logger);
        this.builderWebhook = new builderWebhook_1.BuilderWebhookHandler(this.eventBus, logger);
        this.ragBridge = new ragBridge_1.RagBridge(this.eventBus, logger);
        this.claudeClient = new claudeClient_1.ClaudeClient(this.eventBus, logger);
        this.selfHealingManager = new selfHealingManager_1.SelfHealingManager(this.eventBus, logger);
        this.versionManager = new versionManager_1.VersionManager(this.eventBus, logger);
        this.healthMonitor = new healthMonitor_1.HealthMonitor(this.eventBus, logger);
        this.metricsCollector = new metricsCollector_1.MetricsCollector(this.eventBus, logger);
        this.setupMiddleware();
        this.setupRoutes();
        this.setupEventHandlers();
        this.setupScheduledTasks();
        this.setupSocketHandlers();
        this.setupGracefulShutdown();
    }
    setupMiddleware() {
        // Security middleware
        this.app.use((0, helmet_1.default)({
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'"],
                    imgSrc: ["'self'", "data:", "https:"],
                    connectSrc: ["'self'", "ws:", "wss:"],
                },
            },
        }));
        this.app.use((0, cors_1.default)({
            origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
            credentials: true
        }));
        // Rate limiting
        if (process.env.ENABLE_RATE_LIMITING === 'true') {
            const limiter = (0, express_rate_limit_1.default)({
                windowMs: 60 * 1000, // 1 minute
                max: parseInt(process.env.MAX_REQUESTS_PER_MINUTE || '100'),
                message: 'Too many requests from this IP, please try again later.',
                standardHeaders: true,
                legacyHeaders: false,
            });
            this.app.use(limiter);
        }
        // Body parsing
        this.app.use(express_1.default.json({ limit: '10mb' }));
        this.app.use(express_1.default.urlencoded({ extended: true, limit: '10mb' }));
        // Request logging
        this.app.use((req, res, next) => {
            logger.info(`${req.method} ${req.path}`, {
                ip: req.ip,
                userAgent: req.get('User-Agent'),
                timestamp: new Date().toISOString()
            });
            next();
        });
    }
    setupRoutes() {
        // Health check endpoint
        this.app.get('/health', (req, res) => {
            const uptime = Date.now() - this.serverStartTime;
            res.json({
                status: 'healthy',
                uptime: uptime,
                timestamp: new Date().toISOString(),
                version: process.env.npm_package_version || '1.0.0',
                services: {
                    eventBus: this.eventBus.isConnected(),
                    dockerWatcher: this.dockerWatcher.isConnected(),
                    claudeClient: this.claudeClient.isConnected(),
                    ragBridge: this.ragBridge.isConnected()
                }
            });
        });
        // Metrics endpoint
        this.app.get('/metrics', async (req, res) => {
            try {
                const metrics = await this.metricsCollector.getMetrics();
                res.json(metrics);
            }
            catch (error) {
                logger.error('Error collecting metrics:', error);
                res.status(500).json({ error: 'Failed to collect metrics' });
            }
        });
        // System status endpoint
        this.app.get('/status', async (req, res) => {
            try {
                const status = await this.getSystemStatus();
                res.json(status);
            }
            catch (error) {
                logger.error('Error getting system status:', error);
                res.status(500).json({ error: 'Failed to get system status' });
            }
        });
        // Builder.io webhook endpoint
        this.app.post('/webhook/builder', async (req, res) => {
            try {
                await this.builderWebhook.handleWebhook(req, res);
            }
            catch (error) {
                logger.error('Error handling Builder.io webhook:', error);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
        // Docker events endpoint
        this.app.get('/docker/events', async (req, res) => {
            try {
                const events = await this.dockerWatcher.getRecentEvents();
                res.json(events);
            }
            catch (error) {
                logger.error('Error getting Docker events:', error);
                res.status(500).json({ error: 'Failed to get Docker events' });
            }
        });
        // Container management endpoints
        this.app.post('/containers/:name/restart', async (req, res) => {
            try {
                const { name } = req.params;
                const result = await this.selfHealingManager.restartContainer(name);
                res.json(result);
            }
            catch (error) {
                logger.error(`Error restarting container ${req.params.name}:`, error);
                res.status(500).json({ error: 'Failed to restart container' });
            }
        });
        this.app.post('/containers/:name/rebuild', async (req, res) => {
            try {
                const { name } = req.params;
                const { version } = req.body;
                const result = await this.versionManager.rebuildContainer(name, version);
                res.json(result);
            }
            catch (error) {
                logger.error(`Error rebuilding container ${req.params.name}:`, error);
                res.status(500).json({ error: 'Failed to rebuild container' });
            }
        });
        // RAG management endpoints
        this.app.post('/rag/reindex', async (req, res) => {
            try {
                const { source, documentId, content } = req.body;
                const result = await this.ragBridge.triggerReindexing(source, documentId, content);
                res.json(result);
            }
            catch (error) {
                logger.error('Error triggering RAG reindexing:', error);
                res.status(500).json({ error: 'Failed to trigger reindexing' });
            }
        });
        this.app.get('/rag/status', async (req, res) => {
            try {
                const status = await this.ragBridge.getStatus();
                res.json(status);
            }
            catch (error) {
                logger.error('Error getting RAG status:', error);
                res.status(500).json({ error: 'Failed to get RAG status' });
            }
        });
        // Claude MCP integration endpoints
        this.app.post('/claude/notify', async (req, res) => {
            try {
                const { event, data, priority } = req.body;
                await this.claudeClient.notify(event, data, priority);
                res.json({ success: true });
            }
            catch (error) {
                logger.error('Error notifying Claude:', error);
                res.status(500).json({ error: 'Failed to notify Claude' });
            }
        });
        this.app.get('/claude/events', async (req, res) => {
            try {
                const events = await this.claudeClient.getRecentEvents();
                res.json(events);
            }
            catch (error) {
                logger.error('Error getting Claude events:', error);
                res.status(500).json({ error: 'Failed to get Claude events' });
            }
        });
        // Self-healing endpoints
        this.app.post('/self-heal/enable', (req, res) => {
            this.selfHealingManager.enable();
            res.json({ message: 'Self-healing enabled' });
        });
        this.app.post('/self-heal/disable', (req, res) => {
            this.selfHealingManager.disable();
            res.json({ message: 'Self-healing disabled' });
        });
        this.app.get('/self-heal/status', (req, res) => {
            const status = this.selfHealingManager.getStatus();
            res.json(status);
        });
        // Event bus endpoints
        this.app.post('/events/publish', async (req, res) => {
            try {
                const { channel, event, data } = req.body;
                await this.eventBus.publish(channel, event, data);
                res.json({ success: true });
            }
            catch (error) {
                logger.error('Error publishing event:', error);
                res.status(500).json({ error: 'Failed to publish event' });
            }
        });
        this.app.get('/events/subscribe/:channel', (req, res) => {
            const { channel } = req.params;
            // SSE endpoint for real-time event streaming
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            const subscription = this.eventBus.subscribe(channel, (event, data) => {
                res.write(`data: ${JSON.stringify({ event, data, timestamp: Date.now() })}\n\n`);
            });
            req.on('close', () => {
                subscription.unsubscribe();
            });
        });
        // Version management endpoints
        this.app.get('/versions', async (req, res) => {
            try {
                const versions = await this.versionManager.getAvailableVersions();
                res.json(versions);
            }
            catch (error) {
                logger.error('Error getting versions:', error);
                res.status(500).json({ error: 'Failed to get versions' });
            }
        });
        this.app.post('/versions/rollback', async (req, res) => {
            try {
                const { service, version } = req.body;
                const result = await this.versionManager.rollback(service, version);
                res.json(result);
            }
            catch (error) {
                logger.error('Error rolling back version:', error);
                res.status(500).json({ error: 'Failed to rollback version' });
            }
        });
        // Live content test endpoint
        this.app.post('/test/content-sync', async (req, res) => {
            try {
                const { builderContentId, expectedContent } = req.body;
                const result = await this.testContentSync(builderContentId, expectedContent);
                res.json(result);
            }
            catch (error) {
                logger.error('Error testing content sync:', error);
                res.status(500).json({ error: 'Failed to test content sync' });
            }
        });
        // Error handling middleware
        this.app.use((error, req, res, next) => {
            logger.error('Unhandled error:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
            });
        });
        // 404 handler
        this.app.use('*', (req, res) => {
            res.status(404).json({
                error: 'Not found',
                message: `Route ${req.originalUrl} not found`
            });
        });
    }
    setupEventHandlers() {
        // Docker event handlers
        this.eventBus.subscribe('docker.container.failed', async (event, data) => {
            logger.error(`Container failed: ${data.containerName}`, data);
            // Auto-restart if enabled
            if (process.env.ENABLE_AUTO_RECOVERY === 'true') {
                try {
                    await this.selfHealingManager.handleContainerFailure(data.containerName, data);
                    await this.claudeClient.notify('container_auto_restart', {
                        containerName: data.containerName,
                        action: 'auto_restart_initiated',
                        timestamp: Date.now()
                    }, 'high');
                }
                catch (error) {
                    logger.error('Auto-recovery failed:', error);
                    await this.claudeClient.notify('auto_recovery_failed', {
                        containerName: data.containerName,
                        error: error.message,
                        timestamp: Date.now()
                    }, 'critical');
                }
            }
        });
        // Builder.io event handlers
        this.eventBus.subscribe('builder.content.published', async (event, data) => {
            logger.info('Builder.io content published:', data);
            // Trigger RAG reindexing
            try {
                await this.ragBridge.triggerReindexing('builder', data.id, data);
                await this.claudeClient.notify('content_published', {
                    source: 'builder',
                    contentId: data.id,
                    reindexingInitiated: true,
                    timestamp: Date.now()
                }, 'normal');
            }
            catch (error) {
                logger.error('Failed to trigger reindexing:', error);
                await this.claudeClient.notify('reindexing_failed', {
                    source: 'builder',
                    contentId: data.id,
                    error: error.message,
                    timestamp: Date.now()
                }, 'high');
            }
        });
        // RAG service event handlers
        this.eventBus.subscribe('rag.reindexing.completed', async (event, data) => {
            logger.info('RAG reindexing completed:', data);
            await this.claudeClient.notify('rag_reindexing_completed', data, 'normal');
        });
        this.eventBus.subscribe('rag.reindexing.failed', async (event, data) => {
            logger.error('RAG reindexing failed:', data);
            await this.claudeClient.notify('rag_reindexing_failed', data, 'high');
            // Attempt retry if auto-recovery is enabled
            if (process.env.ENABLE_AUTO_RECOVERY === 'true') {
                try {
                    await this.selfHealingManager.handleRAGFailure(data);
                }
                catch (retryError) {
                    logger.error('RAG retry failed:', retryError);
                }
            }
        });
        // Health check failures
        this.eventBus.subscribe('health.check.failed', async (event, data) => {
            logger.warn('Health check failed:', data);
            await this.claudeClient.notify('health_check_failed', data, 'high');
            // Trigger self-healing
            if (process.env.ENABLE_AUTO_RECOVERY === 'true') {
                try {
                    await this.selfHealingManager.handleHealthCheckFailure(data);
                }
                catch (error) {
                    logger.error('Self-healing failed:', error);
                }
            }
        });
        // Version rollback events
        this.eventBus.subscribe('version.rollback.completed', async (event, data) => {
            logger.info('Version rollback completed:', data);
            await this.claudeClient.notify('version_rollback_completed', data, 'high');
        });
        // Content sync test events
        this.eventBus.subscribe('content.sync.test.failed', async (event, data) => {
            logger.error('Content sync test failed:', data);
            await this.claudeClient.notify('content_sync_failed', data, 'critical');
        });
    }
    setupScheduledTasks() {
        // Health check every 30 seconds
        node_cron_1.default.schedule('*/30 * * * * *', async () => {
            if (!this.isShuttingDown) {
                try {
                    await this.healthMonitor.runHealthChecks();
                }
                catch (error) {
                    logger.error('Scheduled health check failed:', error);
                }
            }
        });
        // Metrics collection every minute
        node_cron_1.default.schedule('* * * * *', async () => {
            if (!this.isShuttingDown) {
                try {
                    await this.metricsCollector.collectMetrics();
                }
                catch (error) {
                    logger.error('Scheduled metrics collection failed:', error);
                }
            }
        });
        // Content sync tests every 5 minutes
        node_cron_1.default.schedule('*/5 * * * *', async () => {
            if (!this.isShuttingDown && process.env.ENABLE_BUILDER_INTEGRATION === 'true') {
                try {
                    await this.testContentSync();
                }
                catch (error) {
                    logger.error('Scheduled content sync test failed:', error);
                }
            }
        });
        // Version cleanup every hour
        node_cron_1.default.schedule('0 * * * *', async () => {
            if (!this.isShuttingDown) {
                try {
                    await this.versionManager.cleanupOldVersions();
                }
                catch (error) {
                    logger.error('Scheduled version cleanup failed:', error);
                }
            }
        });
    }
    setupSocketHandlers() {
        this.io.on('connection', (socket) => {
            logger.info('Client connected:', socket.id);
            socket.on('subscribe', (channel) => {
                socket.join(channel);
                logger.info(`Client ${socket.id} subscribed to ${channel}`);
            });
            socket.on('unsubscribe', (channel) => {
                socket.leave(channel);
                logger.info(`Client ${socket.id} unsubscribed from ${channel}`);
            });
            socket.on('disconnect', () => {
                logger.info('Client disconnected:', socket.id);
            });
        });
        // Subscribe to event bus and broadcast to connected clients
        this.eventBus.subscribe('*', (event, data) => {
            this.io.emit('event', { event, data, timestamp: Date.now() });
            // Also emit to specific channel if it exists
            const channel = event.split('.')[0];
            this.io.to(channel).emit('event', { event, data, timestamp: Date.now() });
        });
    }
    setupGracefulShutdown() {
        const shutdown = async (signal) => {
            logger.info(`Received ${signal}, starting graceful shutdown...`);
            this.isShuttingDown = true;
            try {
                // Stop accepting new connections
                this.server.close(() => {
                    logger.info('HTTP server closed');
                });
                // Close socket connections
                this.io.close(() => {
                    logger.info('Socket.IO server closed');
                });
                // Disconnect from services
                await Promise.all([
                    this.eventBus.disconnect(),
                    this.dockerWatcher.disconnect(),
                    this.claudeClient.disconnect(),
                    this.ragBridge.disconnect()
                ]);
                logger.info('Graceful shutdown completed');
                process.exit(0);
            }
            catch (error) {
                logger.error('Error during graceful shutdown:', error);
                process.exit(1);
            }
        };
        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));
    }
    async getSystemStatus() {
        const [dockerStatus, ragStatus, builderStatus, claudeStatus, healthStatus, metrics] = await Promise.all([
            this.dockerWatcher.getStatus(),
            this.ragBridge.getStatus(),
            this.builderWebhook.getStatus(),
            this.claudeClient.getStatus(),
            this.healthMonitor.getStatus(),
            this.metricsCollector.getMetrics()
        ]);
        return {
            timestamp: Date.now(),
            uptime: Date.now() - this.serverStartTime,
            status: 'operational',
            components: {
                docker: dockerStatus,
                rag: ragStatus,
                builder: builderStatus,
                claude: claudeStatus,
                health: healthStatus,
                metrics: metrics
            },
            selfHealing: this.selfHealingManager.getStatus(),
            version: process.env.npm_package_version || '1.0.0'
        };
    }
    async testContentSync(builderContentId, expectedContent) {
        try {
            // Test Builder.io → Frontend sync
            const builderTest = await this.builderWebhook.testContentSync(builderContentId, expectedContent);
            // Test Frontend → RAG sync
            const ragTest = await this.ragBridge.testContentSync(builderContentId);
            const result = {
                timestamp: Date.now(),
                builderToFrontend: builderTest,
                frontendToRAG: ragTest,
                overall: builderTest.success && ragTest.success ? 'passed' : 'failed'
            };
            if (result.overall === 'failed') {
                await this.eventBus.publish('content.sync.test.failed', result);
            }
            return result;
        }
        catch (error) {
            logger.error('Content sync test failed:', error);
            const result = {
                timestamp: Date.now(),
                error: error.message,
                overall: 'failed'
            };
            await this.eventBus.publish('content.sync.test.failed', result);
            return result;
        }
    }
    async start() {
        const port = parseInt(process.env.PORT || '4000');
        return new Promise((resolve, reject) => {
            this.server.listen(port, '0.0.0.0', (err) => {
                if (err) {
                    logger.error('Failed to start server:', err);
                    reject(err);
                }
                else {
                    logger.info(`🚀 Orchestrator MCP Service started on port ${port}`);
                    logger.info(`📊 Health check: http://localhost:${port}/health`);
                    logger.info(`📈 Metrics: http://localhost:${port}/metrics`);
                    logger.info(`🔧 WebSocket: ws://localhost:${port}`);
                    // Initialize all services
                    this.initializeServices().then(() => {
                        logger.info('✅ All services initialized successfully');
                        resolve();
                    }).catch((initError) => {
                        logger.error('Failed to initialize services:', initError);
                        reject(initError);
                    });
                }
            });
        });
    }
    async initializeServices() {
        logger.info('Initializing services...');
        // Connect to event bus first
        await this.eventBus.connect();
        // Start other services in parallel
        await Promise.all([
            this.dockerWatcher.start(),
            this.builderWebhook.initialize(),
            this.ragBridge.initialize(),
            this.claudeClient.connect(),
            this.selfHealingManager.initialize(),
            this.versionManager.initialize(),
            this.healthMonitor.start(),
            this.metricsCollector.start()
        ]);
        logger.info('All services initialized');
    }
}
exports.OrchestratorServer = OrchestratorServer;
// Start the server if this file is run directly
if (require.main === module) {
    const server = new OrchestratorServer();
    server.start().then(() => {
        logger.info('🎯 Orchestrator MCP Service is fully operational');
    }).catch((error) => {
        logger.error('❌ Failed to start Orchestrator MCP Service:', error);
        process.exit(1);
    });
}
//# sourceMappingURL=server.js.map