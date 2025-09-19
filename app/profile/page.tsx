"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User, Settings, Activity, Shield, Download, RefreshCw } from 'lucide-react'

// Disable static generation for this page
export const dynamic = 'force-dynamic'

export default function ProfilePage() {
  const session = useSession()
  const sessionData = session?.data
  const status = session?.status || 'loading'

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-indigo-100/20 to-purple-100/20 blur-3xl animate-parallax-float" />
        </div>
        
        <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-dramatic p-8 text-center">
          <RefreshCw className="w-8 h-8 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    )
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center p-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-red-100/20 to-orange-100/20 blur-3xl animate-parallax-float" />
        </div>
        
        <div className="relative z-10 bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-dramatic p-8 text-center">
          <User className="w-16 h-16 text-slate-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Sign In Required</h2>
          <p className="text-slate-600 mb-6">Please sign in to view your profile.</p>
          <Link 
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-professional text-white rounded-xl font-semibold hover:shadow-elegant transition-all duration-300 hover:scale-[1.02]"
          >
            Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden p-4 sm:p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-indigo-100/10 to-purple-100/10 blur-3xl animate-parallax-float" />
        <div className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-emerald-100/8 to-cyan-100/8 blur-3xl animate-parallax-float [animation-delay:1s]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors">
            ← Back to Studio
          </Link>
        </div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-dramatic p-8"
        >
          <div className="text-center mb-8">
            <motion.img 
              className="w-20 h-20 rounded-full border-4 border-white shadow-elegant object-cover mx-auto mb-4"
              src={sessionData?.user?.image || '/user-avatar.svg'}
              alt="Profile"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            />
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900">{sessionData?.user?.name || 'Your Name'}</h1>
              <p className="text-slate-600">{sessionData?.user?.email || 'Not signed in'}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-900">Account Security</h3>
                  <p className="text-sm text-green-700">Your account is secured with OAuth authentication</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
