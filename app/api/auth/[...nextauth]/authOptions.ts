import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: (process.env.GOOGLE_CLIENT_ID || '').trim(),
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET || '').trim(),
      authorization: {
        params: {
          // Avoid forcing consent every time; keep it smooth
          access_type: 'offline',
          response_type: 'code',
          disable_signup: 'false'
        }
      },
      httpOptions: { timeout: 10000 }
    })
  ],
  // Persist sessions for a long time so refresh doesn't prompt re-login
  session: { strategy: 'jwt', maxAge: 365 * 24 * 60 * 60 },
  jwt: { maxAge: 365 * 24 * 60 * 60 },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 365 * 24 * 60 * 60,
      },
    },
  },
  // Use default NextAuth pages for provider flow to avoid double navigation
  // pages: { signIn: '/login', error: '/login' },
  events: { async signIn() {} },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = (account as any).access_token
        token.picture = (profile as any).picture || token.picture
        token.name = (profile as any).name || token.name
        token.email = (profile as any).email || token.email
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.image = (token as any).picture || session.user.image || undefined
        session.user.name = (token as any).name || session.user.name || undefined
        session.user.email = (token as any).email || session.user.email || undefined
      }
      return session
    },
    async signIn() { return true },
    async redirect({ url, baseUrl }) {
      try {
        // Standard behavior: keep same-origin URLs, default to baseUrl otherwise
        if (url.startsWith(baseUrl)) return url
        if (url.startsWith('/')) return baseUrl + url
      } catch {}
      return baseUrl
    }
  },
  debug: true
}
