import Doodle from '@/components/Doodle'
import type { SkillGroup } from '@/content/defaults'

export default function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section className="section" id="skills">
      {/* decorative doodles */}
      <Doodle variant="star" float style={{ top: '36%', left: '8%', width: 46, opacity: 0.5 }} />
      <Doodle variant="spiral" spin style={{ top: '54%', right: '9%', width: 96 }} />

      <div className="section-inner">
        <p className="section-eyebrow">Skills</p>
        <h2 className="section-heading">Tools and technologies I use most often</h2>

        <div className="skill-cards">
          {groups.map(g => (
            <article key={g.label} className="skill-card reveal">
              <h3 className="skill-card-title">{g.label}</h3>
              <div className="skill-card-tags">
                {g.skills
                  .split(',')
                  .map(s => s.trim())
                  .filter(Boolean)
                  .map(s => (
                    <span key={s}>{s}</span>
                  ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
