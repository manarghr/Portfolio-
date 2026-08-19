'use client'
import { useEffect, useState } from 'react'

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#journey', label: 'Journey' },
  { href: '#achievements', label: 'Awards' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  // Scroll-spy: underline the link for the section currently in view.
  useEffect(() => {
    const ids = links.map(l => l.href.slice(1)).concat('contact')
    const sections = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <header className="navbar">
        <a href="#hero" className="navbar-logo">MG<span className="logo-dot">.</span></a>

        <nav className="navbar-links">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className={active === l.href.slice(1) ? 'active' : undefined}
            >
              {l.label}
            </a>
          ))}
          <a href="#contact" className="navbar-cta">Contact</a>
        </nav>

        <button
          className="navbar-burger"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-menu${open ? ' open' : ''}`} onClick={() => setOpen(false)}>
        {links.map(l => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
        <a href="#contact" className="navbar-cta">Contact</a>
      </div>
    </>
  )
}
