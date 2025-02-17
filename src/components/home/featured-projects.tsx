'use client'
import { motion } from 'framer-motion'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const featuredProjects = [
  {
    title: "Snapgram",
    description: "SnapGram is a social media platform designed for seamless photo and video sharing, built with a modern tech stack. It allows users to upload, edit, and share their moments with an interactive feed, likes, comments, and real-time engagement. The platform is optimized for performance and scalability, ensuring a smooth user experience.",
    image: "/images/project1.png",
    tags: ["React", "Node.js", "MongoDB"],
    link: "https://snapbook-bay.vercel.app/"
  },
  {
    title: "Snapgram",
    description: "SnapGram is a social media platform designed for seamless photo and video sharing, built with a modern tech stack. It allows users to upload, edit, and share their moments with an interactive feed, likes, comments, and real-time engagement. The platform is optimized for performance and scalability, ensuring a smooth user experience.",
    image: "/images/project1.png",
    tags: ["React", "Node.js", "MongoDB"],
    link: "https://snapbook-bay.vercel.app/"
  },
  {
    title: "Snapgram",
    description: "SnapGram is a social media platform designed for seamless photo and video sharing, built with a modern tech stack. It allows users to upload, edit, and share their moments with an interactive feed, likes, comments, and real-time engagement. The platform is optimized for performance and scalability, ensuring a smooth user experience.",
    image: "/images/project1.png",
    tags: ["React", "Node.js", "MongoDB"],
    link: "https://snapbook-bay.vercel.app/"
  },
  // Add more featured projects
]

export default function FeaturedProjects() {
  return (
    <section className="py-20 bg-accent/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground">
            Some of my recent work that I'm proud of
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="relative h-48 rounded-t-lg overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardTitle className="mt-4">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-sm rounded-full bg-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link href={project.link}>
                    <Button variant="outline" className="w-full">
                      View Project
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
