import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {
  SESSION_COOKIE,
  adminIsConfigured,
  checkPassword,
  createSessionToken,
  sessionCookieOptions,
} from '@/lib/admin-auth'

/**
 * Plain form POST rather than a server action: the login form then works with
 * JavaScript disabled, and there is no RSC round-trip to go wrong on the one
 * page you need when something else is already broken.
 */
export async function POST(request: NextRequest) {
  const form = await request.formData()
  const password = String(form.get('password') ?? '')
  const next = String(form.get('next') ?? '/admin')

  const back = (error: string) => {
    const url = new URL('/admin/login', request.url)
    url.searchParams.set('error', error)
    if (next !== '/admin') url.searchParams.set('next', next)
    return NextResponse.redirect(url, { status: 303 })
  }

  if (!adminIsConfigured()) return back('unconfigured')
  if (!password) return back('empty')

  if (!(await checkPassword(password))) {
    await new Promise(resolve => setTimeout(resolve, 600))
    return back('wrong')
  }

  const token = await createSessionToken()
  if (!token) return back('unconfigured')

  const destination = new URL(next.startsWith('/admin') ? next : '/admin', request.url)
  const response = NextResponse.redirect(destination, { status: 303 })
  response.cookies.set(SESSION_COOKIE, token, sessionCookieOptions)
  return response
}
