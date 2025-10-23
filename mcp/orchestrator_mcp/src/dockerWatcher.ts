import Docker from "dockerode";
import { publish } from "./eventBus";

export async function startDockerWatcher(redisClient: any) {
  const socket = process.env.DOCKER_SOCKET_PATH || "/var/run/docker.sock";
  try {
    const docker = new Docker({ socketPath: socket });
    const eventStream = await docker.getEvents();

    eventStream.on("data", async (chunk: Buffer) => {
      try {
        const event = JSON.parse(chunk.toString());
        // Example: when a container dies or restarts, publish event
        const status = event.status || "";
        if (["die", "oom", "kill", "restart", "destroy"].includes(status)) {
          await publish("docker.event", { event, ts: Date.now() });
        }
      } catch (e) {
        // ignore parse errors
      }
    });

    // periodic container health snapshot (optional)
    setInterval(async () => {
      try {
        const containers = await docker.listContainers({ all: true });
        await publish("docker.snapshot", { containers, ts: Date.now() });
      } catch (e) {
        // ignore
      }
    }, 30_000);
  } catch (e) {
    // If docker socket isn't mounted, this will fail (expected in some hosts)
    console.error("Docker watcher unable to start:", String(e));
  }
}