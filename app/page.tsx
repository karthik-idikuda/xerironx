"use client"

import Link from 'next/link'
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useInView } from 'framer-motion'
import { Logo } from '@/components/Logo'
import { useEffect, useState, useRef } from 'react'
import { getFirebaseAnalytics } from '@/lib/firebase'
import { useSession, signIn } from 'next-auth/react'
import { 
  Sparkles, 
  Code, 
  Image, 
  Zap, 
  ArrowRight, 
  Star, 
  Users, 
  Globe, 
  Brain,
  Rocket,
  Shield,
  Award,
  ChevronDown,
  Play,
  Check,
  TrendingUp,
  Menu,
  X,
  Bot,
  Palette,
  Database,
  Lock,
  MessageSquare,
  Layers,
  Cpu,
  Infinity,
  Eye,
  Wand2,
  Terminal,
  Server,
  Smartphone,
  Monitor,
  Tablet,
  Gauge,
  Lightbulb,
  Target,
  Timer,
  UserPlus,
  LogIn,
  MousePointer,
  Feather,
  Hash,
  Heart,
  Coffee,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Github,
  Youtube,
  ChevronRight,
  Cloud,
  Zap as Lightning,
  Compass,
  Headphones,
  PieChart,
  BarChart3,
  TrendingDown,
  Activity,
  Wifi,
  Download,
  Upload,
  Filter,
  Search,
  Bell,
  Calendar,
  Clock,
  Bookmark,
  Flag,
  ThumbsUp,
  Share2,
  Camera,
  Video,
  Music,
  Mic,
  Volume2,
  Settings,
  Grid,
  List,
  Layout,
  Maximize,
  Minimize,
  RotateCcw,
  RefreshCw,
  Power,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Clipboard,
  Edit,
  Trash,
  Plus,
  Minus,
  Equal,
  DollarSign,
  CreditCard,
  ShoppingCart,
  Package,
  Truck,
  MapPin as Map,
  Navigation,
  Compass as CompassIcon
} from 'lucide-react'

// Custom gradient text component
const GradientText = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
)

// Animated background orbs
const AnimatedOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, -80, 0],
          y: [0, 60, 0],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl"
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut"
        }}
      />
    </div>
  )
}

// Floating particles component
const FloatingParticles = () => {
  const particles = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }))

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-purple-400/30 to-cyan-400/30"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

// Mouse follower component
const MouseFollower = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <motion.div
      className="fixed w-8 h-8 border-2 border-purple-400/50 rounded-full pointer-events-none z-50 mix-blend-difference"
      animate={{
        x: mousePosition.x - 16,
        y: mousePosition.y - 16,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    />
  )
}

// Username modal component
const UsernameModal = ({ isOpen, onClose, onContinue }: {
  isOpen: boolean
  onClose: () => void
  onContinue: (username: string) => void
}) => {
  const [username, setUsername] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim()) {
      localStorage.setItem('userDisplayName', username.trim())
      onContinue(username.trim())
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-gray-100 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-cyan-50 opacity-50" />
            <div className="relative z-10">
              <div className="text-center mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                >
                  <UserPlus className="w-10 h-10 text-white" />
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl font-bold text-gray-900 mb-2"
                >
                  Welcome Aboard! 🚀
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600"
                >
                  Choose a username to begin your journey
                </motion.p>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="w-full px-6 py-4 rounded-2xl border-2 border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all text-lg bg-white/80 backdrop-blur-sm"
                    autoFocus
                  />
                </motion.div>
                
                <motion.button
                  type="submit"
                  disabled={!username.trim()}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px -10px rgba(147, 51, 234, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-4 rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl transition-all text-lg flex items-center justify-center gap-3"
                >
                  <span>Continue with Google</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Feature card component with advanced animations
const FeatureCard = ({ feature, index }: { feature: any, index: number }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ 
        y: -10, 
        scale: 1.05,
        boxShadow: "0 25px 50px -10px rgba(0, 0, 0, 0.1)"
      }}
      className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 overflow-hidden cursor-pointer"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <motion.div
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 0.6 }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-lg`}
        >
          <feature.icon className="w-8 h-8 text-white" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
          {feature.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{feature.description}</p>
        <motion.div
          initial={{ width: 0 }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
          className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mt-6 rounded-full"
        />
      </div>
    </motion.div>
  )
}

// Testimonial card component
const TestimonialCard = ({ testimonial, isActive }: { testimonial: any, isActive: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isActive ? 1 : 0.3, 
        scale: isActive ? 1 : 0.9,
        y: isActive ? 0 : 20
      }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 to-cyan-500" />
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {testimonial.avatar}
        </div>
        <div className="ml-4">
          <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
          <p className="text-gray-600">{testimonial.role}</p>
        </div>
        <div className="ml-auto flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
      <p className="text-gray-700 text-lg italic leading-relaxed">"{testimonial.content}"</p>
    </motion.div>
  )
}

// Pricing card component
const PricingCard = ({ plan, isPopular = false }: { plan: any, isPopular?: boolean }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`relative bg-white rounded-3xl p-8 shadow-xl border-2 ${
        isPopular ? 'border-purple-500 scale-105' : 'border-gray-100'
      } overflow-hidden`}
    >
      {isPopular && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-6 py-2 rounded-full text-sm font-semibold">
            Most Popular
          </div>
        </div>
      )}
      
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
        <div className="text-5xl font-bold text-gray-900 mb-2">
          {plan.price}
          <span className="text-lg text-gray-600 font-normal">/month</span>
        </div>
        <p className="text-gray-600">{plan.description}</p>
      </div>
      
      <div className="space-y-4 mb-8">
        {plan.features.map((feature: string, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-3"
          >
            <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </motion.div>
        ))}
      </div>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-full py-4 rounded-2xl font-semibold transition-all ${
          isPopular 
            ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white shadow-lg hover:shadow-xl'
            : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
        }`}
      >
        Get Started
      </motion.button>
    </motion.div>
  )
}

export default function Home() {
  const { data: session, status } = useSession()
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showUsernameModal, setShowUsernameModal] = useState(false)
  const [userDisplayName, setUserDisplayName] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

  useEffect(() => {
    getFirebaseAnalytics()
    setIsVisible(true)
    
    // Check for stored username
    const storedName = localStorage.getItem('userDisplayName')
    if (storedName) {
      setUserDisplayName(storedName)
    }
    
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    
    return () => {
      clearInterval(interval)
    }
  }, [])

  const handleCreateAccount = () => {
    if (status !== 'authenticated') {
      setShowUsernameModal(true)
    } else {
      signIn('google', { callbackUrl: '/' })
    }
  }

  const handleUsernameSubmit = (username: string) => {
    setUserDisplayName(username)
    setShowUsernameModal(false)
    signIn('google', { callbackUrl: '/' })
  }

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms that understand your needs and deliver precise, contextual results every time.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Code,
      title: "Smart Code Generation",
      description: "Generate clean, efficient, and production-ready code in any programming language with intelligent auto-completion.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Globe,
      title: "Global Collaboration",
      description: "Connect with developers worldwide and collaborate on projects in real-time with seamless synchronization.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Image,
      title: "Creative Design Studio",
      description: "Create stunning visuals, graphics, and designs with our AI-powered creative suite and advanced editing tools.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Rocket,
      title: "Lightning Performance",
      description: "Experience blazing-fast performance with our globally distributed infrastructure and edge optimization.",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level security with end-to-end encryption, advanced threat protection, and compliance certifications.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Database,
      title: "Smart Data Management",
      description: "Intelligent data processing and storage solutions with real-time analytics and automated insights.",
      color: "from-cyan-500 to-blue-500"
    },
    {
      icon: Lightning,
      title: "Instant Deployment",
      description: "Deploy your applications instantly to the cloud with zero-configuration setup and automatic scaling.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: Eye,
      title: "Advanced Analytics",
      description: "Deep insights into your projects with comprehensive analytics, performance monitoring, and optimization suggestions.",
      color: "from-pink-500 to-rose-500"
    }
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Lead Developer at TechCorp",
      content: "This platform has revolutionized our development workflow. The AI assistance is incredibly intelligent and saves us hours every day!",
      avatar: "SC",
      rating: 5
    },
    {
      name: "Michael Rodriguez",
      role: "Startup Founder",
      content: "From concept to deployment in record time. This tool is an absolute game-changer for startups and established companies alike.",
      avatar: "MR",
      rating: 5
    },
    {
      name: "Emily Johnson",
      role: "Creative Director",
      content: "The design tools are intuitive and powerful. It's like having a team of world-class experts at your fingertips 24/7.",
      avatar: "EJ",
      rating: 5
    },
    {
      name: "David Park",
      role: "Full Stack Engineer",
      content: "The code quality is exceptional and the learning curve is practically non-existent. I'm 10x more productive now.",
      avatar: "DP",
      rating: 5
    }
  ]

  const stats = [
    { value: "1M+", label: "Active Users", icon: Users, color: "text-blue-600" },
    { value: "50M+", label: "Projects Created", icon: Rocket, color: "text-purple-600" },
    { value: "99.99%", label: "Uptime", icon: Shield, color: "text-green-600" },
    { value: "195+", label: "Countries", icon: Globe, color: "text-orange-600" }
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "$0",
      description: "Perfect for beginners and small projects",
      features: [
        "5 AI-generated projects per month",
        "Basic code generation",
        "Community support",
        "Standard templates",
        "1GB storage"
      ]
    },
    {
      name: "Professional",
      price: "$29",
      description: "Ideal for professional developers and teams",
      features: [
        "Unlimited AI-generated projects",
        "Advanced code generation",
        "Priority support",
        "Premium templates",
        "100GB storage",
        "Team collaboration",
        "Custom integrations"
      ]
    },
    {
      name: "Enterprise",
      price: "$99",
      description: "For large organizations and enterprises",
      features: [
        "Everything in Professional",
        "Dedicated account manager",
        "Custom AI model training",
        "Advanced security features",
        "Unlimited storage",
        "SLA guarantee",
        "Custom deployment options"
      ]
    }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-white overflow-hidden relative">
      <FloatingParticles />
      <MouseFollower />
      <AnimatedOrbs />
      
      <UsernameModal
        isOpen={showUsernameModal}
        onClose={() => setShowUsernameModal(false)}
        onContinue={handleUsernameSubmit}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100/50 shadow-lg"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Logo />
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['Features', 'How it Works', 'Pricing', 'About', 'Testimonials', 'Contact'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-700 hover:text-purple-600 transition-colors font-medium relative group"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {item}
                  <motion.div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 group-hover:w-full transition-all duration-300"
                  />
                </motion.a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {session?.user ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-cyan-50 px-4 py-2 rounded-2xl border border-purple-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {(userDisplayName || session?.user?.name || 'U')[0].toUpperCase()}
                  </div>
                  <span className="text-gray-700 font-medium">
                    Hello, {userDisplayName || session?.user?.name?.split(' ')[0]}! 👋
                  </span>
                </motion.div>
              ) : (
                <>
                  <motion.button
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    whileHover={{ scale: 1.05, color: '#7c3aed' }}
                    whileTap={{ scale: 0.95 }}
                    className="text-gray-700 hover:text-purple-600 font-semibold transition-colors flex items-center gap-2 px-4 py-2 rounded-xl"
                  >
                    <LogIn className="w-4 h-4" />
                    Login
                  </motion.button>
                  <motion.button
                    onClick={handleCreateAccount}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ 
                      scale: 1.05, 
                      boxShadow: "0 20px 40px -10px rgba(147, 51, 234, 0.3)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </motion.button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <motion.button
              className="md:hidden p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-100"
            >
              <div className="px-4 py-6 space-y-4">
                {['Features', 'How it Works', 'Pricing', 'About', 'Testimonials', 'Contact'].map((item) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="block text-gray-700 hover:text-purple-600 font-medium py-2"
                    onClick={() => setMobileMenuOpen(false)}
                    whileHover={{ x: 10 }}
                  >
                    {item}
                  </motion.a>
                ))}
                <div className="pt-4 space-y-3">
                  {!session?.user && (
                    <>
                      <button
                        onClick={() => {
                          signIn('google', { callbackUrl: '/' })
                          setMobileMenuOpen(false)
                        }}
                        className="w-full text-left text-gray-700 hover:text-purple-600 font-medium py-2"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          handleCreateAccount()
                          setMobileMenuOpen(false)
                        }}
                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-3 rounded-xl font-semibold"
                      >
                        Create Account
                      </button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
            className="mb-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={isVisible ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 1, delay: 0.7, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-6xl md:text-8xl font-bold mb-6 leading-tight"
            >
              The Future of{' '}
              <motion.span
                initial={{ backgroundPosition: "0%" }}
                animate={{ backgroundPosition: "100%" }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent bg-[length:200%_auto]"
              >
                Innovation
              </motion.span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Experience the next generation of AI-powered development tools. Create, collaborate, and deploy with unprecedented speed and precision.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <motion.button
                onClick={handleCreateAccount}
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: "0 25px 50px -10px rgba(147, 51, 234, 0.4)",
                  y: -5
                }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3 group"
              >
                <span>Create Account</span>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </motion.button>

              <motion.button
                onClick={() => signIn('google', { callbackUrl: '/' })}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-gray-300 text-gray-700 px-10 py-5 rounded-2xl font-bold text-lg hover:border-purple-500 hover:text-purple-600 transition-all flex items-center gap-3 bg-white/80 backdrop-blur-sm"
              >
                <LogIn className="w-6 h-6" />
                <span>Login</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 1.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-gray-100"
              >
                <div className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 2 + index * 0.2 }}
                  >
                    {stat.value}
                  </motion.span>
                </div>
                <div className="text-gray-600 font-medium flex items-center justify-center gap-2">
                  <stat.icon className="w-5 h-5" />
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="flex flex-col items-center gap-3 text-gray-400 cursor-pointer"
            whileHover={{ scale: 1.1, color: '#7c3aed' }}
          >
            <span className="text-sm font-medium">Discover More</span>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            >
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-8"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Powerful{' '}
              <GradientText>Features</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover the cutting-edge capabilities that make our platform the choice of leading developers and organizations worldwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-cyan-50/50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              How It{' '}
              <GradientText>Works</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes with our intuitive workflow designed for developers of all skill levels.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Sign Up & Setup",
                description: "Create your account and set up your development environment in seconds with our automated onboarding.",
                icon: UserPlus,
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "02",
                title: "Create & Collaborate",
                description: "Start building with AI assistance and invite your team to collaborate in real-time on projects.",
                icon: Code,
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "03",
                title: "Deploy & Scale",
                description: "Deploy your applications instantly to the cloud with automatic scaling and global distribution.",
                icon: Rocket,
                color: "from-green-500 to-emerald-500"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="text-center group cursor-pointer"
              >
                <div className="relative mb-8">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-3xl flex items-center justify-center mx-auto shadow-2xl group-hover:shadow-3xl transition-all`}
                  >
                    <step.icon className="w-12 h-12 text-white" />
                  </motion.div>
                  <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-gray-50">
                    <span className="text-lg font-bold text-gray-600">{step.step}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
                {index < 2 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.2 }}
                    viewport={{ once: true }}
                    className="hidden md:block absolute top-12 -right-6 w-12 h-0.5 bg-gradient-to-r from-purple-300 to-cyan-300"
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              What Our{' '}
              <GradientText>Users Say</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join thousands of satisfied developers who have transformed their workflow with our platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                testimonial={testimonial}
                isActive={index === currentTestimonial}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12 gap-3"
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentTestimonial 
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Simple{' '}
              <GradientText>Pricing</GradientText>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your needs. Start free and scale as you grow.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={index}
                plan={plan}
                isPopular={index === 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
              Join the future of development today. Create your account and start building amazing projects in minutes.
            </p>
            <motion.button
              onClick={handleCreateAccount}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 25px 50px -10px rgba(255, 255, 255, 0.3)",
                y: -5
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-600 px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3 mx-auto group"
            >
              <span>Start Your Journey</span>
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-cyan-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <Logo />
              </motion.div>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
                Empowering developers worldwide with cutting-edge AI tools and revolutionary development experiences.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Linkedin, href: "#" },
                  { icon: Youtube, href: "#" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500 transition-all group"
                  >
                    <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Product</h3>
              <ul className="space-y-4">
                {['Features', 'Pricing', 'Documentation', 'API Reference', 'Changelog'].map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: '#a855f7' }}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">Company</h3>
              <ul className="space-y-4">
                {['About Us', 'Careers', 'Blog', 'Press', 'Contact'].map((item) => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: '#a855f7' }}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-center md:text-left mb-4 md:mb-0"
            >
              © 2024 AI Platform. All rights reserved.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 flex items-center gap-2"
            >
              developed by copilot & Karthik..
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  )
}
