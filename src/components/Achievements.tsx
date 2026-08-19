import Doodle from '@/components/Doodle'

const CapIcon = (
  <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 9 12 5 2 9l10 4 10-4Z" />
    <path d="M6 10.5V16c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5.5" />
  </svg>
)

export default function Achievements() {
  return (
    <section className="section achievements-section" id="achievements">
      {/* decorative doodles */}
      <Doodle variant="laptop" float style={{ top: '12%', left: '8%', width: 82 }} />
      <Doodle variant="spiral" spin style={{ bottom: '12%', right: '9%', width: 64 }} />
      <Doodle variant="star" float style={{ bottom: '16%', left: '11%', width: 30 }} />

      <div className="section-inner">
        <p className="section-eyebrow">Credentials</p>
        <h2 className="section-heading">Certifications</h2>
        <p className="section-sub">What I have earned so far.</p>

        <div className="certificate reveal">
          <a
            className="certificate-shot"
            href="/degree-nit.jpg"
            target="_blank"
            rel="noreferrer"
            aria-label="Open the degree certificate at full size"
          >
            <img
              src="/degree-nit.jpg"
              alt="Licence degree from Numidia Institute of Technology in Autonomous Systems and Ambient and Mobile Software (AI)"
              width={1600}
              height={1112}
              loading="lazy"
            />
          </a>

          <div className="certificate-body">
            <div className="achievement-icon">{CapIcon}</div>
            <h3>Bachelor&rsquo;s Degree in Computer Science</h3>
            <p className="issuer">Numidia Institute of Technology (NiT)</p>
            <p className="year">2026</p>
            <p className="certificate-note">
              Speciality: Autonomous Systems and Ambient and Mobile Software (AI). Click the
              certificate to open it full size.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
