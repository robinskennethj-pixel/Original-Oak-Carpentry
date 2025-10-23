import { collectDefaultMetrics, Gauge, Counter, Histogram } from 'prom-client';
import { FastifyInstance } from 'fastify';

collectDefaultMetrics();

const patchesGauge = new Gauge({
  name: 'orchestrator_patches_total',
  help: 'Number of patches applied'
});

const webhookCounter = new Counter({
  name: 'orchestrator_webhooks_total',
  help: 'Total number of webhooks received',
  labelNames: ['status', 'source']
});

const requestDuration = new Histogram({
  name: 'orchestrator_request_duration_seconds',
  help: 'Request duration in seconds',
  labelNames: ['method', 'route', 'status_code']
});

const activeConnections = new Gauge({
  name: 'orchestrator_active_connections',
  help: 'Number of active connections'
});

export default function registerMetrics(server: FastifyInstance) {
  server.get('/metrics', async (req, reply) => {
    const metrics = await (await import('prom-client')).register.metrics();
    reply.type('text/plain; version=0.0.4').send(metrics);
  });

  // Middleware to track request duration
  server.addHook('onRequest', async (request, reply) => {
    const start = Date.now();
    (request as any).metrics = {
      startTime: start
    };
  });

  server.addHook('onResponse', async (request, reply) => {
    const metrics = (request as any).metrics;
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
    incrementWebhook: (status: string, source: string) => webhookCounter.labels(status, source).inc(),
    incrementConnections: () => activeConnections.inc(),
    decrementConnections: () => activeConnections.dec()
  };
}