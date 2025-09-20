"use client"

import Link from 'next/link'
import { useState, useRef, useEffect, type ReactNode } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Logo } from '@/components/Logo'
import PaymentButton from '@/components/PaymentButton'
import {
  ArrowRight, Sparkles, MessageSquare, Image as ImageIcon,
  Code, Layout, Brain, Users, Zap, Globe, Star, Cpu, Camera,
  Palette, Wand2, Check, Clock, Github, Twitter, Instagram, Globe as GlobeIcon, Rocket, Coffee, Heart, HelpCircle, ChevronDown, Plus, Minus, Eye, FileText, Terminal, Layers, MousePointer, Activity, Zap as Lightning, Linkedin, Mail, Phone, MapPin, ExternalLink, Copy, CheckCircle, Database, Shield, Cloud
} from 'lucide-react'

const FadeIn = ({ children, delay = 0, className = '' }: {
  children: ReactNode
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

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const heroRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const parallaxY1 = useTransform(scrollYProgress, [0, 1], [0, -40])
  const parallaxY2 = useTransform(scrollYProgress, [0, 1], [0, -20])
  const parallaxScale = useTransform(scrollYProgress, [0, 1], [1, 1.02])

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(type)
      setTimeout(() => setCopiedText(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const smoothScrollTo = (targetId: string) => {
    const element = document.getElementById(targetId.replace('#', ''))
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
      })
    }
  }

  // Auto-scroll to hero section on page load
  useEffect(() => {
    // Small delay to ensure page is fully loaded
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen bg-background overflow-hidden">
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[60] bg-primary origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Header */}
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          type: "spring", 
          stiffness: 120, 
          damping: 20,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl border-b border-border/50 shadow-lg"
      >
        <div className="container mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 25,
                duration: 0.4
              }}
            >
              <Link href="/" className="flex items-center gap-4">
                <Logo size={52} />
                <span className="text-2xl font-bold text-text tracking-tight">Xerironx Studio</span>
              </Link>
            </motion.div>

            <nav className="hidden md:flex items-center gap-8">
              {[
                { href: "#features", label: "Features" },
                { href: "#support", label: "Buy Me a Coffee" },
                { href: "#contact", label: "Support" },
                { href: "#faq", label: "FAQ" }
              ].map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.1 * index, 
                    duration: 0.6,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  whileHover={{ 
                    y: -3,
                    scale: 1.05
                  }}
                  whileTap={{ 
                    y: 0,
                    scale: 0.98
                  }}
                >
                  <button 
                    onClick={() => smoothScrollTo(item.href)}
                    className="relative text-text/70 hover:text-text font-medium px-4 py-2 rounded-xl hover:bg-gradient-to-r hover:from-surface/60 hover:to-surface/40 transition-all duration-300 group block"
                  >
                    <span className="relative z-10">{item.label}</span>
                    <motion.div
                      className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full"
                      initial={{ width: 0, x: "-50%" }}
                      whileHover={{ 
                        width: "80%",
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      style={{ x: "-50%" }}
                    />
                  </button>
                </motion.div>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-4">
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400, 
                  damping: 25,
                  duration: 0.3
                }}
              >
                <Link href="/login" className="px-5 py-2.5 text-text/80 hover:text-text transition-all duration-500 font-medium rounded-lg hover:bg-surface/50">
                  Login
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                  boxShadow: "0 20px 25px -5px rgba(var(--primary-rgb), 0.3), 0 10px 10px -5px rgba(var(--primary-rgb), 0.2)" 
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 400,
                  damping: 25,
                  duration: 0.3
                }}
              >
                <Link href="/register" className="px-6 py-2.5 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-500 shadow-lg">
                  Create Account
                </Link>
              </motion.div>
            </div>

            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-3 rounded-lg hover:bg-surface/50 transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              title={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
                <motion.span 
                  className="w-full h-0.5 bg-text origin-center"
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? 8 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span 
                  className="w-full h-0.5 bg-text"
                  animate={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    scale: mobileMenuOpen ? 0.8 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span 
                  className="w-full h-0.5 bg-text origin-center"
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -8 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - Enhanced Animation */}
      {mobileMenuOpen && (
        <motion.nav 
          initial={{ opacity: 0, y: -20, scale: 0.95 }} 
          animate={{ opacity: 1, y: 0, scale: 1 }} 
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ 
            duration: 0.4, 
            type: "spring", 
            stiffness: 300, 
            damping: 25 
          }}
          className="fixed top-[76px] left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-b border-border shadow-lg lg:hidden"
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {[
              { href: "#features", label: "Features" },
              { href: "#support", label: "Buy Me a Coffee" },
              { href: "#contact", label: "Support" },
              { href: "#faq", label: "FAQ" }
            ].map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  delay: 0.1 * index, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                whileHover={{ 
                  x: 8, 
                  scale: 1.02,
                  y: -2
                }}
                whileTap={{ scale: 0.98 }}
              >
                <button 
                  onClick={() => {
                    smoothScrollTo(item.href)
                    setMobileMenuOpen(false)
                  }}
                  className="block py-3 px-4 text-text hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 rounded-xl transition-all duration-300 hover:text-primary font-medium border border-transparent hover:border-primary/20 w-full text-left"
                >
                  {item.label}
                </button>
              </motion.div>
            ))}
            
            <div className="mt-4 pt-4 border-t border-border/50 flex flex-col gap-3">
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  delay: 0.7, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                whileHover={{ 
                  scale: 1.02,
                  x: 4
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/login" className="block px-4 py-3 text-text/80 hover:text-text transition-all duration-400 rounded-lg hover:bg-surface/50">
                  Login
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ 
                  delay: 0.8, 
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
                whileHover={{ 
                  scale: 1.02,
                  y: -2,
                  boxShadow: "0 10px 20px rgba(var(--primary-rgb), 0.3)"
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Link href="/register" className="block px-4 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 text-center transition-all duration-500">
                  Create Account
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.nav>
      )}

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-12 md:pt-28 md:pb-16 overflow-hidden bg-gradient-to-b from-background via-background/95 to-surface/30">
        {/* Background Elements - Enhanced Animation */}
        <div className="absolute inset-0 overflow-hidden">
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
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-primary/10 via-transparent to-accent/10 rounded-full blur-3xl opacity-30"
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

        {/* Visible Grid Background */}
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
          
          {/* Center glow effect */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-radial from-primary/10 via-accent/5 to-transparent"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Free Badge */}
            <FadeIn delay={0.05}>
              <div className="inline-flex items-center gap-3 mb-8 px-4 py-2 rounded-full border border-success/30 bg-success/10 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  <span className="text-sm font-bold text-success">✨ Completely Free</span>
                </div>
                <div className="w-px h-4 bg-success/30" />
                <span className="text-sm text-text/90 font-medium">No credit card • No hidden fees</span>
              </div>
            </FadeIn>

            {/* Main Heading */}
            <FadeIn delay={0.1}>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.9] mb-8 font-display">
                <span className="block text-text/20 text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-2">Xerironx</span>
                <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  AI Studio
                </span>
              </h1>
            </FadeIn>

            {/* Subtitle with Enhanced Typography */}
            <FadeIn delay={0.15}>
              <div className="max-w-4xl mx-auto mb-10">
                <p className="text-2xl md:text-3xl lg:text-4xl text-text/90 font-light leading-relaxed mb-4">
                  Multi-Modal AI Creative Platform
                </p>
                <p className="text-lg md:text-xl text-text/70 font-light leading-relaxed">
                  Generate <span className="font-semibold text-primary">intelligent text</span>, 
                  <span className="font-semibold text-accent mx-1">production-ready code</span>, 
                  <span className="font-semibold text-secondary">stunning images</span>, and 
                  <span className="font-semibold text-success ml-1">complete websites</span> with 
                  <span className="font-bold text-primary"> 8 advanced AI models</span> — all free, forever.
                </p>
              </div>
            </FadeIn>

            {/* Enhanced CTA Buttons with Ultra-Smooth Animations */}
            <FadeIn delay={0.2}>
              <div className="flex flex-col items-center justify-center gap-6 mb-12">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <motion.div
                    whileHover={{ 
                      scale: 1.08,
                      y: -4
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      y: 0
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25,
                      duration: 0.4
                    }}
                  >
                    <Link href="/register" className="group relative overflow-hidden block">
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-size-200 animate-gradient rounded-full opacity-20 blur-lg group-hover:opacity-40"
                        whileHover={{ 
                          scale: 1.2,
                          opacity: 0.6
                        }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="relative inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-white bg-gradient-to-r from-primary to-accent rounded-full hover:shadow-2xl hover:shadow-primary/25 transition-all duration-500">
                        Start Creating Now
                        <motion.div
                          whileHover={{ x: 8 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        >
                          <ArrowRight className="w-6 h-6" />
                        </motion.div>
                      </div>
                    </Link>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      y: -2
                    }}
                    whileTap={{ 
                      scale: 0.95,
                      y: 0
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25,
                      duration: 0.3
                    }}
                  >
                    <Link href="/login" className="group inline-flex items-center gap-3 px-10 py-5 text-xl font-semibold text-text border border-border/50 rounded-full hover:bg-surface/80 backdrop-blur-sm transition-all duration-500 hover:border-primary/30 hover:shadow-lg">
                      Sign In
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100"
                        whileHover={{ 
                          scale: 1.5,
                          opacity: 1
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </FadeIn>

            {/* Advanced Interactive Preview */}
            <FadeIn delay={0.25}>
              <div className="relative max-w-5xl mx-auto mb-8">
                {/* Main Dashboard Preview */}
                <div className="relative rounded-3xl border border-border/30 bg-surface/60 backdrop-blur-xl p-8 md:p-12 shadow-2xl">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/30">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <span className="text-text/60 text-sm font-medium ml-2">AI Studio Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text/50">
                      <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                      <span>Real-time</span>
                    </div>
                  </div>

                  {/* AI Models Grid */}
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-8">
                    {[
                      { icon: MessageSquare, name: "Devstral", status: "active", color: "primary" },
                      { icon: Brain, name: "GPT-OSS", status: "active", color: "accent" },
                      { icon: Globe, name: "Kimi-K2", status: "active", color: "success" },
                      { icon: Code, name: "Qwen3-Coder", status: "processing", color: "secondary" },
                      { icon: Cpu, name: "Nemotron", status: "active", color: "accent" },
                      { icon: Star, name: "Llama-4", status: "ready", color: "primary" }
                    ].map((model, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.1 }}
                        whileHover={{ y: -6, scale: 1.05, rotateX: 5 }}
                        className="relative group"
                      >
                        <div className={`aspect-square rounded-2xl border border-border/30 bg-gradient-to-br from-${model.color}/10 to-${model.color}/5 flex flex-col items-center justify-center p-4 hover:shadow-lg transition-all duration-300`}>
                          <model.icon className={`w-8 h-8 text-${model.color} mb-2`} />
                          <span className="text-xs font-semibold text-text/80">{model.name}</span>
                          <div className={`w-1.5 h-1.5 rounded-full mt-1 ${
                            model.status === 'active' ? 'bg-success' :
                            model.status === 'processing' ? 'bg-warning animate-pulse' :
                            'bg-text/30'
                          }`} />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Stats Bar */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { label: "Active Models", value: "11", icon: Brain },
                      { label: "Avg Response", value: "1.2s", icon: Zap },
                      { label: "Success Rate", value: "99.8%", icon: Star },
                      { label: "Code Generated", value: "2.4k", icon: Users }
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 mb-2">
                          <stat.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-2xl font-bold text-text">{stat.value}</div>
                        <div className="text-sm text-text/60">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div 
                  className="absolute -top-6 -right-6 bg-primary/20 rounded-2xl p-4 backdrop-blur-sm border border-primary/30"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Sparkles className="w-6 h-6 text-primary" />
                </motion.div>

                <motion.div 
                  className="absolute -bottom-4 -left-4 bg-accent/20 rounded-xl p-3 backdrop-blur-sm border border-accent/30"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                >
                  <Cpu className="w-5 h-5 text-accent" />
                </motion.div>
              </div>
            </FadeIn>

            {/* Trust Indicators */}
            <FadeIn delay={0.3}>
              <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-sm text-text/50">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-success" />
                  <span>SOC 2 Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span>99.9% Uptime</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  <span>End-to-End Encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span>GDPR Ready</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Technologies & Capabilities Showcase */}
      <section aria-label="technologies-showcase" className="relative py-6">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-6">
            <p className="text-sm text-text/60">Powered by cutting-edge technologies and AI models</p>
          </FadeIn>
          <div className="overflow-hidden">
            <motion.div className="flex items-center gap-12 whitespace-nowrap" animate={{ x: ['0%', '-50%'] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}>
              {["Devstral Small","GPT-OSS 120B","Kimi K2","Qwen3 Coder","Qwen3 235B","Nemotron Ultra","Llama 3.1 405B","Qwen 2.5 72B","Gemini 2.0 Flash","Llama 4 Maverick","Qwen2.5 VL 72B"].concat(["Devstral Small","GPT-OSS 120B","Kimi K2","Qwen3 Coder","Qwen3 235B","Nemotron Ultra","Llama 3.1 405B","Qwen 2.5 72B","Gemini 2.0 Flash","Llama 4 Maverick","Qwen2.5 VL 72B"]).map((name, i) => (
                <div key={i} className="text-text/50 hover:text-text transition-colors text-lg font-semibold">{name}</div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="relative py-12 md:py-16">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text/80 mb-4">
              <Sparkles className="w-4 h-4" />
              Four Core Capabilities
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-display">Everything you need to create</h2>
            <p className="text-xl text-text/80 max-w-2xl mx-auto">From conversations to code, images to websites — all powered by cutting-edge AI</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: MessageSquare, title: 'AI Chat Studio', description: 'Intelligent conversations with Devstral, GPT-OSS, Qwen, Llama 3.1, and Nemotron models', bgClass: 'bg-primary/15', textClass: 'text-primary' },
              { icon: ImageIcon, title: 'Image Generation', description: 'Create stunning visuals with Gemini 2.0 Flash, Llama-4 Maverick, and Qwen2.5 VL', bgClass: 'bg-accent/15', textClass: 'text-accent' },
              { icon: Code, title: 'Code Generation', description: 'Full-stack development with Qwen3 Coder, live preview, and multi-framework support', bgClass: 'bg-success/15', textClass: 'text-success' },
              { icon: Layout, title: 'Website Builder', description: 'Complete web applications with React, Next.js, Vue, Angular, and deployment ready', bgClass: 'bg-secondary/15', textClass: 'text-secondary' }
            ].map((feature, i) => (
              <FadeIn key={feature.title} delay={0.1 * i}>
                <motion.div whileHover={{ y: -8, scale: 1.02 }} className="relative group">
                  <div className="relative bg-surface rounded-2xl border border-border p-8 shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl mb-6 ${feature.bgClass}`}>
                      <feature.icon className={`w-7 h-7 ${feature.textClass}`} />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-text/80 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive AI Capabilities Gallery */}
      <section className="relative py-12 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text/80 mb-4">
              <Activity className="w-4 h-4 text-accent" />
              Live AI Demonstrations
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-display">See the magic in motion</h2>
            <p className="text-lg text-text/80">Real-time AI model capabilities with interactive previews and live processing</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "Text Generation",
                model: "GPT-OSS 120B",
                capability: "Advanced reasoning & creative writing",
                demo: "Generate a story about AI...",
                response: "In a world where artificial intelligence had become as common as smartphones, Maya discovered something extraordinary...",
                icon: FileText,
                color: "primary",
                metrics: { speed: "1.2s", tokens: "120B", accuracy: "94%" }
              },
              {
                title: "Code Generation", 
                model: "Qwen3 Coder",
                capability: "Full-stack development & debugging",
                demo: "Create React component...",
                response: "const AIButton = ({ onClick, children }) => {\n  return (\n    <button \n      className='bg-primary'\n      onClick={onClick}\n    >\n      {children}\n    </button>\n  );\n};",
                icon: Terminal,
                color: "success",
                metrics: { speed: "0.8s", accuracy: "96%", languages: "40+" }
              },
              {
                title: "Vision Understanding",
                model: "Qwen2.5 VL 72B", 
                capability: "Image analysis & description",
                demo: "Analyzing uploaded image...",
                response: "This image shows a modern workspace with a laptop, coffee cup, and notebook. The lighting suggests it's taken during golden hour...",
                icon: Eye,
                color: "secondary",
                metrics: { speed: "1.5s", accuracy: "92%", formats: "10+" }
              },
              {
                title: "Reasoning Engine",
                model: "Llama 4 Maverick",
                capability: "Complex problem solving",
                demo: "Solve mathematical proof...",
                response: "To prove this theorem, we'll use mathematical induction. First, let's establish the base case...",
                icon: Brain,
                color: "accent",
                metrics: { speed: "2.1s", reasoning: "Advanced", logic: "98%" }
              },
              {
                title: "Language Translation",
                model: "Gemini 2.0 Flash",
                capability: "Multilingual processing",
                demo: "Translate to 50+ languages...",
                response: "English → Spanish: 'Hello, how are you?' → '¡Hola, ¿cómo estás?'\nContext: Informal greeting",
                icon: Globe,
                color: "warning",
                metrics: { speed: "0.6s", languages: "50+", accuracy: "95%" }
              },
              {
                title: "Real-time Chat",
                model: "Devstral Small",
                capability: "Conversational AI assistant",
                demo: "Interactive dialogue...",
                response: "I'm here to help! Whether you need code, creative writing, or problem-solving, just ask me anything.",
                icon: MessageSquare,
                color: "primary",
                metrics: { speed: "0.4s", context: "32K", availability: "24/7" }
              }
            ].map((item, i) => (
              <FadeIn key={i} delay={0.1 * i}>
                <motion.div
                  className="group relative"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Card Container */}
                  <div className="relative bg-surface/80 backdrop-blur-sm rounded-3xl border border-border p-6 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                    {/* Animated Background Gradient */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br from-${item.color}/5 to-${item.color}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                    />

                    {/* Header */}
                    <div className="relative z-10 flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className={`p-3 rounded-xl bg-${item.color}/15`}
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 400 }}
                        >
                          <item.icon className={`w-6 h-6 text-${item.color}`} />
                        </motion.div>
                        <div>
                          <h3 className="font-bold text-text">{item.title}</h3>
                          <p className="text-sm text-text/60">{item.model}</p>
                        </div>
                      </div>
                      <motion.div
                        className="w-3 h-3 rounded-full bg-success"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>

                    {/* Capability Description */}
                    <p className="text-text/80 text-sm mb-4">{item.capability}</p>

                    {/* Interactive Demo */}
                    <div className="space-y-3 mb-4">
                      <div className="relative">
                        <div className="text-xs text-text/60 mb-1">Input:</div>
                        <motion.div
                          className="bg-background/50 rounded-lg p-3 border border-border/50 text-sm font-mono"
                          whileHover={{ borderColor: `var(--color-${item.color})` }}
                        >
                          <motion.span
                            className="text-text/70"
                            animate={{ opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {item.demo}
                          </motion.span>
                          <motion.span
                            className={`text-${item.color} ml-1`}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            |
                          </motion.span>
                        </motion.div>
                      </div>

                      <div className="relative">
                        <div className="text-xs text-text/60 mb-1">AI Response:</div>
                        <motion.div
                          className="bg-background/50 rounded-lg p-3 border border-border/50 text-sm min-h-[80px] relative overflow-hidden"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1, borderColor: `var(--color-${item.color})` }}
                        >
                          <motion.div
                            className="text-text/80 leading-relaxed"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                          >
                            {item.response}
                          </motion.div>
                          
                          {/* Typing Indicator */}
                          <motion.div
                            className="absolute bottom-3 right-3 flex gap-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          >
                            {[0, 1, 2].map((dot) => (
                              <motion.div
                                key={dot}
                                className={`w-1.5 h-1.5 rounded-full bg-${item.color}`}
                                animate={{ scale: [1, 1.5, 1] }}
                                transition={{ 
                                  duration: 1, 
                                  repeat: Infinity, 
                                  delay: dot * 0.2 
                                }}
                              />
                            ))}
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/30">
                      {Object.entries(item.metrics).map(([key, value], idx) => (
                        <motion.div
                          key={key}
                          className="text-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className={`text-lg font-bold text-${item.color}`}>{value}</div>
                          <div className="text-xs text-text/60 capitalize">{key}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                  </div>

                  {/* Floating Action */}
                  <motion.div
                    className={`absolute -bottom-2 -right-2 w-12 h-12 bg-${item.color} rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 cursor-pointer`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <MousePointer className="w-5 h-5 text-white" />
                  </motion.div>
                </motion.div>
              </FadeIn>
            ))}
          </div>


        </div>
      </section>

      {/* Testimonials - Modern Design */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface/20 to-background">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/6 rounded-full blur-3xl animate-pulse" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <FadeIn className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block"
            >
              <span className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-full border border-primary/20 mb-4 inline-block">
                ✨ Testimonials
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 font-display bg-gradient-to-r from-text via-primary to-accent bg-clip-text text-transparent">
              Loved by creators
            </h2>
            <p className="text-xl text-text/80 max-w-2xl mx-auto leading-relaxed">
              Designers, developers, and teams ship faster with Xerironx
            </p>
          </FadeIn>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              { quote: "A game-changer for prototyping.", name: "Sai Sri Ram", role: "Developer", gradient: "from-blue-500/20 to-purple-500/20" },
              { quote: "The animations feel alive!", name: "Siva", role: "Web Developer", gradient: "from-green-500/20 to-teal-500/20" },
              { quote: "We built our MVP in days.", name: "Karthik", role: "UI/UX Designer", gradient: "from-orange-500/20 to-red-500/20" }
            ].map((testimonial, idx) => (
              <FadeIn key={idx} delay={0.2 * idx}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.5, delay: idx * 0.1, type: "spring", stiffness: 200 }}
                  className={`relative group h-full p-8 rounded-3xl bg-gradient-to-br ${testimonial.gradient} backdrop-blur-sm border border-border/50 hover:border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-300`}
                >
                  <div className="absolute -top-4 left-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">"</span>
                    </div>
                  </div>
                  <blockquote className="mb-6 mt-4">
                    <p className="text-text/90 text-xl leading-relaxed font-medium">{testimonial.quote}</p>
                  </blockquote>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full flex items-center justify-center border-2 border-primary/20 shadow-md">
                      <span className="text-primary font-bold text-lg">{testimonial.name.charAt(0)}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-text text-lg">{testimonial.name}</h4>
                      <p className="text-text/60 text-sm font-medium">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Special Thanks */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-background via-surface/30 to-background overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-success/5 rounded-full blur-3xl"
            animate={{ 
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text/80 mb-4">
              <Heart className="w-4 h-4 text-accent animate-pulse" />
              Special Thanks
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-display">
              Powered by Amazing Partners
            </h2>
            <p className="text-xl text-text/80 max-w-3xl mx-auto">
              This project wouldn&apos;t be possible without the incredible support from these amazing platforms and tools
            </p>
          </FadeIn>

          <div className="max-w-7xl mx-auto">
            {/* First Row - Main Partners */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  name: "OpenRouter",
                  description: "Providing free API keys and access to cutting-edge AI models",
                  contribution: "Free AI API Access",
                  icon: Brain,
                  color: "from-blue-500 to-indigo-600",
                  website: "https://openrouter.ai",
                  features: ["11 AI Models", "Free API Access", "High-Performance APIs"]
                },
                {
                  name: "GitHub Copilot",
                  description: "AI-powered coding assistance that helped build this entire project",
                  contribution: "Development Assistance",
                  icon: Code,
                  color: "from-gray-700 to-gray-900",
                  website: "https://github.com/features/copilot",
                  features: ["Code Generation", "AI Assistance", "Microsoft AI"]
                },
                {
                  name: "Vercel",
                  description: "Lightning-fast deployment platform for seamless hosting",
                  contribution: "Deployment & Hosting",
                  icon: Zap,
                  color: "from-black to-gray-800",
                  website: "https://vercel.com",
                  features: ["Edge Network", "Instant Deployments", "Global CDN"]
                }
              ].map((partner, index) => (
                <FadeIn key={partner.name} delay={0.2 * index}>
                  <motion.div
                    className="group relative"
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="relative bg-surface rounded-2xl border border-border p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
                      {/* Gradient overlay on hover */}
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      />
                      
                      {/* Header */}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <motion.div
                            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center shadow-lg`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <partner.icon className="w-8 h-8 text-white" />
                          </motion.div>
                          
                          <motion.a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink className="w-5 h-5 text-text/60 hover:text-primary" />
                          </motion.a>
                        </div>

                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {partner.name}
                        </h3>
                        
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                          <Star className="w-3 h-3" />
                          {partner.contribution}
                        </div>

                        <p className="text-text/80 leading-relaxed mb-6">
                          {partner.description}
                        </p>

                        {/* Features */}
                        <div className="space-y-2">
                          {partner.features.map((feature, i) => (
                            <motion.div
                              key={feature}
                              className="flex items-center gap-3"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              <div className="w-2 h-2 rounded-full bg-success" />
                              <span className="text-sm text-text/70">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>

            {/* Second Row - Infrastructure Partners */}
            <div className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto">
              {[
                {
                  name: "Google Cloud",
                  description: "Secure authentication services and cloud infrastructure",
                  contribution: "Authentication",
                  icon: Shield,
                  color: "from-blue-600 to-green-500",
                  website: "https://cloud.google.com",
                  features: ["OAuth 2.0", "Secure Auth", "Identity Management"]
                },
                {
                  name: "Firebase",
                  description: "Real-time database and backend services for seamless data management",
                  contribution: "Database & Backend",
                  icon: Database,
                  color: "from-orange-500 to-yellow-500",
                  website: "https://firebase.google.com",
                  features: ["Real-time DB", "Cloud Functions", "Analytics"]
                }
              ].map((partner, index) => (
                <FadeIn key={partner.name} delay={0.2 * index}>
                  <motion.div
                    className="group relative"
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="relative bg-surface rounded-2xl border border-border p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-500 backdrop-blur-sm">
                      {/* Gradient overlay on hover */}
                      <motion.div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${partner.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                      />
                      
                      {/* Header */}
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <motion.div
                            className={`w-16 h-16 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center shadow-lg`}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <partner.icon className="w-8 h-8 text-white" />
                          </motion.div>
                          
                          <motion.a
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <ExternalLink className="w-5 h-5 text-text/60 hover:text-primary" />
                          </motion.a>
                        </div>

                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {partner.name}
                        </h3>
                        
                        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                          <Star className="w-3 h-3" />
                          {partner.contribution}
                        </div>

                        <p className="text-text/80 leading-relaxed mb-6">
                          {partner.description}
                        </p>

                        {/* Features */}
                        <div className="space-y-2">
                          {partner.features.map((feature, i) => (
                            <motion.div
                              key={feature}
                              className="flex items-center gap-3"
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: i * 0.1 }}
                            >
                              <div className="w-2 h-2 rounded-full bg-success" />
                              <span className="text-sm text-text/70">{feature}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>

            {/* Bottom Message */}
            <FadeIn delay={0.6}>
              <div className="text-center">
                <motion.div
                  className="inline-flex items-center gap-4 bg-surface/80 backdrop-blur-sm border border-border rounded-2xl p-6 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Heart className="w-8 h-8 text-accent" />
                  </motion.div>
                  <div className="text-left">
                    <h4 className="text-lg font-semibold mb-1">Built with Gratitude</h4>
                    <p className="text-text/70 text-sm">
                      Thank you to these incredible platforms for making this project possible! 🙏
                    </p>
                  </div>
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Buy Me a Coffee */}
      <section id="support" className="relative py-10 md:py-12">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text/80 mb-4">
              <Heart className="w-4 h-4 text-accent" />
              Support the Project
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3 font-display">Buy Me a Coffee</h2>
            <p className="text-lg text-text/80 max-w-2xl mx-auto">Help keep this AI platform free and support ongoing development</p>
          </FadeIn>

          <div className="max-w-5xl mx-auto">
            <FadeIn>
              <div className="bg-surface rounded-2xl border border-border p-6 md:p-8 shadow-xl">
                <div className="text-center mb-6">
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-accent/15 rounded-full mb-4"
                  >
                    <Coffee className="w-8 h-8 text-accent" />
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3">Every Coffee Counts! ☕</h3>
                  <p className="text-text/80 leading-relaxed mb-6 max-w-3xl mx-auto">
                    Join our mission to democratize AI creativity! Your support helps keep Xerironx Studio 
                    running and accessible to creators worldwide. Together, we're building the 
                    <span className="font-semibold text-primary"> most comprehensive free AI studio</span> with cutting-edge models 
                    that inspire creators everywhere. Every coffee makes a difference! 🚀
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {[
                    { amount: 49, displayAmount: '₹49', desc: 'Buy me a coffee', icon: Coffee, popular: false },
                    { amount: 99, displayAmount: '₹99', desc: 'Buy me lunch', icon: Heart, popular: true },
                    { amount: 199, displayAmount: '₹199', desc: 'Support for a week', icon: Star, popular: false }
                  ].map((option, i) => (
                    <FadeIn key={option.amount} delay={0.1 * i}>
                      <motion.div 
                        whileHover={{ y: -3, scale: 1.02 }} 
                        className={`relative bg-background rounded-xl border p-4 text-center transition-all duration-300 ${
                          option.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {option.popular && (
                          <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                            Most Popular
                          </div>
                        )}
                        <div className="mb-4">
                          <option.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                          <div className="text-xl font-bold text-text">{option.displayAmount}</div>
                          <p className="text-text/70 text-xs">{option.desc}</p>
                        </div>
                        
                        <PaymentButton
                          amount={option.amount}
                          className={`w-full text-sm ${
                            option.popular 
                              ? '!bg-primary hover:!bg-primary/90' 
                              : '!bg-gradient-to-r !from-primary !to-secondary hover:!from-primary/90 hover:!to-secondary/90 !border-primary'
                          }`}
                        />
                      </motion.div>
                    </FadeIn>
                  ))}
                </div>

                <div className="text-center mb-6">
                  <div className="inline-flex items-center gap-4 text-xs text-text/60 mb-4">
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-success" />
                      <span>Secure payments</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>No subscriptions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>One-time support</span>
                    </div>
                  </div>
                  
                  <p className="text-text/70 text-sm mb-4">
                    💝 Your contribution helps us maintain free access to cutting-edge AI models 
                    and continuously improve the platform for the community.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-text/50">
                    <span>🚀 11 AI Models Always Free</span>
                    <span>⚡ Real-time Processing</span>
                    <span>🌟 Open Source Spirit</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Contact Developer - Full Rectangle Box */}
      <section id="contact" className="relative py-16 md:py-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/6 rounded-full blur-3xl animate-pulse" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <FadeIn>
            {/* Full Rectangle Container */}
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-surface/70 via-surface/60 to-surface/50 backdrop-blur-lg rounded-2xl border border-border/60 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
              {/* Header Section */}
              <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 px-8 py-8 border-b border-border/40">
                <div className="text-center">
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-primary via-primary/80 to-accent bg-clip-text text-transparent">
                    Contact Developer
                  </h3>
                  <p className="text-text/80 text-lg font-medium">
                    Let's build something amazing together! Get in touch for collaborations, feedback, or just to say hello.
                  </p>
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  {/* Left Side - Profile & Info */}
                  <div className="space-y-8">
                    {/* Profile Section */}
                    <div className="flex flex-col items-center text-center space-y-6">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                        className="relative group"
                      >
                        <div className="w-32 h-40 md:w-36 md:h-44 rounded-2xl overflow-hidden border-4 border-primary/30 shadow-xl bg-gradient-to-b from-primary/10 to-primary/20 group-hover:border-primary/50 transition-all duration-300">
                          <img 
                            src="/profile.png" 
                            alt="Karthik - Developer Profile" 
                            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <motion.div
                          className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg border-4 border-background"
                          whileHover={{ scale: 1.3, rotate: 180 }}
                          transition={{ type: "spring", stiffness: 400, duration: 0.6 }}
                        >
                          <Heart className="w-4 h-4 text-white" />
                        </motion.div>
                      </motion.div>

                      {/* Developer Info */}
                      <div className="space-y-4">
                        <h4 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-primary/90 to-accent bg-clip-text text-transparent">
                          Karthik
                        </h4>
                        <p className="text-text/90 text-lg font-semibold mb-4">
                          Full Stack Developer & AI Enthusiast
                        </p>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-primary mx-auto rounded-full"></div>
                        <p className="text-text/70 text-base leading-relaxed max-w-md">
                          Passionate about creating innovative solutions with cutting-edge technology. 
                          Always excited to collaborate on meaningful projects.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Contact Options */}
                  <div className="space-y-8">
                    {/* Social Links Grid */}
                    <div>
                      <h5 className="text-xl font-bold text-text mb-6 text-center md:text-left">Connect With Me</h5>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { icon: Github, href: "https://github.com/karthik129259", label: "GitHub", color: "hover:text-gray-400" },
                          { icon: Twitter, href: "https://x.com/Karthik64066151", label: "Twitter", color: "hover:text-blue-400" },
                          { icon: Linkedin, href: "https://www.linkedin.com/in/karthik129259/", label: "LinkedIn", color: "hover:text-blue-600" },
                          { icon: Instagram, href: "https://instagram.com/_karthik.z_", label: "Instagram", color: "hover:text-pink-400" }
                        ].map((social, index) => (
                          <motion.a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-4 p-6 rounded-xl border border-border bg-gradient-to-r from-background/90 to-surface/90 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5 hover:shadow-lg group ${social.color}`}
                            whileHover={{ y: -2, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1, type: "spring", stiffness: 300 }}
                          >
                            <div className="p-3 rounded-lg bg-gradient-to-r from-primary/20 to-primary/10 group-hover:from-primary/30 group-hover:to-primary/20 transition-all duration-300">
                              <social.icon className="w-6 h-6 text-text/70 group-hover:text-primary transition-colors duration-300" />
                            </div>
                            <span className="font-semibold text-text/90 group-hover:text-primary transition-colors duration-300">
                              {social.label}
                            </span>
                          </motion.a>
                        ))}
                      </div>
                    </div>

                    {/* Direct Email Contact */}
                    <div>
                      <h5 className="text-xl font-bold text-text mb-6 text-center md:text-left">Get In Touch</h5>
                      <motion.div
                        className="p-6 rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border border-primary/30 hover:border-primary/50 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/15 hover:to-accent/15 hover:shadow-lg group backdrop-blur-sm"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-primary/30 to-accent/30 group-hover:from-primary/40 group-hover:to-accent/40 transition-all duration-300 group-hover:scale-110">
                            <Mail className="w-6 h-6 text-primary group-hover:text-white transition-colors duration-300" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-text/70 mb-1">Send me an email</p>
                            <a 
                              href="mailto:idikudakarthik55@gmail.com"
                              className="text-lg font-bold text-text/90 hover:text-primary transition-colors group-hover:text-primary break-all"
                              onClick={(e) => {
                                e.preventDefault();
                                window.location.href = 'mailto:idikudakarthik55@gmail.com?subject=Contact from Xerironx Studio&body=Hi Karthik,%0D%0A%0D%0A';
                              }}
                            >
                              idikudakarthik55@gmail.com
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ / CTA */}
      <section id="faq" className="relative py-12">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/3 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/3 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <FadeIn className="text-center mb-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-text/80 mb-4">
              <HelpCircle className="w-4 h-4 text-primary" />
              Frequently Asked Questions
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 font-display">Questions, answered</h2>
            <p className="text-lg text-text/80">Everything you need to know about our AI creative platform</p>
          </FadeIn>

          <div className="max-w-4xl mx-auto space-y-6">
            {[
              { 
                q: 'Is Xerironx Studio really free to use?', 
                a: 'Yes! All 8 AI models are completely free forever. No credit card required, no hidden fees, no usage limits.',
                icon: Heart
              },
              { 
                q: 'Which AI models does Xerironx Studio support?', 
                a: 'We support 8 advanced models: Devstral, GPT-OSS, Qwen3 Coder, Llama 3.1, Nemotron, Gemini 2.0 Flash, and more for text, code, and image generation.',
                icon: Brain
              },
              { 
                q: 'Can I use Xerironx Studio for commercial projects?', 
                a: 'Absolutely! Create commercial websites, applications, content, and images without any restrictions or licensing fees.',
                icon: Rocket
              },
              { 
                q: 'What programming frameworks are supported?', 
                a: 'Full support for React, Next.js, Vue, Angular, and Vanilla JavaScript with live preview and deployment features.',
                icon: Code
              },
              { 
                q: 'What makes Xerironx Studio different?', 
                a: 'Multi-modal AI in one platform: chat, code, images, and websites with real-time collaboration and live preview capabilities.',
                icon: Star
              }
            ].map((item, i) => (
              <FadeIn key={i} delay={0.08 * i}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group"
                >
                  <motion.div 
                    className="rounded-2xl border border-border bg-surface/60 backdrop-blur-sm overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                    whileHover={{ scale: 1.01 }}
                  >
                    <motion.button 
                      className="w-full flex cursor-pointer list-none items-center justify-between p-6 text-left hover:bg-surface/80 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-t-2xl"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.995 }}
                      onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    >
                      <div className="flex items-center gap-4">
                        <motion.div 
                          className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <item.icon className="w-5 h-5 text-primary" />
                        </motion.div>
                        <span className="text-lg font-semibold text-text group-hover:text-primary transition-colors">
                          {item.q}
                        </span>
                      </div>
                      
                      <motion.div
                        className="flex-shrink-0 ml-4"
                        whileHover={{ scale: 1.1 }}
                      >
                        <div className="relative">
                          <motion.div
                            className="absolute inset-0 bg-primary/20 rounded-full"
                            initial={{ scale: 0 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                          <motion.div 
                            className="relative w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                            animate={{
                              backgroundColor: openFAQ === i ? 'rgb(79 70 229)' : 'rgba(255, 255, 255, 0.1)',
                              borderColor: openFAQ === i ? 'rgb(79 70 229)' : 'rgba(255, 255, 255, 0.3)',
                              boxShadow: openFAQ === i ? '0 0 0 2px rgba(79, 70, 229, 0.2)' : '0 1px 3px rgba(0, 0, 0, 0.1)'
                            }}
                          >
                            <motion.div
                              animate={{ rotate: openFAQ === i ? 45 : 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                              <Plus 
                                className={`w-4 h-4 transition-all duration-300 font-bold ${
                                  openFAQ === i ? 'text-white drop-shadow-sm' : 'text-white'
                                }`} 
                                strokeWidth={openFAQ === i ? 3 : 2}
                              />
                            </motion.div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.button>

                    <AnimatePresence>
                      {openFAQ === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ 
                            duration: 0.4, 
                            ease: [0.04, 0.62, 0.23, 0.98],
                            opacity: { duration: 0.3 }
                          }}
                          className="border-t border-border/50 overflow-hidden"
                        >
                          <motion.div 
                            className="p-6 pt-4"
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                          >
                            <p className="text-text/80 leading-relaxed">
                              {item.a}
                            </p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </FadeIn>
            ))}
          </div>

          <FadeIn className="text-center mt-16">
            <motion.div 
              className="inline-flex items-center gap-4 rounded-2xl border border-border bg-surface/80 backdrop-blur-sm px-8 py-4 shadow-lg"
              whileHover={{ scale: 1.02, y: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ 
                  rotate: [0, 15, -15, 0],
                  scale: [1, 1.1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                <Rocket className="w-6 h-6 text-primary" />
              </motion.div>
              <span className="text-text font-medium">Ready to create something amazing?</span>
              <div className="flex items-center gap-3">
                <Link 
                  href="/register" 
                  className="font-semibold text-primary hover:text-primary/80 transition-colors relative group"
                >
                  <span>Start Creating</span>
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"
                    whileHover={{ width: "100%" }}
                  />
                </Link>
                <span className="text-text/60">or</span>
                <Link 
                  href="/login" 
                  className="font-semibold text-text hover:text-text/80 transition-colors relative group"
                >
                  <span>Sign In</span>
                  <motion.div
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-text group-hover:w-full transition-all duration-300"
                    whileHover={{ width: "100%" }}
                  />
                </Link>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </section>

      {/* Footer - Premium Design */}
      <footer className="relative bg-gradient-to-br from-surface via-surface/95 to-background border-t border-border/50 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/6 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 py-16">
          <div className="container mx-auto px-6">
            {/* Main Footer Content */}
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link href="/" className="flex items-center gap-4 mb-6 group">
                    <Logo size={48} />
                    <div>
                      <span className="text-3xl font-bold bg-gradient-to-r from-text via-primary to-accent bg-clip-text text-transparent">Xerironx</span>
                      <p className="text-text/60 text-sm font-medium">AI Creative Studio</p>
                    </div>
                  </Link>
                </motion.div>
                <p className="text-text/80 text-lg leading-relaxed mb-6 max-w-md">
                  Empowering creators with AI-powered tools for the next generation of digital experiences.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">
                    Innovative
                  </span>
                  <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full border border-accent/20">
                    Fast
                  </span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-semibold rounded-full border border-green-500/20">
                    Precise
                  </span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-text to-primary bg-clip-text text-transparent">Quick Links</h3>
                <ul className="space-y-3">
                  {[
                    { href: "#features", label: "Features" },
                    { href: "#contact", label: "Support" },
                    { href: "#support", label: "Buy Me a Coffee" },
                    { href: "#faq", label: "FAQ" }
                  ].map((link, index) => (
                    <li key={link.href}>
                      <motion.div
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Link 
                          href={link.href} 
                          className="flex items-center gap-3 text-text/70 hover:text-primary transition-all duration-300 group"
                        >
                          <span className="font-medium">{link.label}</span>
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Developer */}
              <div>
                <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-text to-primary bg-clip-text text-transparent">Contact Developer</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-background/80 to-surface/80 border border-border/50">
                    <div className="w-12 h-16 rounded-xl overflow-hidden border-2 border-primary/30 bg-gradient-to-b from-primary/10 to-primary/20 shadow-lg">
                      <img 
                        src="/profile.png" 
                        alt="Karthik - Developer" 
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-text">Karthik</h4>
                      <p className="text-text/60 text-sm">Full Stack Developer</p>
                      <p className="text-text/50 text-xs">AI Enthusiast</p>
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="flex gap-2">
                    {[
                      { href: "https://github.com/karthik129259", icon: Github, label: "GitHub", color: "hover:text-gray-400" },
                      { href: "https://x.com/Karthik64066151", icon: Twitter, label: "Twitter", color: "hover:text-blue-400" },
                      { href: "https://instagram.com/_karthik.z_", icon: Instagram, label: "Instagram", color: "hover:text-pink-400" },
                      { href: "https://reddit.com/user/Conscious-Gain29", icon: GlobeIcon, label: "Reddit", color: "hover:text-orange-400" }
                    ].map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg bg-background/60 border border-border/50 text-text/60 ${social.color} transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        title={social.label}
                      >
                        <social.icon className="w-4 h-4" />
                      </motion.a>
                    ))}
                  </div>

                  {/* Email */}
                  <motion.a
                    href="mailto:idikudakarthik55@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-text/80 hover:text-primary transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/10 group"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">idikudakarthik55@gmail.com</span>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="border-t border-border/30 pt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex flex-col md:flex-row items-center gap-6 text-sm text-text/60">
                  <span>© 2024 Xerironx. All rights reserved.</span>
                  
                  {/* Legal Links */}
                  <div className="flex items-center gap-4">
                    <Link 
                      href="/terms" 
                      className="text-text/60 hover:text-primary transition-colors duration-300 hover:underline"
                    >
                      Terms
                    </Link>
                    <span className="text-text/30">•</span>
                    <Link 
                      href="/privacy" 
                      className="text-text/60 hover:text-primary transition-colors duration-300 hover:underline"
                    >
                      Privacy
                    </Link>
                  </div>
                  
                  <div className="hidden md:flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>All systems operational</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-text/50 text-sm">Developed by</span>
                  <span className="px-2 py-1 bg-gradient-to-r from-primary/20 to-accent/20 text-primary text-xs font-bold rounded border border-primary/30">
                    Copilot & Karthik
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}