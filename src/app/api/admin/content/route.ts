import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { SESSION_COOKIE, verifySessionToken } from '@/lib/admin-auth'
import { saveSection, type SectionKey } from '@/lib/content'
import { sections } from '@/lib/content-schema'

export async function POST(request: NextRequest) {
  // middleware only guards /admin, so this endpoint checks the session itself
  const authorised = await verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)
  if (!authorised) {
    return new NextResponse('Not signed in.', { status: 401 })
  }

  let payload: { section?: string; data?: unknown }
  try {
    payload = await request.json()
  } catch {
    return new NextResponse('Expected JSON.', { status: 400 })
  }

  const section = payload.section as SectionKey
  if (!section || !(section in sections)) {
    return new NextResponse('Unknown section.', { status: 400 })
  }
  if (!Array.isArray(payload.data)) {
    return new NextResponse('Expected a list of items.', { status: 400 })
  }

  // keep only the fields the schema declares, so nothing unexpected reaches the row
  const allowed = sections[section].fields.map(f => f.name)
  const cleaned = (payload.data as Record<string, unknown>[]).map(item => {
    const row: Record<string, string> = {}
    for (const name of allowed) row[name] = String(item?.[name] ?? '').trim()
    return row
  })

  try {
    await saveSection(section, cleaned)
  } catch (error) {
    return new NextResponse(
      error instanceof Error ? error.message : 'Could not save.',
      { status: 500 }
    )
  }

  // refresh the cached copy the public page reads, then the page itself
  revalidateTag(`content:${section}`)
  revalidatePath('/')

  return NextResponse.json({ ok: true, count: cleaned.length })
}
