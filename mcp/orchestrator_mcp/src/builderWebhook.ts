import { FastifyReply, FastifyRequest } from "fastify";
import fetch from "node-fetch";
import { publish } from "./eventBus";

const TRUSTED_WEBHOOK_SECRET = process.env.TRUSTED_WEBHOOK_SECRET || "replace_me";
const DOCLING_API_URL = process.env.DOCLING_API_URL!;
const RAG_API_URL = process.env.RAG_API_URL!;

export default async function builderWebhook(req: FastifyRequest, reply: FastifyReply, _redisClient: any) {
  try {
    const secretHeader = (req.headers["x-builder-secret"] || "") as string;
    if (!secretHeader || secretHeader !== TRUSTED_WEBHOOK_SECRET) {
      req.log.warn("Invalid builder webhook secret");
      return reply.code(401).send({ error: "invalid secret" });
    }

    const body = req.body as any;
    req.log.info({ msg: "Builder webhook received", bodyType: typeof body });

    // Publish event on Redis so services can subscribe
    await publish("builder.update", { body, receivedAt: Date.now() });

    // Trigger docling reingest (simple ping; extend to POST actual content)
    try {
      await fetch(`${DOCLING_API_URL}/parse`).then((r: any) => {
        if (!r.ok) req.log.error({ msg: "Docling parse ping failed", status: r.status });
      }).catch((e: any) => req.log.error({ msg: "Docling ping error", error: String(e) }));
    } catch (e) {
      req.log.error({ msg: "Docling trigger failed", error: String(e) });
    }

    // Trigger RAG warm/reindex endpoint (if available)
    try {
      await fetch(`${RAG_API_URL}/reindex`, { method: "POST", body: JSON.stringify({ source: "builder" }), headers: { "Content-Type": "application/json" }})
        .then((r: any) => { if (!r.ok) req.log.error(`RAG reindex failed: ${r.status}`); })
        .catch((e: any) => req.log.error(`RAG reindex error: ${e}`));
    } catch (e) {
      req.log.error(`RAG trigger failed: ${String(e)}`);
    }

    // respond with quick status
    return reply.send({ ok: true });
  } catch (err) {
    req.log.error(err);
    return reply.code(500).send({ error: "internal" });
  }
}