"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Logo } from '@/components/Logo'
import { useEffect, useState } from 'react'
import { getFirebaseAnalytics } from '@/lib/firebase'

export default function LoginPage() {
  const [signIn, setSignIn] = useState<null | ((provider?: string, options?: any) => Promise<any>)>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    getFirebaseAnalytics()
    import('next-auth/react').then((m) => setSignIn(() => m.signIn as any)).catch(() => setSignIn(null))
  }, [])

  const handleGoogleSignIn = async () => {
    if (!signIn) return
    setIsLoading(true)
    try {
      const result = await signIn('google', { callbackUrl: '/' })
      console.log('Google sign-in result:', result)
    } catch (error) {
      console.error('Google sign-in error:', error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg)] p-4">
      <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{duration:0.4}} className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
        <div className="flex flex-col items-center text-center">
          <Logo size={96} />
          <h1 className="mt-4 text-2xl font-display font-extrabold tracking-tight">Welcome back</h1>
          <p className="text-gray-600 mt-1">Sign in to continue</p>
        </div>

        <div className="mt-8 grid gap-3">
          <button
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-3 font-medium transition-colors"
            onClick={handleGoogleSignIn}
            disabled={!signIn || isLoading}
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600"></div>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            )}
            {isLoading ? 'Signing in...' : 'Continue with Google'}
          </button>
          
          {!signIn && (
            <p className="text-sm text-red-600 text-center">
              Authentication service is loading. Please wait...
            </p>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link className="text-indigo-600 hover:underline font-medium" href="/register">Create one</Link>
        </p>
      </motion.div>
    </div>
  )
}
