import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
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
  HeroContent,
  JourneyRow,
  Project,
  SkillGroup,
} from '@/content/defaults'

export default async function Home() {
  const [hero, about, skills, projects, journey, cert] = await Promise.all([
    getSingle<HeroContent>('hero'),
    getSingle<AboutContent>('about'),
    getSection<SkillGroup[]>('skills'),
    getSection<Project[]>('projects'),
    getSection<JourneyRow[]>('journey'),
    getSingle<CertificationContent>('certification'),
  ])

  return (
    <>
      <Navbar />
      <main>
        <Hero hero={hero} />
        <About about={about} />
        <Skills groups={skills} />
        <Projects projects={projects} />
        <Journey events={toJourneyEvents(journey)} />
        <Achievements cert={cert} />
        <Contact />
      </main>
      <Footer />
      <ScrollReveal />
    </>
  )
}
