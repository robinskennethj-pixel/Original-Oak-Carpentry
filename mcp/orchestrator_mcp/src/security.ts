import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

if (!JWT_SECRET) throw new Error('JWT_SECRET environment variable is required');
if (!ADMIN_API_KEY) throw new Error('ADMIN_API_KEY environment variable is required');

export interface AuthUser {
  id: string;
  role: string;
  permissions: string[];
}

/**
 * Secure constant-time comparison to prevent timing attacks
 */
function secureCompare(a: string, b: string): boolean {
  try {
    const bufferA = Buffer.from(a);
    const bufferB = Buffer.from(b);
    if (bufferA.length !== bufferB.length) return false;
    return crypto.timingSafeEqual(bufferA, bufferB);
  } catch {
    return false;
  }
}

/**
 * API Key authentication middleware - FIXED VERSION
 */
export async function requireApiKey(req: FastifyRequest, reply: FastifyReply) {
  const key = (req.headers['x-api-key'] || '') as string;

  if (!key || !ADMIN_API_KEY || !secureCompare(key, ADMIN_API_KEY)) {
    req.log.warn({ url: req.url, method: req.method }, 'API key authentication failed');
    return reply.code(401).send({ error: 'Invalid API key' });
  }

  req.log.info({ url: req.url, method: req.method }, 'API key authentication successful');
}

/**
 * JWT authentication middleware - FIXED VERSION
 */
export async function requireJwt(req: FastifyRequest, reply: FastifyReply) {
  const auth = (req.headers['authorization'] || '') as string;

  if (!auth.startsWith('Bearer ')) {
    req.log.warn({ url: req.url, method: req.method }, 'No bearer token provided');
    return reply.code(401).send({ error: 'No token' });
  }

  const token = auth.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET!) as AuthUser;
    (req as any).user = decoded;
    req.log.info({ userId: decoded.id, role: decoded.role }, 'JWT authentication successful');
  } catch (e: any) {
    req.log.warn({ error: e.message }, 'JWT verification failed');
    return reply.code(401).send({ error: 'Invalid or expired token' });
  }
}

/**
 * Generate JWT token
 */
export function generateToken(user: AuthUser): string {
  return jwt.sign(user, JWT_SECRET!, { expiresIn: '24h' });
}

/**
 * Role-based access control middleware
 */
export function requireRole(role: string) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const user = (req as any).user as AuthUser;
    if (!user || user.role !== role) {
      req.log.warn({ userRole: user?.role, requiredRole: role }, 'Role check failed');
      return reply.code(403).send({ error: 'Insufficient permissions' });
    }
  };
}

/**
 * Permission-based access control middleware
 */
export function requirePermission(permission: string) {
  return async (req: FastifyRequest, reply: FastifyReply) => {
    const user = (req as any).user as AuthUser;
    if (!user || !user.permissions.includes(permission)) {
      req.log.warn({ userPermissions: user?.permissions, requiredPermission: permission }, 'Permission check failed');
      return reply.code(403).send({ error: 'Insufficient permissions' });
    }
  };
}