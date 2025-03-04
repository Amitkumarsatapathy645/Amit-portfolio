'use client'

import { Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '@/lib/utils'

export default function Footer() {
  return (
    <footer className="relative z-50 border-t bg-background" role="contentinfo" aria-label="Footer">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="font-bold text-lg">Amit Kumar Satapathy</h3>
            <p className="text-sm text-muted-foreground">
              Building digital experiences with{' '}
              <span className="gradient-text">passion</span>
            </p>
          </div>
          
          <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex space-x-4">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-accent/10 hover:text-primary transition-all duration-200"
                aria-label="GitHub profile"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-accent/10 hover:text-primary transition-all duration-200"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href={`mailto:${siteConfig.links.email}`}
                className="p-2 rounded-full hover:bg-accent/10 hover:text-primary transition-all duration-200"
                aria-label="Email Amit Kumar Satapathy"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>

            {/* New LinkedIn Newsletter Link */}
            <Link
              href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7296782276594479105"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
              aria-label="Subscribe to my LinkedIn newsletter"
            >
              Subscribe to My Newsletter
            </Link>
          </div>
        </div>
        
        <div className="text-center text-sm text-muted-foreground mt-8">
          © {new Date().getFullYear()} Amit Kumar Satapathy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}