import Doodle from '@/components/Doodle'
import type { AboutContent, HeadingsContent } from '@/content/defaults'

export default function About({ about, headings }: { about: AboutContent; headings: HeadingsContent }) {
  return (
    <section className="section about-section" id="about">
      {/* decorative doodles */}
      <Doodle variant="squiggle" style={{ top: '12%', right: '9%', width: 88 }} />
      <Doodle variant="laptop" float style={{ top: '44%', left: '9%', width: 80 }} />

      <div className="section-inner">
        <p className="section-eyebrow">{headings.aboutEyebrow}</p>
        <h2 className="section-heading">{headings.aboutHeading}</h2>

        {/* plain container to write in, with a small post-it on the top-left */}
        <div className="about-block">
          <aside className="about-postit">
            <span className="postit-tape" />
            <p>{about.location}</p>
            <p>{about.languages}</p>
          </aside>

          <div className="about-block-body">
            {about.body
              .split(/\n\s*\n/)
              .map(para => para.trim())
              .filter(Boolean)
              .map((para, i) => (
                <p key={i}>{para}</p>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}
