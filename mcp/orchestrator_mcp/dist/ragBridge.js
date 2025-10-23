"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleRAGUpdate = handleRAGUpdate;
exports.triggerRAGReindex = triggerRAGReindex;
exports.handleDoclingParse = handleDoclingParse;
exports.syncContentBetweenServices = syncContentBetweenServices;
const eventBus_js_1 = require("./eventBus.js");
const logger = console;
const RAG_API_URL = process.env.RAG_API_URL;
const DOCLING_API_URL = process.env.DOCLING_API_URL;
async function handleRAGUpdate(content) {
    try {
        logger.info("Handling RAG update", { contentType: typeof content });
        // Publish RAG update event
        await (0, eventBus_js_1.publish)("rag.content_updated", {
            content,
            timestamp: Date.now(),
            source: "orchestrator"
        });
        // Trigger reindexing if content is substantial
        if (content && (content.text || content.html || content.markdown)) {
            await triggerRAGReindex(content);
        }
    }
    catch (error) {
        logger.error("RAG update handling failed:", error);
        await (0, eventBus_js_1.publish)("rag.update_failed", {
            error: error.message,
            timestamp: Date.now()
        });
    }
}
async function triggerRAGReindex(content) {
    try {
        const response = await fetch(`${RAG_API_URL}/reindex`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content,
                source: "orchestrator",
                timestamp: Date.now()
            })
        });
        if (!response.ok) {
            throw new Error(`RAG reindex failed: ${response.status}`);
        }
        logger.info("RAG reindex triggered successfully");
        await (0, eventBus_js_1.publish)("rag.reindex_triggered", {
            timestamp: Date.now(),
            contentSize: JSON.stringify(content).length
        });
    }
    catch (error) {
        logger.error("RAG reindex trigger failed:", error);
        throw error;
    }
}
async function handleDoclingParse(content) {
    try {
        logger.info("Handling Docling parse request");
        const response = await fetch(`${DOCLING_API_URL}/parse`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content,
                source: "orchestrator",
                timestamp: Date.now()
            })
        });
        if (!response.ok) {
            throw new Error(`Docling parse failed: ${response.status}`);
        }
        const parsedContent = await response.json();
        logger.info("Docling parse completed successfully");
        await (0, eventBus_js_1.publish)("docling.parse_completed", {
            timestamp: Date.now(),
            contentSize: JSON.stringify(parsedContent).length
        });
        return parsedContent;
    }
    catch (error) {
        logger.error("Docling parse failed:", error);
        await (0, eventBus_js_1.publish)("docling.parse_failed", {
            error: error.message,
            timestamp: Date.now()
        });
        throw error;
    }
}
async function syncContentBetweenServices() {
    try {
        logger.info("Syncing content between RAG and Docling services");
        // Get latest content from Docling
        const doclingResponse = await fetch(`${DOCLING_API_URL}/latest`);
        if (!doclingResponse.ok) {
            throw new Error("Failed to fetch latest content from Docling");
        }
        const doclingContent = await doclingResponse.json();
        // Update RAG with Docling content
        await triggerRAGReindex(doclingContent);
        await (0, eventBus_js_1.publish)("content.sync_completed", {
            timestamp: Date.now(),
            source: "docling",
            target: "rag"
        });
        logger.info("Content sync completed successfully");
    }
    catch (error) {
        logger.error("Content sync failed:", error);
        await (0, eventBus_js_1.publish)("content.sync_failed", {
            error: error.message,
            timestamp: Date.now()
        });
        throw error;
    }
}
//# sourceMappingURL=ragBridge.js.map