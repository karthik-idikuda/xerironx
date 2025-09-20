"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { signIn } from 'next-auth/react'
import { Logo } from '@/components/Logo'
import { Sparkles, ArrowLeft, Shield, Zap, Users } from 'lucide-react'

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

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [usernameError, setUsernameError] = useState('')

  const validateUsername = (name: string): boolean => {
    if (!name.trim()) {
      setUsernameError('Username is required')
      return false
    }
    if (name.trim().length < 2) {
      setUsernameError('Username must be at least 2 characters')
      return false
    }
    if (name.trim().length > 50) {
      setUsernameError('Username must be less than 50 characters')
      return false
    }
    setUsernameError('')
    return true
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsername(value)
    if (usernameError) {
      validateUsername(value)
    }
  }

  const handleGoogleSignUp = async () => {
    console.log('handleGoogleSignUp called')
    console.log('username:', username)
    console.log('username valid:', validateUsername(username))
    
    // Validate username before allowing Google sign-in
    if (!validateUsername(username)) {
      console.error('Username validation failed')
      return
    }
    
    setIsLoading(true)
    try {
      // Store username in localStorage to use after OAuth callback
      localStorage.setItem('pendingUsername', username.trim())
      console.log('Calling signIn with Google provider...')
      const result = await signIn('google', { callbackUrl: '/studio' })
      console.log('Google sign-up result:', result)
    } catch (error) {
      console.error('Google sign-up error:', error)
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
                Join Xerironx Studio
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
                Access premium AI tools and exclusive features
              </motion.p>
            </div>
          </div>

          {/* Username Input Field */}
          <motion.div 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 30,
              delay: 0.5 
            }}
            className="mb-6"
          >
            <label htmlFor="username" className="block text-sm font-medium text-white/90 mb-2">
              Display Name
            </label>
            <motion.input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              onBlur={() => validateUsername(username)}
              placeholder="Enter your display name for the studio"
              className={`w-full px-4 py-3 bg-white/10 backdrop-blur-xl border rounded-xl font-medium text-white placeholder:text-white/50 focus:outline-none focus:ring-2 transition-all duration-300 ${
                usernameError 
                  ? 'border-red-400/50 focus:border-red-400 focus:ring-red-400/20' 
                  : 'border-white/20 focus:border-primary/60 focus:ring-primary/20'
              }`}
              whileFocus={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
            {usernameError && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-2 flex items-center gap-2"
              >
                <span className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center">
                  !
                </span>
                {usernameError}
              </motion.p>
            )}
          </motion.div>

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
              onClick={handleGoogleSignUp}
              disabled={isLoading || !username.trim()}
              whileHover={!(isLoading || !username.trim()) ? { 
                scale: 1.02,
                y: -2
              } : {}}
              whileTap={!(isLoading || !username.trim()) ? { 
                scale: 0.98
              } : {}}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 30 
              }}
              className={`w-full group relative flex items-center justify-center gap-3 px-6 py-4 backdrop-blur-xl border rounded-xl font-medium transition-all duration-300 overflow-hidden ${
                !username.trim()
                  ? 'bg-white/5 border-white/10 text-white/40 cursor-not-allowed opacity-50'
                  : 'bg-white/10 border-white/20 text-white hover:border-primary/60 hover:shadow-2xl hover:shadow-primary/20 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              <span className="relative z-10 group-hover:translate-x-0.5 transition-transform text-lg">
                {isLoading 
                  ? 'Creating account...' 
                  : !username.trim() 
                    ? 'Enter display name to continue'
                    : 'Continue with Google'
                }
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
            <div className="flex items-center justify-center gap-2 text-sm text-white/60 bg-white/5 backdrop-blur border border-white/10 rounded-lg py-2 px-4">
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
            className="text-center space-y-4 relative z-10"
          >
            <p className="text-white/50 text-sm">
              By continuing, you agree to our{' '}
              <Link 
                href="/terms" 
                className="text-primary hover:text-primary/80 font-medium transition-colors underline decoration-primary/30 hover:decoration-primary/60 relative z-10 cursor-pointer"
              >
                Terms & Conditions
              </Link>
              {' '}and{' '}
              <Link 
                href="/privacy" 
                className="text-primary hover:text-primary/80 font-medium transition-colors underline decoration-primary/30 hover:decoration-primary/60 relative z-10 cursor-pointer"
              >
                Privacy Policy
              </Link>
            </p>
            
            <p className="text-white/70">
              Already have an account?{' '}
              <Link 
                href="/login" 
                className="text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center gap-1 group relative z-10 cursor-pointer"
              >
                <span>Sign in</span>
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <ArrowLeft className="w-3 h-3 rotate-180" />
                </motion.div>
              </Link>
            </p>
          </motion.div>
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
            className="text-white/50 hover:text-white transition-all duration-300 inline-flex items-center gap-2 group"
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
