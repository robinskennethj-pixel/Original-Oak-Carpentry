"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = builderWebhook;
const node_fetch_1 = __importDefault(require("node-fetch"));
const eventBus_1 = require("./eventBus");
const TRUSTED_WEBHOOK_SECRET = process.env.TRUSTED_WEBHOOK_SECRET || "replace_me";
const DOCLING_API_URL = process.env.DOCLING_API_URL;
const RAG_API_URL = process.env.RAG_API_URL;
async function builderWebhook(req, reply, _redisClient) {
    try {
        const secretHeader = (req.headers["x-builder-secret"] || "");
        if (!secretHeader || secretHeader !== TRUSTED_WEBHOOK_SECRET) {
            req.log.warn("Invalid builder webhook secret");
            return reply.code(401).send({ error: "invalid secret" });
        }
        const body = req.body;
        req.log.info({ msg: "Builder webhook received", bodyType: typeof body });
        // Publish event on Redis so services can subscribe
        await (0, eventBus_1.publish)("builder.update", { body, receivedAt: Date.now() });
        // Trigger docling reingest (simple ping; extend to POST actual content)
        try {
            await (0, node_fetch_1.default)(`${DOCLING_API_URL}/parse`).then((r) => {
                if (!r.ok)
                    req.log.error({ msg: "Docling parse ping failed", status: r.status });
            }).catch((e) => req.log.error({ msg: "Docling ping error", error: String(e) }));
        }
        catch (e) {
            req.log.error({ msg: "Docling trigger failed", error: String(e) });
        }
        // Trigger RAG warm/reindex endpoint (if available)
        try {
            await (0, node_fetch_1.default)(`${RAG_API_URL}/reindex`, { method: "POST", body: JSON.stringify({ source: "builder" }), headers: { "Content-Type": "application/json" } })
                .then((r) => { if (!r.ok)
                req.log.error(`RAG reindex failed: ${r.status}`); })
                .catch((e) => req.log.error(`RAG reindex error: ${e}`));
        }
        catch (e) {
            req.log.error(`RAG trigger failed: ${String(e)}`);
        }
        // respond with quick status
        return reply.send({ ok: true });
    }
    catch (err) {
        req.log.error(err);
        return reply.code(500).send({ error: "internal" });
    }
}
//# sourceMappingURL=builderWebhook.js.map