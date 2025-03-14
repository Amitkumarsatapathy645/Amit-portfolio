'use client'

import { useEffect } from 'react'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { Skills } from '@/components/about/skills'
import { ExperienceTimeline } from '@/components/about/experience-timeline'
import { Button } from '@/components/ui/button'
import { useInView } from 'react-intersection-observer'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function AboutPage() {
  // Set up animations that trigger on scroll
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <ScrollArea className="h-screen">
      <div className="relative min-h-screen" aria-label="About Amit Kumar Satapathy">
        {/* Enhanced animated background with subtle parallax effect */}
        <div className="fixed inset-0 -z-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-gradient-xy" />
          <motion.div 
            className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-5"
            animate={{ 
              y: [0, 10, 0], 
            }} 
            transition={{ 
              repeat: Infinity, 
              duration: 20,
              ease: "easeInOut" 
            }}
          />
        </div>
        
        <div className="container mx-auto px-4 py-16 md:py-24 z-10">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-3xl mx-auto text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
                About{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">Me</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I&apos;m a passionate developer with over 3 years of experience building modern web applications. 
                I specialize in creating user-friendly, scalable solutions that solve real-world problems.
              </p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="flex justify-center gap-4 mt-8"
              >
                <Button 
                  variant="outline" 
                  className="group"
                  onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span>View Skills</span>
                  <motion.span 
                    className="inline-block ml-2"
                    animate={{ y: [0, -2, 0] }} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ↓
                  </motion.span>
                </Button>
                <Button 
                  onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                  className="group"
                >
                  <span>See Experience</span>
                  <motion.span 
                    className="inline-block ml-2"
                    animate={{ y: [0, -2, 0] }} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    ↓
                  </motion.span>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={controls}
            className="space-y-24"
          >
            <motion.div variants={fadeInUp} className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight" id="skills">
                Skills & Expertise
              </h2>
              <Skills />
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <h2 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight" id="experience">
                Experience
              </h2>
              <ExperienceTimeline />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </ScrollArea>
  )
}