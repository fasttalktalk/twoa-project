'use server'

import { createSession, deleteSession } from '@/lib/session'
import { redirect } from 'next/navigation'

export async function login(
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const password = formData.get('password') as string

  if (password !== process.env.ADMIN_PASSWORD) {
    return { error: 'รหัสผ่านไม่ถูกต้อง' }
  }

  await createSession()
  redirect('/admin')
}

export async function logout() {
  await deleteSession()
  redirect('/admin/login')
}
