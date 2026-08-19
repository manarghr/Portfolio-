-- Run this once in the Supabase SQL editor.

create table if not exists public.messages (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  email      text not null,
  subject    text,
  body       text not null,
  created_at timestamptz not null default now(),
  read_at    timestamptz,
  archived   boolean not null default false
);

-- newest first, and the unread lookup the dashboard does on every load
create index if not exists messages_created_at_idx on public.messages (created_at desc);
create index if not exists messages_open_idx on public.messages (archived, read_at);

-- Lock the table down completely.
--
-- With RLS on and no policies, the anon and authenticated keys can do NOTHING here.
-- That is deliberate: the contact form writes through a Next.js server action using
-- the service-role key, which bypasses RLS and never reaches the browser. So there
-- is no public key anywhere that can read your messages.
alter table public.messages enable row level security;

-- ── Site content ──────────────────────────────────────────────
-- One JSON blob per editable section. The dashboard writes it, the public
-- pages read it, and both go through the server, so RLS stays fully closed.
create table if not exists public.site_content (
  key        text primary key,
  data       jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
