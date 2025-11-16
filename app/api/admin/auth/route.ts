import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Simple credentials for development
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'oak2024admin'
}

// Session management
const ADMIN_SESSION_KEY = 'admin_session'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

interface Session {
  username: string
  loginTime: number
  expiresAt: number
}

// GET: Check authentication status
export async function GET(request: NextRequest) {
  console.log('=== AUTH GET REQUEST ===')
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get(ADMIN_SESSION_KEY)
    
    console.log('Session cookie:', sessionCookie?.value ? 'exists' : 'not found')
    
    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false })
    }

    try {
      const session: Session = JSON.parse(sessionCookie.value)
      
      // Check if session is expired
      if (Date.now() > session.expiresAt) {
        // Clear expired session
        cookieStore.delete(ADMIN_SESSION_KEY)
        return NextResponse.json({ authenticated: false })
      }

      return NextResponse.json({
        authenticated: true,
        user: {
          username: session.username,
          role: 'admin',
          permissions: ['all']
        }
      })
    } catch (error) {
      return NextResponse.json({ authenticated: false })
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST: Login
export async function POST(request: NextRequest) {
  console.log('=== AUTH POST REQUEST START ===')
  try {
    const body = await request.json()
    console.log('Raw request body:', JSON.stringify(body))
    const { username, password } = body
    console.log('Extracted values - username:', JSON.stringify(username), 'password:', JSON.stringify(password))
    console.log('Login attempt:', { username, passwordLength: password?.length })

    if (!username || !password) {
      console.log('Missing credentials')
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    // Simple credential validation
    if (username !== ADMIN_CREDENTIALS.username || password !== ADMIN_CREDENTIALS.password) {
      console.log('Invalid credentials')
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      )
    }

    console.log('Authentication successful')

    // Create session
    const session: Session = {
      username,
      loginTime: Date.now(),
      expiresAt: Date.now() + SESSION_DURATION
    }

    // Set secure cookie
    const cookieStore = cookies()
    cookieStore.set(ADMIN_SESSION_KEY, JSON.stringify(session), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: SESSION_DURATION / 1000, // Convert to seconds
      path: '/'
    })

    return NextResponse.json({
      success: true,
      user: {
        username,
        role: 'admin',
        permissions: ['all']
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE: Logout
export async function DELETE(request: NextRequest) {
  console.log('=== AUTH DELETE REQUEST (LOGOUT) ===')
  try {
    const cookieStore = cookies()
    cookieStore.delete(ADMIN_SESSION_KEY)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}