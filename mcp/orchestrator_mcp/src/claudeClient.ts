import fetch from "node-fetch";
import Docker from "dockerode";
import { publish } from "./eventBus";

const logger = console;

const docker = new Docker({ socketPath: process.env.DOCKER_SOCKET_PATH || "/var/run/docker.sock" });

export async function handleDiagnose(body: any) {
  const services: string[] = body?.services || ["web", "rag_service", "docling_service"];
  const actions: string[] = body?.actions || ["health", "logs"];

  logger.info("Handling Claude diagnose request", { services, actions });

  const report: any = {
    timestamp: Date.now(),
    services: {},
    summary: {
      total: services.length,
      healthy: 0,
      unhealthy: 0,
      errors: []
    }
  };

  for (const service of services) {
    try {
      const serviceReport: any = { name: service };

      if (actions.includes("health")) {
        serviceReport.health = await checkServiceHealth(service);
        if (serviceReport.health.ok) {
          report.summary.healthy++;
        } else {
          report.summary.unhealthy++;
          report.summary.errors.push(`${service}: ${serviceReport.health.reason || serviceReport.health.error}`);
        }
      }

      if (actions.includes("logs")) {
        serviceReport.logs = await fetchLogs(service);
      }

      if (actions.includes("restart")) {
        serviceReport.restart = await restartContainer(service);
      }

      report.services[service] = serviceReport;
    } catch (error) {
      logger.error(`Diagnose failed for service ${service}:`, error);
      report.services[service] = {
        name: service,
        error: (error as Error).message,
        healthy: false
      };
      report.summary.unhealthy++;
      report.summary.errors.push(`${service}: ${(error as Error).message}`);
    }
  }

  await publish("claude.diagnose_completed", {
    timestamp: Date.now(),
    services: services.length,
    healthy: report.summary.healthy,
    errors: report.summary.errors
  });

  return report;
}

async function checkServiceHealth(serviceName: string) {
  const map: Record<string, string> = {
    web: process.env.WEB_API_URL || "http://web:3000",
    rag_service: process.env.RAG_API_URL || "http://rag_service:8001",
    docling_service: process.env.DOCLING_API_URL || "http://docling_service:8000"
  };
  const url = `${map[serviceName] || map["web"]}/health`;
  try {
    const r = await fetch(url).catch(() => null);
    if (!r) return { service: serviceName, ok: false, reason: "no-response" };
    if (!r.ok) return { service: serviceName, ok: false, status: r.status };
    const body = await r.json().catch(() => null);
    return { service: serviceName, ok: true, body };
  } catch (e) {
    return { service: serviceName, ok: false, error: (e as Error).message };
  }
}

async function fetchLogs(serviceName: string) {
  try {
    const containers = await docker.listContainers({ all: true, filters: { name: [serviceName] } });
    if (!containers || containers.length === 0) return { service: serviceName, ok: false, reason: "not-found" };
    const c = docker.getContainer(containers[0].Id);
    const stream = await c.logs({ stdout: true, stderr: true, tail: 300 });
    return { service: serviceName, ok: true, logs: stream.toString() };
  } catch (e) {
    return { service: serviceName, ok: false, error: (e as Error).message };
  }
}

async function restartContainer(serviceName: string) {
  try {
    const containers = await docker.listContainers({ all: true, filters: { name: [serviceName] } });
    if (!containers || containers.length === 0) return { service: serviceName, ok: false, reason: "not-found" };
    const c = docker.getContainer(containers[0].Id);
    await c.restart();
    return { service: serviceName, ok: true };
  } catch (e) {
    return { service: serviceName, ok: false, error: (e as Error).message };
  }
}