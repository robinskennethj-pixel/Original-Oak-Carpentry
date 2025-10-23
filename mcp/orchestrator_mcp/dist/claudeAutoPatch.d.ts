interface PatchRequest {
    service: string;
    error: string;
    logs: string[];
    containerId?: string;
    timestamp: number;
}
interface PatchLog {
    id: string;
    timestamp: number;
    service: string;
    error: string;
    patch: string;
    status: "pending" | "applied" | "failed" | "rolled_back";
    gitCommit?: string;
    testResults?: boolean;
}
export declare class ClaudeAutoPatch {
    private patchLog;
    private patchLogPath;
    constructor();
    loadPatchLog(): Promise<void>;
    savePatchLog(): Promise<void>;
    requestPatch(patchRequest: PatchRequest): Promise<string | null>;
    applyPatch(service: string, patch: string, description: string): Promise<boolean>;
    rollbackPatch(patchId: string): Promise<boolean>;
    private applyGitPatch;
    private testPatch;
    private commitPatch;
    private rebuildService;
    private waitForPatchResponse;
    private generatePatchId;
    getPatchHistory(): PatchLog[];
    getPatchById(patchId: string): PatchLog | undefined;
}
export {};
//# sourceMappingURL=claudeAutoPatch.d.ts.map