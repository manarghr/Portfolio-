import Doodle from '@/components/Doodle'

export default function About() {
  return (
    <section className="section about-section" id="about">
      {/* decorative doodles */}
      <Doodle variant="squiggle" style={{ top: '12%', right: '9%', width: 88 }} />
      <Doodle variant="laptop" float style={{ top: '44%', left: '9%', width: 80 }} />

      <div className="section-inner">
        <p className="section-eyebrow">About me</p>
        <h1 className="section-heading">The person behind the code</h1>

        {/* plain container to write in, with a small post-it on the top-left */}
        <div className="about-block">
          <aside className="about-postit">
            <span className="postit-tape" />
            <p>📍 Algeria 🇩🇿</p>
            <p>🗣️ EN · FR · AR</p>
          </aside>

          <div className="about-block-body">
            <p>I&apos;m Manar, a recent Computer Science graduate specialized in Artificial Intelligence and Software Development. Throughout my academic journey, I developed a strong interest in both AI and web technologies, enjoying the process of turning ideas into practical and user-friendly solutions.</p>
            <p>Beyond academics, I actively contribute to the student tech community as the Web Development Lead at NCS Club. In this role, I collaborate with talented students to develop websites for events and initiatives while helping organize activities that bring technology enthusiasts together. These experiences have strengthened my technical, leadership, and teamwork skills.</p>
            <p>As I prepare to pursue a Master&apos;s degree, I remain eager to learn, take on new challenges, and contribute to projects that create meaningful impact through technology.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
