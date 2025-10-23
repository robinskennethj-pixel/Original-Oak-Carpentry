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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = registerMetrics;
const prom_client_1 = require("prom-client");
(0, prom_client_1.collectDefaultMetrics)();
const patchesGauge = new prom_client_1.Gauge({
    name: 'orchestrator_patches_total',
    help: 'Number of patches applied'
});
const webhookCounter = new prom_client_1.Counter({
    name: 'orchestrator_webhooks_total',
    help: 'Total number of webhooks received',
    labelNames: ['status', 'source']
});
const requestDuration = new prom_client_1.Histogram({
    name: 'orchestrator_request_duration_seconds',
    help: 'Request duration in seconds',
    labelNames: ['method', 'route', 'status_code']
});
const activeConnections = new prom_client_1.Gauge({
    name: 'orchestrator_active_connections',
    help: 'Number of active connections'
});
function registerMetrics(server) {
    server.get('/metrics', async (req, reply) => {
        const metrics = await (await Promise.resolve().then(() => __importStar(require('prom-client')))).register.metrics();
        reply.type('text/plain; version=0.0.4').send(metrics);
    });
    // Middleware to track request duration
    server.addHook('onRequest', async (request, reply) => {
        const start = Date.now();
        request.metrics = {
            startTime: start
        };
    });
    server.addHook('onResponse', async (request, reply) => {
        const metrics = request.metrics;
        if (metrics?.startTime) {
            const duration = (Date.now() - metrics.startTime) / 1000;
            requestDuration
                .labels(request.method, request.routerPath || request.url, String(reply.statusCode))
                .observe(duration);
        }
    });
    // Return helpers for updating metrics
    return {
        incrementPatch: () => patchesGauge.inc(),
        incrementWebhook: (status, source) => webhookCounter.labels(status, source).inc(),
        incrementConnections: () => activeConnections.inc(),
        decrementConnections: () => activeConnections.dec()
    };
}
//# sourceMappingURL=metrics.js.map