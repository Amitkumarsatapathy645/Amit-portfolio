'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { toast } from 'sonner';
import * as z from 'zod';

// Validation schema using Zod for better type safety
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" })
});

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState(false);
  
  const formRef = useRef(null);
  const isInView = useInView(formRef, { once: true, amount: 0.3 });
  
  // Validate individual fields as user types
  const validateField = (name: string, value: string) => {
    try {
      if (name === 'name') {
        formSchema.shape.name.parse(value);
      } else if (name === 'email') {
        formSchema.shape.email.parse(value);
      } else if (name === 'message') {
        formSchema.shape.message.parse(value);
      }
      
      // Clear error if validation passes
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        setErrors(prev => ({
          ...prev,
          [name]: err.errors[0].message,
        }));
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccess(false);
    
    try {
      // Validate all form data
      formSchema.parse(formData);
      
      // Send message to API endpoint
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }
      
      // Reset form and show success state
      setFormData({ name: '', email: '', message: '' });
      setSuccess(true);
      
      toast.success("Message sent successfully!", {
        description: "Thank you for reaching out. I'll get back to you within 24-48 hours."
      });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const validationErrors: { [key: string]: string } = {};
        err.errors.forEach((error) => {
          if (error.path) validationErrors[error.path[0].toString()] = error.message;
        });
        setErrors(validationErrors);
        
        toast.error("Form validation failed", {
          description: "Please check your inputs and try again."
        });
      } else {
        setErrors({ general: (err as Error).message || "Failed to send message. Please try again." });
        
        toast.error("Something went wrong", {
          description: "Failed to send your message. Please try again later."
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Social media links
  const socialLinks = [
    { name: 'Github', icon: <Github className="w-5 h-5" />, url: 'https://github.com/amitkumarsatapathy' },
    { name: 'Linkedin', icon: <Linkedin className="w-5 h-5" />, url: 'https://linkedin.com/in/amitkumarsatapathy' },
    { name: 'Twitter', icon: <Twitter className="w-5 h-5" />, url: 'https://twitter.com/amitkumarstp' },
    { name: 'Instagram', icon: <Instagram className="w-5 h-5" />, url: 'https://instagram.com/amit_kumar_satapathy' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50" aria-label="Contact Amit Kumar Satapathy">
      {/* Animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 animate-gradient-xy" />
      <div className="fixed inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Let's <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">Connect</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Have an exciting project in mind? Let's bring it to life together!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            {/* Contact Info Section */}
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-2 space-y-6"
            >
              <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/80 backdrop-blur">
                <div className="h-2 bg-gradient-to-r from-primary to-purple-500" />
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-8">Contact Details</h2>
                  
                  <div className="space-y-8">
                    <motion.div 
                      className="flex items-center group" 
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-5 group-hover:bg-primary/20 transition-colors">
                        <Mail className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <a
                          href="mailto:amitkumarsatapathy645@gmail.com"
                          className="text-foreground hover:text-primary transition-colors"
                          aria-label="Email Amit Kumar Satapathy"
                        >
                          amitkumarsatapathy645@gmail.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-center group" 
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-5 group-hover:bg-primary/20 transition-colors">
                        <Phone className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Phone</p>
                        <p className="text-foreground" aria-label="Phone number">+91 7008597653</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-center group" 
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mr-5 group-hover:bg-primary/20 transition-colors">
                        <MapPin className="w-5 h-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Location</p>
                        <p className="text-foreground" aria-label="Location">Bhubaneswar, Odisha, India</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Social Media Section */}
                  <div className="mt-12 pt-8 border-t">
                    <h3 className="text-lg font-semibold mb-4">Connect on Social</h3>
                    <div className="flex space-x-4">
                      {socialLinks.map((social) => (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.97 }}
                          aria-label={`${social.name} profile`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {social.icon}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form Section */}
            <motion.div
              ref={formRef}
              variants={itemVariants}
              className="lg:col-span-3"
            >
              <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-card to-card/80 backdrop-blur">
                <div className="h-2 bg-gradient-to-r from-primary to-purple-500" />
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-8">Send a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full bg-background/50 backdrop-blur-sm"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        aria-required="true"
                        aria-describedby="name-error"
                      />
                      {errors.name && <p id="name-error" className="text-destructive text-sm mt-1">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full bg-background/50 backdrop-blur-sm"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        aria-required="true"
                        aria-describedby="email-error"
                      />
                      {errors.email && <p id="email-error" className="text-destructive text-sm mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Your Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        className="w-full bg-background/50 backdrop-blur-sm min-h-[180px]"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, ideas, or questions..."
                        aria-required="true"
                        aria-describedby="message-error"
                      />
                      {errors.message && <p id="message-error" className="text-destructive text-sm mt-1">{errors.message}</p>}
                    </div>
                    
                    {errors.general && (
                      <div className="bg-destructive/10 text-destructive p-3 rounded-md">
                        {errors.general}
                      </div>
                    )}
                    
                    <Button
                      type="submit"
                      className="w-full h-12 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-all"
                      disabled={isSubmitting || success}
                      aria-label={isSubmitting ? 'Sending message...' : 'Send message'}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </span>
                      ) : success ? (
                        <span className="flex items-center justify-center">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Message Sent!
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                    
                    <p className="text-sm text-muted-foreground text-center">
                      I typically respond within 24-48 hours during business days.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* FAQ Section */}
          <motion.div 
            variants={itemVariants} 
            className="mt-24"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
              <p className="text-muted-foreground mt-2">Some common questions I get asked</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  q: "What services do you offer?",
                  a: "I specialize in full-stack web development, UI/UX design, and mobile app development."
                },
                {
                  q: "How long does a typical project take?",
                  a: "Project timelines vary based on complexity. Small projects take 2-4 weeks, while larger ones may take 2-3 months."
                },
                {
                  q: "Do you work with clients internationally?",
                  a: "Yes! I work with clients globally and am comfortable with remote collaboration across time zones."
                },
                {
                  q: "What's your preferred tech stack?",
                  a: "I primarily work with React, Next.js, TypeScript, and Node.js, but can adapt to different tech stacks based on project needs."
                }
              ].map((faq, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border border-accent/20">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;