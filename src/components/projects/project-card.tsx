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
      role="article"
      aria-label={`Project: ${title}`}
    >
      <div className="relative h-48 mb-4">
        <Image
          src={imageUrl}
          alt={`${title} project screenshot`}
          fill
          className="rounded-md object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false} // Adjust based on visibility
        />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {technologies.map((tech) => (
          <span key={tech} className="px-2 py-1 bg-accent rounded-md text-sm" aria-label={`Technology: ${tech}`}>
            {tech}
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <Button asChild variant="outline" aria-label={`View ${title} on GitHub`}>
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</Link>
        </Button>
        {liveUrl && (
          <Button asChild aria-label={`View live demo of ${title}`}>
            <Link href={liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</Link>
          </Button>
        )}
      </div>
    </motion.div>
  )
}