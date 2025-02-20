"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <div className="min-h-screen relative">
      {/* Animated background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10 animate-gradient-xy" />
      
      <div className="container relative mx-auto px-4 py-24 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Let&apos;s{' '}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-transparent bg-clip-text">
                Connect
              </span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have an exciting project in mind? Let&apos;s bring it to life together!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <Card className="bg-card/50 backdrop-blur-sm border border-accent/20">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Contact Details</h2>
                  <div className="space-y-6">
                    <motion.div 
                      className="flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <Mail className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a href="mailto:amitkumarsatapathy645@gmail.com" className="hover:text-primary">
                          amitkumarsatapathy645@gmail.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p>+91 7008597653</p>
                      </div>
                    </motion.div>

                    <motion.div 
                      className="flex items-center"
                      whileHover={{ x: 5 }}
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <p>Bhubaneswar, Odisha</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="mt-8 flex space-x-4">
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://github.com/Amitkumarsatapathy645"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-card/50 backdrop-blur-sm hover:bg-card/80"
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://www.linkedin.com/in/amit-kumar-satapathy-59547722a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-card/50 backdrop-blur-sm hover:bg-card/80"
                    >
                      <Linkedin className="w-5 h-5" />
                    </motion.a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-card/50 backdrop-blur-sm border border-accent/20">
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 rounded-md border bg-background/50 backdrop-blur-sm"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full p-3 rounded-md border bg-background/50 backdrop-blur-sm"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        required
                        className="w-full p-3 rounded-md border bg-background/50 backdrop-blur-sm min-h-[150px]"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Sending...'
                      ) : (
                        <span className="flex items-center justify-center">
                          Send Message
                          <Send className="ml-2 h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ContactPage