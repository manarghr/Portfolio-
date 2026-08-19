import Doodle from '@/components/Doodle'
import type { Project } from '@/content/defaults'

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section className="section projects-section" id="projects">
      {/* decorative doodles */}
      <Doodle variant="spiral" spin style={{ top: '42%', left: '8%', width: 64 }} />
      <Doodle variant="squiggle" style={{ bottom: '12%', right: '9%', width: 88 }} />
      <Doodle variant="star" float style={{ top: '16%', right: '10%', width: 26 }} />

      <div className="section-inner">
        <p className="section-eyebrow">Projects</p>
        <h2 className="section-heading">Things I&apos;ve built &amp; contributed to</h2>

        <div className="showcase-grid">
          {projects.map((p, i) => (
            <article key={i} className="showcase-card reveal">
              <aside className={`showcase-postit ${p.color}`}>
                <span className="postit-tape" />
                {p.name}
              </aside>

              <div
                className="showcase-shot"
                style={{
                  backgroundImage: `url(${p.image}), linear-gradient(135deg, #1E3A5F, #4F8EF7)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />

              <p className="showcase-desc">{p.desc}</p>

              <div className="showcase-links">
                <a href={p.live} target="_blank" rel="noopener noreferrer">
                  Live
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </a>
                <a href={p.code} target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
