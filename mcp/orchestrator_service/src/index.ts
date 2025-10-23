import Fastify from "fastify";
import fetch from "node-fetch";
import Docker from "dockerode";
import * as dotenv from "dotenv";
import pRetry from "p-retry";

dotenv.config();

const PORT = Number(process.env.PORT || 9000);
const RAG_API_URL = process.env.RAG_API_URL!;
const DOCLING_API_URL = process.env.DOCLING_API_URL!;
const TRUSTED_WEBHOOK_SECRET = process.env.TRUSTED_WEBHOOK_SECRET || "replace_me";

const server = Fastify({ logger: true });

// Docker client (talks to host docker via mounted socket)
const docker = new Docker({ socketPath: "/var/run/docker.sock" });

// Simple health endpoint
server.get("/health", async () => {
  return { ok: true, timestamp: Date.now() };
});

/**
 * Builder.io webhook receiver
 * - verifies a shared secret (simple approach)
 * - triggers: re-ingest docs, warm RAG, collect logs if failures
 */
server.post("/webhook/builder", async (req, reply) => {
  try {
    const secret = (req.headers["x-builder-secret"] || "") as string;
    if (!secret || secret !== TRUSTED_WEBHOOK_SECRET) {
      server.log.warn("Webhook rejected: invalid secret");
      return reply.code(401).send({ error: "invalid webhook secret" });
    }

    const payload = req.body as any;
    server.log.info({ event: "builder_webhook", payloadType: typeof payload });

    // Example: when a page is published, re-run docling ingestion & warm RAG
    // (customize based on your Builder.io model + published content details)
    await Promise.all([
      reingestDocling(),
      warmRagEmbeddings().catch((e) => server.log.error("Warm RAG failed", e)),
    ]);

    // Optionally collect logs from services after publish to detect issues
    const logs = await collectServiceLogs(["web", "rag_service", "docling_service"]);
    server.log.info("Collected logs after publish");

    return reply.code(200).send({ ok: true, logsSnapshot: logs.slice(0, 1000) });
  } catch (err) {
    server.log.error(err);
    return reply.code(500).send({ error: "internal" });
  }
});

/**
 * Endpoint for Claude or an engineer to request diagnostics
 * - /diagnose  { services?: string[], actions?: ['logs','health','rebuild'] }
 */
server.post("/diagnose", async (req, reply) => {
  const body = req.body as any;
  const services: string[] = body?.services || ["web", "rag_service", "docling_service"];
  const actions: string[] = body?.actions || ["health", "logs"];

  const results: any = {};
  if (actions.includes("health")) {
    results.health = await Promise.all(
      services.map(async (s) => ({ service: s, ok: await checkServiceHealth(s) }))
    );
  }
  if (actions.includes("logs")) {
    results.logs = await collectServiceLogs(services);
  }
  if (actions.includes("rebuild")) {
    results.rebuild = await Promise.all(services.map((s) => rebuildService(s)));
  }

  return reply.send(results);
});

/**
 * Re-ingest docs via Docling API
 */
async function reingestDocling() {
  server.log.info("Triggering Docling re-ingest...");
  const url = `${DOCLING_API_URL}/parse`; // adapt if your docling endpoint differs
  // You can add logic here to fetch content from Builder or S3 and POST it.
  // For now we ping the service to see if it's up.
  const resp = await fetch(url, { method: "GET" }).catch((e) => {
    server.log.error("Docling ping failed", e);
    throw e;
  });
  if (!resp.ok) {
    throw new Error("Docling reingest ping failed");
  }
  server.log.info("Docling ping OK");
}

/**
 * Warm RAG embeddings by calling an endpoint (if you implement it)
 */
async function warmRagEmbeddings() {
  server.log.info("Warming RAG...");
  const url = `${RAG_API_URL}/health` ;
  const resp = await fetch(url).catch((e) => {
    server.log.error("RAG ping failed", e);
    throw e;
  });
  if (!resp.ok) {
    throw new Error("RAG health check failed");
  }
  server.log.info("RAG ping OK");
}

/**
 * Collect recent logs for services using Docker socket
 */
async function collectServiceLogs(serviceNames: string[]) {
  const logs: string[] = [];
  for (const name of serviceNames) {
    try {
      // dockerode: find container by name
      const containers = await docker.listContainers({ all: true, filters: { name: [name] } });
      if (!containers || containers.length === 0) {
        logs.push(`No container found for ${name}`);
        continue;
      }
      const containerInfo = containers[0];
      const container = docker.getContainer(containerInfo.Id);

      // fetch last 200 lines of logs
      const stream = await container.logs({
        stdout: true,
        stderr: true,
        tail: 200
      });

      // stream is a Buffer or Stream depending on dockerode version
      const text = stream.toString();
      logs.push(`== logs for ${name} ==\n${text}`);
    } catch (e: any) {
      logs.push(`Error fetching logs for ${name}: ${String(e.message || e)}`);
    }
  }
  return logs;
}

/**
 * Check a given service health by querying its /health endpoint or Docker state
 */
async function checkServiceHealth(serviceName: string) {
  try {
    const serviceHealthMap: Record<string, string> = {
      "web": "http://web:3000/health",
      "rag_service": `${RAG_API_URL}/health`,
      "docling_service": `${DOCLING_API_URL}/health`
    };
    const url = serviceHealthMap[serviceName];
    if (!url) return { service: serviceName, ok: false, reason: "no-url" };
    const resp = await fetch(url).catch(() => null);
    if (!resp) return { service: serviceName, ok: false, reason: "no-response" };
    if (!resp.ok) return { service: serviceName, ok: false, status: resp.status };
    const body = await resp.json().catch(() => null);
    return { service: serviceName, ok: true, body };
  } catch (e) {
    return { service: serviceName, ok: false, error: String(e) };
  }
}

/**
 * Rebuild a service (naive): runs `docker restart` for the container
 * For production you'd trigger CI/CD or docker-compose up --build externally
 */
async function rebuildService(serviceName: string) {
  try {
    const containers = await docker.listContainers({ all: true, filters: { name: [serviceName] } });
    if (!containers || containers.length === 0) {
      return { service: serviceName, ok: false, reason: "not_found" };
    }
    const container = docker.getContainer(containers[0].Id);
    await container.restart();
    return { service: serviceName, ok: true };
  } catch (e) {
    return { service: serviceName, ok: false, error: String(e) };
  }
}

const start = async () => {
  try {
    await server.listen({ port: PORT, host: "0.0.0.0" });
    server.log.info(`Orchestrator listening on ${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();