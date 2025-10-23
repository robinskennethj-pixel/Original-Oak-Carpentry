"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initEventBus = initEventBus;
exports.publish = publish;
const ioredis_1 = __importDefault(require("ioredis"));
let redis = null;
async function initEventBus() {
    if (redis)
        return redis;
    const url = process.env.REDIS_URL || "redis://redis:6379";
    redis = new ioredis_1.default(url);
    // lightweight health check
    await redis.ping();
    return redis;
}
async function publish(event, payload) {
    if (!redis)
        await initEventBus();
    await redis.publish(event, JSON.stringify(payload));
}
//# sourceMappingURL=eventBus.js.map