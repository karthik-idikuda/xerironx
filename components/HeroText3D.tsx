'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface HeroText3DProps {
  text: string;
  className?: string;
  color?: string;
  glowColor?: string;
  fontSize?: string;
  fontWeight?: string;
  letterSpacing?: string;
  lineHeight?: string;
}

export default function HeroText3D({
  text,
  className = '',
  color = 'text-white',
  glowColor = 'text-indigo-500',
  fontSize = 'text-5xl md:text-7xl',
  fontWeight = 'font-bold',
  letterSpacing = 'tracking-tight',
  lineHeight = 'leading-tight',
}: HeroText3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Split text into individual characters for animation
  const characters = text.split('');
  
  useEffect(() => {
    // Check visibility
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    // Mouse effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !textRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate normalized position (-1 to 1)
      const normalizedX = (e.clientX - centerX) / (rect.width / 2);
      const normalizedY = (e.clientY - centerY) / (rect.height / 2);
      
      // Apply 3D tilt effect
      const tiltAmount = 10;
      const rotateX = -normalizedY * tiltAmount;
      const rotateY = normalizedX * tiltAmount;
      
      textRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };
  
  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div ref={containerRef} className={`relative py-4 ${className}`}>
      <div 
        ref={textRef}
        className="relative inline-block hero-text-3d-transform"
      >
        {/* Main text */}
        <motion.div
          className={`${fontSize} ${fontWeight} ${letterSpacing} ${lineHeight} ${color} hero-text-3d-shadow`}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {characters.map((char, index) => (
            <motion.span
              key={index}
              variants={childVariants}
              className="inline-block"
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.div>
        
        {/* Glow effect */}
        <div 
          className={`absolute inset-0 ${fontSize} ${fontWeight} ${letterSpacing} ${lineHeight} ${glowColor} opacity-70 hero-text-glow`}
          aria-hidden="true"
        >
          {text}
        </div>
        
        {/* Highlight effect */}
        <div 
          className={`absolute inset-0 ${fontSize} ${fontWeight} ${letterSpacing} ${lineHeight} text-white opacity-30 hero-text-highlight`}
          aria-hidden="true"
        >
          {text}
        </div>
      </div>
    </div>
  );
}