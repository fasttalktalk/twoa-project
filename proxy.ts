import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'

const PUBLIC_ADMIN_PATHS = ['/admin/login']

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (PUBLIC_ADMIN_PATHS.includes(pathname)) return NextResponse.next()

  const token = request.cookies.get('admin_session')?.value
  const session = token ? await decrypt(token) : null

  if (!session) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
