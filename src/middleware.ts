import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/admin-auth'

/** Everything under /admin needs a session, except the login page itself. */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login') return NextResponse.next()

  const valid = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)
  if (valid) return NextResponse.next()

  const login = request.nextUrl.clone()
  login.pathname = '/admin/login'
  login.search = ''
  if (pathname !== '/admin') login.searchParams.set('next', pathname)
  return NextResponse.redirect(login)
}

export const config = {
  matcher: ['/admin/:path*'],
}
