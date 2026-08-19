'use client'

import { useEffect, useState } from 'react'

export default function Typewriter({
  text,
  speed = 150,
}: {
  text: string
  speed?: number
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count >= text.length) return
    const t = setTimeout(() => setCount(c => c + 1), speed)
    return () => clearTimeout(t)
  }, [count, text, speed])

  return (
    <>
      {text.slice(0, count)}
      <span className="type-cursor" aria-hidden="true">|</span>
    </>
  )
}
