import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

type Params = Promise<{ filename: string }>

export async function GET(_req: NextRequest, { params }: { params: Params }) {
  const { filename } = await params
  const safe = path.basename(filename)
  const dataDir = process.env.DATA_DIR ?? path.join(process.cwd(), 'data')
  const filePath = path.join(dataDir, 'uploads', safe)

  if (!fs.existsSync(filePath)) {
    return new NextResponse('Not found', { status: 404 })
  }

  const buffer = fs.readFileSync(filePath)
  const ext = path.extname(safe).toLowerCase()
  const contentType =
    ext === '.png' ? 'image/png'
    : ext === '.gif' ? 'image/gif'
    : ext === '.webp' ? 'image/webp'
    : 'image/jpeg'

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  })
}
