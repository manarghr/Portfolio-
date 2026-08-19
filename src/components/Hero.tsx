import Doodle from '@/components/Doodle'
import Typewriter from '@/components/Typewriter'

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Decorative doodles, kept out at the corners away from the content */}
      <Doodle variant="spiral" spin style={{ top: '9%', left: '2%', width: 74 }} />

      <div className="hero-inner">
        {/* Text side */}
        <div>
          <p className="hero-greeting" style={{ color: '#3d6984' }}>
            <Typewriter text="Hey, I'm Manar!" />
          </p>

          <h1>
            AI Enthusiast
            <br />
            &amp; <span style={{ color: '#3d6984' }}>Web Developer</span>
          </h1>

          <p className="hero-lead">
            Recent Computer Science graduate specialized in Artificial Intelligence and Software Development. Passionate about building modern web solutions and continuously growing my skills.
          </p>

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
        </div>

        {/* Photo side */}
        <div className="hero-photo-wrap">
          <svg className="photo-star" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0l2.4 8.5L23 12l-8.6 3.5L12 24l-2.4-8.5L1 12l8.6-3.5z" />
          </svg>
          <div className="hero-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/profile.jpg" alt="Manar Gherib" />
            <span className="hero-photo-ring" />
          </div>
          <span className="hero-avail-badge">
            <span className="dot" />
            Open to Remote Work
          </span>
        </div>
      </div>
    </section>
  )
}
