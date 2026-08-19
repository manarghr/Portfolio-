import Link from 'next/link'
import { logout } from './actions'
import { sectionList } from '@/lib/content-schema'

type ShellProps = {
  active: 'overview' | 'messages' | 'content'
  /** which section is open, when active is 'content' */
  contentKey?: string
  unread?: number
  eyebrow: string
  title: string
  sub?: string
  actions?: React.ReactNode
  children: React.ReactNode
}

export default function Shell({
  active,
  contentKey,
  unread = 0,
  eyebrow,
  title,
  sub,
  actions,
  children,
}: ShellProps) {
  return (
    <div className="adm">
      <aside className="adm-side">
        <Link href="/admin" className="adm-brand">
          <span className="adm-brand-mark">MG</span>
          <span>
            <span className="adm-brand-name">Dashboard</span>
            <br />
            <span className="adm-brand-sub">manar gherib</span>
          </span>
        </Link>

        <nav className="adm-navgroup">
          <span className="adm-navlabel">Inbox</span>
          <Link href="/admin" className={`adm-link${active === 'overview' ? ' is-active' : ''}`}>
            Overview
          </Link>
          <Link
            href="/admin/messages"
            className={`adm-link${active === 'messages' ? ' is-active' : ''}`}
          >
            Messages
            {unread > 0 && <span className="adm-pill">{unread}</span>}
          </Link>
        </nav>

        <nav className="adm-navgroup">
          <span className="adm-navlabel">Site content</span>
          {sectionList.map(s => (
            <Link
              key={s.key}
              href={`/admin/content/${s.key}`}
              className={`adm-link${active === 'content' && contentKey === s.key ? ' is-active' : ''}`}
            >
              {s.title}
            </Link>
          ))}
        </nav>

        <div className="adm-side-foot adm-navgroup">
          <Link href="/" className="adm-link" target="_blank">
            View site ↗
          </Link>
          <form action={logout}>
            <button type="submit" className="adm-link" style={{ width: '100%', border: 0, background: 'none', cursor: 'pointer', font: 'inherit' }}>
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="adm-main">
        <header className="adm-head">
          <div>
            <p className="adm-eyebrow">{eyebrow}</p>
            <h1 className="adm-title">{title}</h1>
            {sub && <p className="adm-sub">{sub}</p>}
          </div>
          {actions}
        </header>

        {children}
      </main>
    </div>
  )
}
