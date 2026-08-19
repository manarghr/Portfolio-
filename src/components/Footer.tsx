export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand">
              <span className="grad-text">Manar Gherib</span>
            </div>
            <p className="footer-brand-sub">
              CS graduate building fast, accessible web products end to end.
            </p>
          </div>

          <nav className="footer-nav">
            <div className="footer-nav-col">
              <h4>Site</h4>
              <a href="#about">About</a>
              <a href="#projects">Projects</a>
              <a href="#journey">Journey</a>
              <a href="#contact">Contact</a>
            </div>
            <div className="footer-nav-col">
              <h4>Elsewhere</h4>
              <a href="https://github.com/manarghr" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/manar-gherib-68161b301/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="/resume.pdf" target="_blank">Résumé</a>
            </div>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy"><span className="footer-star">✦</span> © 2025 Manar Gherib. All rights reserved.</p>
          <div className="footer-socials">
            <a href="https://github.com/manarghr" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
              <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/manar-gherib-68161b301/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17">
                <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8h4V24h-4V8Zm7 0h3.8v2.2h.05c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.1c0-1.7-.03-3.9-2.37-3.9-2.38 0-2.74 1.85-2.74 3.77V24h-4V8Z" />
              </svg>
            </a>
            <a href="mailto:gheribmanar2@gmail.com" className="social-btn" aria-label="Email">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
