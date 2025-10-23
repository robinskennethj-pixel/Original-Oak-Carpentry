import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import validator from 'validator';

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'admin_session';

// Validate environment variables
if (!ADMIN_USERNAME || !ADMIN_PASSWORD_HASH || !JWT_SECRET) {
  throw new Error('Missing required admin authentication environment variables');
}

/**
 * POST /api/admin/auth - Admin login endpoint
 */
export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    // Input validation and sanitization
    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedUsername = validator.escape(validator.trim(username));
    const sanitizedPassword = validator.trim(password);

    // Validate username format
    if (!validator.isAlphanumeric(sanitizedUsername)) {
      return NextResponse.json(
        { error: 'Invalid username format' },
        { status: 400 }
      );
    }

    // Validate password length
    if (sanitizedPassword.length < 6 || sanitizedPassword.length > 128) {
      return NextResponse.json(
        { error: 'Invalid password length' },
        { status: 400 }
      );
    }

    // Verify credentials using sanitized inputs
    const isValidUsername = sanitizedUsername === ADMIN_USERNAME;
    const isValidPassword = await bcrypt.compare(sanitizedPassword, ADMIN_PASSWORD_HASH);

    if (!isValidUsername || !isValidPassword) {
      // Log failed attempt for security monitoring
      console.warn(`Failed admin login attempt for username: ${sanitizedUsername} at ${new Date().toISOString()}`);
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        username: sanitizedUsername,
        role: 'admin',
        permissions: ['read', 'write', 'admin'],
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
      },
      JWT_SECRET
    );

    // Set secure HTTP-only cookie
    const cookieStore = cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24 hours
      path: '/'
    });

    return NextResponse.json({
      success: true,
      message: 'Authentication successful',
      user: { username: sanitizedUsername, role: 'admin' }
    });

  } catch (error) {
    console.error('Admin authentication error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/auth - Check authentication status
 */
export async function GET(req: NextRequest) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any;
      return NextResponse.json({
        authenticated: true,
        user: { username: decoded.username, role: decoded.role }
      });
    } catch (e) {
      // Token is invalid or expired
      cookieStore.delete(COOKIE_NAME);
      return NextResponse.json({ authenticated: false });
    }

  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false });
  }
}

/**
 * DELETE /api/admin/auth - Logout endpoint
 */
export async function DELETE(req: NextRequest) {
  try {
    const cookieStore = cookies();
    cookieStore.delete(COOKIE_NAME);

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });

  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}