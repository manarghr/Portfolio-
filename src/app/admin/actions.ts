'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { SESSION_COOKIE } from '@/lib/admin-auth'
import {
  deleteMessage,
  markMessageRead,
  setMessageArchived,
} from '@/lib/supabase'

export async function logout(): Promise<void> {
  const jar = await cookies()
  jar.delete(SESSION_COOKIE)
  redirect('/admin/login')
}

function refreshAdmin() {
  revalidatePath('/admin')
  revalidatePath('/admin/messages')
}

export async function toggleRead(formData: FormData): Promise<void> {
  const id = String(formData.get('id'))
  const read = String(formData.get('read')) === 'true'
  await markMessageRead(id, read)
  refreshAdmin()
}

export async function toggleArchived(formData: FormData): Promise<void> {
  const id = String(formData.get('id'))
  const archived = String(formData.get('archived')) === 'true'
  await setMessageArchived(id, archived)
  refreshAdmin()
}

export async function removeMessage(formData: FormData): Promise<void> {
  await deleteMessage(String(formData.get('id')))
  refreshAdmin()
}
