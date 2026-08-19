/**
 * Section content stored as one JSON blob per section in `site_content`.
 *
 * One table instead of a table per section: the shapes here are small and are
 * always read and written whole, so rows per project would buy nothing but joins.
 *
 * Every read falls back to the defaults compiled into the app, so an empty table,
 * a paused Supabase project, or a network blip all degrade to the site as it
 * ships rather than to a blank page.
 */

import {
  defaultAbout,
  defaultCertification,
  defaultHero,
  defaultJourney,
  defaultProjects,
  defaultSkills,
  type AboutContent,
  type CertificationContent,
  type HeroContent,
  type JourneyRow,
  type Project,
  type SkillGroup,
} from '@/content/defaults'

export type SectionKey =
  | 'hero'
  | 'about'
  | 'skills'
  | 'projects'
  | 'journey'
  | 'certification'

const fallbacks: Record<SectionKey, unknown> = {
  hero: [defaultHero],
  about: [defaultAbout],
  skills: defaultSkills,
  projects: defaultProjects,
  journey: defaultJourney,
  certification: [defaultCertification],
}

function config(): { url: string; key: string } | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return null
  return { url: url.replace(/\/+$/, ''), key }
}

async function read<T>(section: SectionKey, fresh: boolean): Promise<T> {
  const fallback = fallbacks[section] as T
  const cfg = config()
  if (!cfg) return fallback

  try {
    const res = await fetch(
      `${cfg.url}/rest/v1/site_content?key=eq.${section}&select=data`,
      {
        headers: { apikey: cfg.key, Authorization: `Bearer ${cfg.key}` },
        ...(fresh
          ? { cache: 'no-store' as const }
          : { cache: 'force-cache' as const, next: { tags: [`content:${section}`] } }),
      }
    )
    if (!res.ok) return fallback

    const rows = (await res.json()) as { data: T }[]
    const stored = rows[0]?.data
    if (stored === undefined || stored === null) return fallback
    if (Array.isArray(stored) && stored.length === 0) return fallback
    return stored
  } catch {
    return fallback
  }
}

/** Public-site read: cached, refreshed by revalidateTag() when the section is saved. */
export function getSection<T>(section: SectionKey): Promise<T> {
  return read<T>(section, false)
}

/** Dashboard read: always fresh, never the cached copy the site uses. */
export function getSectionLive<T>(section: SectionKey): Promise<T> {
  return read<T>(section, true)
}

/** Sections that hold a single record are stored as a one-item list, so the editor stays uniform. */
export async function getSingle<T>(section: SectionKey): Promise<T> {
  const rows = await getSection<T[]>(section)
  return rows[0] ?? ((fallbacks[section] as T[])[0] as T)
}

export async function saveSection(section: SectionKey, data: unknown): Promise<void> {
  const cfg = config()
  if (!cfg) throw new Error('Supabase is not configured')

  const res = await fetch(`${cfg.url}/rest/v1/site_content`, {
    method: 'POST',
    headers: {
      apikey: cfg.key,
      Authorization: `Bearer ${cfg.key}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify({ key: section, data, updated_at: new Date().toISOString() }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Saving ${section} failed (${res.status}): ${detail.slice(0, 200)}`)
  }
}

/* ── Journey ─────────────────────────────────────────────────
   The editor works in flat strings; the timeline wants tuples and numbers. */

export type JourneyEvent = {
  id: string
  kind: 'edu' | 'work' | 'club'
  title: string
  place: string
  from: [number, number]
  to: [number, number]
  ongoing?: boolean
  cap?: string
  row?: number
  note: string
}

function num(value: string, fallback: number): number {
  const n = Number(value)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

export function toJourneyEvents(rows: JourneyRow[]): JourneyEvent[] {
  return rows
    .filter(r => r.title?.trim())
    .map((r, i) => ({
      id: r.id?.trim() || `event-${i}`,
      kind: (['edu', 'work', 'club'].includes(r.kind) ? r.kind : 'edu') as JourneyEvent['kind'],
      title: r.title,
      place: r.place,
      from: [num(r.fromYear, 2023), Math.min(12, num(r.fromMonth, 1))] as [number, number],
      to: [num(r.toYear, 2026), Math.min(12, num(r.toMonth, 12))] as [number, number],
      ongoing: r.ongoing === 'yes',
      cap: r.cap?.trim() || undefined,
      row: Number(r.row) || 0,
      note: r.note,
    }))
}

export type {
  AboutContent,
  CertificationContent,
  HeroContent,
  JourneyRow,
  Project,
  SkillGroup,
}
