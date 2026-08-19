'use client'
import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal')

    // Fallback: if IntersectionObserver is missing, just show everything.
    if (!('IntersectionObserver' in window)) {
      els.forEach(el => el.classList.add('visible'))
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' }
    )
    els.forEach(el => observer.observe(el))

    // Section doodles: only the section crossing the middle of the viewport
    // shows its doodles, so they read as drawn on the fixed paper behind it.
    const sections = document.querySelectorAll<HTMLElement>('main section')
    const decoObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          entry.target.classList.toggle('deco-active', entry.isIntersecting)
        })
      },
      { threshold: 0, rootMargin: '-35% 0px -35% 0px' }
    )
    sections.forEach(s => decoObserver.observe(s))

    // Safety net: reveal anything still hidden after 3s (e.g. tall elements).
    const timer = window.setTimeout(() => {
      els.forEach(el => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight) el.classList.add('visible')
      })
    }, 3000)

    return () => {
      observer.disconnect()
      decoObserver.disconnect()
      window.clearTimeout(timer)
    }
  }, [])

  return null
}
