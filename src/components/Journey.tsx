'use client'
import { useState } from 'react'
import Doodle from '@/components/Doodle'

type Kind = 'edu' | 'work' | 'club'
type Ev = {
  year: number
  month: number // 1-12
  span?: number // how many months it covers
  title: string
  place: string
  kind: Kind
  note: string // shown in the side box when you hover the event
}

const years = [2023, 2024, 2025, 2026]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const events: Ev[] = [
  { year: 2023, month: 6, title: 'Baccalauréat — Sciences', place: 'High School', kind: 'edu', note: 'finished secondary school and headed into Computer Science.' },
  { year: 2023, month: 9, title: 'Started B.Sc. CS', place: 'Numidia Institute Of Technology (NiT)', kind: 'edu', note: 'Began a Bachelor’s degree in Computer Science, exploring programming, algorithms, and technology fundamentals.' },

  { year: 2024, month: 2, title: 'Joined the club', place: 'NCS Club', kind: 'club', note: 'Joined as a member and jumped into the club’s events.' },
  { year: 2024, month: 10, title: 'Organizer', place: 'NCS Club', kind: 'club', note: 'Became an organizer, helping run tech events for the community.' },

  { year: 2025, month: 7, span: 2, title: 'AI Intern', place: 'Djezzy', kind: 'work', note: 'Summer AI internship working on real-world data projects.' },
  { year: 2025, month: 10, title: 'Web Dev Lead', place: 'NCS Club', kind: 'club', note: 'Stepped up to lead the web team and its projects.' },

  { year: 2026, month: 5, title: 'AI Intern', place: 'Société Générale', kind: 'work', note: 'Current internship — building AI projects at the bank.' },
  { year: 2026, month: 6, title: 'AI Bachelor’s 🎓', place: 'NIT', kind: 'edu', note: 'Graduated with a specialisation in Artificial Intelligence.' },
]

function whenLabel(e: Ev) {
  if (e.span && e.span > 1) {
    return `${months[e.month - 1]} – ${months[e.month + e.span - 2]} ${e.year}`
  }
  return `${months[e.month - 1]} ${e.year}`
}

export default function Journey() {
  const [active, setActive] = useState<Ev | null>(null)

  return (
    <section className="section" id="journey">
      {/* decorative doodles */}
      <Doodle variant="ring" style={{ top: '12%', right: '9%', width: 60 }} />
      <Doodle variant="loop" style={{ bottom: '16%', left: '8%', width: 94 }} />
      <Doodle variant="star" float style={{ top: '44%', right: '11%', width: 28 }} />

      <div className="section-inner">
        <p className="section-eyebrow">Academic Journey</p>
        <h1 className="section-heading">Education & Experience</h1>
        

        <div className="journey-layout reveal">
          <div className="calendar">
            <div className="cal-legend">
              <span className="cal-legend-item edu">Education</span>
              <span className="cal-legend-item work">Work</span>
              <span className="cal-legend-item club">Club</span>
            </div>

            {/* month header */}
            <div className="cal-head">
              <div className="cal-year-spacer" />
              {months.map(m => (
                <div key={m} className="cal-month-label">{m}</div>
              ))}
            </div>

            {/* one row per year */}
            {years.map(year => {
              const cells = []
              let m = 1
              while (m <= 12) {
                const ev = events.find(e => e.year === year && e.month === m)
                if (ev) {
                  cells.push(
                    <div
                      key={m}
                      className={`cal-cell has-event ${ev.kind}${active === ev ? ' is-active' : ''}`}
                      style={{ gridColumn: `span ${ev.span ?? 1}` }}
                      onMouseEnter={() => setActive(ev)}
                      onFocus={() => setActive(ev)}
                      tabIndex={0}
                    >
                      <span className="cal-ev-title">{ev.title}</span>
                      <span className="cal-ev-place">{ev.place}</span>
                    </div>
                  )
                  m += ev.span ?? 1
                } else {
                  cells.push(<div key={m} className="cal-cell" />)
                  m += 1
                }
              }
              return (
                <div key={year} className="cal-row">
                  <div className="cal-year">{year}</div>
                  {cells}
                </div>
              )
            })}
          </div>

          {/* description box */}
          <aside className={`journey-detail ${active ? active.kind : ''}`}>
            {active ? (
              <>
                <span className="jd-when">{whenLabel(active)}</span>
                <h3>{active.title}</h3>
                <p className="jd-place">{active.place}</p>
                <p className="jd-note">{active.note}</p>
              </>
            ) : (
              <p className="jd-hint">Hover an event in the calendar and its story shows up here. ✦</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
