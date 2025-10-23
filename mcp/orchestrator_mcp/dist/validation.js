"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitConfig = exports.diagnoseValidation = exports.patchApplyValidation = exports.patchRequestValidation = exports.webhookValidation = void 0;
exports.validateInput = validateInput;
const validator_1 = __importDefault(require("validator"));
/**
 * Create validation middleware with specific rules
 */
function validateInput(rules) {
    return async (req, reply) => {
        const body = req.body;
        const errors = [];
        const sanitized = {};
        for (const rule of rules) {
            let value = body[rule.field];
            // Check required fields
            if (rule.required && (value === undefined || value === null || value === '')) {
                errors.push(`${rule.field} is required`);
                continue;
            }
            // Skip validation if field is not required and empty
            if (!rule.required && (value === undefined || value === null || value === '')) {
                sanitized[rule.field] = value;
                continue;
            }
            // Type validation
            if (rule.type) {
                switch (rule.type) {
                    case 'string':
                        if (typeof value !== 'string') {
                            errors.push(`${rule.field} must be a string`);
                            continue;
                        }
                        break;
                    case 'number':
                        if (typeof value !== 'number' || isNaN(value)) {
                            errors.push(`${rule.field} must be a number`);
                            continue;
                        }
                        break;
                    case 'boolean':
                        if (typeof value !== 'boolean') {
                            errors.push(`${rule.field} must be a boolean`);
                            continue;
                        }
                        break;
                    case 'email':
                        if (typeof value !== 'string' || !validator_1.default.isEmail(value)) {
                            errors.push(`${rule.field} must be a valid email address`);
                            continue;
                        }
                        break;
                    case 'url':
                        if (typeof value !== 'string' || !validator_1.default.isURL(value)) {
                            errors.push(`${rule.field} must be a valid URL`);
                            continue;
                        }
                        break;
                }
            }
            // String validation for string types
            if (typeof value === 'string') {
                // Length validation
                if (rule.minLength && value.length < rule.minLength) {
                    errors.push(`${rule.field} must be at least ${rule.minLength} characters long`);
                    continue;
                }
                if (rule.maxLength && value.length > rule.maxLength) {
                    errors.push(`${rule.field} must be no more than ${rule.maxLength} characters long`);
                    continue;
                }
                // Pattern validation
                if (rule.pattern && !rule.pattern.test(value)) {
                    errors.push(`${rule.field} format is invalid`);
                    continue;
                }
                // Sanitization
                if (rule.sanitize) {
                    value = validator_1.default.escape(validator_1.default.trim(value));
                }
            }
            // Custom validation
            if (rule.custom && !rule.custom(value)) {
                errors.push(`${rule.field} validation failed`);
                continue;
            }
            sanitized[rule.field] = value;
        }
        // If there are validation errors, return them
        if (errors.length > 0) {
            req.log.warn({ errors, url: req.url, method: req.method }, 'Input validation failed');
            return reply.code(400).send({
                error: 'Validation failed',
                details: errors
            });
        }
        // Replace the request body with sanitized data
        req.body = sanitized;
        req.log.info({ url: req.url, method: req.method }, 'Input validation passed');
    };
}
/**
 * Common validation rules for different use cases
 */
exports.webhookValidation = validateInput([
    { field: 'event', required: true, type: 'string', minLength: 1, maxLength: 100, sanitize: true },
    { field: 'payload', required: true, type: 'string', sanitize: false }
]);
exports.patchRequestValidation = validateInput([
    { field: 'service', required: true, type: 'string', minLength: 1, maxLength: 50, sanitize: true },
    { field: 'description', required: true, type: 'string', minLength: 10, maxLength: 500, sanitize: true }
]);
exports.patchApplyValidation = validateInput([
    { field: 'service', required: true, type: 'string', minLength: 1, maxLength: 50, sanitize: true },
    { field: 'patch', required: true, type: 'string', minLength: 1, sanitize: false },
    { field: 'description', required: true, type: 'string', minLength: 10, maxLength: 500, sanitize: true }
]);
exports.diagnoseValidation = validateInput([
    { field: 'type', required: true, type: 'string', minLength: 1, maxLength: 50, sanitize: true },
    { field: 'target', required: true, type: 'string', minLength: 1, maxLength: 200, sanitize: true },
    { field: 'description', required: false, type: 'string', maxLength: 1000, sanitize: true }
]);
/**
 * Rate limiting configuration for different endpoint types
 */
exports.rateLimitConfig = {
    webhook: {
        max: 10,
        timeWindow: '1 minute',
        keyGenerator: (req) => `webhook:${req.ip}:builder`
    },
    adminAuth: {
        max: 5,
        timeWindow: '1 minute',
        keyGenerator: (req) => `auth:admin:${req.ip}`
    },
    patchRequest: {
        max: 5,
        timeWindow: '1 minute',
        keyGenerator: (req) => `patch:request:${req.ip}`
    },
    patchApply: {
        max: 10,
        timeWindow: '1 minute',
        keyGenerator: (req) => `patch:apply:${req.ip}`
    },
    patchHistory: {
        max: 20,
        timeWindow: '1 minute',
        keyGenerator: (req) => `patch:history:${req.ip}`
    },
    general: {
        max: 100,
        timeWindow: '1 minute',
        keyGenerator: (req) => req.ip || 'unknown'
    }
};
//# sourceMappingURL=validation.js.map