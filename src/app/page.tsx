'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowDown } from 'lucide-react'
import Hero from '@/components/home/hero'
import FeaturedProjects from '@/components/home/featured-projects'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ChatBot from '@/components/chatbot/ChatBot' 
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { siteConfig } from '@/lib/utils'


// const techStack = ['React', 'Next.js', 'Node.js', 'TypeScript', 'MongoDB', 'AWS']

const newsletterPosts = [
  {
    title: "AWS S3 Simplified: The Storage Solution You Need to Know",
    description: "Amazon S3 (Simple Storage Service) - the backbone of cloud storage that achieves legendary 11 9's durability",
    url: "https://www.linkedin.com/pulse/aws-s3-simplified-storage-solution-you-need-know-amit-kumar-satapathy-3n0cc/?trackingId=B6BjPn6PR0OTgpo%2Bhj6jyQ%3D%3D",
  },
  {
    title: "Understanding AWS VPC: Your Private Property in the Cloud",
    description: " AWS Virtual Private Cloud (VPC) by comparing it to real estate development! Learn how AWS solved early cloud security challenges by creating digital gated communities where your resources stay safe.",
    url: "https://www.linkedin.com/pulse/understanding-aws-vpc-your-private-property-cloud-satapathy-u77ac/?trackingId=KYPwTgAIRMSk%2BMI%2BfDlpyA%3D%3D",
  },
  {
    title: "Understanding AWS IAM: A Deep Dive",
    description: "Dive deep into AWS Identity and Access Management (IAM)—the backbone of AWS security",
    url: "https://www.linkedin.com/pulse/understanding-aws-iam-deep-dive-amit-kumar-satapathy-jsw6c/?trackingId=ABJQX6%2BiQOG8xd%2Bnu%2Fv2tQ%3D%3D",
  },
];

export default function HomePage() {
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.75;
        if (isVisible) el.classList.add('animate-visible');
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slider settings for the carousel
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  // State for chatbot visibility
  const [isChatOpen, setIsChatOpen] = useState(false);

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
          aria-label="Scroll down to featured projects"
        >
          <ArrowDown className="h-6 w-6 animate-bounce" />
        </Button>
      </motion.div>

      <FeaturedProjects />
      
      {/* LinkedIn Newsletter Section */}
      <section className="py-12 bg-accent/10 animate-on-scroll">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-4">Stay Updated with My Insights</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to my LinkedIn newsletter for the latest updates, tips, and insights on web development and technology.
            </p>
            {/* Carousel of Newsletter Posts */}
            <div className="max-w-4xl mx-auto mb-6">
              <Slider {...sliderSettings} aria-label="LinkedIn newsletter post carousel">
                {newsletterPosts.map((post, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="p-4"
                  >
                    <Card className="h-full hover:shadow-md transition-shadow">
                      <CardContent className="p-6 text-left">
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        <p className="text-muted-foreground mb-4">{post.description}</p>
                        <Button asChild variant="outline" aria-label={`Read ${post.title} on LinkedIn`}>
                          <Link href={post.url} target="_blank" rel="noopener noreferrer">
                            Read Post
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Slider>
            </div>
            <Button asChild size="lg" aria-label="Visit my LinkedIn newsletter">
              <a 
                href="https://www.linkedin.com/build-relation/newsletter-follow?entityUrn=7296782276594479105" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Visit My Newsletter
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Let's Work Together Section */}
      <section className="py-20 animate-on-scroll">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Let&apos;s Work Together</h2>
            <p className="text-lg text-muted-foreground mb-8">
              I&apos;m always open to discussing new projects, creative ideas or opportunities to be part of your visions.
            </p>
            <Button asChild size="lg" aria-label="Contact me via email">
            <a href={`mailto:${siteConfig.links.email}`}>
                Get In Touch
              </a>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Chatbot Toggle Button (Bottom-Right Corner) */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label={isChatOpen ? "Close chatbot" : "Open chatbot"}
          aria-expanded={isChatOpen}
          className="rounded-full bg-primary hover:bg-primary/90"
        >
          <span className="text-white">💬</span>
        </Button>
      </motion.div>

      {/* Chatbot Window (Visible when isChatOpen is true) */}
      {isChatOpen && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="fixed bottom-16 right-4 w-80 bg-card rounded-lg shadow-lg border border-accent/20 z-50"
          role="dialog"
          aria-label="Chatbot for Amit Kumar Satapathy"
        >
          <ChatBot onClose={() => setIsChatOpen(false)} />
        </motion.div>
      )}
    </div>
  )
}