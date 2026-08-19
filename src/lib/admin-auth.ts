/**
 * Minimal session handling for /admin.
 *
 * The cookie holds `<expiry>.<hmac>` where the hmac is signed with ADMIN_SECRET,
 * so a session cannot be forged without the secret. No database involved.
 * Uses Web Crypto only, so it runs in middleware (edge) as well as on the server.
 */

export const SESSION_COOKIE = 'admin_session'
const MAX_AGE_SECONDS = 60 * 60 * 12 // 12 hours

function readSecret(): string | null {
  return process.env.ADMIN_SECRET || null
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = ''
  for (const b of bytes) binary += String.fromCharCode(b)
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function sign(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value))
  return toBase64Url(new Uint8Array(sig))
}

/** Compare without leaking where the strings differ. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export async function createSessionToken(): Promise<string | null> {
  const secret = readSecret()
  if (!secret) return null
  const expiry = String(Date.now() + MAX_AGE_SECONDS * 1000)
  return `${expiry}.${await sign(expiry, secret)}`
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const secret = readSecret()
  if (!secret || !token) return false

  const dot = token.lastIndexOf('.')
  if (dot < 1) return false

  const expiry = token.slice(0, dot)
  const signature = token.slice(dot + 1)

  const expiryMs = Number(expiry)
  if (!Number.isFinite(expiryMs) || expiryMs < Date.now()) return false

  return safeEqual(signature, await sign(expiry, secret))
}

export async function checkPassword(candidate: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  return safeEqual(candidate, expected)
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: MAX_AGE_SECONDS,
}

/** True when the two env vars the admin area needs are both present. */
export function adminIsConfigured(): boolean {
  return Boolean(process.env.ADMIN_SECRET && process.env.ADMIN_PASSWORD)
}
