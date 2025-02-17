import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(date)
}

// src/lib/constants.ts
export const siteConfig = {
  name: "Amit Kumar Satapathy",
  description: "Personal portfolio and blog",
  url: "https://yourportfolio.com",
  ogImage: "https://yourportfolio.com/og.jpg",
  links: {
    github: "https://github.com/amit645",
    linkedin: "https://www.linkedin.com/in/amit-kumar-satapathy-59547722a/",
    email: "amitkumarsatapathy645@gmail.com"
  }
}

export const navigationLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Contact', path: '/contact' }
]

export const skillsData = {
  languages: ["JavaScript", "TypeScript", "Python", "SQL"],
  frontend: ["React", "Next.js", "Vue.js", "Tailwind CSS"],
  backend: ["Node.js", "Express", "Django", "PostgreSQL"],
  tools: ["Git", "Docker", "AWS", "Firebase"],
  practices: ["Agile", "TDD", "CI/CD", "DevOps"]
}