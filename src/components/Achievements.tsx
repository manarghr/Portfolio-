import type { ReactNode } from 'react'
import Doodle from '@/components/Doodle'

const TrophyIcon = (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9a6 6 0 0 0 12 0V3H6z" />
    <path d="M6 5H3v2a3 3 0 0 0 3 3M18 5h3v2a3 3 0 0 1-3 3M9 21h6M12 15v6" />
  </svg>
)

const MedalIcon = (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="6" />
    <path d="M8.5 13 7 22l5-3 5 3-1.5-9" />
  </svg>
)

const CapIcon = (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 9 12 5 2 9l10 4 10-4Z" />
    <path d="M6 10.5V16c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5.5" />
  </svg>
)

const StarIcon = (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 15 9l7 .5-5.3 4.6L18.5 21 12 17l-6.5 4 1.8-6.9L2 9.5 9 9z" />
  </svg>
)

type Item = { icon: ReactNode; title: string; issuer: string; year: string }

const items: Item[] = [
  { icon: TrophyIcon, title: 'Elevate Hackathon Organiser', issuer: 'Numidia Computer Society', year: '2026' },
  { icon: CapIcon,    title: "Bachelor's Degree in Computer Science", issuer: 'University Name', year: '2025' },
  { icon: MedalIcon,  title: 'Certification Name', issuer: 'Issuing Body', year: '2024' },
  { icon: StarIcon,   title: 'Achievement / Award', issuer: 'Organisation', year: '2023' },
  // Add your real achievements here
]

export default function Achievements() {
  return (
    <section className="section achievements-section" id="achievements">
      {/* decorative doodles */}
      <Doodle variant="laptop" float style={{ top: '12%', left: '8%', width: 82 }} />
      <Doodle variant="spiral" spin style={{ bottom: '12%', right: '9%', width: 64 }} />
      <Doodle variant="star" float style={{ bottom: '16%', left: '11%', width: 30 }} />

      <div className="section-inner">
        <p className="section-eyebrow">Achievements</p>
        <h2 className="section-heading">Awards &amp; Certifications</h2>
        <p className="section-sub">Certifications, awards, and moments worth marking.</p>

        <div className="achievements-grid">
          {items.map((item, i) => (
            <div key={i} className="achievement-card reveal">
              <div className="achievement-icon">{item.icon}</div>
              <div className="achievement-content">
                <h3>{item.title}</h3>
                <p className="issuer">{item.issuer}</p>
                <p className="year">{item.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
