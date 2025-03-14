'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Send, X, Copy, Volume2, VolumeX, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ChatBotProps {
  onClose: () => void;
}

interface Message {
  text: string;
  isUser: boolean;
  timestamp: string;
}

export default function ChatBot({ onClose }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Greetings! I’m Amit’s virtual assistant. How may I assist you today? Try asking about skills, projects, or something silly like 'joke'!",
      isUser: false,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isPartyMode, setIsPartyMode] = useState(false);
  const [lastQuery, setLastQuery] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll and focus
  useEffect(() => {
    if (messagesEndRef.current && !isMinimized) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    inputRef.current?.focus();
  }, [messages, isMinimized]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prev) => [...prev, userMessage]);
    setLastQuery(input.toLowerCase().trim());
    setInput('');

    const botResponses: { [key: string]: string | ((last: string | null) => string) } = {
      hi: "Hey there! What’s up? Skills, projects, or a laugh?",
      hello: "Hi! Ready to explore Amit’s world—or just here to goof off? 😄",
      skills: "Amit’s a wizard with React, Next.js, Node.js, and more! Check the <a href='/about' class='text-primary hover:underline'>About page</a>.",
      projects:
        "Amit built Snapgram and Job Portal—pretty cool, huh? See more on the <a href='/projects' class='text-primary hover:underline'>Projects page</a>.",
      experience:
        "3+ years at iServeu, DRDO, and beyond. Amit’s story’s on the <a href='/experience' class='text-primary hover:underline'>Experience page</a>.",
      contact: (last) =>
        last?.includes('how')
          ? "Email Amit at <a href='mailto:amitkumarsatapathy645@gmail.com' class='text-primary hover:underline'>amitkumarsatapathy645@gmail.com</a>. Don’t spam him with memes—unless they’re good! 😜"
          : "Reach Amit via the <a href='/contact' class='text-primary hover:underline'>Contact page</a> or amitkumarsatapathy645@gmail.com.",
      resume:
        "Grab Amit’s resume <a href='/resume.pdf' class='text-primary hover:underline' target='_blank'>here</a>. It’s less boring than most!",
      newsletter:
        "Join Amit’s LinkedIn newsletter <a href='https://www.linkedin.com/newsletters/your-newsletter-slug/' class='text-primary hover:underline' target='_blank'>here</a>. No spam, just fun insights!",
      bye: "Catch you later! Don’t trip over a keyboard on your way out! 👋",
      goodbye: "Farewell, human! May your code always compile. 😎",
      coffee: "I’d brew you a cup, but I’m digital. How about some code fuel instead? ☕",
      joke: "Why don’t skeletons fight each other? Because they don’t have the guts! 😂",
      bored: "Bored, huh? Type 'party' and see what happens... 😉",
      party: "🎉 Party time! Enjoy the chaos—I’ll clean up the confetti later! 🎊",
    };

    const lowerInput = input.toLowerCase().trim();
    let response =
      "Hmm, I’m stumped! Try skills, projects, or something fun like 'joke' or 'coffee'.";

    for (const [keyword, reply] of Object.entries(botResponses)) {
      if (new RegExp(`\\b${keyword}\\b`).test(lowerInput)) {
        response = typeof reply === 'function' ? reply(lastQuery) : reply;
        if (keyword === 'party') setIsPartyMode(true);
        break;
      }
    }

    if (/help|what can you do/i.test(lowerInput)) {
      response =
        "I can spill the beans on Amit’s skills, projects, or crack a joke! What’s your vibe?";
    }

    setIsTyping(true);
    const typeMessage = (text: string) => {
      let currentText = '';
      const typingSpeed = 20;
      const botMessage: Message = {
        text: '',
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMessage]);

      const interval = setInterval(() => {
        if (currentText.length < text.length) {
          currentText = text.slice(0, currentText.length + 1);
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = currentText;
            return newMessages;
          });
          if (isSoundOn) new Audio('/type.mp3').play();
        } else {
          clearInterval(interval);
          setIsTyping(false);
          if (lowerInput === 'party') {
            setTimeout(() => setIsPartyMode(false), 3000); // Party mode lasts 3 seconds
          }
        }
      }, typingSpeed);
    };

    setTimeout(() => typeMessage(response), 500);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text.replace(/<[^>]+>/g, ''));
    alert('Copied! Don’t paste it somewhere silly!');
  };

  const handleClearChat = () => {
    setMessages([
      {
        text: "Chat wiped clean! Let’s start fresh—maybe with a joke? 😜",
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setLastQuery(null);
    setIsPartyMode(false);
  };

  return (
    <motion.div
      className={`fixed bottom-6 right-6 w-full max-w-md bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-3xl border border-accent/50 rounded-2xl shadow-lg z-50 flex flex-col transition-all duration-500 ${
        isMinimized ? 'h-16 w-16' : 'max-h-[85vh]'
      } ${isPartyMode ? 'animate-party-bg' : ''}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {isMinimized ? (
        <Button
          variant="ghost"
          className="w-full h-full flex items-center justify-center text-primary bg-card/90 rounded-full shadow-md hover:shadow-xl transition-shadow"
          onClick={() => setIsMinimized(false)}
          aria-label="Maximize chatbot"
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="text-2xl"
          >
            🤖
          </motion.div>
        </Button>
      ) : (
        <>
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-accent/50 bg-gradient-to-r from-card/70 to-card/50 rounded-t-2xl">
            <div className="flex items-center gap-3">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="text-primary text-2xl"
                whileHover={
                  lastQuery === 'joke' || isPartyMode ? { rotate: [0, 10, -10, 0] } : undefined
                }
                // Use tween for party mode animation with keyframes
                {...(isPartyMode
                  ? {
                      animate: { rotate: [0, 15, -15, 0], scale: 1.2 },
                      transition: { duration: 0.5, repeat: Infinity, ease: 'easeInOut' },
                    }
                  : {})}
              >
                🤖
              </motion.div>
              <h3 className="text-xl font-semibold text-foreground tracking-tight">Amit’s Assistant</h3>
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSoundOn(!isSoundOn)}
                className="hover:bg-accent/40 hover:shadow-md transition-all"
                aria-label={isSoundOn ? 'Mute sound' : 'Enable sound'}
              >
                {isSoundOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClearChat}
                className="hover:bg-accent/40 hover:shadow-md transition-all"
                aria-label="Clear chat"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-accent/40 hover:shadow-md transition-all"
                aria-label="Close chatbot"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Suggestions */}
          <div className="flex flex-wrap gap-2  p-4 border-b border-accent/50 bg-card/60">
            {['Skills', 'Projects', 'Make Me Laugh'].map((suggestion) => (
              <Badge
                key={suggestion}
                className={`cursor-pointer bg-slate-100 hover:bg-primary/25 transition-all duration-300 shadow-sm hover:shadow-md rounded-full px-3 py-1 ${
                  suggestion === 'Make Me Laugh' ? 'animate-wiggle' : ''
                }`}
                onClick={() => {
                  setInput(suggestion === 'Make Me Laugh' ? 'joke' : suggestion);
                  handleSend();
                }}
              >
                {suggestion}
              </Badge>
            ))}
          </div>

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-6 space-y-8 bg-gradient-to-b from-transparent to-card/40 custom-scrollbar"
            aria-live="polite"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent',
            }}
          >
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={
                  message.isUser
                    ? { duration: 0.4, repeat: 1, ease: 'easeInOut' }
                    : { duration: 0.3, type: 'spring', stiffness: 150 }
                }
                className={`flex items-end gap-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                whileHover={message.isUser ? { x: [0, 5, -5, 0] } : undefined}
                
              >
                {!message.isUser && (
                  <motion.div
                    className="text-primary text-2xl bg-card/80 p-2 rounded-full shadow-md"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    🤖
                  </motion.div>
                )}
                <div
                  className={`p-4 rounded-2xl max-w-[80%] shadow-md hover:shadow-lg transition-shadow duration-300 ${
                    message.isUser
                      ? 'bg-gradient-to-r from-primary/90 to-primary/70 text-primary-foreground'
                      : 'bg-gradient-to-r from-muted/95 to-muted/80 text-muted-foreground'
                  }`}
                  dangerouslySetInnerHTML={{ __html: message.text }}
                />
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-muted-foreground/70 bg-card/50 px-2 py-1 rounded-full">
                    {message.timestamp}
                  </span>
                  {!message.isUser && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(message.text)}
                      className="h-6 w-6 hover:bg-accent/50 hover:shadow-md transition-all"
                      aria-label="Copy message"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start items-end gap-4"
              >
                <motion.div
                  className="text-primary text-2xl bg-card/80 p-2 rounded-full shadow-md"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                >
                  🤖
                </motion.div>
                <div className="p-4 rounded-2xl bg-muted/95 text-muted-foreground max-w-[80%] shadow-md flex items-center gap-2">
                  {isPartyMode ? (
                    <motion.span
                      animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      🎉
                    </motion.span>
                  ) : (
                    <>
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: 0.4 }}
                      />
                    </>
                  )}
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-accent/50 flex gap-2 bg-gradient-to-r from-card/70 to-card/50 rounded-b-2xl">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 p-3 rounded-xl border border-accent/30 bg-background/95 focus:outline-none focus:ring-2 focus:ring-primary/60 focus:shadow-lg transition-all duration-300 text-sm shadow-sm"
              placeholder="Ask something fun—like 'joke' or 'party'!"
              aria-label="Chatbot input"
            />
            <Button
              onClick={handleSend}
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-md hover:shadow-lg"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
      {isPartyMode && (
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ x: Math.random() * 400, y: -50 }}
              animate={{ y: 600, rotate: Math.random() * 360 }}
              transition={{ duration: 2 + Math.random(), repeat: 1 }}
              style={{ left: Math.random() * 100 + '%' }}
            >
              {['🎉', '🥳', '🎊', '✨'][Math.floor(Math.random() * 4)]}
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}