import type { Metadata } from 'next'
import { Space_Grotesk, Inter, Caveat } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hand',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Manar Gherib | Web Developer, Next.js sites & platforms',
  description: 'Freelance web developer building fast, responsive sites and platforms with Next.js: event pages, landing pages and web apps. Remote, working with clients in Algeria and abroad.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  )
}
