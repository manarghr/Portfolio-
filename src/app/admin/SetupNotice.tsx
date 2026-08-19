/** Shown in place of data until the Supabase env vars are filled in. */
export default function SetupNotice() {
  return (
    <div className="adm-notice">
      <h2>Supabase is not connected yet</h2>
      <p>
        The dashboard is ready, but it has nowhere to read messages from. Three steps and it
        comes alive:
      </p>
      <ol>
        <li>
          Create a project at <code>supabase.com</code>
        </li>
        <li>
          Run <code>supabase/schema.sql</code> from this repo in the Supabase SQL editor
        </li>
        <li>
          Copy <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>SUPABASE_SERVICE_ROLE_KEY</code>{' '}
          from Project settings → API into <code>.env.local</code>, then restart the dev server
        </li>
      </ol>
    </div>
  )
}
