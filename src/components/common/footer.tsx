'use client'

import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { siteConfig } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer 
      className="relative z-50 border-t bg-background" 
      role="contentinfo" 
      aria-label="Footer"
    >
      {/* Decorative top border gradient */}
      <div className="h-1 w-full bg-gradient-to-r from-primary via-blue-500 to-primary/40"></div>
      
      <div className="container mx-auto px-6 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl tracking-tight">Amit Kumar Satapathy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Building innovative digital experiences with 
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 font-medium"> passion</span> 
              and technical excellence.
            </p>
            
            {/* Social links */}
            <div className="flex items-center space-x-3 pt-2">
              <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-accent/10 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  aria-label="GitHub profile"
                >
                  <Github className="h-5 w-5" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-accent/10 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  aria-label="LinkedIn profile"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 400 }}>
                <Link
                  href={`mailto:${siteConfig.links.email}`}
                  className="p-2 rounded-full bg-accent/10 hover:bg-primary/10 hover:text-primary transition-all duration-200"
                  aria-label="Email Amit Kumar Satapathy"
                >
                  <Mail className="h-5 w-5" />
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#top" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/#insights" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Newsletter</h4>
            <p className="text-sm text-muted-foreground">
              Stay updated with cloud architecture trends and AWS best practices.
            </p>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="mt-2 group"
            >
              <Link
                href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7296782276594479105"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to my LinkedIn newsletter"
              >
                <span className="flex items-center">
                  Subscribe
                  <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </Button>
          </div>
          
          {/* Contact information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-base">Contact</h4>
            <address className="not-italic">
              <ul className="space-y-2">
                <li className="text-sm text-muted-foreground">
                  <Link 
                    href={`mailto:${siteConfig.links.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {siteConfig.links.email}
                  </Link>
                </li>
                <li className="text-sm text-muted-foreground">
                  <Link 
                    href={siteConfig.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    LinkedIn Profile
                  </Link>
                </li>
              </ul>
            </address>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-px w-full bg-border my-8"></div>
        
        {/* Copyright and policies */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Amit Kumar Satapathy. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}