'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Send, X } from 'lucide-react'
import Link from 'next/link'

interface ChatBotProps {
  onClose: () => void;
}

export default function ChatBot({ onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! I'm Amit's chatbot. How can I assist you today? You can ask about skills, projects, experience, contact, resume, newsletter, or say goodbye.", isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false); 
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages([...messages, userMessage]);

    // Expanded bot responses with more keywords and helpful fallbacks
    const botResponses: { [key: string]: string } = {
      'hi': "Hello! How can I help you with Amit’s portfolio? You can ask about skills, projects, experience, contact, resume, newsletter, or say goodbye.",
      'hello': "Hello! How can I help you with Amit’s portfolio? You can ask about skills, projects, experience, contact, resume, newsletter, or say goodbye.",
      'skills': "Amit is skilled in React, Next.js, Node.js, TypeScript, MongoDB, AWS, and more. Check out the About page for a full list and details!",
      'what skills do you have': "Amit is skilled in React, Next.js, Node.js, TypeScript, MongoDB, AWS,Golang and more. Check out the About page for a full list and details!",
      'projects': "You can view Amit’s projects on the Projects page. Click here to explore: /projects",
      'what projects have you worked on': "Amit has worked on projects like Snapgram, Job Portal, and CustomTee. Visit the Projects page for details: /projects",
      'experience': "Amit has over 3 years of experience as a Full Stack Developer and DevOps Enthusiast, with roles at iServeu, DRDO, RadicalAI, and Suravi.io. See the Experience page for more: /experience",
      'contact': "You can contact Amit via email at amitkumarsatapathy645@gmail.com or through the Contact page.",
      'how can i contact you': "You can contact Amit via email at amitkumarsatapathy645@gmail.com or through the Contact page.",
      'resume': "You can download Amit’s CV from the homepage or visit the Resume section (if available). Click here to download: /resume.pdf",
      'newsletter': "Stay updated with Amit’s insights by subscribing to his LinkedIn newsletter. Visit it here: https://www.linkedin.com/newsletters/your-newsletter-slug/",
      'bye': "Thanks for visiting! Feel free to reach out anytime. Goodbye!",
      'goodbye': "Thanks for visiting! Feel free to reach out anytime. Goodbye!",
      'ok':"Thank you for reaching out"
    };

    // Process the input to match keywords, handling variations and synonyms
    const lowerInput = input.toLowerCase().trim();
    let response = "Sorry, I’m not sure how to respond. You can ask about skills, projects, experience, contact, resume, newsletter, or say goodbye. Try rephrasing your question!";

    // Check for keyword matches with more flexibility
    for (const [keyword, reply] of Object.entries(botResponses)) {
      if (lowerInput.includes(keyword)) {
        response = reply;
        break;
      }
    }

    // Additional fallback for common phrases
    if (lowerInput.includes('help') || lowerInput.includes('what can you do')) {
      response = "I can help with information about Amit’s skills, projects, experience, contact details, resume, and newsletter. Ask me anything related to these topics!";
    }

    // Simulate typing animation for bot response
    setIsTyping(true);
    let currentText = '';
    const typingSpeed = 30; // Adjust for faster/slower typing (ms per character)
    const words = response.split(' ');
    let wordIndex = 0;

    const typeInterval = setInterval(() => {
      if (wordIndex < words.length) {
        currentText += (wordIndex > 0 ? ' ' : '') + words[wordIndex];
        setMessages([...messages, userMessage, { text: currentText, isUser: false }]);
        wordIndex++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
      }
    }, typingSpeed * (words[wordIndex - 1]?.length || 5)); // Adjust speed based on word length

    setInput('');
  };

  return (
    <motion.div
      className="p-4 h-96 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Chat with Amit’s Assistant</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close chatbot"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages with typing indicator */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-2" aria-live="polite">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: message.isUser ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-3 rounded-lg ${message.isUser ? 'bg-primary text-primary-foreground ml-auto' : 'bg-accent text-accent-foreground mr-auto'} max-w-[75%]`}
            role="log"
          >
            {message.text}
          </motion.div>
        ))}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 rounded-lg bg-accent text-accent-foreground mr-auto max-w-[75%]"
            role="status"
            aria-live="polite"
          >
            <span className="animate-pulse">Typing...</span>
          </motion.div>
        )}
        <div ref={messagesEndRef} /> {/* Scroll anchor */}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 p-2 rounded-md border bg-background/50 backdrop-blur-sm"
          placeholder="Type your message..."
          aria-label="Chatbot input"
        />
        <Button onClick={handleSend} aria-label="Send message">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}