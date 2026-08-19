'use client'
import { useEffect, useRef, useState } from 'react'

type CounterProps = {
  /** Number to count up to */
  to: number
  /** Text appended after the number, e.g. "+" */
  suffix?: string
  /** Show this symbol instead of the number once finished (e.g. "✓") */
  symbol?: string
  /** Animation duration in ms */
  duration?: number
}

/** Animated number that counts up the first time it scrolls into view. */
export default function Counter({ to, suffix = '', symbol, duration = 1400 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const [done, setDone] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const run = () => {
      if (started.current) return
      started.current = true
      if (reduce) {
        setValue(to)
        setDone(true)
        return
      }
      let startTime: number | null = null
      const step = (ts: number) => {
        if (startTime === null) startTime = ts
        const p = Math.min((ts - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
        setValue(Math.round(eased * to))
        if (p < 1) requestAnimationFrame(step)
        else setDone(true)
      }
      requestAnimationFrame(step)
    }

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            run()
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [to, duration])

  return (
    <span ref={ref}>
      {symbol && done ? symbol : `${value}${suffix}`}
    </span>
  )
}
