import Link from 'next/link'
import Shell from './Shell'
import SetupNotice from './SetupNotice'
import MessageList from './MessageList'
import { listMessages, messageCounts, supabaseIsConfigured } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function AdminOverview() {
  if (!supabaseIsConfigured()) {
    return (
      <Shell active="overview" eyebrow="Dashboard" title="Overview">
        <SetupNotice />
      </Shell>
    )
  }

  const [counts, recent] = await Promise.all([messageCounts(), listMessages('inbox')])

  return (
    <Shell
      active="overview"
      unread={counts.unread}
      eyebrow="Dashboard"
      title="Overview"
      sub={
        counts.unread > 0
          ? `${counts.unread} message${counts.unread === 1 ? '' : 's'} waiting for you.`
          : 'Nothing waiting. All caught up.'
      }
    >
      <div className="adm-stats">
        <div className="adm-stat is-unread">
          <div className="adm-stat-num">{counts.unread}</div>
          <div className="adm-stat-label">Unread</div>
        </div>
        <div className="adm-stat">
          <div className="adm-stat-num">{counts.total}</div>
          <div className="adm-stat-label">In inbox</div>
        </div>
        <div className="adm-stat is-quiet">
          <div className="adm-stat-num">{counts.archived}</div>
          <div className="adm-stat-label">Archived</div>
        </div>
      </div>

      <div className="adm-panel-head">
        <h2 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Latest messages</h2>
        <Link href="/admin/messages" className="adm-btn">
          See all
        </Link>
      </div>

      <MessageList messages={recent.slice(0, 5)} />
    </Shell>
  )
}
