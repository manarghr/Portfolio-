'use client'
import { useState } from 'react'
import Doodle from '@/components/Doodle'

type Kind = 'edu' | 'work' | 'club'
type Point = [number, number] // [year, month] with month 1-12

type Ev = {
  id: string
  kind: Kind
  title: string
  place: string
  from: Point
  to: Point // inclusive; a single-month milestone repeats `from`
  ongoing?: boolean
  cap?: string // emoji pinned to the end of the bar
  row?: number // stack within the lane when two entries would overlap
  note: string
}

/* the window the timeline draws; everything is positioned inside it */
const START: Point = [2023, 1]
const END: Point = [2026, 12]
const NOW: Point = [2026, 8]

const years = [2023, 2024, 2025, 2026]
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const lanes: { kind: Kind; label: string }[] = [
  { kind: 'edu', label: 'Education' },
  { kind: 'work', label: 'Work' },
  { kind: 'club', label: 'Club' },
]

const events: Ev[] = [
  {
    id: 'bac',
    kind: 'edu',
    title: 'Baccalauréat Sciences',
    place: 'High School',
    from: [2023, 6],
    to: [2023, 6],
    row: 0,
    note: 'Finished high school and went straight into Computer Science.',
  },
  {
    id: 'bsc',
    kind: 'edu',
    title: 'B.Sc. Computer Science',
    place: 'Numidia Institute of Technology (NiT)',
    from: [2023, 9],
    to: [2026, 7],
    row: 1,
    cap: '🎓',
    note:
      'Graduated with a bachelor degree in Autonomous Systems and Ambient/Mobile Software (AI). July 2026.',
  },

  {
    id: 'djezzy',
    kind: 'work',
    title: 'AI Intern',
    place: 'Djezzy',
    from: [2025, 7],
    to: [2025, 8],
    note:
      'Built a machine learning pipeline that predicts which customers are about to leave, from cleaning the raw data to training, testing and comparing the models.',
  },
  {
    id: 'socgen',
    kind: 'work',
    title: 'AI Intern',
    place: 'Société Générale',
    from: [2026, 5],
    to: [2026, 5],
    note:
      'Helped build a tool that spots forged ID cards, passports and payroll slips. It reads each document, checks them against each other and gives a fraud score you can actually explain, all running offline so no data ever leaves the bank.',
  },

  {
    id: 'member',
    kind: 'club',
    title: 'Member',
    place: 'NCS Club',
    from: [2024, 2],
    to: [2024, 9],
    note: 'Took part in several of the club tech events and hackathons.',
  },
  {
    id: 'organizer',
    kind: 'club',
    title: 'Organizer',
    place: 'NCS Club',
    from: [2024, 10],
    to: [2025, 9],
    note:
      'Worked in the dev and media departments, building event websites and organizing tech events together with the rest of the team.',
  },
  {
    id: 'weblead',
    kind: 'club',
    title: 'Web Dev Lead',
    place: 'NCS Club',
    from: [2025, 10],
    to: [2026, 8],
    note:
      'Led the web team that built and shipped the club event websites, while still organizing tech events with the rest of the team.',
  },
]

const idx = ([y, m]: Point) => y * 12 + (m - 1)
const T0 = idx(START)
const SPAN = idx(END) - T0 + 1

const left = (p: Point) => ((idx(p) - T0) / SPAN) * 100
const width = (a: Point, b: Point) => ((idx(b) - idx(a) + 1) / SPAN) * 100

const ROW_H = 58 // vertical step when a lane stacks
const rowsIn = (kind: Kind) =>
  Math.max(...events.filter(e => e.kind === kind).map(e => e.row ?? 0)) + 1

function whenLabel(e: Ev) {
  const from = `${months[e.from[1] - 1]} ${e.from[0]}`
  if (e.ongoing) return `${from} to Present`
  if (idx(e.from) === idx(e.to)) return from
  return `${from} to ${months[e.to[1] - 1]} ${e.to[0]}`
}

export default function Journey() {
  const [activeId, setActiveId] = useState('socgen')
  const active = events.find(e => e.id === activeId) ?? events[0]

  return (
    <section className="section" id="journey">
      {/* decorative doodles */}
      <Doodle variant="ring" style={{ top: '12%', right: '9%', width: 60 }} />
      <Doodle variant="loop" style={{ bottom: '16%', left: '8%', width: 94 }} />
      <Doodle variant="star" float style={{ top: '44%', right: '11%', width: 28 }} />

      <div className="section-inner">
        <p className="section-eyebrow">Academic Journey</p>
        <h1 className="section-heading">Education &amp; Experience</h1>

        <div className="journey reveal">
          {/* noise fields that chew the straight edges off the panel below.
              each tear is displaced twice: a long meander, then fine fibre fuzz */}
          <svg className="tl-defs" aria-hidden="true" focusable="false">
            <defs>
              <filter id="tear-lip" x="-12%" y="-24%" width="124%" height="148%">
                <feTurbulence type="fractalNoise" baseFrequency="0.007 0.019" numOctaves={3} seed={17} result="coarse" />
                <feDisplacementMap in="SourceGraphic" in2="coarse" scale={30} xChannelSelector="R" yChannelSelector="G" result="meander" />
                <feTurbulence type="fractalNoise" baseFrequency="0.09 0.16" numOctaves={2} seed={5} result="fine" />
                <feDisplacementMap in="meander" in2="fine" scale={8} xChannelSelector="R" yChannelSelector="G" />
              </filter>

              <filter id="tear-fringe" x="-12%" y="-24%" width="124%" height="148%">
                <feTurbulence type="fractalNoise" baseFrequency="0.008 0.022" numOctaves={3} seed={29} result="coarse" />
                <feDisplacementMap in="SourceGraphic" in2="coarse" scale={26} xChannelSelector="R" yChannelSelector="G" result="meander" />
                <feTurbulence type="fractalNoise" baseFrequency="0.12 0.2" numOctaves={2} seed={41} result="fine" />
                <feDisplacementMap in="meander" in2="fine" scale={9} xChannelSelector="R" yChannelSelector="G" result="frayed" />
                <feGaussianBlur in="frayed" stdDeviation="1.1" />
              </filter>

              <filter id="tear-hole" x="-12%" y="-24%" width="124%" height="148%">
                <feTurbulence type="fractalNoise" baseFrequency="0.009 0.024" numOctaves={3} seed={3} result="coarse" />
                <feDisplacementMap in="SourceGraphic" in2="coarse" scale={23} xChannelSelector="R" yChannelSelector="G" result="meander" />
                <feTurbulence type="fractalNoise" baseFrequency="0.11 0.18" numOctaves={2} seed={53} result="fine" />
                <feDisplacementMap in="meander" in2="fine" scale={6} xChannelSelector="R" yChannelSelector="G" />
              </filter>

              <filter id="tear-shadow" x="-16%" y="-30%" width="132%" height="160%">
                <feTurbulence type="fractalNoise" baseFrequency="0.008 0.02" numOctaves={3} seed={17} result="coarse" />
                <feDisplacementMap in="SourceGraphic" in2="coarse" scale={30} xChannelSelector="R" yChannelSelector="G" result="meander" />
                <feGaussianBlur in="meander" stdDeviation="7" />
              </filter>
            </defs>
          </svg>

          <div className="tl-frame">
          <div className="tl-tear" aria-hidden="true" />
          <div className="tl-top">
            <div className="tl-legend">
              <span className="tl-key edu">Education</span>
              <span className="tl-key work">Work</span>
              <span className="tl-key club">Club</span>
            </div>
            <p className="tl-hint">Pick anything on the timeline ✦</p>
          </div>

          <div className="tl-scroll">
            <div className="tl">
              {/* year ruler */}
              <div className="tl-row tl-ruler">
                <div className="tl-lane-name" />
                <div className="tl-track">
                  {years.map(y => (
                    <span key={y} className="tl-year" style={{ left: `${left([y, 1])}%` }}>
                      {y}
                    </span>
                  ))}
                </div>
              </div>

              {/* one lane per category */}
              {lanes.map(lane => (
                <div className="tl-row" key={lane.kind}>
                  <div className={`tl-lane-name ${lane.kind}`}>{lane.label}</div>
                  <div
                    className="tl-track"
                    style={{ height: 96 + (rowsIn(lane.kind) - 1) * ROW_H }}
                  >
                    {years.map(y => (
                      <span key={y} className="tl-gridline" style={{ left: `${left([y, 1])}%` }} />
                    ))}
                    <span className="tl-now" style={{ left: `${left(NOW)}%` }} />

                    {events
                      .filter(e => e.kind === lane.kind)
                      .map(e => (
                        <button
                          key={e.id}
                          type="button"
                          className={[
                            'tl-item',
                            e.kind,
                            e.ongoing ? 'is-ongoing' : '',
                            activeId === e.id ? 'is-active' : '',
                          ]
                            .filter(Boolean)
                            .join(' ')}
                          style={{
                            left: `${left(e.from)}%`,
                            width: `${width(e.from, e.to)}%`,
                            top: 24 + (e.row ?? 0) * ROW_H,
                          }}
                          onMouseEnter={() => setActiveId(e.id)}
                          onFocus={() => setActiveId(e.id)}
                          onClick={() => setActiveId(e.id)}
                          aria-label={`${e.title}, ${e.place}, ${whenLabel(e)}`}
                        >
                          <span className="tl-label">
                            <b>{e.title}</b>
                            <i>{e.place}</i>
                          </span>
                          {e.cap && <span className="tl-cap">{e.cap}</span>}
                        </button>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>

          {/* details for whatever is selected */}
          <aside className={`journey-detail ${active.kind}`} aria-live="polite">
            <span className="jd-when">{whenLabel(active)}</span>
            <h3>{active.title}</h3>
            <p className="jd-place">{active.place}</p>
            <p className="jd-note">{active.note}</p>
          </aside>
        </div>
      </div>
    </section>
  )
}
