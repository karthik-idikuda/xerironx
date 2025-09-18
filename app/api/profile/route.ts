import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import { getProfile, upsertProfile } from '@/lib/profileStore'

export async function GET() {
  const session: any = await getServerSession(authOptions as any)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const profile = getProfile(session.user.email) || {
    email: session.user.email,
    displayName: session.user.name,
    avatarUrl: (session.user as any).image,
    bio: '',
    theme: 'system'
  }
  return NextResponse.json(profile)
}

export async function PUT(req: Request) {
  const session: any = await getServerSession(authOptions as any)
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const body = await req.json().catch(() => ({}))
  const profile = upsertProfile(session.user.email, body)
  return NextResponse.json(profile)
}

export { GET as POST }
