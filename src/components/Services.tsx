import Doodle from '@/components/Doodle'
import ServiceIcon from '@/components/ServiceIcon'
import type { HeadingsContent, Service } from '@/content/defaults'

export default function Services({ services, headings }: { services: Service[]; headings: HeadingsContent }) {
  return (
    <section className="section services-section" id="services">
      {/* decorative doodles */}
      <Doodle variant="squiggle" style={{ top: '18%', left: '7%', width: 74 }} />
      <Doodle variant="star" float style={{ bottom: '20%', right: '9%', width: 30 }} />

      <div className="section-inner">
        <p className="section-eyebrow">{headings.servicesEyebrow}</p>
        <h2 className="section-heading">{headings.servicesHeading}</h2>

        <div className="service-cards">
          {services.map(s => (
            <article key={s.title} className="service-card reveal">
              <span className="service-icon"><ServiceIcon name={s.icon} /></span>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-blurb">{s.blurb}</p>
            </article>
          ))}
        </div>

        <p className="services-note">
          Remote, working with clients in Algeria and abroad · EN · FR · AR ·{' '}
          <a href="#contact">Tell me what you need →</a>
        </p>
      </div>
    </section>
  )
}
