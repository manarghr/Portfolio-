const groups = [
  { label: 'Frontend', skills: ['HTML & CSS', 'JavaScript', 'React', 'Next.js' , 'TypeScript', 'Tailwind'] },
  { label: 'Backend & Databases', skills: ['Node.js', 'Python', 'FastAPI', 'SQL ', 'REST APIs', 'MongoDB', 'Supabase'] },
  { label: 'AI', skills: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Python Libraries'] },
  { label: 'Design', skills: ['Figma', 'UI / UX'] },
]

import Doodle from '@/components/Doodle'

export default function Skills() {
  return (
    <section className="section" id="skills">
      {/* decorative doodles */}
      <Doodle variant="star" float style={{ top: '36%', left: '8%', width: 46, opacity: 0.5 }} />
      <Doodle variant="spiral" spin style={{ top: '54%', right: '9%', width: 96 }} />

      <div className="section-inner">
        <p className="section-eyebrow">Skills</p>
        <h1 className="section-heading">Tools and technologies I use most often</h1>

        <div className="skill-cards">
          {groups.map(g => (
            <article key={g.label} className="skill-card reveal">
              <h3 className="skill-card-title">{g.label}</h3>
              <div className="skill-card-tags">
                {g.skills.map(s => (
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
