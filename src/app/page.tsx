import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import Journey from '@/components/Journey'
import Achievements from '@/components/Achievements'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollReveal from '@/components/ScrollReveal'
import { getSection, getSingle, toJourneyEvents } from '@/lib/content'
import type {
  AboutContent,
  CertificationContent,
  HeadingsContent,
  HeroContent,
  SiteContent,
  JourneyRow,
  Project,
  Service,
  SkillGroup,
} from '@/content/defaults'

export default async function Home() {
  const [hero, about, skills, services, projects, journey, cert, site, headings] = await Promise.all([
    getSingle<HeroContent>('hero'),
    getSingle<AboutContent>('about'),
    getSection<SkillGroup[]>('skills'),
    getSection<Service[]>('services'),
    getSection<Project[]>('projects'),
    getSection<JourneyRow[]>('journey'),
    getSingle<CertificationContent>('certification'),
    getSingle<SiteContent>('site'),
    getSingle<HeadingsContent>('headings'),
  ])

  return (
    <>
      <Navbar />
      <main>
        <Hero hero={hero} site={site} />
        <About about={about} headings={headings} />
        <Skills groups={skills} headings={headings} />
        <Services services={services} headings={headings} />
        <Projects projects={projects} headings={headings} />
        <Journey events={toJourneyEvents(journey)} headings={headings} />
        <Achievements cert={cert} headings={headings} />
        <Contact site={site} headings={headings} />
      </main>
      <Footer site={site} />
      <ScrollReveal />
    </>
  )
}
