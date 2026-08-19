'use client'
import { useState } from 'react'
import Doodle from '@/components/Doodle'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // Wire to your email service (Resend, Formspree, etc.) when ready
    setSent(true)
  }

  return (
    <section className="section" id="contact">
      {/* decorative doodles */}
      <Doodle variant="squiggle" style={{ top: '14%', left: '9%', width: 90 }} />
      <Doodle variant="ring" style={{ bottom: '16%', right: '9%', width: 60 }} />

      <div className="section-inner" style={{ textAlign: 'center' }}>
        <p className="section-eyebrow">Contact</p>
        <h2 className="section-heading">Let&apos;s build something together</h2>
        <p className="section-sub contact-sub-icy" style={{ margin: '0 auto 0' }}>
          Have a project or role in mind? Drop me a line. I usually respond within 24 h.
        </p>

        <div className="contact-wrap">
          <div className="contact-card reveal">
            {sent ? (
              <div style={{ textAlign: 'center', padding: '24px 0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>✅</div>
                <h3>Message sent!</h3>
                <p className="sub">I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3>Let&apos;s talk</h3>
                <p className="sub">Have a project or role in mind? Drop me a line.</p>

                <div className="form-row">
                  <div className="field">
                    <label>Name</label>
                    <input placeholder="Jane Doe" required />
                  </div>
                  <div className="field">
                    <label>Email</label>
                    <input type="email" placeholder="jane@example.com" required />
                  </div>
                </div>

                <div className="field">
                  <label>Subject</label>
                  <input placeholder="Project inquiry" />
                </div>

                <div className="field">
                  <label>Message</label>
                  <textarea placeholder="Tell me a bit about it..." required />
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  Send message
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* Social links */}
          <div className="contact-socials">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
            <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8h4V24h-4V8Zm7 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.1c0-1.7-.03-3.9-2.37-3.9-2.38 0-2.74 1.85-2.74 3.77V24h-4V8Z" />
              </svg>
            </a>
            <a href="mailto:gheribmanar2@gmail.com" className="social-btn" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
