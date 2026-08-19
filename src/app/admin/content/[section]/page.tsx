import { notFound } from 'next/navigation'
import Shell from '../../Shell'
import SetupNotice from '../../SetupNotice'
import Editor from '../Editor'
import { getSectionLive, type SectionKey } from '@/lib/content'
import { sections } from '@/lib/content-schema'
import { supabaseIsConfigured } from '@/lib/supabase'
import { messageCounts } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function SectionEditor({
  params,
}: {
  params: Promise<{ section: string }>
}) {
  const { section } = await params
  if (!(section in sections)) notFound()

  const schema = sections[section as SectionKey]

  if (!supabaseIsConfigured()) {
    return (
      <Shell active="content" contentKey={schema.key} eyebrow="Site content" title={schema.title}>
        <SetupNotice />
      </Shell>
    )
  }

  const [rows, counts] = await Promise.all([
    getSectionLive<Record<string, string>[]>(schema.key),
    messageCounts().catch(() => ({ total: 0, unread: 0, archived: 0 })),
  ])

  return (
    <Shell
      active="content"
      contentKey={schema.key}
      unread={counts.unread}
      eyebrow="Site content"
      title={schema.title}
      sub={schema.blurb}
    >
      <Editor schema={schema} initial={rows} />
    </Shell>
  )
}
