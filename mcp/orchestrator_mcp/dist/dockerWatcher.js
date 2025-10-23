"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startDockerWatcher = startDockerWatcher;
const dockerode_1 = __importDefault(require("dockerode"));
const eventBus_1 = require("./eventBus");
async function startDockerWatcher(redisClient) {
    const socket = process.env.DOCKER_SOCKET_PATH || "/var/run/docker.sock";
    try {
        const docker = new dockerode_1.default({ socketPath: socket });
        const eventStream = await docker.getEvents();
        eventStream.on("data", async (chunk) => {
            try {
                const event = JSON.parse(chunk.toString());
                // Example: when a container dies or restarts, publish event
                const status = event.status || "";
                if (["die", "oom", "kill", "restart", "destroy"].includes(status)) {
                    await (0, eventBus_1.publish)("docker.event", { event, ts: Date.now() });
                }
            }
            catch (e) {
                // ignore parse errors
            }
        });
        // periodic container health snapshot (optional)
        setInterval(async () => {
            try {
                const containers = await docker.listContainers({ all: true });
                await (0, eventBus_1.publish)("docker.snapshot", { containers, ts: Date.now() });
            }
            catch (e) {
                // ignore
            }
        }, 30000);
    }
    catch (e) {
        // If docker socket isn't mounted, this will fail (expected in some hosts)
        console.error("Docker watcher unable to start:", String(e));
    }
}
//# sourceMappingURL=dockerWatcher.js.map