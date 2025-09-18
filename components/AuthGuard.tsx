"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [sessionData, setSessionData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [authLibLoaded, setAuthLibLoaded] = useState(false)

  useEffect(() => {
    let mounted = true
    import('next-auth/react')
      .then(m => {
        if (!mounted) return
        setAuthLibLoaded(true)
        const { getSession } = m as any
        getSession().then((sess: any) => {
          if (mounted) {
            setSessionData(sess)
            setLoading(false)
          }
        })
      })
      .catch(() => { setLoading(false) })
    return () => { mounted = false }
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--bg)]">
        <div className="text-center">
          <div className="h-8 w-8 rounded-full border-4 border-gray-300 border-t-gray-700 animate-spin mx-auto" />
          <p className="mt-4 text-sm text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!sessionData?.user) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <motion.div initial={{opacity:0, y:12}} animate={{opacity:1, y:0}} transition={{duration:0.35}} className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 p-6 shadow-xl text-center space-y-4">
          <h1 className="text-xl font-semibold">Sign in required</h1>
            <p className="text-gray-600 text-sm">You must be signed in with Google to access the Studio.</p>
            {authLibLoaded ? (
              <button
                onClick={() => import('next-auth/react').then(m => m.signIn('google', { callbackUrl: '/studio' }))}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 px-4 py-3 text-sm font-medium"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>
            ) : (
              <div className="text-sm text-gray-500">Loading auth...</div>
            )}
            <button onClick={() => location.href='/'} className="w-full text-xs text-gray-500 hover:underline">Go home</button>
        </motion.div>
      </div>
    )
  }

  return <>{children}</>
}
