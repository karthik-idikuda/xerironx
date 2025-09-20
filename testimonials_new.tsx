import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// FadeIn component
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

export default function TestimonialsSection() {
  return (
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface/20 to-background">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
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
              { 
                quote: 'A game-changer for prototyping.', 
                name: 'Sai Sri Ram', 
                role: 'Developer',
                gradient: 'from-blue-500/20 to-purple-500/20',
                accent: 'blue'
              },
              { 
                quote: 'The animations feel alive!', 
                name: 'Siva', 
                role: 'Web Developer',
                gradient: 'from-green-500/20 to-teal-500/20', 
                accent: 'green'
              },
              { 
                quote: 'We built our MVP in days.', 
                name: 'Karthik', 
                role: 'UI/UX Designer',
                gradient: 'from-orange-500/20 to-red-500/20',
                accent: 'orange'
              }
            ].map((testimonial, idx) => (
              <FadeIn key={idx} delay={0.2 * idx}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: idx * 0.1,
                    type: "spring",
                    stiffness: 200 
                  }}
                  className={`relative group h-full p-8 rounded-3xl bg-gradient-to-br ${testimonial.gradient} backdrop-blur-sm border border-border/50 hover:border-primary/30 shadow-lg hover:shadow-2xl transition-all duration-300`}
                >
                  {/* Quote Icon */}
                  <div className="absolute -top-4 left-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white font-bold text-lg">"</span>
                    </div>
                  </div>

                  {/* Quote Text */}
                  <blockquote className="mb-6 mt-4">
                    <p className="text-text/90 text-xl leading-relaxed font-medium">
                      "{testimonial.quote}"
                    </p>
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full flex items-center justify-center border-2 border-primary/20 shadow-md">
                      <span className="text-primary font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-text text-lg">{testimonial.name}</h4>
                      <p className="text-text/60 text-sm font-medium">{testimonial.role}</p>
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
  )
}