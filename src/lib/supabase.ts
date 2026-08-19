/**
 * Thin Supabase (PostgREST) client built on fetch.
 *
 * Deliberately no @supabase/supabase-js dependency: everything here is a handful
 * of REST calls, and keeping it dependency-free means one less thing to break.
 *
 * Server-only. It uses the service-role key, which bypasses row-level security,
 * so this module must never be imported into a client component. The key is read
 * from a non-NEXT_PUBLIC env var, so it cannot reach the browser bundle.
 */

export type Message = {
  id: string
  name: string
  email: string
  subject: string | null
  body: string
  created_at: string
  read_at: string | null
  archived: boolean
}

type Config = { url: string; key: string }

function config(): Config | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return { url: url.replace(/\/+$/, ''), key }
}

/** False until the Supabase env vars are filled in, so pages can show setup help. */
export function supabaseIsConfigured(): boolean {
  return config() !== null
}

async function rest(path: string, init: RequestInit = {}): Promise<Response> {
  const cfg = config()
  if (!cfg) throw new Error('Supabase is not configured')

  return fetch(`${cfg.url}/rest/v1/${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      'Content-Type': 'application/json',
      ...init.headers,
    },
  })
}

async function expectOk(res: Response, what: string): Promise<void> {
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`${what} failed (${res.status}): ${detail.slice(0, 200)}`)
  }
}

export type MessageFilter = 'inbox' | 'unread' | 'archived'

export async function listMessages(filter: MessageFilter = 'inbox'): Promise<Message[]> {
  const params = new URLSearchParams({ select: '*', order: 'created_at.desc' })

  if (filter === 'archived') params.set('archived', 'is.true')
  else params.set('archived', 'is.false')
  if (filter === 'unread') params.set('read_at', 'is.null')

  const res = await rest(`messages?${params}`)
  await expectOk(res, 'Loading messages')
  return res.json()
}

export type MessageCounts = { total: number; unread: number; archived: number }

/** Counts come back in the content-range header, so no rows are transferred. */
async function countWhere(query: string): Promise<number> {
  const res = await rest(`messages?select=id&${query}`, {
    headers: { Prefer: 'count=exact', Range: '0-0' },
  })
  await expectOk(res, 'Counting messages')
  const range = res.headers.get('content-range') // e.g. "0-0/42"
  const total = range?.split('/')[1]
  return total && total !== '*' ? Number(total) : 0
}

export async function messageCounts(): Promise<MessageCounts> {
  const [total, unread, archived] = await Promise.all([
    countWhere('archived=is.false'),
    countWhere('archived=is.false&read_at=is.null'),
    countWhere('archived=is.true'),
  ])
  return { total, unread, archived }
}

export async function markMessageRead(id: string, read: boolean): Promise<void> {
  const res = await rest(`messages?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify({ read_at: read ? new Date().toISOString() : null }),
  })
  await expectOk(res, 'Updating message')
}

export async function setMessageArchived(id: string, archived: boolean): Promise<void> {
  const res = await rest(`messages?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify({ archived }),
  })
  await expectOk(res, 'Archiving message')
}

export async function deleteMessage(id: string): Promise<void> {
  const res = await rest(`messages?id=eq.${encodeURIComponent(id)}`, { method: 'DELETE' })
  await expectOk(res, 'Deleting message')
}

export async function insertMessage(input: {
  name: string
  email: string
  subject: string | null
  body: string
}): Promise<void> {
  const res = await rest('messages', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify(input),
  })
  await expectOk(res, 'Saving message')
}
