import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]/authOptions'
import { upsertProfile } from '@/lib/profileStore'

// Simple placeholder avatar upload.
// Accepts multipart/form-data with a single 'file' field or JSON { url }
// Returns updated profile with a mock stored URL.
export async function POST(req: Request) {
  const session: any = await getServerSession(authOptions as any)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let avatarUrl: string | undefined
  const contentType = req.headers.get('content-type') || ''
  try {
    if (contentType.startsWith('multipart/form-data')) {
      const formData = await req.formData()
      const file = formData.get('file') as File | null
      if (file) {
        // We are not actually storing files yet; create a deterministic object URL style placeholder.
        const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_')
        avatarUrl = `/api/profile/avatar/mock/${Date.now()}-${safeName}`
      }
    } else if (contentType.includes('application/json')) {
      const body = await req.json().catch(() => ({}))
      if (body.url && typeof body.url === 'string') avatarUrl = body.url
    }
  } catch {}

  if (!avatarUrl) {
    // Fallback generic avatar
    avatarUrl = '/user-avatar.svg'
  }

  const updated = upsertProfile(session.user.email, { avatarUrl })
  return NextResponse.json(updated)
}
