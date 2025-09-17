import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const debugInfo = {
    environment: process.env.NODE_ENV,
    hasGoogleClientId: !!process.env.GOOGLE_CLIENT_ID,
    hasGoogleClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
    hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
    hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
    googleClientIdLength: process.env.GOOGLE_CLIENT_ID?.length || 0,
    nextAuthUrl: process.env.NEXTAUTH_URL || 'not-set',
    currentUrl: req.url,
    origin: new URL(req.url).origin
  }

  return NextResponse.json(debugInfo, { status: 200 })
}