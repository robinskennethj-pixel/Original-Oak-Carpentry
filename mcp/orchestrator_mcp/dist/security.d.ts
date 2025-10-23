import { FastifyReply, FastifyRequest } from 'fastify';
export interface AuthUser {
    id: string;
    role: string;
    permissions: string[];
}
/**
 * API Key authentication middleware - FIXED VERSION
 */
export declare function requireApiKey(req: FastifyRequest, reply: FastifyReply): Promise<undefined>;
/**
 * JWT authentication middleware - FIXED VERSION
 */
export declare function requireJwt(req: FastifyRequest, reply: FastifyReply): Promise<undefined>;
/**
 * Generate JWT token
 */
export declare function generateToken(user: AuthUser): string;
/**
 * Role-based access control middleware
 */
export declare function requireRole(role: string): (req: FastifyRequest, reply: FastifyReply) => Promise<undefined>;
/**
 * Permission-based access control middleware
 */
export declare function requirePermission(permission: string): (req: FastifyRequest, reply: FastifyReply) => Promise<undefined>;
//# sourceMappingURL=security.d.ts.map