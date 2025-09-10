import { useState, useEffect, useRef, useMemo } from "react"
import { ChatBubble, TypingIndicator } from "./ui/chat-bubble"
import { Input } from "./ui/input"
import { useKeyboardVisible } from "./ui/use-keyboard"
import { motion } from "motion/react"
import pwcLogo from 'figma:asset/17ec2cf0792188f890167fc945e9be5f10b81f22.png'

interface GeminiChatScreenProps {
  onComplete: (answers: Record<string, string>) => void
}

interface Message {
  id: string
  text: string
  isBot: boolean
}

export function GeminiChatScreen({ onComplete }: GeminiChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [conversationComplete, setConversationComplete] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isKeyboardVisible = useKeyboardVisible()
  
  // Generate a unique session ID for this chat session
  const sessionId = useMemo(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom()
    }, isKeyboardVisible ? 300 : 100)
    return () => clearTimeout(timeoutId)
  }, [messages, isKeyboardVisible])

  useEffect(() => {
    // Start with initial greeting from Gemini
    startConversation()
  }, [])

  const addBotMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: true
    }
    setMessages(prev => [...prev, newMessage])
  }

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false
    }
    setMessages(prev => [...prev, newMessage])
  }

  const startConversation = async () => {
    setIsTyping(true)
    try {
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:3000/api/chat'
        : '/api/chat';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'התחל את השיחה', sessionId })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      setTimeout(() => {
        setIsTyping(false)
        addBotMessage(data.response || 'שלום! בואו נתחיל!')
      }, 1000)
    } catch (error) {
      setTimeout(() => {
        setIsTyping(false)
        addBotMessage('שלום! בואו נתחיל עם השאלות שלנו!')
      }, 1000)
    }
  }

  const sendMessageToGemini = async (message: string) => {
    setIsTyping(true)
    
    try {
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:3000/api/chat'
        : '/api/chat';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: message, sessionId })
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      setTimeout(() => {
        setIsTyping(false)
        const botResponse = data.response || 'מצטער, לא הצלחתי להבין.'
        addBotMessage(botResponse)
        
        // Check if conversation is complete (bot mentions showing screen at booth)
        if (botResponse.includes('הציגו את המסך בדוכן') || botResponse.includes('בתיאבון')) {
          setConversationComplete(true)
          // Extract topping information and complete
          setTimeout(() => {
            onComplete({ finalResult: botResponse })
          }, 2000)
        }
      }, 1000)
      
    } catch (error) {
      setTimeout(() => {
        setIsTyping(false)
        addBotMessage('מצטער, יש בעיה בתקשורת. אנא נסה שוב.')
      }, 1000)
    }
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && !isTyping && !conversationComplete) {
      const userMessage = inputValue.trim()
      addUserMessage(userMessage)
      setInputValue("")
      sendMessageToGemini(userMessage)
    }
  }

  return (
    <div className="min-h-screen min-h-[100dvh] colorful-sprinkles-pattern flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-8 text-2xl opacity-60"
        animate={{ 
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🍦
      </motion.div>
      
      <motion.div 
        className="absolute top-40 right-12 text-xl opacity-50"
        animate={{ 
          y: [0, 10, 0],
          rotate: [0, -3, 3, 0]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        🌈
      </motion.div>

      <motion.div 
        className="absolute bottom-40 left-6 text-lg opacity-40"
        animate={{ 
          y: [0, -8, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        🍭
      </motion.div>

      {/* Header */}
      <div className="flex items-center justify-between p-4 pt-safe bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">🍦</div>
          <div className="text-right">
            <h1 className="text-lg font-bold text-gray-800">NEXT AICREAM</h1>
          </div>
        </div>
        <img src={pwcLogo} alt="PwC" className="w-12 h-6" />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-safe">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message.text} isBot={message.isBot} />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {!conversationComplete && (
        <div className="p-4 bg-white/10 backdrop-blur-md border-t border-white/20">
          <form onSubmit={handleInputSubmit} className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="הקלד כאן תשובה שלך..."
              className="flex-1 text-right"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              className="w-12 h-12 rounded-full text-white font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl active:scale-95 transition-all duration-200 border-2"
              style={{ backgroundColor: '#FF6B20', borderColor: '#E85D1C' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E85D1C'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF6B20'}
            >
              שלח
            </button>
          </form>
        </div>
      )}
    </div>
  )
}