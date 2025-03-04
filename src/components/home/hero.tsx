'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {  
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Terminal,
  Briefcase,
  Code,
  Star
} from 'lucide-react'
import Link from 'next/link'
import { TypeAnimation } from 'react-type-animation'

const techStack = ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'AWS']

interface FloatingShape {
  x: number
  y: number
  duration: number
}

export default function Hero() {
  const controls = useAnimation()
  // const [isVisible, setIsVisible] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [floatingShapes, setFloatingShapes] = useState<FloatingShape[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });

      // Generate random positions for floating shapes only on the client
      const shapes = [...Array(5)].map(() => ({
        x: Math.random() * window.innerWidth,
        y: -100,
        duration: Math.random() * 10 + 20, // Random duration
      }));

      setFloatingShapes(shapes);
    }
  }, [windowSize.width, windowSize.height]);

  useEffect(() => {
    // setIsVisible(true)
    controls.start({
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    })
  }, [controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-10 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-gradient-xy" />
      
      {/* Floating shapes background */}
      <div className="absolute inset-0 overflow-hidden">
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

      <motion.div
        className="relative max-w-4xl text-center z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Profile section */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-violet-600 animate-pulse" />
            <img
              src="/images/profile.jpg"
              alt="Amit Kumar Satapathy"
              className="relative rounded-full w-[120px] h-[120px] object-cover border-4 border-background"
            />
          </div>
        </motion.div>

        {/* Name and title */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Hi, I&apos;m{' '}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text animate-gradient-x">
              Amit Kumar Satapathy
            </span>
          </h1>
          <div className="h-12 mb-6">
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'DevOps Enthusiast',
                2000,
                'Problem Solver',
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="text-xl md:text-2xl text-muted-foreground"
              repeat={Infinity}
            />
          </div>
        </motion.div>

        {/* Tech stack */}
        <motion.div 
          variants={itemVariants}
          className="mb-8"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, index) => (
              <motion.span
                key={tech}
                className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-sm"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Button asChild size="lg" className="group">
            <Link href="/projects">
              View Projects
              <Briefcase className="ml-2 group-hover:rotate-12 transition-transform" />
            </Link>
          </Button>

          <Button variant="outline" size="lg" asChild className="group">
            <a 
              href="/resume.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center"
            >
              Download CV
              <Download className="ml-2 group-hover:translate-y-1 transition-transform" />
            </a>
          </Button>

          <Button variant="outline" size="lg" asChild className="group">
            <a 
              href="https://github.com/Amitkumarsatapathy645" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Github className="mr-2 group-hover:rotate-360 transition-transform" />
              GitHub
            </a>
          </Button>

          <Button variant="outline" size="lg" asChild className="group">
            <a 
              href="https://www.linkedin.com/in/amit-kumar-satapathy-59547722a/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Linkedin className="mr-2 group-hover:scale-110 transition-transform" />
              LinkedIn
            </a>
          </Button>
        </motion.div>

        {/* Stats section */}
        <motion.div
          variants={itemVariants}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="flex flex-col items-center p-4 rounded-lg bg-accent/10">
            <Code className="mb-2" />
            <span className="text-2xl font-bold">20+</span>
            <span className="text-sm text-muted-foreground">Projects</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-accent/10">
            <Terminal className="mb-2" />
            <span className="text-2xl font-bold">3+</span>
            <span className="text-sm text-muted-foreground">Years Exp.</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-accent/10">
            <Star className="mb-2" />
            <span className="text-2xl font-bold">100%</span>
            <span className="text-sm text-muted-foreground">Satisfaction</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-accent/10">
            <Mail className="mb-2" />
            <span className="text-2xl font-bold">24/7</span>
            <span className="text-sm text-muted-foreground">Support</span>
          </div>
        </motion.div>

      </motion.div>
    </div>
  )
}
