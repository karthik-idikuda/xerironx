"use client"

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, useInView } from 'framer-motion'
import { Logo } from '@/components/Logo'
import { ArrowLeft, FileText, Calendar, User, Shield } from 'lucide-react'

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

export default function TermsPage() {
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
              Terms & Conditions
            </motion.h1>
            
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 30 }}
            >
              Our commitment to transparency and your rights when using Xerironx Studio
            </motion.p>

            <motion.div 
              className="flex items-center justify-center gap-4 mt-6 text-sm text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 30 }}
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Last updated: December 2024</span>
              </div>
            </motion.div>
          </FadeIn>

          {/* Terms Content */}
          <div className="space-y-8">
            <Section title="1. Acceptance of Terms" icon={FileText}>
              <p>
                By accessing and using Xerironx Studio ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p>
                These Terms of Service constitute a binding agreement between you and Xerironx Studio. Your use of the Service indicates your acceptance of these terms.
              </p>
            </Section>

            <Section title="2. Description of Service" icon={Shield}>
              <p>
                Xerironx Studio is an AI-powered creative platform that provides users with access to advanced artificial intelligence tools for content creation, code generation, image processing, and other creative tasks.
              </p>
              <p>
                The Service includes but is not limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>AI-assisted code generation and editing</li>
                <li>Image generation and manipulation tools</li>
                <li>Content creation and optimization features</li>
                <li>Creative collaboration tools</li>
                <li>Premium AI model access</li>
              </ul>
            </Section>

            <Section title="3. User Accounts and Registration" icon={User}>
              <p>
                To access certain features of the Service, you must register for an account. When registering, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
              <p>
                We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.
              </p>
            </Section>

            <Section title="4. Acceptable Use Policy" icon={Shield}>
              <p>
                You agree not to use the Service for any unlawful purposes or in any way that could damage, disable, overburden, or impair the Service. Prohibited activities include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Creating harmful, offensive, or illegal content</li>
                <li>Attempting to gain unauthorized access to systems</li>
                <li>Interfering with other users' experience</li>
                <li>Violating intellectual property rights</li>
                <li>Using the Service for commercial purposes without authorization</li>
                <li>Sharing account credentials with others</li>
              </ul>
            </Section>

            <Section title="5. Intellectual Property Rights" icon={FileText}>
              <p>
                The Service and its original content, features, and functionality are owned by Xerironx Studio and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
              <p>
                Content you create using our Service belongs to you, but you grant us a limited license to host, store, and display such content as necessary to provide the Service.
              </p>
            </Section>

            <Section title="6. Privacy and Data Protection" icon={Shield}>
              <p>
                Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your information when you use the Service. By using the Service, you agree to the collection and use of information in accordance with our Privacy Policy.
              </p>
              <p>
                We implement appropriate security measures to protect your personal information and maintain data confidentiality.
              </p>
            </Section>

            <Section title="7. Service Availability" icon={FileText}>
              <p>
                We strive to maintain high service availability but cannot guarantee uninterrupted access. The Service may be temporarily unavailable due to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Scheduled maintenance</li>
                <li>Technical difficulties</li>
                <li>Third-party service dependencies</li>
                <li>Force majeure events</li>
              </ul>
              <p>
                We will make reasonable efforts to notify users of planned maintenance in advance.
              </p>
            </Section>

            <Section title="8. Limitation of Liability" icon={Shield}>
              <p>
                To the maximum extent permitted by law, Xerironx Studio shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
              <p>
                Our total liability to you for all claims arising from your use of the Service shall not exceed the amount you paid us in the twelve months preceding the claim.
              </p>
            </Section>

            <Section title="9. Changes to Terms" icon={FileText}>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of significant changes via email or through the Service. Your continued use of the Service after such modifications constitutes acceptance of the new Terms.
              </p>
              <p>
                We encourage you to review these Terms periodically for any changes.
              </p>
            </Section>

            <Section title="10. Contact Information" icon={User}>
              <p>
                If you have any questions about these Terms & Conditions, please contact us:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email: idikudakarthik55@gmail.com</li>
                <li>Website: https://xerironx.vercel.app</li>
                <li>Developer: Karthik</li>
              </ul>
            </Section>
          </div>

          {/* Footer */}
          <FadeIn className="text-center mt-16 pt-8 border-t border-border/50">
            <p className="text-muted-foreground mb-4">
              These terms are effective as of December 2024.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link 
                href="/privacy" 
                className="text-primary hover:text-primary/80 transition-colors"
              >
                Privacy Policy
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