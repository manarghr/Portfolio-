'use server'

import { insertMessage, supabaseIsConfigured } from '@/lib/supabase'

export type ContactState = { ok: true } | { ok: false; error: string } | null

const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: a real person never sees this field, so anything in it is a bot.
  // Report success so the bot has no signal to retry against.
  if (String(formData.get('company') ?? '').trim()) return { ok: true }

  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const subject = String(formData.get('subject') ?? '').trim()
  const body = String(formData.get('message') ?? '').trim()

  if (!name || !email || !body) {
    return { ok: false, error: 'Please fill in your name, email and message.' }
  }
  if (!EMAIL.test(email)) {
    return { ok: false, error: 'That email address does not look right.' }
  }
  if (name.length > 120 || subject.length > 200 || body.length > 5000) {
    return { ok: false, error: 'That is longer than the form accepts.' }
  }
  if (!supabaseIsConfigured()) {
    return {
      ok: false,
      error: 'The form is not connected yet. Please email me directly for now.',
    }
  }

  try {
    await insertMessage({ name, email, subject: subject || null, body })
    return { ok: true }
  } catch {
    return { ok: false, error: 'Something went wrong sending that. Please email me directly.' }
  }
}
