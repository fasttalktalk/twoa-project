import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

function getKey() {
  return new TextEncoder().encode(process.env['SESSION_SECRET'])
}

export async function encrypt(payload: object) {
  return new SignJWT(payload as Record<string, unknown>)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(getKey())
}

export async function decrypt(token: string) {
  try {
    const { payload } = await jwtVerify(token, getKey(), { algorithms: ['HS256'] })
    return payload
  } catch {
    return null
  }
}

export async function createSession() {
  const expires = new Date(Date.now() + 8 * 60 * 60 * 1000)
  const token = await encrypt({ admin: true, expires })
  const cookieStore = await cookies()
  cookieStore.set('admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_session')
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_session')?.value
  if (!token) return null
  return decrypt(token)
}
