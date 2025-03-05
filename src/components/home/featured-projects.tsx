'use client'

import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const featuredProjects = [
  {
    title: "Snapgram",
    description: "SnapGram – A fast and interactive social platform for sharing moments through photos, videos, and stories in real time.",
    image: "/images/project1.png",
    tags: ["React", "Node.js", "MongoDB"],
    link: "https://snapbook-bay.vercel.app/"
  },
  {
    title: "Job Portal",
    description: "JOBX – A fast, intuitive job portal connecting job seekers and employers with seamless applications and advanced filtering.",
    image: "/images/project2.png",
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Cloudinary", "Framer Motion"],
    link: ""
  },
  {
    title: "CustomTee",
    description: "CustomTee – A 3D T-shirt design app for creating personalized styles with ease using Three.js and Vite.",
    image: "/images/project3.jpg",
    tags: ["Three.js", "Vite", "React", "Tailwind CSS", "Node.js & Express"],
    link: ""
  },
]

export default function FeaturedProjects() {
  // Slider settings for mobile-only carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, 
  };


  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-accent/10 animate-on-scroll" aria-label="Featured projects by Amit Kumar Satapathy">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4">Featured Projects</h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Some of my recent work that I&apos;m proud of
          </p>
        </motion.div>

        {/* Mobile-Only Carousel (max-width: 768px) and Grid for Larger Screens */}
        <div className="hidden md:block"> {/* Grid for PC/tablet (≥768px) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                role="article"
                className="w-full"
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="relative h-32 sm:h-48 rounded-t-lg overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} project screenshot`}
                        fill
                        className="object-cover w-full h-full"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 33vw"
                      />
                    </div>
                    <CardTitle className="mt-2 sm:mt-4 text-lg sm:text-xl">{project.title}</CardTitle>
                    <CardDescription className="text-sm sm:text-base">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 sm:p-6">
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs sm:text-sm rounded-full bg-accent"
                          aria-label={`Technology: ${tag}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Link href={project.link} aria-label={`View ${project.title} project`}>
                      <Button variant="outline" className="w-full text-sm sm:text-base">
                        View Project
                        <ArrowRight className="ml-1 sm:ml-2 h-3 sm:h-4 w-3 sm:w-4" aria-hidden="true" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="md:hidden"> {/* Carousel for mobile (<768px) */}
          <div className="max-w-2xl mx-auto">
            <Slider {...sliderSettings} aria-label="Featured projects carousel (mobile)">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-2"
                >
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="relative h-32 rounded-t-lg overflow-hidden">
                        <Image
                          src={project.image}
                          alt={`${project.title} project screenshot`}
                          fill
                          className="object-cover w-full h-full"
                          sizes="(max-width: 640px) 100vw, 100vw"
                        />
                      </div>
                      <CardTitle className="mt-2 text-lg">{project.title}</CardTitle>
                      <CardDescription className="text-sm">{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-3">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-1.5 py-0.5 text-xs rounded-full bg-accent"
                            aria-label={`Technology: ${tag}`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <Link href={project.link} aria-label={`View ${project.title} project`}>
                        <Button variant="outline" className="w-full text-sm">
                          View Project
                          <ArrowRight className="ml-1 h-3 w-3" aria-hidden="true" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="text-center mt-6 sm:mt-12">
          <Button asChild size="lg" className="w-full sm:w-auto" aria-label="View all projects">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}