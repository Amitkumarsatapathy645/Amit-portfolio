'use client'
import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'
import { motion } from 'framer-motion'
import Hero from '@/components/home/hero'
import FeaturedProjects from '@/components/home/featured-projects'
 
export default function HomePage() {
  return (
    <div>
      <Hero />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            })
          }}
        >
          <ArrowDown className="h-6 w-6 animate-bounce" />
        </Button>
      </motion.div>

      <FeaturedProjects />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Let's Work Together</h2>
            <p className="text-lg text-muted-foreground mb-8">
              I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            <Button asChild size="lg">
              <a href="mailto:amitkumarsatapathy645@gmail.com">
                Get In Touch
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}