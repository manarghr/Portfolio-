import Doodle from '@/components/Doodle'
import Typewriter from '@/components/Typewriter'
import type { HeroContent, SiteContent } from '@/content/defaults'

export default function Hero({ hero, site }: { hero: HeroContent; site: SiteContent }) {
  return (
    <section className="hero" id="hero">
      {/* Decorative doodles, kept out at the corners away from the content */}
      <Doodle variant="spiral" spin style={{ top: '9%', left: '2%', width: 74 }} />

      <div className="hero-inner">
        {/* Text side */}
        <div>
          <p className="hero-greeting">
            <Typewriter text={hero.greeting} />
          </p>

          <h1>
            {hero.headline}
            <br />
            &amp; <span className="hero-accent">{hero.headlineAccent}</span>
          </h1>

          <p className="hero-lead">{hero.lead}</p>

          <div className="hero-cta">
            {/* gold star floats in the background, independent of the button */}
            <svg className="cta-star" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 0l2.4 8.5L23 12l-8.6 3.5L12 24l-2.4-8.5L1 12l8.6-3.5z" />
            </svg>
            <a href="#projects" className="btn btn-pop">
              View my work
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-pop">Get in touch</a>
          </div>

          {/* quieter third action: the CV file is set in the dashboard */}
          {site.cv?.trim() && (
          <a className="hero-cv" href={site.cv} download>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5M4 19h16" />
            </svg>
            Download my CV
          </a>
          )}
        </div>

        {/* Photo side */}
        <div className="hero-photo-wrap">
          <svg className="photo-star" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0l2.4 8.5L23 12l-8.6 3.5L12 24l-2.4-8.5L1 12l8.6-3.5z" />
          </svg>
          <div className="hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero.photo} alt="Manar Gherib" />
            <span className="hero-photo-ring" />
          </div>
          <span className="hero-avail-badge">
            <span className="dot" />
            {hero.badge}
          </span>
        </div>
      </div>
    </section>
  )
}
