import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  githubUrl: string
  liveUrl: string
  imageUrl: string
}

export function ProjectCard({
  title,
  description,
  technologies,
  githubUrl,
  liveUrl,
  imageUrl,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border bg-card p-4"
    >
      <div className="relative h-48 mb-4">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="rounded-md object-cover"
        />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span key={tech} className="px-2 py-1 bg-accent rounded-md text-sm">
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Button asChild variant="outline">
          <Link href={githubUrl}>GitHub</Link>
        </Button>
        <Button asChild>
          <Link href={liveUrl}>Live Demo</Link>
        </Button>
      </div>
    </motion.div>
  )
}
