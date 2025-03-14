'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, Award, ExternalLink, MapPin, Calendar, ChevronRight, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

// Define interfaces for type safety
interface Experience {
  title: string;
  company: string;
  period: string;
  location?: string;
  responsibilities?: string[];
  description?: string;
  skills?: string[];
  logo?: string;
}

interface Education {
  degree: string;
  school: string;
  period: string;
  achievements?: string[];
  gpa?: string;
  logo?: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  link: string;
  skills?: string[];
  logo?: string;
}

const experiences: Experience[] = [
  {
    title: "SDE Intern",
    company: "iServeu",
    period: "2024 - Present",
    location: "Bhubaneswar, Odisha",
    description:
      "As a Full Stack Developer, I work with React, Next.js, Node.js, Go, PostgreSQL, and MongoDB, focusing on scalable fintech applications. I optimize performance with pprof, Grafana, and Prometheus for memory profiling and monitoring.",
    skills: ["React", "Next.js", "Node.js", "Go", "PostgreSQL", "MongoDB", "Grafana", "Prometheus"],
    logo: "/images/iserveu.avif"
  },
  {
    title: "Data Engineer",
    company: "DRDO",
    period: "May 2024 - July 2024",
    location: "Chandipur, Balasore, Odisha",
    description:
      "Worked on lift-off detection of flight vehicles using Apache Kafka. My role involved designing a real-time data streaming system to process and analyze telemetry data for accurate launch event detection.",
    skills: ["Apache Kafka", "Data Streaming", "Real-time Analytics", "Telemetry"],
    logo: "/images/drdo.jpeg"
  },
];

const education: Education[] = [
  {
    degree: "Bachelor of Technology in Electronics and TeleCommunication Engineering",
    school: "Veer Surendra Sai University of Technology",
    period: "2021 - 2025",
    gpa: "8.5/10",
    achievements: [
      "Led the University's Web Development Club",
      "Mentored Juniors through LiftOff C++ – Helped juniors strengthen their C++ programming skills, guiding them on DSA, problem-solving, and competitive programming.",
      "Taught Underprivileged Students at Sanskar Kendra – Volunteered as a mentor."
    ],
    logo: "/images/vssut.png"
  }
];

const certifications: Certification[] = [
  {
    name: "Cisco Certification",
    issuer: "Cisco Network Academy",
    date: "2023",
    link: "https://drive.google.com/drive/folders/1KrtYqcWasnZpqGeZd4_GEnLr6aO7OWgm?usp=sharing",
    skills: ["Networking", "Network Security", "Routing & Switching"],
    logo: "/images/cisco.png"
  },
  {
    name: "Google Cloud Certification",
    issuer: "Google Cloud",
    date: "2022",
    link: "https://drive.google.com/drive/",
    skills: ["Cloud Computing", "GCP", "Cloud Architecture"],
    logo: "/images/google.png"
  }
];

// Improved card animation with optimized performance
const CardAnimation = ({ children, index, delay = 0.05 }: { children: React.ReactNode, index: number, delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ 
        type: "spring", 
        damping: 15, 
        stiffness: 90, 
        delay: index * delay 
      }}
      whileHover={{ 
        scale: 1.02, 
        transition: { duration: 0.2 }
      }}
      className="transform will-change-transform perspective-1000"
    >
      {children}
    </motion.div>
  );
};

// Enhanced glass morphism background component with better performance
const GlassMorphism = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 bg-card/40 dark:bg-card/20 backdrop-blur-md rounded-2xl border border-white/10 dark:border-white/5 shadow-xl ${className}`} />
);

// Optimized background pattern with reduced opacity for better contrast
const BackgroundPattern = () => (
  <div className="absolute inset-0 overflow-hidden opacity-3 pointer-events-none select-none">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

// New section component for consistent styling
const Section = ({ id, title, icon, children }: { id: string, title: string, icon: React.ReactNode, children: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <motion.section 
      id={id}
      ref={ref}
      className="mb-32 relative"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="flex items-center mb-12"
        initial={{ x: -20, opacity: 0 }}
        animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
          <div className="relative bg-gradient-to-br from-primary to-accent p-3 rounded-full">
            {icon}
          </div>
        </div>
        <h2 className="text-4xl font-bold ml-4 tracking-tight">{title}</h2>
      </motion.div>
      {children}
    </motion.section>
  );
};

export default function ExperiencePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  // Ensure theme-related code only runs client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isDark = isMounted && theme === 'dark';
  const yPositionHeader = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const timelineProgress = useTransform(scrollYProgress, [0, 0.9], [0, 1]);

  // Intersection observer for navigation highlighting
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({ 
        top: section.offsetTop - 100, 
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background font-sans" ref={containerRef} aria-label="Experience and education of Amit Kumar Satapathy">
      {/* Enhanced background effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 animate-gradient-slow" />
      <BackgroundPattern />
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/4 top-1/4 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-float-slow"></div>
        <div className="absolute right-1/4 bottom-1/3 w-80 h-80 rounded-full bg-accent/5 blur-3xl animate-float-slow-reverse"></div>
        <div className="absolute top-2/3 left-1/3 w-40 h-40 rounded-full bg-secondary/5 blur-3xl animate-pulse"></div>
      </div>

      {/* Improved Navigation Bar with active state indicators */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <h1 className="text-xl font-semibold text-primary">Amit Kumar Satapathy</h1>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1.5 text-xs"
              onClick={() => window.open('/Amit_Kumar_Satapathy_Resume.pdf', '_blank')}
            >
              <Download className="w-3.5 h-3.5" />
              Download CV
            </Button>
          </div>
          <nav className="flex gap-2 sm:gap-4">
            <button 
              onClick={() => scrollToSection('experience-section')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeSection === "experience-section" 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Experience</span>
            </button>
            <button 
              onClick={() => scrollToSection('education-section')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeSection === "education-section" 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Education</span>
            </button>
            <button 
              onClick={() => scrollToSection('certification-section')}
              className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                activeSection === "certification-section" 
                  ? "bg-primary/10 text-primary" 
                  : "text-gray-700 dark:text-gray-300 hover:bg-primary/10 hover:text-primary"
              }`}
            >
              <Award className="w-4 h-4" />
              <span className="hidden sm:inline">Certifications</span>
            </button>
          </nav>
        </div>
      </div>

      <div className="container relative mx-auto px-4 py-24 z-10">
        {/* Enchanced Header with better animation */}
        <motion.div 
          className="text-center mb-24"
          style={{ y: yPositionHeader, opacity: headerOpacity }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block mb-4">
            <div className="relative">
              <span className="absolute inset-0 flex items-center justify-center blur-xl opacity-30">
                <span className="text-5xl md:text-7xl font-black text-primary">Journey</span>
              </span>
              <h1 className="relative text-4xl md:text-6xl font-black mb-4 tracking-tight">
                Professional <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent animate-gradient-x">Journey</span>
              </h1>
            </div>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            An overview of my professional experiences, educational background, and certifications
          </p>
          <div className="flex justify-center mt-8">
            <div className="w-24 h-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full"></div>
          </div>
        </motion.div>

        <motion.div 
          className="fixed left-8 top-1/2 transform -translate-y-1/2 w-1 h-1/3 bg-gradient-to-b from-primary/30 via-accent/30 to-transparent rounded-full hidden lg:block"
          style={{ scaleY: timelineProgress }}
        />

        {/* Experience Section - Using the new Section component */}
        <Section 
          id="experience-section" 
          title="Professional Experience" 
          icon={<Briefcase className="w-6 h-6 text-white" aria-hidden="true" />}
        >
          <div className="space-y-12 relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-transparent hidden md:block"></div>
            {experiences.map((experience, index) => (
              <CardAnimation key={index} index={index}>
                <div className="md:pl-16 relative group">
                  <motion.div 
                    className="absolute left-4 top-10 w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center hidden md:flex z-10"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-primary"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <div className="relative overflow-hidden rounded-2xl transition-all duration-300 group-hover:shadow-xl">
                    <GlassMorphism />
                    <div className="relative p-6 md:p-8 z-10">
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="shrink-0">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-card shadow-md flex items-center justify-center p-2 border border-white/10 dark:border-white/5">
                            {experience.logo ? (
                              <img 
                                src={experience.logo} 
                                alt={`${experience.company} logo`} 
                                className="w-12 h-12 object-contain"
                                loading="lazy"
                              />
                            ) : (
                              <Briefcase className="w-8 h-8 text-primary" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                            <div>
                              <h3 className="text-2xl font-bold">{experience.title}</h3>
                              <h4 className="text-xl font-medium text-primary mt-1">{experience.company}</h4>
                            </div>
                            <div className="mt-2 md:mt-0 flex flex-col md:items-end space-y-1">
                              <div className="flex items-center text-muted-foreground">
                                <Calendar className="w-4 h-4 mr-2 text-primary/70" />
                                <span>{experience.period}</span>
                              </div>
                              {experience.location && (
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <MapPin className="w-4 h-4 mr-2 text-primary/70" />
                                  <span>{experience.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="text-card-foreground leading-relaxed">{experience.description}</p>
                            {experience.skills && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {experience.skills.map((skill, idx) => (
                                  <Badge key={idx} variant="outline" className="bg-primary/5 border-primary/20 hover:bg-primary/10 transition-colors duration-200">
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-full"></div>
                  </div>
                </div>
              </CardAnimation>
            ))}
          </div>
        </Section>

        {/* Education Section - Using the new Section component */}
        <Section 
          id="education-section" 
          title="Education" 
          icon={<GraduationCap className="w-6 h-6 text-white" aria-hidden="true" />}
        >
          <div className="space-y-12 relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-accent/50 to-transparent hidden md:block"></div>
            {education.map((edu, index) => (
              <CardAnimation key={index} index={index}>
                <div className="md:pl-16 relative group">
                  <motion.div 
                    className="absolute left-4 top-10 w-8 h-8 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center hidden md:flex z-10"
                    whileHover={{ scale: 1.2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-primary"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                  <div className="relative overflow-hidden rounded-2xl transition-all duration-300 group-hover:shadow-xl">
                    <GlassMorphism />
                    <div className="relative p-6 md:p-8 z-10">
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="shrink-0">
                          <div className="w-16 h-16 rounded-xl overflow-hidden bg-card shadow-md flex items-center justify-center p-2 border border-white/10 dark:border-white/5">
                            {edu.logo ? (
                              <img 
                                src={edu.logo} 
                                alt={`${edu.school} logo`} 
                                className="w-12 h-12 object-contain"
                                loading="lazy"
                              />
                            ) : (
                              <GraduationCap className="w-8 h-8 text-primary" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                            <div>
                              <h3 className="text-2xl font-bold">{edu.degree}</h3>
                              <h4 className="text-xl font-medium text-primary mt-1">{edu.school}</h4>
                            </div>
                            <div className="mt-2 md:mt-0 flex flex-col md:items-end space-y-1">
                              <div className="flex items-center text-muted-foreground">
                                <Calendar className="w-4 h-4 mr-2 text-primary/70" />
                                <span>{edu.period}</span>
                              </div>
                              {edu.gpa && (
                                <Badge variant="secondary" className="bg-primary/10 border-0 text-primary font-medium">
                                  GPA: {edu.gpa}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="mt-6">
                            <h5 className="font-semibold mb-4 text-lg">Achievements & Activities</h5>
                            <ul className="space-y-3">
                              {edu.achievements?.map((achievement, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  whileInView={{ opacity: 1, x: 0 }}
                                  viewport={{ once: true }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-start"
                                >
                                  <div className="bg-gradient-to-r from-primary/50 to-accent/50 rounded-full p-1 mr-3 mt-1 shrink-0">
                                    <ChevronRight className="w-3 h-3 text-white" />
                                  </div>
                                  <span className="leading-relaxed">{achievement}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-primary/10 to-transparent rounded-tl-full"></div>
                  </div>
                </div>
              </CardAnimation>
            ))}
          </div>
        </Section>

        {/* Certification Section - Using the new Section component */}
        <Section 
          id="certification-section" 
          title="Certifications" 
          icon={<Award className="w-6 h-6 text-white" aria-hidden="true" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <CardAnimation key={index} index={index} delay={0.1}>
                <div 
                  className="relative overflow-hidden rounded-2xl h-full transition-all duration-300 group hover:shadow-xl"
                  onMouseMove={(e) => {
                    if (window.innerWidth < 768) return;
                    const card = e.currentTarget;
                    const box = card.getBoundingClientRect();
                    const x = e.clientX - box.left;
                    const y = e.clientY - box.top;
                    const centerX = box.width / 2;
                    const centerY = box.height / 2;
                    const rotateX = (y - centerY) / 15;
                    const rotateY = (centerX - x) / 15;
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                  }}
                  onMouseLeave={(e) => {
                    const card = e.currentTarget;
                    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
                  }}
                >
                  <GlassMorphism className="group-hover:bg-card/50 dark:group-hover:bg-card/30" />
                  <div className="relative p-6 md:p-8 z-10 h-full flex flex-col">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="shrink-0">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-card shadow-md flex items-center justify-center p-2 border border-white/10 dark:border-white/5">
                          {cert.logo ? (
                            <img 
                              src={cert.logo} 
                              alt={`${cert.name} logo`} 
                              className="w-8 h-8 object-contain"
                              loading="lazy"
                            />
                          ) : (
                            <Award className="w-6 h-6 text-primary" />
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold text-xl">{cert.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-muted-foreground">{cert.issuer}</span>
                          <span className="inline-block w-1 h-1 rounded-full bg-muted-foreground"></span>
                          <span className="text-sm text-primary">{cert.date}</span>
                        </div>
                      </div>
                    </div>
                    {cert.skills && (
                      <div className="flex flex-wrap gap-1 my-4">
                        {cert.skills.map((skill, idx) => (
                          <Badge key={idx} variant="outline" className="bg-accent/10 border-accent/20 text-accent-foreground">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="mt-auto pt-4 border-t border-accent/10">
                      <Button
                        asChild
                        variant="default"
                        size="sm"
                        className="group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-200"
                      >
                        <a 
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${cert.name} certificate`}
                        >
                          View Certificate
                          <ExternalLink className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 duration-200" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-full"></div>
                </div>
              </CardAnimation>
            ))}
          </div>
        </Section>

        {/* Added footer for professional touch */}
        
      </div>
    </div>
  );
}