'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, GraduationCap, Award } from 'lucide-react'

// Define interfaces for type safety
interface Experience {
  title: string;
  company: string;
  period: string;
  location?: string;
  responsibilities?: string[];
  description?: string;
}

interface Education {
  degree: string;
  school: string;
  period: string;
  achievements?: string[];
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  link: string;
}

const experiences: Experience[] = [
  {
    title: "SDE Intern",
    company: "iServeu",
    period: "2024 - Present",
    location: "Bhubaneswar, Odisha",
    description:
      "As a Full Stack Developer, I work with React, Next.js, Node.js, Go, PostgreSQL, and MongoDB, focusing on scalable fintech applications. I optimize performance with pprof, Grafana, and Prometheus for memory profiling and monitoring.",
  },
  {
    title: "Data Engineer",
    company: "DRDO",
    period: "May 2024 - July 2024",
    location: "Chandipur, Balasore, Odisha",
    description:
      "Worked on lift-off detection of flight vehicles using Apache Kafka. My role involved designing a real-time data streaming system to process and analyze telemetry data for accurate launch event detection.",
  },
  // ... (add other experiences as needed)
];

const education: Education[] = [
  {
    degree: "Bachelor of Technology in Electronics and TeleCommunication Engineering",
    school: "Veer Surendra Sai University of Technology",
    period: "2021 - 2025",
    achievements: [
      "Led the University's Web Development Club",
      "Mentored Juniors through LiftOff C++ – Helped juniors strengthen their C++ programming skills, guiding them on DSA, problem-solving, and competitive programming.",
      "Taught Underprivileged Students at Sanskar Kendra – Volunteered as a mentor."
    ]
  }
];

const certifications: Certification[] = [
  {
    name: "Cisco Certification",
    issuer: "Cisco Network Academy",
    date: "2023",
    link: "https://drive.google.com/drive/folders/1KrtYqcWasnZpqGeZd4_GEnLr6aO7OWgm?usp=sharing"
  },
  {
    name: "Google Cloud Certification",
    issuer: "Google Cloud",
    date: "2022",
    link: "https://drive.google.com/drive/"
  }
];

interface FloatingShape {
  x: number
  y: number
  duration: number
}

export default function ExperiencePage() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [floatingShapes, setFloatingShapes] = useState<FloatingShape[]>([])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
      
      const shapes = [...Array(3)].map(() => ({
        x: Math.random() * window.innerWidth,
        y: -100,
        duration: Math.random() * 5 + 10,
      }))
      
      setFloatingShapes(shapes)
    }
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
    <div className="relative min-h-screen" aria-label="Experience and education of Amit Kumar Satapathy">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-gradient-xy" />
      
      {/* Floating shapes */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute h-24 w-24 rounded-full bg-primary/5 will-change-transform"
            aria-hidden="true"
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
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My{' '}
              <span className="gradient-text">Journey</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A timeline of my professional experience and education
            </p>
          </motion.div>

          {/* Professional Experience */}
          <motion.section variants={itemVariants} className="mb-16">
            <div className="flex items-center mb-8">
              <Briefcase className="w-6 h-6 mr-2 text-primary" aria-hidden="true" />
              <h2 className="text-3xl font-bold">Professional Experience</h2>
            </div>
            <div className="space-y-6">
              {experiences.map((experience, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="transform transition-all"
                >
                  <Card className="bg-card/50 backdrop-blur-sm border border-accent/20">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        {experience.title}
                      </CardTitle>
                      <div className="text-muted-foreground">
                        {experience.company} • {experience.period}
                      </div>
                      {experience.location && (
                        <div className="text-sm text-muted-foreground">
                          {experience.location}
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p>{experience.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Education */}
          <motion.section variants={itemVariants} className="mb-16">
            <div className="flex items-center mb-8">
              <GraduationCap className="w-6 h-6 mr-2 text-primary" aria-hidden="true" />
              <h2 className="text-3xl font-bold">Education</h2>
            </div>
            <div className="space-y-6">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="transform transition-all"
                >
                  <Card className="bg-card/50 backdrop-blur-sm border border-accent/20">
                    <CardHeader>
                      <CardTitle>{edu.degree}</CardTitle>
                      <div className="text-muted-foreground">
                        {edu.school} • {edu.period}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 list-disc pl-5">
                        {edu.achievements?.map((achievement, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start"
                          >
                            {achievement}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Certifications */}
          <motion.section variants={itemVariants}>
            <div className="flex items-center mb-8">
              <Award className="w-6 h-6 mr-2 text-primary" aria-hidden="true" />
              <h2 className="text-3xl font-bold">Certifications</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="transform transition-all"
                >
                  <Card className="bg-card/50 backdrop-blur-sm border border-accent/20">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-lg mb-2">{cert.name}</h3>
                      <p className="text-muted-foreground mb-4">
                        {cert.issuer} • {cert.date}
                      </p>
                      <motion.a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline inline-flex items-center"
                        whileHover={{ x: 5 }}
                        aria-label={`View ${cert.name} certificate`}
                      >
                        View Certificate
                        <motion.span className="ml-1">→</motion.span>
                      </motion.a>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  )
}