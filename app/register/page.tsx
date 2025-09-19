"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Logo } from '@/components/Logo'
import { Sparkles } from 'lucide-react'

export default function RegisterPage() {
  const [signIn, setSignIn] = useState<null | ((provider?: string, options?: any) => Promise<any>)>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    import('next-auth/react').then((m) => setSignIn(() => m.signIn as any)).catch(() => setSignIn(null))
  }, [])

  const handleGoogleSignUp = async () => {
    if (!signIn) return
    setIsLoading(true)
    try {
      const result = await signIn('google', { callbackUrl: '/' })
      console.log('Google sign-up result:', result)
    } catch (error) {
      console.error('Google sign-up error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-emerald-100/20 to-cyan-100/20 blur-3xl animate-parallax-float" />
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-indigo-100/15 to-purple-100/15 blur-3xl animate-parallax-float [animation-delay:1s]" />
        <div className="absolute top-20 left-20 w-2 h-2 bg-emerald-400/60 rounded-full animate-gentle-pulse" />
        <div className="absolute top-40 right-32 w-3 h-3 bg-indigo-400/60 rounded-full animate-gentle-pulse [animation-delay:1s]" />
        <div className="absolute bottom-32 left-40 w-2 h-2 bg-purple-400/60 rounded-full animate-gentle-pulse [animation-delay:2s]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div 
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-dramatic p-8"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <Logo size={80} />
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="font-display text-3xl font-bold text-slate-900 mb-2"
            >
              Join the revolution
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-slate-600"
            >
              Create your account and start building amazing things
            </motion.p>
          </div>

          {/* Google OAuth Only */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8"
          >
            <button
              onClick={handleGoogleSignUp}
              disabled={!signIn || isLoading}
              className="w-full group relative flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-slate-200 rounded-xl font-medium text-slate-700 hover:border-slate-300 hover:shadow-elegant transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-600 rounded-full animate-spin" />
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              <span className="group-hover:translate-x-0.5 transition-transform text-lg">
                {isLoading ? 'Creating account...' : 'Continue with Google'}
              </span>
            </button>
          </motion.div>

          {/* Security Badge */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mb-6"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 bg-slate-50/50 rounded-lg py-2 px-4">
              <Sparkles className="w-4 h-4" />
              <span>Secure OAuth 2.0 Authentication</span>
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center space-y-4"
          >
            <p className="text-slate-600">
              Already have an account?{' '}
              <Link href="/login" className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors">
                Sign in
              </Link>
            </p>
          </motion.div>
        </motion.div>

        {/* Back to Home */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-6"
        >
          <Link 
            href="/" 
            className="text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-1"
          >
            ← Back to home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
