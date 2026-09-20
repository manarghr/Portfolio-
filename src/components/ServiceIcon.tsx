/**
 * Hand-drawn icons for the "What I do" cards.
 *
 * Strokes overshoot their corners and lines wobble slightly, the way a pen does,
 * so these read as sketched in the same hand as the background doodles rather
 * than as a stock icon set. A gold accent mark echoes the stars used elsewhere.
 * Unknown names fall through to whatever the editor typed (an emoji still works).
 */
export type ServiceIconName = 'browser' | 'dashboard' | 'toolbox'

const common = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export default function ServiceIcon({ name }: { name: string }) {
  switch (name) {
    /* browser window being pointed at, with a page sketched inside */
    case 'browser':
      return (
        <svg className="service-sketch" {...common}>
          {/* frame, drawn in one loose pass with the corners overshooting */}
          <path d="M5.8 12.6c9.3-1.2 27.4-1.3 35.6-.3 1 4.1 1.1 19.9.2 24.4-10.1 1.2-26.4 1.1-35.8.2-1-4.3-1-20.4 0-24.3Z" />
          <path d="M6.2 19.4c10.4-.8 27.1-.9 35.1-.3" />
          {/* window buttons, each a slightly different size like a quick pen tap */}
          <path d="M10.2 15.9h.6M14.4 15.8h.5M18.5 15.9h.6" strokeWidth="2.6" />
          {/* page content: heading block, two text lines, a button outline */}
          <path d="M11.4 24.6c3.9-.6 8.2-.7 11.9-.3" strokeWidth="2.6" />
          <path d="M11.3 28.9c5.6-.5 11.4-.6 16.8-.3M11.4 32.5c3.4-.4 7-.5 10.3-.3" />
          <path d="M30.4 23.3c2.8-.3 5.5-.3 7.9-.1.4 1.9.4 3.9 0 5.7-2.6.4-5.4.4-8 .1-.4-1.9-.4-3.9.1-5.7Z" />
          {/* cursor arrow, sitting just off the frame */}
          <path d="m31.2 31.6 9.4 5-4.2 1.1 2 4.1-2.2 1-2.1-4.2-3 3Z" />
          {/* gold spark, same mark as the doodles */}
          <path className="sketch-spark" d="M43.5 7.4v5M41 9.9h5" strokeWidth="1.9" />
        </svg>
      )

    /* app panel: sidebar, rising bars, a trend line and a user row */
    case 'dashboard':
      return (
        <svg className="service-sketch" {...common}>
          <path d="M5.6 9.9c9.8-1.1 27.5-1.1 36.4.1.9 4.8.8 22.3-.1 27-10.5 1.1-26.3.9-36.3.1-1-4.8-1-22.6 0-27.2Z" />
          {/* sidebar with nav items, the divider running a little long */}
          <path d="M16.8 9.4c-.6 9.1-.6 19.1-.1 27.8" />
          <path d="M9.6 17.2c2.6-.4 3.9-.4 5.2-.2M9.5 22.1c2.5-.3 3.8-.3 5.1-.2M9.6 27c2.4-.3 3.7-.3 5-.2" />
          {/* bar chart, bars uneven the way a quick sketch is */}
          <path d="M22.4 32.3c.1-2.7 0-4.6.3-7.2M28.2 32.4c.2-4.4.1-8.3.4-12.4M34 32.4c.2-3.1.1-6 .4-9" strokeWidth="2.6" />
          {/* trend line rising over the bars, with an arrow head */}
          <path d="M21.4 21.4c3.4-1.6 6.1-4 9.3-7.5" />
          <path d="M26.4 13.2c1.8-.4 3.4-.5 4.9-.4.2 1.6.2 3.1-.1 4.6" />
          {/* baseline under the bars */}
          <path d="M20.8 35.5c5.8-.6 11.7-.5 17.1-.2" />
        </svg>
      )

    /* idea being built: bulb with a gear filament, sketched rays around it */
    case 'toolbox':
      return (
        <svg className="service-sketch" {...common}>
          {/* bulb glass, drawn as one uneven loop */}
          <path d="M24.1 7.3c6.2-.2 11.2 4.4 11.4 10.2.1 3.6-1.7 5.9-3.4 8-1.3 1.6-2 3.2-2.2 5.2-3.8.5-7.8.5-11.6 0-.2-2.1-.9-3.6-2.2-5.2-1.8-2.2-3.5-4.5-3.4-8.1.2-5.7 5.2-10.2 11.4-10.1Z" />
          {/* screw base, two loose bands */}
          <path d="M19 33.8c3.4.5 6.8.5 10.2 0M20.3 37.4c2.6.4 5.2.4 7.7.1" />
          <path d="M21.7 40.6c1.7.3 3.4.3 5 .1" />
          {/* gear inside the bulb: the idea, already engineered */}
          <path d="M24 13.9c1 0 1.9.2 2.7.6l1.4-1 .9 1.6-.9 1.3c.5.7.8 1.5.9 2.4l1.6.5-.3 1.8-1.6.2c-.3.8-.8 1.6-1.4 2.1l.5 1.6-1.6.8-1.2-1.2c-.8.2-1.7.2-2.5 0l-1.2 1.2-1.6-.9.5-1.5c-.7-.6-1.2-1.3-1.5-2.2l-1.6-.2-.2-1.8 1.6-.5c.1-.9.4-1.7.9-2.4l-.9-1.4 1-1.5 1.4 1c.8-.4 1.7-.6 2.6-.5Z" />
          <path d="M24.1 18.2c.8 0 1.4.7 1.3 1.5 0 .8-.7 1.4-1.5 1.3-.8 0-1.4-.7-1.3-1.5 0-.7.7-1.3 1.5-1.3" strokeWidth="1.7" />
          {/* rays: the spark of the idea */}
          <path className="sketch-spark" d="M38.9 9.7 41.6 7M42.2 17.8l3.7-.2M34.9 4.4l1.6-3.1" strokeWidth="1.9" />
          <path className="sketch-spark" d="M9.3 9.5 6.6 6.9M5.9 17.7l-3.7-.3M13.3 4.3l-1.5-3.1" strokeWidth="1.9" />
        </svg>
      )

    default:
      return <span className="service-emoji">{name}</span>
  }
}
