'use client'

import { useState, useRef } from 'react'
import { motion, useInView, useScroll } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { IoArrowForward, IoCalendarOutline, IoBusinessOutline, IoCheckmarkCircle } from 'react-icons/io5'

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  achievements: string[];
  color: string;
}

const experiences: Experience[] = [
  {
    title: "SDE Intern",
    company: "iServeu",
    period: "2024 - Present",
    description:
      "As a Full Stack Developer, I work with React, Next.js, Node.js, Go, PostgreSQL, and MongoDB, focusing on scalable fintech applications. I optimize performance with pprof, Grafana, and Prometheus for memory profiling and monitoring.",
    technologies: ["React", "Next.js", "Node.js", "Go", "PostgreSQL", "MongoDB", "Grafana", "Prometheus"],
    achievements: [
      "Improved application performance by 40% through code optimization",
      "Implemented real-time monitoring system using Grafana and Prometheus",
      "Developed responsive UI components with React and Next.js"
    ],
    color: "from-blue-500 to-indigo-500"
  },
  {
    title: "Data Engineer",
    company: "DRDO",
    period: "May 2024 - July 2024",
    description:
      "Worked on lift-off detection of flight vehicles using Apache Kafka. My role involved designing a real-time data streaming system to process and analyze telemetry data for accurate launch event detection.",
    technologies: ["Apache Kafka", "Python", "Data Analytics", "Real-time Processing"],
    achievements: [
      "Designed real-time data streaming system for telemetry analysis",
      "Improved detection accuracy by 25% through algorithm optimization",
      "Collaborated with cross-functional teams on mission-critical systems"
    ],
    color: "from-green-500 to-teal-500"
  },
  {
    title: "Frontend Intern",
    company: "RadicaiAI",
    period: "June 2023 - September 2023",
    description:
      "At Radical AI, I worked on SEO optimization and API development. My role involved enhancing website visibility through technical SEO and optimizing APIs for better performance and scalability.",
    technologies: ["SEO", "API Development", "JavaScript", "React", "Analytics"],
    achievements: [
      "Increased organic traffic by 35% through technical SEO enhancements",
      "Optimized API response times by 50% through caching strategies",
      "Developed reusable UI components that improved development efficiency"
    ],
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Django Developer",
    company: "Suravi.io",
    period: "October 2023 - January 2024",
    description:
      "At Suravi.io, I worked as a Django Developer, focusing on backend development and API integration. My role involved building scalable web applications, optimizing database queries, and ensuring efficient data handling using Django, PostgreSQL, and REST APIs.",
    technologies: ["Django", "PostgreSQL", "REST APIs", "Python", "Backend Development"],
    achievements: [
      "Improved database query performance by 30% through optimization",
      "Developed secure authentication system with JWT implementation",
      "Created comprehensive API documentation that improved team efficiency"
    ],
    color: "from-amber-500 to-red-500"
  },
];

export function ExperienceTimeline() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <motion.div 
      ref={containerRef}
      className="relative py-8 pb-16"
      aria-label="Timeline of professional experience"
    >
      {/* Vertical progress line */}
      <div className="absolute left-0 right-0 mx-auto w-1 h-full bg-accent/30 max-w-screen-lg" />
      
      {/* Progress indicator */}
      <motion.div 
        className="absolute left-0 right-0 mx-auto w-1 bg-primary origin-top max-w-screen-lg"
        style={{ 
          height: scrollYProgress.get() * 100 + '%',
          opacity: Math.min(1, scrollYProgress.get() * 1.5)
        }}
      />

      <div className="max-w-screen-lg mx-auto space-y-32">
        {experiences.map((experience, index) => {
          const isActive = activeCard === index;
          
          return (
            <ExperienceCard 
              key={index}
              experience={experience}
              index={index}
              isActive={isActive}
              setActive={() => setActiveCard(isActive ? null : index)}
            />
          );
        })}
      </div>
    </motion.div>
  );
}

const ExperienceCard = ({ 
  experience, 
  index, 
  isActive,
  setActive 
}: { 
  experience: Experience;
  index: number;
  isActive: boolean;
  setActive: () => void;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      ref={cardRef}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Timeline dot */}
      <motion.div 
        className={`absolute left-0 right-0 mx-auto w-5 h-5 rounded-full z-10 bg-gradient-to-r ${experience.color}`}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15, delay: 0.2 }}
      />
      
      {/* Card container with alternating layout */}
      <div className={`flex ${index % 2 === 0 ? "justify-start pl-8" : "justify-end pr-8"} mx-auto max-w-2xl`}>
        <motion.div 
          className="w-full max-w-md"
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <Card className={`overflow-hidden border-0 shadow-lg ${isActive ? "shadow-xl" : "shadow-md"} transition-all duration-300`}>
            <div className={`h-2 bg-gradient-to-r ${experience.color}`} />
            
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <motion.div layout className="flex items-center space-x-2">
                  <div className={`p-2 rounded-full bg-gradient-to-r ${experience.color} text-white`}>
                    <IoBusinessOutline />
                  </div>
                  <span className="font-medium">{experience.company}</span>
                </motion.div>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <IoCalendarOutline className="mr-1" />
                  <span>{experience.period}</span>
                </div>
              </div>
              
              <motion.h3 
                className="text-xl font-bold mb-3"
                layout
              >
                {experience.title}
              </motion.h3>
              
              <motion.p 
                className="text-muted-foreground mb-4 text-sm"
                layout
              >
                {experience.description}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-2 mb-4"
                layout
              >
                {experience.technologies.slice(0, isActive ? undefined : 4).map(tech => (
                  <Badge key={tech} variant="secondary" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {!isActive && experience.technologies.length > 4 && (
                  <Badge variant="outline" className="text-xs">+{experience.technologies.length - 4}</Badge>
                )}
              </motion.div>
              
              <motion.div
                animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {isActive && (
                  <div className="pt-3 border-t">
                    <h4 className="text-sm font-medium mb-2 flex items-center">
                      <IoCheckmarkCircle className="mr-1 text-primary" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {experience.achievements.map((achievement, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-start text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="text-primary mr-2 mt-1">•</span>
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={setActive}
                className="mt-4 text-xs"
              >
                {isActive ? "Show less" : "Show more"}
                <IoArrowForward className={`ml-1 transition-transform ${isActive ? "rotate-90" : ""}`} />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};