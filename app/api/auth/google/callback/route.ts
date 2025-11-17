import { NextRequest, NextResponse } from 'next/server'
import { OAuth2Client } from 'google-auth-library'

export const dynamic = 'force-dynamic'

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI || `${process.env.NEXTAUTH_URL || 'http://localhost:3015'}/api/auth/google/callback`
)

// GET /api/auth/google/callback - Handle Google OAuth callback
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const state = searchParams.get('state') // Return URL
    const error = searchParams.get('error')

    if (error) {
      console.error('Google OAuth error:', error)
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL || 'http://localhost:3015'}/admin-login?error=oauth_error`)
    }

    if (!code) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL || 'http://localhost:3015'}/admin-login?error=missing_code`)
    }

    // Exchange authorization code for tokens
    const { tokens } = await client.getToken(code)
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

    const userInfo = await response.json()

    // Check if user is authorized
    const isAuthorized = userInfo.email && (
      userInfo.email.includes('@yourdomain.com') || // Replace with your domain
      userInfo.email === 'admin@example.com' // Replace with specific admin emails
    )

    if (!isAuthorized) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL || 'http://localhost:3015'}/admin-login?error=unauthorized`)
    }

    // Create session
    const sessionData = {
      userId: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      provider: 'google',
      expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    }

    const redirectUrl = state || '/admin'
    const response_redirect = NextResponse.redirect(`${process.env.NEXTAUTH_URL || 'http://localhost:3015'}${redirectUrl}`)

    // Set session cookie
    response_redirect.cookies.set('admin_session', JSON.stringify(sessionData), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60, // 24 hours
    })

    return response_redirect
  } catch (error) {
    console.error('Google OAuth callback error:', error)
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL || 'http://localhost:3015'}/admin-login?error=callback_error`)
  }
}
