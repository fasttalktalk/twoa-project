import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const PUBLIC_ADMIN_PATHS = ['/admin/login']

async function verifySession(token: string) {
  try {
    const key = new TextEncoder().encode(process.env.SESSION_SECRET!)
    const { payload } = await jwtVerify(token, key, { algorithms: ['HS256'] })
    return payload
  } catch {
    return null
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!pathname.startsWith('/admin')) return NextResponse.next()
  if (PUBLIC_ADMIN_PATHS.includes(pathname)) return NextResponse.next()

  const token = request.cookies.get('admin_session')?.value
  const session = token ? await verifySession(token) : null

  if (!session) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
