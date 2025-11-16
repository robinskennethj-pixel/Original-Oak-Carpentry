import { NextRequest, NextResponse } from 'next/server'
import { OAuth2Client } from 'google-auth-library'

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || `${process.env.NEXTAUTH_URL || 'http://localhost:3015'}/api/auth/google/callback`
)

// GET /api/auth/google - Initiate Google OAuth flow
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const returnTo = searchParams.get('returnTo') || '/admin'
    
    // Generate the URL for Google OAuth
    const authorizeUrl = client.generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email'],
      state: returnTo, // Pass the return URL as state
    })

    return NextResponse.redirect(authorizeUrl)
  } catch (error) {
    console.error('Google OAuth initiation error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate Google OAuth' },
      { status: 500 }
    )
  }
}

// POST /api/auth/google - Handle Google OAuth token exchange
export async function POST(request: NextRequest) {
  try {
    const { token, idToken } = await request.json()

    if (!token && !idToken) {
      return NextResponse.json(
        { error: 'Token or ID token required' },
        { status: 400 }
      )
    }

    let userInfo
    
    if (idToken) {
      // Verify ID token
      const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      })
      
      const payload = ticket.getPayload()
      if (!payload) {
        throw new Error('Invalid ID token')
      }

      userInfo = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        verified: payload.email_verified,
      }
    } else {
      // Exchange authorization code for tokens
      const { tokens } = await client.getToken(token)
      client.setCredentials(tokens)

      // Get user info
      const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch user info')
      }

      userInfo = await response.json()
    }

    // Here you would typically:
    // 1. Check if the user is authorized (e.g., in your admin list)
    // 2. Create or update user in your database
    // 3. Generate a session token
    
    // For now, we'll return the user info
    // In production, you should validate against your admin/user list
    const isAuthorized = userInfo.email && (
      userInfo.email.includes('@yourdomain.com') || // Replace with your domain
      userInfo.email === 'admin@example.com' // Replace with specific admin emails
    )

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Unauthorized email address' },
        { status: 403 }
      )
    }

    // Create session (similar to your existing auth)
    const sessionData = {
      userId: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      provider: 'google',
      expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    }

    const response = NextResponse.json({
      success: true,
      user: {
        id: userInfo.id,
        email: userInfo.email,
        name: userInfo.name,
        picture: userInfo.picture,
      },
    })

    // Set session cookie
    response.cookies.set('admin_session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
    })

    return response
  } catch (error) {
    console.error('Google OAuth token exchange error:', error)
    return NextResponse.json(
      { error: 'Failed to authenticate with Google' },
      { status: 500 }
    )
  }
}
