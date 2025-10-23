import { FastifyInstance } from 'fastify';
export default function registerMetrics(server: FastifyInstance): {
    incrementPatch: () => void;
    incrementWebhook: (status: string, source: string) => void;
    incrementConnections: () => void;
    decrementConnections: () => void;
};
//# sourceMappingURL=metrics.d.ts.map