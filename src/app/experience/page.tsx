'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Briefcase, GraduationCap, Award } from 'lucide-react'

// Define the data objects at the top of the file
const experiences = [
  {
    title: "SDE Intern",
    company: "iServeu",
    period: "2024 - Present",
    location: "Bhubaneswar,Odisha",
    responsibilities: [
      "Contributing to the development of scalable fintech applications using React, Next.js, Node.js, Go, PostgreSQL, and MongoDB, ensuring seamless integration and efficient data handling.",
      "Contributing to performance optimization by utilizing pprof for memory profiling and optimizing backend processes for improved resource utilization and speed.",
      "Contributing to system monitoring by implementing Grafana and Prometheus, enabling real-time performance tracking and ensuring application stability and reliability.",
    ]
  },
  {
    title: "Data Engineer",
    company: "DRDO",
    period: "May 2024 - July 2024",
    location: "Chandipur,Balasore, Odisha",
    responsibilities: [
      "Designed a real-time data streaming system using Apache Kafka to handle large volumes of telemetry data for flight vehicle lift-off detection.",
      "Developed data processing pipelines to analyze real-time telemetry feeds, ensuring timely detection of critical launch events.",
      "Optimized system performance and reliability by fine-tuning Kafka configurations and integrating fault-tolerant mechanisms for accurate and continuous event detection."
    ]
  }
]

const education = [
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
]

const certifications = [
  {
    name: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2023",
    link: "https://aws.amazon.com/certification/"
  },
  {
    name: "Professional Web Developer",
    issuer: "FreeCodeCamp",
    date: "2022",
    link: "https://www.freecodecamp.org/"
  }
]

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
      
      const shapes = [...Array(5)].map(() => ({
        x: Math.random() * window.innerWidth,
        y: -100,
        duration: Math.random() * 10 + 20,
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
    <div className="relative min-h-screen ">
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
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My{' '}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
                Journey
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A timeline of my professional experience and education
            </p>
          </motion.div>

          {/* Professional Experience */}
          <motion.section variants={itemVariants} className="mb-16">
            <div className="flex items-center mb-8">
              <Briefcase className="w-6 h-6 mr-2 text-primary" />
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
                      <div className="text-sm text-muted-foreground">
                        {experience.location}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {experience.responsibilities.map((responsibility, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start"
                          >
                            <span className="w-2 h-2 rounded-full bg-primary/60 mr-2 mt-2" />
                            {responsibility}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Education */}
          <motion.section variants={itemVariants} className="mb-16">
            <div className="flex items-center mb-8">
              <GraduationCap className="w-6 h-6 mr-2 text-primary" />
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
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start"
                          >
                            <span className="w-2 h-2 rounded-full bg-primary/60 mr-2 mt-2" />
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
              <Award className="w-6 h-6 mr-2 text-primary" />
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