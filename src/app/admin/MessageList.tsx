import type { Message } from '@/lib/supabase'
import { removeMessage, toggleArchived, toggleRead } from './actions'

function when(iso: string): string {
  const date = new Date(iso)
  const mins = Math.round((Date.now() - date.getTime()) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  if (mins < 60 * 24) return `${Math.round(mins / 60)} h ago`
  if (mins < 60 * 24 * 7) return `${Math.round(mins / 1440)} d ago`
  return date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function MessageList({ messages }: { messages: Message[] }) {
  if (messages.length === 0) {
    return (
      <div className="adm-panel adm-empty">
        <div className="adm-empty-mark">📭</div>
        <p>Nothing here yet.</p>
      </div>
    )
  }

  return (
    <div className="adm-msgs">
      {messages.map(m => {
        const unread = m.read_at === null
        return (
          <details key={m.id} className={`adm-msg${unread ? ' is-unread' : ''}`}>
            <summary>
              <span>
                <span className="adm-msg-from">
                  {unread && <span className="adm-msg-dot" aria-label="unread" />}
                  {m.name}
                </span>
                <br />
                <span className="adm-msg-subject">{m.subject || m.body.slice(0, 90)}</span>
              </span>
              <span className="adm-msg-when">{when(m.created_at)}</span>
            </summary>

            <div className="adm-msg-body">
              <p>{m.body}</p>

              <div className="adm-msg-actions">
                <a
                  className="adm-btn is-primary"
                  href={`mailto:${m.email}?subject=${encodeURIComponent(
                    m.subject ? `Re: ${m.subject}` : 'Re: your message'
                  )}`}
                >
                  Reply to {m.email}
                </a>

                <form action={toggleRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="read" value={unread ? 'true' : 'false'} />
                  <button type="submit" className="adm-btn">
                    Mark {unread ? 'read' : 'unread'}
                  </button>
                </form>

                <form action={toggleArchived}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="archived" value={m.archived ? 'false' : 'true'} />
                  <button type="submit" className="adm-btn">
                    {m.archived ? 'Move to inbox' : 'Archive'}
                  </button>
                </form>

                <form action={removeMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <button type="submit" className="adm-btn is-danger">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </details>
        )
      })}
    </div>
  )
}
