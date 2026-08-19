import type { CSSProperties } from 'react'

type Variant = 'star' | 'spiral' | 'laptop' | 'squiggle' | 'ring' | 'loop'

type DoodleProps = {
  variant: Variant
  style?: CSSProperties
  /** gentle up/down float */
  float?: boolean
  /** slow rotation */
  spin?: boolean
}

/** Hand-drawn decorative doodles scattered in the section backgrounds. */
export default function Doodle({ variant, style, float, spin }: DoodleProps) {
  const anim = spin ? ' deco-swirl' : float ? ' deco-float' : ''
  const cls = `deco${anim}`

  switch (variant) {
    case 'star':
      return (
        <svg className={cls} style={style} viewBox="0 0 24 24" aria-hidden="true">
          <path className="deco-star" d="M12 0l2.4 8.5L23 12l-8.6 3.5L12 24l-2.4-8.5L1 12l8.6-3.5z" />
        </svg>
      )
    case 'spiral':
      return (
        <svg className={cls} style={style} viewBox="0 0 100 100" aria-hidden="true">
          <path
            className="deco-ring"
            strokeWidth="2.4"
            strokeLinecap="round"
            d="M50 50 C 50 44 58 44 58 50 C 58 60 44 60 44 50 C 44 36 64 36 64 50 C 64 70 36 70 36 50 C 36 28 74 28 74 50 C 74 78 24 78 24 50"
          />
        </svg>
      )
    case 'ring':
      return (
        <svg className={cls} style={style} viewBox="0 0 100 100" aria-hidden="true">
          <circle className="deco-ring" cx="50" cy="50" r="46" strokeWidth="2" />
        </svg>
      )
    case 'squiggle':
      return (
        <svg className={cls} style={style} viewBox="0 0 120 40" aria-hidden="true">
          <path
            className="deco-scribble"
            strokeWidth="2.4"
            strokeLinecap="round"
            d="M2 22 q 14 -22 28 0 t 28 0 t 28 0 t 28 0"
          />
        </svg>
      )
    case 'loop':
      return (
        <svg className={cls} style={style} viewBox="0 0 120 50" aria-hidden="true">
          <path
            className="deco-scribble"
            strokeWidth="2.4"
            strokeLinecap="round"
            d="M4 34 C 4 8 34 8 34 30 C 34 46 14 46 18 28 C 23 6 56 6 62 32 C 66 50 96 48 116 16"
          />
        </svg>
      )
    case 'laptop':
      return (
        <svg className={cls} style={style} viewBox="0 0 68 50" aria-hidden="true">
          <g className="deco-ring" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="13" y="5" width="42" height="28" rx="3" />
            <path d="M4 43 L13 33 H55 L64 43 Z" />
            <path d="M28 39 H40" />
          </g>
        </svg>
      )
    default:
      return null
  }
}
