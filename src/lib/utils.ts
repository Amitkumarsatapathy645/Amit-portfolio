import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date to a human-readable string
 * @param date - The Date object to format
 * @returns Formatted date string (e.g., "March 2025")
 */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    year: 'numeric'
  }).format(date)
}

// Interfaces for type safety
interface SiteConfigLinks {
  github: string;
  linkedin: string;
  email: string;
  newsletter?: string; // Added for LinkedIn newsletter
}

interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: SiteConfigLinks;
}

interface NavigationLink {
  name: string;
  path: string;
}

interface SkillsData {
  languages: string[];
  frontend: string[];
  backend: string[];
  tools: string[];
  practices: string[];
}

// Site configuration
export const siteConfig: SiteConfig = {
  name: "Amit Kumar Satapathy",
  description: "Personal portfolio and blog",
  url: "https://yourportfolio.com",
  ogImage: "https://yourportfolio.com/og.jpg",
  links: {
    github: "https://github.com/Amitkumarsatapathy645",
    linkedin: "https://www.linkedin.com/in/amit-kumar-satapathy-59547722a/",
    email: "amitkumarsatapathy645@gmail.com",
    newsletter: "https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7296782276594479105" // Add your LinkedIn newsletter URL here
  }
}

export const navigationLinks: NavigationLink[] = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Experience', path: '/experience' },
  { name: 'Contact', path: '/contact' }
]

export const skillsData: SkillsData = {
  languages: ["JavaScript", "TypeScript", "Python", "SQL"],
  frontend: ["React", "Next.js", "Vue.js", "Tailwind CSS"],
  backend: ["Node.js", "Express", "Django", "PostgreSQL"],
  tools: ["Git", "Docker", "AWS", "Firebase"],
  practices: ["Agile", "TDD", "CI/CD", "DevOps"]
}