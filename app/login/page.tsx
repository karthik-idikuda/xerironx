"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { Logo } from '@/components/Logo'
import { Sparkles, ArrowLeft, Shield, LogIn } from 'lucide-react'

// Enhanced FadeIn component matching landing page
const FadeIn = ({ children, delay = 0, className = '' }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ 
        duration: 0.8, 
        delay,
        type: "spring",
        stiffness: 100,
        damping: 20,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function LoginPage() {
  const [signIn, setSignIn] = useState<null | ((provider?: string, options?: any) => Promise<any>)>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    import('next-auth/react').then((m) => setSignIn(() => m.signIn as any)).catch(() => setSignIn(null))
  }, [])

  const handleGoogleSignIn = async () => {
    if (!signIn) return
    setIsLoading(true)
    try {
      const result = await signIn('google', { callbackUrl: '/studio' })
      console.log('Google sign-in result:', result)
    } catch (error) {
      console.error('Google sign-in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-surface/30 relative overflow-hidden flex items-center justify-center p-4">
      {/* Enhanced Background Elements - Matching Landing Page */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Animated Floating Orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, -30, 0],
            y: [0, -20, 20, 0],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "easeInOut",
            type: "tween"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, -40, 40, 0],
            y: [0, 30, -30, 0],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "easeInOut",
            delay: 5,
            type: "tween"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-conic from-primary/10 via-transparent to-accent/10 rounded-full blur-3xl opacity-30"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ 
            rotate: {
              duration: 30, 
              repeat: Infinity, 
              ease: "linear"
            },
            scale: {
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        />
      </div>

      {/* Animated Grid Background - Matching Landing Page */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary Grid Layer */}
        <motion.div 
          className="absolute inset-0 hero-grid-primary"
          animate={{
            backgroundPosition: [
              '0 0, 0 0',
              '60px 60px, 60px 60px',
              '0 0, 0 0'
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Secondary Fine Grid Layer */}
        <motion.div 
          className="absolute inset-0 hero-grid-secondary"
          animate={{
            backgroundPosition: [
              '0 0, 0 0',
              '20px 20px, 20px 20px',
              '40px 40px, 40px 40px',
              '0 0, 0 0'
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Grid Intersection Dots */}
        <motion.div
          className="absolute inset-0 hero-grid-dots"
          animate={{
            backgroundPosition: [
              '0 0, 15px 15px',
              '30px 30px, 45px 45px',
              '60px 60px, 60px 60px',
              '0 0, 15px 15px'
            ]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Radial fade overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/20 to-background/70" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        <motion.div 
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 30,
            delay: 0.1
          }}
          className="bg-card/50 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl p-8 relative overflow-hidden"
        >
          {/* Card Background Effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-primary/5 rounded-3xl" />
          
          {/* Content Container */}
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 30,
                  delay: 0.2 
                }}
                className="mb-6"
              >
                <Logo size={80} />
              </motion.div>
              
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 30,
                  delay: 0.3 
                }}
                className="font-display text-3xl font-bold bg-gradient-to-br from-white via-white/90 to-primary/80 bg-clip-text text-transparent mb-2"
              >
                Welcome back
              </motion.h1>
              
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 30,
                  delay: 0.4 
                }}
                className="text-white/70 text-lg leading-relaxed"
              >
                Sign in to continue your creative journey
              </motion.p>
            </div>

          {/* Google OAuth Button - Enhanced */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 30,
              delay: 0.5 
            }}
            className="mb-8"
          >
            <motion.button
              onClick={handleGoogleSignIn}
              disabled={!signIn || isLoading}
              whileHover={{ 
                scale: 1.02,
                y: -2
              }}
              whileTap={{ 
                scale: 0.98
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 30 
              }}
              className="w-full group relative flex items-center justify-center gap-3 px-6 py-4 bg-card/80 backdrop-blur-lg border border-border/50 rounded-xl font-medium text-foreground hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
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
              <span className="relative z-10 group-hover:translate-x-0.5 transition-transform text-lg">
                {isLoading ? 'Signing in...' : 'Continue with Google'}
              </span>
              
              {/* Button hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </motion.button>
          </motion.div>

          {/* Security Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 30,
              delay: 0.6 
            }}
            className="text-center mb-6"
          >
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-card/30 backdrop-blur border border-border/30 rounded-lg py-2 px-4">
              <Sparkles className="w-4 h-4 text-primary" />
              <span>Secure OAuth 2.0 Authentication</span>
            </div>
          </motion.div>

          {/* Footer Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 30,
              delay: 0.7 
            }}
            className="text-center space-y-4"
          >
            <p className="text-muted-foreground text-sm">
              By continuing, you agree to our{' '}
              <Link 
                href="/terms" 
                className="text-primary hover:text-primary/80 font-medium transition-colors underline decoration-primary/30 hover:decoration-primary/60"
              >
                Terms & Conditions
              </Link>
              {' '}and{' '}
              <Link 
                href="/privacy" 
                className="text-primary hover:text-primary/80 font-medium transition-colors underline decoration-primary/30 hover:decoration-primary/60"
              >
                Privacy Policy
              </Link>
            </p>
            
            <p className="text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link 
                href="/register" 
                className="text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center gap-1 group"
              >
                <span>Create one</span>
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <ArrowLeft className="w-3 h-3 rotate-180" />
                </motion.div>
              </Link>
            </p>
          </motion.div>
          </div>
        </motion.div>

        {/* Back to Home - Enhanced */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 30,
            delay: 0.8 
          }}
          className="text-center mt-6"
        >
          <Link 
            href="/" 
            className="text-muted-foreground hover:text-foreground transition-all duration-300 inline-flex items-center gap-2 group"
          >
            <motion.div
              whileHover={{ x: -4 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
            <span className="font-medium">Back to home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}