import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Enhanced middleware with admin route protection
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect admin routes (except login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin-login')) {
    // Check for admin session cookie
    const adminSession = request.cookies.get('admin_session')
    
    if (!adminSession) {
      // Redirect to admin login if no session
      const loginUrl = new URL('/admin-login', request.url)
      return NextResponse.redirect(loginUrl)
    }

    // Validate session (basic check - could be enhanced with JWT verification)
    try {
      const sessionData = JSON.parse(adminSession.value)
      const now = Date.now()
      
      // Check if session is expired
      if (sessionData.expiresAt && now > sessionData.expiresAt) {
        // Session expired, redirect to login
        const loginUrl = new URL('/admin-login', request.url)
        const response = NextResponse.redirect(loginUrl)
        response.cookies.delete('admin_session')
        return response
      }
    } catch (error) {
      // Invalid session format, redirect to login
      const loginUrl = new URL('/admin-login', request.url)
      const response = NextResponse.redirect(loginUrl)
      response.cookies.delete('admin_session')
      return response
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)'
  ]
}