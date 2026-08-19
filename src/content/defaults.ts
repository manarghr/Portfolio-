/**
 * What the site shows before anything has been saved in the dashboard, and what
 * it falls back to if Supabase is unreachable. Editing here still works — the
 * database simply takes priority once a section has been saved.
 */

export type Project = {
  name: string
  color: 'y' | 'b' | 'p'
  desc: string
  live: string
  code: string
  image: string
}

export const defaultProjects: Project[] = [
  {
    name: 'Elevate 2.0 Website',
    color: 'y',
    desc: 'Full event website for a design hackathon with registration, schedule, sponsors & FAQ.',
    live: 'https://elevate2-wuj3.vercel.app',
    code: '#',
    image: '/elevate2.png',
  },
  {
    name: 'Elevate 2.0 UI/UX',
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
    name: 'Nexus Website',
    color: 'p',
    desc: 'Short note about the project and the tech behind it.',
    live: '#',
    code: '#',
    image: '/project-6.png',
  },
]

/* ── Skills ─────────────────────────────────────────────────── */
export type SkillGroup = { label: string; skills: string }

export const defaultSkills: SkillGroup[] = [
  { label: 'Frontend', skills: 'HTML & CSS, JavaScript, React, Next.js, TypeScript, Tailwind' },
  { label: 'Backend & Databases', skills: 'Node.js, Python, FastAPI, SQL, REST APIs, MongoDB, Supabase' },
  { label: 'AI', skills: 'Machine Learning, Deep Learning, Computer Vision, Python Libraries' },
  { label: 'Design', skills: 'Figma, UI / UX' },
]

/* ── Journey ────────────────────────────────────────────────── */
/** Stored flat so the generic editor can handle it; mapped to the timeline shape on read. */
export type JourneyRow = {
  id: string
  kind: string
  title: string
  place: string
  fromYear: string
  fromMonth: string
  toYear: string
  toMonth: string
  ongoing: string
  cap: string
  row: string
  note: string
}

export const defaultJourney: JourneyRow[] = [
  {
    id: 'bac', kind: 'edu', title: 'Baccalauréat Sciences', place: 'High School',
    fromYear: '2023', fromMonth: '6', toYear: '2023', toMonth: '6',
    ongoing: 'no', cap: '', row: '0',
    note: 'Finished high school and went straight into Computer Science.',
  },
  {
    id: 'bsc', kind: 'edu', title: 'B.Sc. Computer Science', place: 'Numidia Institute of Technology (NiT)',
    fromYear: '2023', fromMonth: '9', toYear: '2026', toMonth: '7',
    ongoing: 'no', cap: '🎓', row: '1',
    note: 'Graduated with a bachelor degree in Autonomous Systems and Ambient/Mobile Software (AI). July 2026.',
  },
  {
    id: 'djezzy', kind: 'work', title: 'AI Intern', place: 'Djezzy',
    fromYear: '2025', fromMonth: '7', toYear: '2025', toMonth: '8',
    ongoing: 'no', cap: '', row: '0',
    note: 'Built a machine learning pipeline that predicts which customers are about to leave, from cleaning the raw data to training, testing and comparing the models.',
  },
  {
    id: 'socgen', kind: 'work', title: 'AI Intern', place: 'Société Générale',
    fromYear: '2026', fromMonth: '5', toYear: '2026', toMonth: '5',
    ongoing: 'no', cap: '', row: '0',
    note: 'Helped build a tool that spots forged ID cards, passports and payroll slips. It reads each document, checks them against each other and gives a fraud score you can actually explain, all running offline so no data ever leaves the bank.',
  },
  {
    id: 'member', kind: 'club', title: 'Member', place: 'NCS Club',
    fromYear: '2024', fromMonth: '2', toYear: '2024', toMonth: '9',
    ongoing: 'no', cap: '', row: '0',
    note: 'Took part in several of the club tech events and hackathons.',
  },
  {
    id: 'organizer', kind: 'club', title: 'Organizer', place: 'NCS Club',
    fromYear: '2024', fromMonth: '10', toYear: '2025', toMonth: '9',
    ongoing: 'no', cap: '', row: '0',
    note: 'Worked in the dev and media departments, building event websites and organizing tech events together with the rest of the team.',
  },
  {
    id: 'weblead', kind: 'club', title: 'Web Dev Lead', place: 'NCS Club',
    fromYear: '2025', fromMonth: '10', toYear: '2026', toMonth: '8',
    ongoing: 'no', cap: '', row: '0',
    note: 'Led the web team that built and shipped the club event websites, while still organizing tech events with the rest of the team.',
  },
]

/* ── Single-value sections ──────────────────────────────────── */
export type HeroContent = {
  greeting: string
  headline: string
  headlineAccent: string
  lead: string
  badge: string
  photo: string
}

export const defaultHero: HeroContent = {
  greeting: "Hey, I'm Manar!",
  headline: 'AI Enthusiast',
  headlineAccent: 'Web Developer',
  lead: 'Recent Computer Science graduate specialized in Artificial Intelligence and Software Development. Passionate about building modern web solutions and continuously growing my skills.',
  badge: 'Open to Remote Work',
  photo: '/profile.jpg',
}

export type AboutContent = { location: string; languages: string; body: string }

export const defaultAbout: AboutContent = {
  location: '📍 Algeria 🇩🇿',
  languages: '🗣️ EN · FR · AR',
  body: [
    "I'm Manar, a recent Computer Science graduate specialized in Artificial Intelligence and Software Development. Throughout my academic journey, I developed a strong interest in both AI and web technologies, enjoying the process of turning ideas into practical and user-friendly solutions.",
    'Beyond academics, I actively contribute to the student tech community as the Web Development Lead at NCS Club. In this role, I collaborate with talented students to develop websites for events and initiatives while helping organize activities that bring technology enthusiasts together. These experiences have strengthened my technical, leadership, and teamwork skills.',
    "As I prepare to pursue a Master's degree, I remain eager to learn, take on new challenges, and contribute to projects that create meaningful impact through technology.",
  ].join('\n\n'),
}

export type CertificationContent = {
  title: string
  issuer: string
  year: string
  image: string
  note: string
}

export const defaultCertification: CertificationContent = {
  title: "Bachelor's Degree in Computer Science",
  issuer: 'Numidia Institute of Technology (NiT)',
  year: '2026',
  image: '/degree-nit.jpg',
  note: 'Speciality: Autonomous Systems and Ambient and Mobile Software (AI). Click the certificate to open it full size.',
}
