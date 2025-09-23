import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Create internationalization middleware
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',

  // Locale detection can be disabled if you want to force a specific locale
  localeDetection: true
})

// Simple middleware to handle both internationalization and admin authentication
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Handle internationalization first
  const intlResponse = intlMiddleware(request)
  if (intlResponse) {
    return intlResponse
  }

  // Handle admin authentication (existing logic)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // For now, allow access but redirect unauthenticated users via client-side logic
    // In production, you would check authentication tokens/cookies here
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all pathnames except for
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)',
    '/admin/:path*'
  ]
}