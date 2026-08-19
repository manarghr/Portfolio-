const messages: Record<string, string> = {
  wrong: 'That password is not right.',
  empty: 'Enter your password.',
  unconfigured: 'ADMIN_PASSWORD and ADMIN_SECRET are not set. Add them to .env.local and restart the dev server.',
}

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>
}) {
  const { error, next } = await searchParams

  return (
    <div className="adm-login">
      <div className="adm-login-card">
        <span className="adm-brand-mark">MG</span>
        <h1>Dashboard</h1>
        <p>Sign in to read your messages and manage the site.</p>

        <form method="POST" action="/api/admin/login">
          <input type="hidden" name="next" value={next ?? '/admin'} />

          {error && <p className="adm-error">{messages[error] ?? 'Could not sign you in.'}</p>}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoFocus
            autoComplete="current-password"
          />

          <button
            type="submit"
            className="adm-btn is-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '11px' }}
          >
            Sign in
          </button>
        </form>

        <a className="adm-back" href="/">
          ← Back to the site
        </a>
      </div>
    </div>
  )
}
