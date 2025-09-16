import { useState, useEffect, useRef } from "react"
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
  const [showRestartButton, setShowRestartButton] = useState(false)
  const isKeyboardVisible = useKeyboardVisible()
  
  const [sessionId, setSessionId] = useState(() => 
    `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)

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
    setShowRestartButton(false)
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
        addBotMessage(data.message)
        setShowRestartButton(true)
      }, 1000)
    } catch (error) {
      console.error("Error starting conversation:", error)
      addBotMessage("מצטער, אני לא מצליח להתחיל את השיחה כרגע. נסה שוב מאוחר יותר.")
      setIsTyping(false)
      setShowRestartButton(true)
    }
  }

  const handleRestartChat = async () => {
    setMessages([])
    setIsTyping(false)
    setInputValue('')
    setConversationComplete(false)
    setAnswers({})
    setSessionId(`session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
    await startConversation()
  }

  const handleInputSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userInput = inputValue
    addUserMessage(userInput)
    setInputValue("")
    setIsTyping(true)

    try {
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:3000/api/chat'
        : '/api/chat';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput, sessionId })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.question) {
        setAnswers(prev => ({ ...prev, [data.question]: userInput }))
      }

      if (data.isDone) {
        setConversationComplete(true)
        onComplete({ ...answers, [data.question]: userInput })
      }

      setIsTyping(false)
      addBotMessage(data.message)
    } catch (error) {
      console.error("Error sending message:", error)
      addBotMessage("מצטער, אני לא מצליח לשלוח את ההודעה כרגע. נסה שוב מאוחר יותר.")
      setIsTyping(false)
    }
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-100 to-blue-200">
      {/* Fun, moving background elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-24 h-24 bg-pink-300 rounded-full opacity-20 filter blur-xl"
        animate={{ 
          x: [0, 20, 0],
          y: [0, -20, 0],
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
        className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-blue-300 rounded-full opacity-20 filter blur-xl"
        animate={{ 
          x: [0, -15, 0],
          y: [0, 15, 0],
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        🍨
      </motion.div>
      <motion.div 
        className="absolute top-1/2 right-1/3 w-16 h-16 bg-orange-300 rounded-full opacity-20 filter blur-lg"
        animate={{ 
          rotate: [0, 360],
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        🍩
      </motion.div>
      <motion.div 
        className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-purple-300 rounded-full opacity-20 filter blur-md"
        animate={{ 
          scale: [1, 1.2, 1],
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        🍬
      </motion.div>
      <motion.div 
        className="absolute top-1/3 right-1/2 w-12 h-12 bg-yellow-300 rounded-full opacity-20 filter blur-md"
        animate={{ 
          y: [0, 20, 0],
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
      <div className="flex items-center justify-between p-4 md:p-6 lg:landscape:p-4 pt-safe bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm md:text-base">🍦</div>
          <div className="text-right">
            <h1 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">NEXT AICREAM</h1>
          </div>
          {showRestartButton && (
            <button
              onClick={handleRestartChat}
              className="ml-4 px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
            >
              Restart Chat
            </button>
          )}
        </div>
        <img src={pwcLogo} alt="PwC" className="w-12 h-6 md:w-16 md:h-8" />
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 lg:landscape:p-4 space-y-4 md:space-y-6 pb-4 md:pb-6">
        {messages.map((message) => (
          <ChatBubble key={message.id} message={message.text} isBot={message.isBot} />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      {!conversationComplete && (
        <div className="p-4 md:p-6 lg:landscape:p-4 bg-white/10 backdrop-blur-md border-t border-white/20">
          <form onSubmit={handleInputSubmit} className="flex gap-2 md:gap-4">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="הקלד כאן תשובה שלך..."
              className="flex-1 text-right text-base md:text-lg p-3 md:p-4"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full text-white font-bold text-sm md:text-base shadow-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl active:scale-95 transition-all duration-200 border-2 flex items-center justify-center"
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
