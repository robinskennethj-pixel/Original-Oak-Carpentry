import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyRateLimit from "@fastify/rate-limit";
import * as dotenv from "dotenv";
import builderWebhook from "./builderWebhook";
import { startDockerWatcher } from "./dockerWatcher";
import { initEventBus } from "./eventBus";
import { handleDiagnose } from "./claudeClient";
import { ClaudeAutoPatch } from "./claudeAutoPatch";
import { SelfHealingManager } from "./services/selfHealingManager";
import registerMetrics from "./metrics";
import { requireApiKey, requireJwt, requireRole } from "./security";
import { webhookValidation, patchRequestValidation, patchApplyValidation, diagnoseValidation, rateLimitConfig } from "./validation";

export const logger = console;

dotenv.config();
const PORT = Number(process.env.PORT || 9000);

const server = Fastify({ logger: true });
server.register(cors, { origin: true });

(async () => {
  const redis = await initEventBus();
  const autoPatch = new ClaudeAutoPatch();
  const selfHealingManager = new SelfHealingManager(redis, logger);
  const metrics = registerMetrics(server);

  // Initialize self-healing manager
  await selfHealingManager.initialize();

  // Configure rate limiting based on endpoint type
  await server.register(fastifyRateLimit, {
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
        current: (context as any).current
      }, 'Rate limit exceeded');

      return {
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please try again later.',
        limit: context.max,
        current: (context as any).current,
        retryAfter: (context as any).after
      };
    }
  });

  // Strict rate limiting for admin authentication endpoints
  server.setNotFoundHandler((req, reply) => {
    reply.code(404).send({ error: 'Not Found' });
  });

  // builder webhook receiver - strict rate limiting with validation
  await server.register(fastifyRateLimit, rateLimitConfig.webhook);
  server.post("/webhook/builder", {
    preHandler: webhookValidation
  }, async (req, reply) => {
    const result = await builderWebhook(req, reply, redis);
    metrics.incrementWebhook((result as any).ok ? 'success' : 'failure', 'builder');
    return result;
  });

  // health - standard rate limiting
  server.get("/health", async () => ({ ok: true, ts: new Date().toISOString() }));

  // diagnose endpoint for Claude or engineers - protected with JWT and validation
  await server.register(fastifyRateLimit, rateLimitConfig.general);
  server.post("/diagnose", {
    preHandler: [diagnoseValidation, requireJwt]
  }, async (req, reply) => {
    const body = req.body as any;
    const result = await handleDiagnose(body);
    return reply.send(result);
  });

  // auto-patch endpoints - protected with API key, validation, and strict rate limiting
  await server.register(fastifyRateLimit, rateLimitConfig.patchRequest);
  server.post("/patch/request", {
    preHandler: [patchRequestValidation, requireApiKey]
  }, async (req, reply) => {
    const body = req.body as any;
    const patch = await autoPatch.requestPatch(body);
    return reply.send({ patch, requested: true });
  });

  await server.register(fastifyRateLimit, rateLimitConfig.patchApply);
  server.post("/patch/apply", {
    preHandler: [patchApplyValidation, requireApiKey]
  }, async (req, reply) => {
    const { service, patch, description } = req.body as any;
    const success = await autoPatch.applyPatch(service, patch, description);
    if (success) {
      metrics.incrementPatch();
    }
    return reply.send({ success, patchId: service });
  });

  await server.register(fastifyRateLimit, rateLimitConfig.patchHistory);
  server.get("/patch/history", {
    preHandler: requireApiKey
  }, async (req, reply) => {
    const history = autoPatch.getPatchHistory();
    return reply.send({ history });
  });

  // self-healing status
  server.get("/self-healing/status", async () => {
    return selfHealingManager.getStatus();
  });

  // start docker watcher in background (if socket mounted)
  startDockerWatcher(redis).catch((e) => server.log.error("Docker watcher failed", e));

  try {
    await server.listen({ port: PORT, host: "0.0.0.0" });
    server.log.info(`Orchestrator listening on ${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
})();