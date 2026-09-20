import Doodle from '@/components/Doodle'
import type { HeadingsContent, Project } from '@/content/defaults'

/** Empty or a bare "#" means the link was left out, so its button is hidden. */
function hasLink(url?: string): boolean {
  const v = url?.trim()
  return !!v && v !== '#'
}

/**
 * Background layers, top first: the project's own image, then a screenshot of its
 * live link, then a gradient. A missing image file just shows the layer beneath.
 */
function shotLayers(p: Project): string {
  const layers: string[] = []
  if (p.image?.trim()) layers.push(`url("${p.image.trim()}")`)
  if (/^https?:\/\//.test(p.live ?? '')) {
    layers.push(
      `url("https://api.microlink.io/?url=${encodeURIComponent(p.live)}&screenshot=true&meta=false&embed=screenshot.url")`
    )
  }
  layers.push('linear-gradient(135deg, #1E3A5F, #4F8EF7)')
  return layers.join(', ')
}

export default function Projects({ projects, headings }: { projects: Project[]; headings: HeadingsContent }) {
  return (
    <section className="section projects-section" id="projects">
      {/* decorative doodles */}
      <Doodle variant="spiral" spin style={{ top: '42%', left: '8%', width: 64 }} />
      <Doodle variant="squiggle" style={{ bottom: '12%', right: '9%', width: 88 }} />
      <Doodle variant="star" float style={{ top: '16%', right: '10%', width: 26 }} />

      <div className="section-inner">
        <p className="section-eyebrow">{headings.projectsEyebrow}</p>
        <h2 className="section-heading">{headings.projectsHeading}</h2>

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
                  backgroundImage: shotLayers(p),
                  backgroundSize: 'cover',
                  backgroundPosition: 'top center',
                }}
              />

              <p className="showcase-desc">{p.desc}</p>

              {/* Each link only shows when that field holds a real URL. */}
              <div className="showcase-links">
                {hasLink(p.live) && (
                  <a href={p.live} target="_blank" rel="noopener noreferrer">
                    Live
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17 17 7M9 7h8v8" />
                    </svg>
                  </a>
                )}
                {hasLink(p.code) && (
                  <a href={p.code} target="_blank" rel="noopener noreferrer">GitHub</a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
