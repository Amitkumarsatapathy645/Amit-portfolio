'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ProjectCard } from '@/components/projects/project-card'
import { Button } from '@/components/ui/button'

interface FloatingShape {
  x: number
  y: number
  duration: number
}

const projects = [
  {
    title: "Snapgram",
    description: "A full-stack e-commerce platform with real-time inventory and payment processing",
    technologies: ["React.js", "TypeScript", "Stripe"],
    githubUrl: "https://github.com/Amitkumarsatapathy645",
    liveUrl: "https://snapbook-bay.vercel.app/",
    imageUrl: "/images/project1.png"
  },
  {
    title: "Snapgram",
    description: "A full-stack e-commerce platform with real-time inventory and payment processing",
    technologies: ["React.js", "TypeScript", "Stripe"],
    githubUrl: "https://github.com/Amitkumarsatapathy645",
    liveUrl: "https://snapbook-bay.vercel.app/",
    imageUrl: "/images/project1.png"
  },
  {
    title: "Snapgram",
    description: "A full-stack e-commerce platform with real-time inventory and payment processing",
    technologies: ["React.js", "TypeScript", "Stripe"],
    githubUrl: "https://github.com/Amitkumarsatapathy645",
    liveUrl: "https://snapbook-bay.vercel.app/",
    imageUrl: "/images/project1.png"
  },
  // ... other projects
]

const technologies = ["All", "Next.js", "React.js", "TypeScript", "Node.js"]

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All")
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

  const filteredProjects = projects.filter(project =>
    filter === "All" ? true : project.technologies.includes(filter)
  )

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="relative min-h-screen">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-gradient-xy" />
      
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

      <div className="container relative mx-auto px-4 py-24 z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div 
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My{' '}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
                Projects
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A collection of my recent work and side projects
            </p>
          </motion.div>

          {/* Filter buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-2 justify-center mb-12"
          >
            {technologies.map((tech) => (
              <motion.div
                key={tech}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant={filter === tech ? "default" : "outline"}
                  onClick={() => setFilter(tech)}
                  className="mb-2 backdrop-blur-sm"
                >
                  {tech}
                </Button>
              </motion.div>
            ))}
          </motion.div>

          {/* Projects grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="transform transition-all"
              >
                <ProjectCard {...project} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}