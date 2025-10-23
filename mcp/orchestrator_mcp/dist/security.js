"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireApiKey = requireApiKey;
exports.requireJwt = requireJwt;
exports.generateToken = generateToken;
exports.requireRole = requireRole;
exports.requirePermission = requirePermission;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;
if (!JWT_SECRET)
    throw new Error('JWT_SECRET environment variable is required');
if (!ADMIN_API_KEY)
    throw new Error('ADMIN_API_KEY environment variable is required');
/**
 * Secure constant-time comparison to prevent timing attacks
 */
function secureCompare(a, b) {
    try {
        const bufferA = Buffer.from(a);
        const bufferB = Buffer.from(b);
        if (bufferA.length !== bufferB.length)
            return false;
        return crypto_1.default.timingSafeEqual(bufferA, bufferB);
    }
    catch {
        return false;
    }
}
/**
 * API Key authentication middleware - FIXED VERSION
 */
async function requireApiKey(req, reply) {
    const key = (req.headers['x-api-key'] || '');
    if (!key || !ADMIN_API_KEY || !secureCompare(key, ADMIN_API_KEY)) {
        req.log.warn({ url: req.url, method: req.method }, 'API key authentication failed');
        return reply.code(401).send({ error: 'Invalid API key' });
    }
    req.log.info({ url: req.url, method: req.method }, 'API key authentication successful');
}
/**
 * JWT authentication middleware - FIXED VERSION
 */
async function requireJwt(req, reply) {
    const auth = (req.headers['authorization'] || '');
    if (!auth.startsWith('Bearer ')) {
        req.log.warn({ url: req.url, method: req.method }, 'No bearer token provided');
        return reply.code(401).send({ error: 'No token' });
    }
    const token = auth.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        req.user = decoded;
        req.log.info({ userId: decoded.id, role: decoded.role }, 'JWT authentication successful');
    }
    catch (e) {
        req.log.warn({ error: e.message }, 'JWT verification failed');
        return reply.code(401).send({ error: 'Invalid or expired token' });
    }
}
/**
 * Generate JWT token
 */
function generateToken(user) {
    return jsonwebtoken_1.default.sign(user, JWT_SECRET, { expiresIn: '24h' });
}
/**
 * Role-based access control middleware
 */
function requireRole(role) {
    return async (req, reply) => {
        const user = req.user;
        if (!user || user.role !== role) {
            req.log.warn({ userRole: user?.role, requiredRole: role }, 'Role check failed');
            return reply.code(403).send({ error: 'Insufficient permissions' });
        }
    };
}
/**
 * Permission-based access control middleware
 */
function requirePermission(permission) {
    return async (req, reply) => {
        const user = req.user;
        if (!user || !user.permissions.includes(permission)) {
            req.log.warn({ userPermissions: user?.permissions, requiredPermission: permission }, 'Permission check failed');
            return reply.code(403).send({ error: 'Insufficient permissions' });
        }
    };
}
//# sourceMappingURL=security.js.map