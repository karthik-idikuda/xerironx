"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { Logo } from '@/components/Logo'
import { ArrowLeft, Shield, Eye, FileText, Calendar, User, Database, Globe, Users, Lock } from 'lucide-react'

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

const Section = ({ title, children, icon: Icon }: {
  title: string
  children: React.ReactNode
  icon: any
}) => (
  <FadeIn className="mb-12">
    <div className="bg-card/30 backdrop-blur-lg border border-border/50 rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <div className="text-muted-foreground leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  </FadeIn>
)

export default function PrivacyPage() {
  const router = useRouter()

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push('/')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-surface/30 relative overflow-hidden">
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
      </div>

      {/* Animated Grid Background - Matching Landing Page */}
      <div className="absolute inset-0 overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-background/20 to-background/70" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <FadeIn className="text-center mb-16">
            <button 
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-all duration-300 group"
            >
              <motion.div
                whileHover={{ x: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <ArrowLeft className="w-4 h-4" />
              </motion.div>
              <span className="font-medium">Back</span>
            </button>

            <div className="flex items-center justify-center mb-6">
              <Logo size={80} />
            </div>
            
            <motion.h1 
              className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 30 }}
            >
              Privacy Policy
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 30 }}
            >
              How we collect, use, and protect your personal information
            </motion.p>

            <motion.div 
              className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 30 }}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Last updated: December 2024</span>
              </div>
            </motion.div>
          </FadeIn>

          {/* Privacy Content */}
          <div className="space-y-8">
            <Section title="1. Information We Collect" icon={Database}>
              <p>
                Xerironx Studio is designed with privacy in mind. We collect minimal information necessary to provide our services.
              </p>
              
              <h4 className="font-semibold text-foreground mt-6 mb-3">Information You Provide:</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Display name for studio identification</li>
                <li>Google OAuth authentication (managed by Google)</li>
                <li>Content you create within the platform</li>
              </ul>

              <h4 className="font-semibold text-foreground mt-6 mb-3">What We Don&apos;t Collect:</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Personal browsing data</li>
                <li>Detailed analytics or tracking</li>
                <li>Location information</li>
                <li>Marketing or advertising data</li>
              </ul>
            </Section>

            <Section title="2. How We Use Your Information" icon={Eye}>
              <p>
                We use your information solely to provide the Xerironx Studio experience. Specifically, we use your information to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Authenticate you securely through Google OAuth</li>
                <li>Display your chosen name in the studio interface</li>
                <li>Save and retrieve your creative projects</li>
                <li>Provide AI-powered creative tools and features</li>
                <li>Ensure platform security and functionality</li>
              </ul>
              <p className="mt-4">
                We do not use your information for marketing, advertising, or any other purposes beyond providing our creative platform.
              </p>
            </Section>

            <Section title="3. Information Sharing and Disclosure" icon={Globe}>
              <p>
                We do not sell, rent, or share your personal information with third parties. Your data stays private.
              </p>
              
              <h4 className="font-semibold text-foreground mt-6 mb-3">Third-Party Services:</h4>
              <p>
                We only use essential services to operate the platform:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Google OAuth for secure authentication</li>
                <li>Vercel for hosting and deployment</li>
                <li>AI model providers for creative features</li>
              </ul>

              <p className="mt-4">
                These services have their own privacy policies and we only share the minimum data required for functionality.
              </p>
            </Section>

            <Section title="4. Data Security" icon={Lock}>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              
              <h4 className="font-semibold text-foreground mt-6 mb-3">Security Measures Include:</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication</li>
                <li>Secure coding practices</li>
                <li>Employee training on data protection</li>
              </ul>

              <p className="mt-4">
                However, no method of transmission over the internet or electronic storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </Section>

            <Section title="5. Data Retention" icon={Database}>
              <p>
                We keep your data only as long as you use Xerironx Studio. When you delete your account, your data is removed.
              </p>
              
              <h4 className="font-semibold text-foreground mt-6 mb-3">What We Store:</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your display name and Google OAuth ID</li>
                <li>Projects and content you create</li>
                <li>Basic session information for functionality</li>
              </ul>

              <p className="mt-4">
                You can delete your account and all associated data at any time by contacting us at idikudakarthik55@gmail.com.
              </p>
            </Section>

            <Section title="6. Your Privacy Rights" icon={Shield}>
              <p>
                You have full control over your data and privacy on Xerironx Studio:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Access:</strong> View all your data through your profile</li>
                <li><strong>Export:</strong> Download your projects and content</li>
                <li><strong>Delete:</strong> Remove your account and all data</li>
                <li><strong>Control:</strong> Manage what information you share</li>
              </ul>

              <p className="mt-4">
                For any privacy concerns or requests, contact me directly at idikudakarthik55@gmail.com. I&apos;ll respond promptly to help you.
              </p>
            </Section>

            <Section title="7. Cookies and Local Storage" icon={Eye}>
              <p>
                Xerironx Studio uses minimal browser storage to function properly:
              </p>
              
              <h4 className="font-semibold text-foreground mt-6 mb-3">What We Store Locally:</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Authentication:</strong> Secure session tokens from Google</li>
                <li><strong>Preferences:</strong> Your theme and interface settings</li>
                <li><strong>Drafts:</strong> Temporary saves of your work in progress</li>
              </ul>

              <p className="mt-4">
                We don&apos;t use tracking cookies, analytics cookies, or advertising cookies. Everything is focused on making your creative experience smooth and secure.
              </p>
            </Section>

            <Section title="8. Third-Party Services" icon={Globe}>
              <p>
                Xerironx Studio integrates with a few essential services to provide the best creative experience:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Google OAuth:</strong> Secure login without storing passwords</li>
                <li><strong>OpenAI/Anthropic:</strong> AI models for creative tools</li>
                <li><strong>Vercel:</strong> Fast and reliable hosting</li>
              </ul>

              <p className="mt-4">
                These are carefully chosen partners focused on security and privacy. We only share the minimum data required for functionality.
              </p>
            </Section>

            <Section title="9. Data Security" icon={Globe}>
              <p>
                Your security is a top priority. Xerironx Studio is built with modern security practices:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>HTTPS encryption for all data transmission</li>
                <li>Secure Google OAuth for authentication</li>
                <li>No plain-text password storage</li>
                <li>Regular security updates and monitoring</li>
              </ul>

              <p className="mt-4">
                I follow industry best practices to keep your creative work and personal information safe.
              </p>
            </Section>

            <Section title="10. Age Requirements" icon={Users}>
              <p>
                Xerironx Studio is designed for users 13 years and older. If you&apos;re under 13, please ask a parent or guardian to create an account.
              </p>
              
              <p>
                This ensures we can provide the best creative experience while respecting privacy laws and keeping everyone safe.
              </p>
            </Section>

            <Section title="11. Updates to This Policy" icon={FileText}>
              <p>
                I may update this Privacy Policy occasionally to reflect new features or clarify existing practices.
              </p>
              
              <p>
                Any significant changes will be communicated through the platform or via email. Your continued use means you&apos;re okay with the updates.
              </p>
            </Section>

            <Section title="12. Contact Me" icon={Users}>
              <p>
                Have questions about privacy or how your data is handled? I&apos;m here to help:
              </p>
              
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email: idikudakarthik55@gmail.com</li>
                <li>Website: https://xerironx.vercel.app</li>
                <li>Developer: Karthik</li>
              </ul>

              <p className="mt-4">
                I&apos;ll get back to you as soon as possible with clear answers about your privacy and data.
              </p>
            </Section>
          </div>

          {/* Footer */}
          <FadeIn className="text-center mt-16 pt-8 border-t border-border/50">
            <p className="text-muted-foreground mb-4">
              This privacy policy is effective as of December 2024.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link 
                href="/terms" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Terms & Conditions
              </Link>
              <Link 
                href="/register" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Create Account
              </Link>
              <Link 
                href="/login" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  )
}