import { NextResponse } from 'next/server'

export const runtime = 'edge'

export async function GET() {
  const rawId = process.env.GOOGLE_CLIENT_ID || ''
  const rawSecret = process.env.GOOGLE_CLIENT_SECRET || ''
  const trimmedId = rawId.trim()
  const trimmedSecret = rawSecret.trim()

  return NextResponse.json({
    ok: true,
    clientId: {
      length: rawId.length,
      trimmedLength: trimmedId.length,
      startsWith: trimmedId.slice(0, 12),
      endsWith: trimmedId.slice(-12),
      hasTrailingWhitespace: /\s$/.test(rawId),
      hasLeadingWhitespace: /^\s/.test(rawId),
      encoded: encodeURIComponent(rawId),
    },
    clientSecret: {
      length: rawSecret.length,
      trimmedLength: trimmedSecret.length,
      startsWith: trimmedSecret.slice(0, 6),
      endsWith: trimmedSecret.slice(-6),
      hasTrailingWhitespace: /\s$/.test(rawSecret),
      hasLeadingWhitespace: /^\s/.test(rawSecret),
    },
    hint: 'If hasTrailingWhitespace is true or encoded ends with %0A, edit prod env var in Vercel UI to remove newline.'
  })
}
