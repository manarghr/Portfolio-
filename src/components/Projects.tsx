import Doodle from '@/components/Doodle'

type Project = {
  name: string
  color: 'y' | 'b' | 'p'
  desc: string
  live: string
  code: string
  image: string // drop the file in /public/projects/ with this name
}

const projects: Project[] = [
  {
    name: 'Elevate 2.0 Website',
    color: 'y',
    desc: 'Full event website for a design hackathon with registration, schedule, sponsors & FAQ.',
    live: 'https://elevate2-wuj3.vercel.app',
    code: '#',
    image: '/elevate2.png',
  },
  {
    name: 'Elevate 2.0 UI/UX ' ,
    color: 'b',
    desc: 'Short note about the project and the tech behind it.',
    live: 'https://www.figma.com/design/KmAczmD5LTxQy76DW9on2a/elevate-ui-ux?node-id=0-1&p=f&t=KITL5q1EpFL0KOgk-0',
    code: '#',
    image: '/elevate2.png',
  },
  {
    name: 'Elevate 1.0 Website',
    color: 'p',
    desc: 'Short note about the project and the tech behind it.',
    live: 'https://elevate2025.ncs-club.com/',
    code: '#',
    image: '/elevate1.png',
  },
  {
    name: 'NcsHack 2.0 UI/UX',
    color: 'y',
    desc: 'Short note about the project and the tech behind it.',
    live: '#',
    code: '#',
    image: '/project-4.png',
  },
  {
    name: 'NcsHack 2.0 Website',
    color: 'b',
    desc: 'Short note about the project and the tech behind it.',
    live: '#',
    code: '#',
    image: '/project-5.png',
  },
  {
    name: 'Arena 2.0 Website',
    color: 'p',
    desc: 'Short note about the project and the tech behind it.',
    live: '#',
    code: '#',
    image: '/project-6.png',
  },

  {
    name: 'Arena 2.0 Website',
    color: 'p',
    desc: 'Short note about the project and the tech behind it.',
    live: '#',
    code: '#',
    image: '/project-6.png',
  },

  {
    name: 'TrainSight Platform',
    color: 'p',
    desc: 'Short note about the project and the tech behind it.',
    live: '#',
    code: '#',
    image: '/project-6.png',
  },

  {
    name: 'E-TAALIM Platform',
    color: 'p',
    desc: 'Short note about the project and the tech behind it.',
    live: '#',
    code: '#',
    image: '/project-6.png',
  },

  {
    name: 'Arena 2.0 Website',
    color: 'p',
    desc: 'Short note about the project and the tech behind it.',
    live: '#',
    code: '#',
    image: '/project-6.png',
  },

  {
    name: 'Nexus Website',
    color: 'p',
    desc: 'Short note about the project and the tech behind it.',
    live: '#',
    code: '#',
    image: '/project-6.png',
  },
]

export default function Projects() {
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
