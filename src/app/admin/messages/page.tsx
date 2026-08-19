import Link from 'next/link'
import Shell from '../Shell'
import SetupNotice from '../SetupNotice'
import MessageList from '../MessageList'
import {
  listMessages,
  messageCounts,
  supabaseIsConfigured,
  type MessageFilter,
} from '@/lib/supabase'

export const dynamic = 'force-dynamic'

const filters: { key: MessageFilter; label: string }[] = [
  { key: 'inbox', label: 'Inbox' },
  { key: 'unread', label: 'Unread' },
  { key: 'archived', label: 'Archived' },
]

export default async function MessagesPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>
}) {
  if (!supabaseIsConfigured()) {
    return (
      <Shell active="messages" eyebrow="Inbox" title="Messages">
        <SetupNotice />
      </Shell>
    )
  }

  const { filter: raw } = await searchParams
  const active: MessageFilter = filters.some(f => f.key === raw)
    ? (raw as MessageFilter)
    : 'inbox'

  const [messages, counts] = await Promise.all([listMessages(active), messageCounts()])

  return (
    <Shell
      active="messages"
      unread={counts.unread}
      eyebrow="Inbox"
      title="Messages"
      sub="Everything sent through the contact form."
      actions={
        <div className="adm-filters">
          {filters.map(f => (
            <Link
              key={f.key}
              href={f.key === 'inbox' ? '/admin/messages' : `/admin/messages?filter=${f.key}`}
              className={`adm-filter${active === f.key ? ' is-active' : ''}`}
            >
              {f.label}
            </Link>
          ))}
        </div>
      }
    >
      <MessageList messages={messages} />
    </Shell>
  )
}
