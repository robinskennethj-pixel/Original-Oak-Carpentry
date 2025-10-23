import { FastifyReply, FastifyRequest } from 'fastify';
/**
 * Input validation and sanitization middleware
 */
export interface ValidationRule {
    field: string;
    required?: boolean;
    type?: 'string' | 'number' | 'boolean' | 'email' | 'url';
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    sanitize?: boolean;
    custom?: (value: any) => boolean;
}
/**
 * Create validation middleware with specific rules
 */
export declare function validateInput(rules: ValidationRule[]): (req: FastifyRequest, reply: FastifyReply) => Promise<undefined>;
/**
 * Common validation rules for different use cases
 */
export declare const webhookValidation: (req: FastifyRequest, reply: FastifyReply) => Promise<undefined>;
export declare const patchRequestValidation: (req: FastifyRequest, reply: FastifyReply) => Promise<undefined>;
export declare const patchApplyValidation: (req: FastifyRequest, reply: FastifyReply) => Promise<undefined>;
export declare const diagnoseValidation: (req: FastifyRequest, reply: FastifyReply) => Promise<undefined>;
/**
 * Rate limiting configuration for different endpoint types
 */
export declare const rateLimitConfig: {
    webhook: {
        max: number;
        timeWindow: string;
        keyGenerator: (req: FastifyRequest) => string;
    };
    adminAuth: {
        max: number;
        timeWindow: string;
        keyGenerator: (req: FastifyRequest) => string;
    };
    patchRequest: {
        max: number;
        timeWindow: string;
        keyGenerator: (req: FastifyRequest) => string;
    };
    patchApply: {
        max: number;
        timeWindow: string;
        keyGenerator: (req: FastifyRequest) => string;
    };
    patchHistory: {
        max: number;
        timeWindow: string;
        keyGenerator: (req: FastifyRequest) => string;
    };
    general: {
        max: number;
        timeWindow: string;
        keyGenerator: (req: FastifyRequest) => string;
    };
};
//# sourceMappingURL=validation.d.ts.map