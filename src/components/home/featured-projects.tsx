'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const featuredProjects = [
  {
    title: "Snapgram",
    description: "A high-performance social platform enabling real-time sharing of photos, videos, and stories with intuitive UI and advanced engagement features.",
    image: "/images/project1.png",
    tags: ["React", "Node.js", "MongoDB"],
    link: "https://snapbook-bay.vercel.app/",
    github: "https://github.com/yourusername/snapgram",
    highlights: ["Real-time notifications", "Responsive design", "Advanced media handling"]
  },
  {
    title: "JOBX Portal",
    description: "Comprehensive job marketplace connecting professionals and employers with AI-powered matching, seamless application process, and detailed analytics.",
    image: "/images/project2.png",
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Cloudinary", "Framer Motion"],
    link: "",
    github: "https://github.com/yourusername/jobx",
    highlights: ["AI job matching", "Advanced search filters", "Application tracking"]
  },
  {
    title: "CustomTee",
    description: "Interactive 3D t-shirt design application allowing users to create personalized apparel with realistic visualization, custom patterns, and color variants.",
    image: "/images/project3.jpg",
    tags: ["Three.js", "Vite", "React", "Tailwind CSS", "Node.js & Express"],
    link: "",
    github: "https://github.com/yourusername/customtee",
    highlights: ["Real-time 3D rendering", "Texture customization", "Export functionality"]
  },
]

export default function FeaturedProjects() {
  // Enhanced slider settings with custom navigation
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    pauseOnHover: true,
    dotsClass: "slick-dots custom-dots",
    customPaging: () => (
      <div className="custom-dot w-2 h-2 rounded-full bg-primary/30"></div>
    )
  };

  // Animation variants with staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  return (
    <section 
      className="py-20 md:py-28 bg-gradient-to-b from-background to-accent/5 animate-on-scroll" 
      aria-label="Featured projects by Amit Kumar Satapathy"
      id="projects"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            Featured Projects
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full mx-auto mb-6" />
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions demonstrating technical expertise across diverse domains and technologies
          </p>
        </motion.div>

        {/* Desktop and Tablet View (≥768px) */}
        <motion.div 
          className="hidden md:block"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        > 
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                role="article"
                className="w-full"
              >
                <Card className="h-full overflow-hidden border border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-lg transition-all duration-300">
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={`${project.title} project screenshot`}
                      fill
                      className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl font-bold tracking-tight">{project.title}</CardTitle>
                    <CardDescription className="text-base line-clamp-3">{project.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                          aria-label={`Technology: ${tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 4 && (
                        <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                          +{project.tags.length - 4}
                        </span>
                      )}
                    </div>
                    
                    <ul className="text-sm space-y-1">
                      {project.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-start">
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                          <span className="text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  
                  <CardFooter className="flex gap-3 pt-2">
                    <Button 
                      variant="default" 
                      size="sm" 
                      className="flex-1 bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 transition-opacity"
                      asChild
                    >
                      <Link href={project.link || "#"} target={project.link ? "_blank" : "_self"}>
                        <span className="flex items-center justify-center">
                          Demo
                          <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                        </span>
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                      asChild
                    >
                      <Link href={project.github} target="_blank">
                        <span className="flex items-center justify-center">
                          Code
                          <Github className="ml-1.5 h-3.5 w-3.5" />
                        </span>
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Mobile View (<768px) */}
        <div className="md:hidden">
          <div className="max-w-md mx-auto">
            <Slider {...sliderSettings} className="project-slider" aria-label="Featured projects carousel">
              {featuredProjects.map((project, index) => (
                <div key={index} className="p-2">
                  <Card className="h-full border border-border/40 bg-card/50 backdrop-blur-sm">
                    <div className="relative h-44 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} project screenshot`}
                        fill
                        className="object-cover w-full h-full"
                        sizes="100vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    </div>
                    
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-bold">{project.title}</CardTitle>
                      <CardDescription className="text-sm line-clamp-2">{project.description}</CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-3 pb-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex gap-2 pt-0">
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="flex-1 bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 transition-opacity text-xs"
                        asChild
                      >
                        <Link href={project.link || "#"} target={project.link ? "_blank" : "_self"}>
                          <span className="flex items-center justify-center">
                            Demo
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </span>
                        </Link>
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1 text-xs"
                        asChild
                      >
                        <Link href={project.github} target="_blank">
                          <span className="flex items-center justify-center">
                            Code
                            <Github className="ml-1 h-3 w-3" />
                          </span>
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-12 md:mt-16"
        >
          <Button 
            asChild 
            size="lg" 
            className="bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 transition-opacity"
            aria-label="View all projects"
          >
            <Link href="/projects" className="group">
              <span className="flex items-center">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
              </span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}