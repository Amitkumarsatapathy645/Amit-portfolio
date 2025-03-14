'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  ArrowDown, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import Hero from '@/components/home/hero'
import FeaturedProjects from '@/components/home/featured-projects'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { siteConfig } from '@/lib/utils'
import ChatBot from '@/components/chatbot/ChatBot'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

// Newsletter articles data
const newsletterPosts = [
  {
    title: "AWS S3 Simplified: The Storage Solution You Need to Know",
    description: "Explore Amazon S3 (Simple Storage Service) - the backbone of cloud storage that achieves legendary 11 9's durability.",
    url: "https://www.linkedin.com/pulse/aws-s3-simplified-storage-solution-you-need-know-amit-kumar-satapathy-3n0cc/?trackingId=B6BjPn6PR0OTgpo%2Bhj6jyQ%3D%3D",
  },
  {
    title: "Understanding AWS VPC: Your Private Property in the Cloud",
    description: "Learn how AWS Virtual Private Cloud (VPC) provides secure digital infrastructure where your resources remain protected, similar to real estate development.",
    url: "https://www.linkedin.com/pulse/understanding-aws-vpc-your-private-property-cloud-satapathy-u77ac/?trackingId=KYPwTgAIRMSk%2BMI%2BfDlpyA%3D%3D",
  },
  {
    title: "Understanding AWS IAM: A Deep Dive",
    description: "Dive deep into AWS Identity and Access Management (IAM)—the backbone of AWS security and access control framework.",
    url: "https://www.linkedin.com/pulse/understanding-aws-iam-deep-dive-amit-kumar-satapathy-jsw6c/?trackingId=ABJQX6%2BiQOG8xd%2Bnu%2Fv2tQ%3D%3D",
  },
];

// Custom Newsletter Carousel
const NewsletterCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsletterPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsletterPosts.length) % newsletterPosts.length);
  };

  // Enable swipe gestures for mobile
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) { // Swiped left
      nextSlide();
    } else if (diff < -50) { // Swiped right
      prevSlide();
    }
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-0">
      <div 
        className="overflow-hidden rounded-xl"
        ref={carouselRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative h-72 sm:h-64 md:h-72">
          {newsletterPosts.map((post, index) => (
            <AnimatePresence key={post.title} initial={false}>
              {currentSlide === index && (
                <motion.div
                  className="absolute top-0 left-0 w-full h-full"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <Card className={cn(
                    "h-full border-none", 
                    isDark ? "bg-gradient-to-br from-gray-900 to-gray-800" : "bg-gradient-to-br from-white to-gray-50"
                  )}>
                    <CardContent className="flex flex-col justify-between h-full p-4 sm:p-8">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 line-clamp-3">{post.description}</p>
                      </div>
                      <Button asChild variant="default" className="self-start group">
                        <Link href={post.url} target="_blank" rel="noopener noreferrer">
                          <span className="inline-flex items-center">
                            Read Article
                            <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-4 sm:mt-6 gap-3">
        {newsletterPosts.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? "bg-primary scale-100" 
                : "bg-primary/30 scale-75"
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <button
        className="absolute top-1/2 left-2 sm:left-4 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-full border border-border hover:bg-primary/10 transition-colors"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      
      <button
        className="absolute top-1/2 right-2 sm:right-4 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-1.5 sm:p-2 rounded-full border border-border hover:bg-primary/10 transition-colors"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
};

/**
 * Enhanced Mobile-Optimized HomePage Component
 * 
 * Features:
 * - Responsive design for all screen sizes
 * - Touch-friendly interactions for mobile users
 * - Adaptive content sizing and spacing
 * - Mobile-optimized chatbot positioning
 * - Performance optimizations for mobile devices
 */
export default function HomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Handle scroll animations for elements with 'animate-on-scroll' class
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.85;
        if (isVisible) el.classList.add('animate-visible');
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle smooth scrolling to projects section
  const scrollToProjects = () => {
    document.getElementById('projects').scrollIntoView({ 
      behavior: 'smooth'
    });
  };

  // Toggle chatbot visibility
  const toggleChat = () => setIsChatOpen(!isChatOpen);

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section with Parallax */}
      <section id="top" ref={heroRef} className="relative min-h-screen flex items-center">
        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="w-full">
          <Hero />
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToProjects}
            aria-label="Scroll down to featured projects"
            className="relative group"
          >
            <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 animate-bounce" />
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs sm:text-sm whitespace-nowrap">
              View Projects
            </span>
          </Button>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-accent/5 pointer-events-none" />
        <FeaturedProjects />
      </section>
      
      {/* LinkedIn Newsletter Section */}
      <section id="insights" className="py-16 sm:py-24 relative animate-on-scroll">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              Professional Insights
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full mx-auto mb-4 sm:mb-6" />
            <p className="text-sm sm:text-base text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto">
              Stay updated with the latest industry trends, technical expertise, and best practices through my LinkedIn newsletter.
            </p>
            
            {/* Custom Newsletter Carousel */}
            <div className="mb-10 sm:mb-16">
              <NewsletterCarousel />
            </div>
            
            <Button asChild size={isMobile ? "default" : "lg"} className="font-medium group">
              <a 
                href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7296782276594479105" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                Subscribe to Newsletter
                <motion.div 
                  className="ml-2" 
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ExternalLink className="h-4 w-4" />
                </motion.div>
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Section with Reveal Animation */}
      <section id="contact" className="py-20 sm:py-32 animate-on-scroll relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background pointer-events-none" />
        
        {/* Decorative Elements */}
        <div className="absolute -top-32 -right-32 w-48 sm:w-64 h-48 sm:h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-48 sm:w-64 h-48 sm:h-64 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">Let&apos;s Collaborate
            </h2>
            <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-primary to-blue-500 rounded-full mx-auto mb-4 sm:mb-6" />
            <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12">
              I welcome opportunities to discuss professional collaborations, innovative projects, 
              and how my expertise can contribute to your organization&apos;s technical objectives.
            </p>
            <Button asChild size={isMobile ? "default" : "lg"} className="font-medium relative overflow-hidden group">
              <a 
                href={`mailto:${siteConfig.links.email}`}
                className="z-10 flex items-center gap-2"
              >
                <span>Contact Me</span>
                <motion.span
                  whileHover={{ rotate: 15 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <MessageCircle className="h-4 w-4" />
                </motion.span>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Chatbot Toggle - Adaptive positioning for mobile */}
      <motion.div
        className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          variant="default"
          size="icon"
          onClick={toggleChat}
          aria-label={isChatOpen ? "Close chatbot" : "Open chatbot"}
          aria-expanded={isChatOpen}
          className="rounded-full bg-gradient-to-r from-primary to-blue-500 hover:opacity-90 h-12 w-12 sm:h-14 sm:w-14 shadow-lg"
        >
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </Button>
      </motion.div>

      {/* Chatbot Window - Responsive for mobile */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-20 sm:bottom-24 right-4 sm:right-6 w-[calc(100%-2rem)] sm:w-96 max-w-md bg-card rounded-xl shadow-2xl border border-accent/20 z-50 overflow-hidden"
            role="dialog"
            aria-label="Chat with Amit Kumar Satapathy"
          >
            <ChatBot onClose={toggleChat} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}