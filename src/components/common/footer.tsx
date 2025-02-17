'use client'

import { Github, Linkedin, Mail } from 'lucide-react'

const GITHUB_URL = "https://github.com/Amitkumarsatapathy645"
const LINKEDIN_URL = "https://www.linkedin.com/in/amit-kumar-satapathy-59547722a/"
const EMAIL = "amitkumarsatapathy645@gmail.com"

export default function Footer() {
  return (
    <footer className="relative z-50 border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="font-bold text-lg">Amit Kumar Satapathy</h3>
            <p className="text-sm text-muted-foreground">
              Building digital experiences with{' '}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
                passion
              </span>
            </p>
          </div>
          
          <div className="flex space-x-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent/10 hover:text-primary transition-all duration-200"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full hover:bg-accent/10 hover:text-primary transition-all duration-200"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="p-2 rounded-full hover:bg-accent/10 hover:text-primary transition-all duration-200"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="text-center text-sm text-muted-foreground mt-8">
          © {new Date().getFullYear()} Amit Kumar Satapathy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}