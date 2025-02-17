// src/app/about/page.tsx
'use client'

import { Skills } from '@/components/about/skills'
import { ExperienceTimeline } from '@/components/about/experience-timeline'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface FloatingShape {
  x: number
  y: number
  duration: number
}

export default function AboutPage() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [floatingShapes, setFloatingShapes] = useState<FloatingShape[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      
      const shapes = [...Array(5)].map(() => ({
        x: Math.random() * window.innerWidth,
        y: -100,
        duration: Math.random() * 10 + 20,
      }))
      
      setFloatingShapes(shapes)
    }
  }, [])

  return (
    <div className="relative min-h-screen">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-gradient-xy -z-20" />
      
      {/* Floating shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute h-32 w-32 rounded-full bg-primary/5"
            initial={{ x: shape.x, y: shape.y }}
            animate={{
              x: Math.random() * windowSize.width,
              y: windowSize.height + 100,
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-24 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
           <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About{' '}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
                Connect
              </span>
            </h1>
          <p className="text-lg text-muted-foreground">
            I'm a passionate developer with over 3 years of experience building modern web applications.
            I specialize in creating user-friendly, scalable solutions that solve real-world problems.
          </p>
        </motion.div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Skills & Expertise</h2>
          <Skills />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-8">Experience</h2>
          <ExperienceTimeline />
        </div>
      </div>
    </div>
  )
}
