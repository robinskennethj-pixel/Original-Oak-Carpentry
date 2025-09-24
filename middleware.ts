import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple middleware that only handles basic routing
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)'
  ]
}