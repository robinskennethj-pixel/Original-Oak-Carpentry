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
exports.logger = void 0;
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const rate_limit_1 = __importDefault(require("@fastify/rate-limit"));
const dotenv = __importStar(require("dotenv"));
const builderWebhook_1 = __importDefault(require("./builderWebhook"));
const dockerWatcher_1 = require("./dockerWatcher");
const eventBus_1 = require("./eventBus");
const claudeClient_1 = require("./claudeClient");
const claudeAutoPatch_1 = require("./claudeAutoPatch");
const selfHealingManager_1 = require("./services/selfHealingManager");
const metrics_1 = __importDefault(require("./metrics"));
const security_1 = require("./security");
const validation_1 = require("./validation");
exports.logger = console;
dotenv.config();
const PORT = Number(process.env.PORT || 9000);
const server = (0, fastify_1.default)({ logger: true });
server.register(cors_1.default, { origin: true });
(async () => {
    const redis = await (0, eventBus_1.initEventBus)();
    const autoPatch = new claudeAutoPatch_1.ClaudeAutoPatch();
    const selfHealingManager = new selfHealingManager_1.SelfHealingManager(redis, exports.logger);
    const metrics = (0, metrics_1.default)(server);
    // Initialize self-healing manager
    await selfHealingManager.initialize();
    // Configure rate limiting based on endpoint type
    await server.register(rate_limit_1.default, {
        max: 100, // Global limit: 100 requests per minute
        timeWindow: '1 minute',
        redis: redis,
        keyGenerator: (req) => {
            // Use IP address for rate limiting
            return req.ip || 'unknown';
        },
        errorResponseBuilder: (req, context) => {
            req.log.warn({
                ip: req.ip,
                url: req.url,
                limit: context.max,
                current: context.current
            }, 'Rate limit exceeded');
            return {
                error: 'Too Many Requests',
                message: 'Rate limit exceeded. Please try again later.',
                limit: context.max,
                current: context.current,
                retryAfter: context.after
            };
        }
    });
    // Strict rate limiting for admin authentication endpoints
    server.setNotFoundHandler((req, reply) => {
        reply.code(404).send({ error: 'Not Found' });
    });
    // builder webhook receiver - strict rate limiting with validation
    await server.register(rate_limit_1.default, validation_1.rateLimitConfig.webhook);
    server.post("/webhook/builder", {
        preHandler: validation_1.webhookValidation
    }, async (req, reply) => {
        const result = await (0, builderWebhook_1.default)(req, reply, redis);
        metrics.incrementWebhook(result.ok ? 'success' : 'failure', 'builder');
        return result;
    });
    // health - standard rate limiting
    server.get("/health", async () => ({ ok: true, ts: new Date().toISOString() }));
    // diagnose endpoint for Claude or engineers - protected with JWT and validation
    await server.register(rate_limit_1.default, validation_1.rateLimitConfig.general);
    server.post("/diagnose", {
        preHandler: [validation_1.diagnoseValidation, security_1.requireJwt]
    }, async (req, reply) => {
        const body = req.body;
        const result = await (0, claudeClient_1.handleDiagnose)(body);
        return reply.send(result);
    });
    // auto-patch endpoints - protected with API key, validation, and strict rate limiting
    await server.register(rate_limit_1.default, validation_1.rateLimitConfig.patchRequest);
    server.post("/patch/request", {
        preHandler: [validation_1.patchRequestValidation, security_1.requireApiKey]
    }, async (req, reply) => {
        const body = req.body;
        const patch = await autoPatch.requestPatch(body);
        return reply.send({ patch, requested: true });
    });
    await server.register(rate_limit_1.default, validation_1.rateLimitConfig.patchApply);
    server.post("/patch/apply", {
        preHandler: [validation_1.patchApplyValidation, security_1.requireApiKey]
    }, async (req, reply) => {
        const { service, patch, description } = req.body;
        const success = await autoPatch.applyPatch(service, patch, description);
        if (success) {
            metrics.incrementPatch();
        }
        return reply.send({ success, patchId: service });
    });
    await server.register(rate_limit_1.default, validation_1.rateLimitConfig.patchHistory);
    server.get("/patch/history", {
        preHandler: security_1.requireApiKey
    }, async (req, reply) => {
        const history = autoPatch.getPatchHistory();
        return reply.send({ history });
    });
    // self-healing status
    server.get("/self-healing/status", async () => {
        return selfHealingManager.getStatus();
    });
    // start docker watcher in background (if socket mounted)
    (0, dockerWatcher_1.startDockerWatcher)(redis).catch((e) => server.log.error("Docker watcher failed", e));
    try {
        await server.listen({ port: PORT, host: "0.0.0.0" });
        server.log.info(`Orchestrator listening on ${PORT}`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
})();
//# sourceMappingURL=index.js.map