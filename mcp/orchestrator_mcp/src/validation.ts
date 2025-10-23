import { FastifyReply, FastifyRequest } from 'fastify';
import validator from 'validator';

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
export function validateInput(rules: ValidationRule[]) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const body = req.body as any;
    const errors: string[] = [];
    const sanitized: any = {};

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
            if (typeof value !== 'string' || !validator.isEmail(value)) {
              errors.push(`${rule.field} must be a valid email address`);
              continue;
            }
            break;
          case 'url':
            if (typeof value !== 'string' || !validator.isURL(value)) {
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
          value = validator.escape(validator.trim(value));
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
    (req as any).body = sanitized;
    req.log.info({ url: req.url, method: req.method }, 'Input validation passed');
  };
}

/**
 * Common validation rules for different use cases
 */

export const webhookValidation = validateInput([
  { field: 'event', required: true, type: 'string', minLength: 1, maxLength: 100, sanitize: true },
  { field: 'payload', required: true, type: 'string', sanitize: false }
]);

export const patchRequestValidation = validateInput([
  { field: 'service', required: true, type: 'string', minLength: 1, maxLength: 50, sanitize: true },
  { field: 'description', required: true, type: 'string', minLength: 10, maxLength: 500, sanitize: true }
]);

export const patchApplyValidation = validateInput([
  { field: 'service', required: true, type: 'string', minLength: 1, maxLength: 50, sanitize: true },
  { field: 'patch', required: true, type: 'string', minLength: 1, sanitize: false },
  { field: 'description', required: true, type: 'string', minLength: 10, maxLength: 500, sanitize: true }
]);

export const diagnoseValidation = validateInput([
  { field: 'type', required: true, type: 'string', minLength: 1, maxLength: 50, sanitize: true },
  { field: 'target', required: true, type: 'string', minLength: 1, maxLength: 200, sanitize: true },
  { field: 'description', required: false, type: 'string', maxLength: 1000, sanitize: true }
]);

/**
 * Rate limiting configuration for different endpoint types
 */
export const rateLimitConfig = {
  webhook: {
    max: 10,
    timeWindow: '1 minute',
    keyGenerator: (req: FastifyRequest) => `webhook:${req.ip}:builder`
  },
  adminAuth: {
    max: 5,
    timeWindow: '1 minute',
    keyGenerator: (req: FastifyRequest) => `auth:admin:${req.ip}`
  },
  patchRequest: {
    max: 5,
    timeWindow: '1 minute',
    keyGenerator: (req: FastifyRequest) => `patch:request:${req.ip}`
  },
  patchApply: {
    max: 10,
    timeWindow: '1 minute',
    keyGenerator: (req: FastifyRequest) => `patch:apply:${req.ip}`
  },
  patchHistory: {
    max: 20,
    timeWindow: '1 minute',
    keyGenerator: (req: FastifyRequest) => `patch:history:${req.ip}`
  },
  general: {
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (req: FastifyRequest) => req.ip || 'unknown'
  }
};