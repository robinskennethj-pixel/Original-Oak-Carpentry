import Redis from "ioredis";
export declare function initEventBus(): Promise<Redis>;
export declare function publish(event: string, payload: any): Promise<void>;
//# sourceMappingURL=eventBus.d.ts.map