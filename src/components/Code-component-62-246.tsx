import { useState, useEffect, useRef } from "react"
import { ChatBubble, TypingIndicator } from "./ui/chat-bubble"
import { Input } from "./ui/input"
import { useKeyboardVisible } from "./ui/use-keyboard"
import { questionSets, allergyQuestion, type Question } from "../data/questions"
import { motion } from "motion/react"
import pwcLogo from 'figma:asset/17ec2cf0792188f890167fc945e9be5f10b81f22.png'
import logoImage from 'figma:asset/6c5a68932be37448c86b9f62ec515ef146aac3bc.png'

interface ChatScreenProps {
  onComplete: (answers: Record<string, string>) => void
}

interface Message {
  id: string
  text: string
  isBot: boolean
}

export function ChatScreen({ onComplete }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isTyping, setIsTyping] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [questionSet] = useState(() => Math.floor(Math.random() * questionSets.length))
  const [questions] = useState(() => [...questionSets[questionSet], allergyQuestion])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const isKeyboardVisible = useKeyboardVisible()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      scrollToBottom()
    }, isKeyboardVisible ? 300 : 100)
    return () => clearTimeout(timeoutId)
  }, [messages, showInput, isKeyboardVisible])

  useEffect(() => {
    // Start with greeting
    addBotMessage("היי! 👋 ברוכים הבאים לדוכן PwC!")
    
    setTimeout(() => {
      addBotMessage("אני העוזר לגלידות מותאמות אישית – מבוסס בינה מלאכותית 🤖")
      setTimeout(() => {
        addBotMessage("אחרי מענה על 3 שאלות קצרות, אמצא לך את התוספת המתוקה המושלמת לגלידה! ✨")
        setTimeout(() => {
          askNextQuestion()
        }, 1500)
      }, 1200)
    }, 1200)
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

  const askNextQuestion = () => {
    if (currentQuestion < questions.length) {
      setIsTyping(true)
      
      setTimeout(() => {
        setIsTyping(false)
        const question = questions[currentQuestion]
        addBotMessage(question.text)
        setShowInput(true)
      }, 1000)
    }
  }

  const handleAnswer = (questionId: string, answer: string, displayText: string) => {
    addUserMessage(displayText)
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
    setShowInput(false)
    setInputValue("")

    const nextQuestionIndex = currentQuestion + 1
    setCurrentQuestion(nextQuestionIndex)

    if (nextQuestionIndex < questions.length) {
      setTimeout(() => {
        askNextQuestion()
      }, 800)
    } else {
      // All questions answered
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          addBotMessage("מעולה! עכשיו אני מכין עבורך את התוספת המושלמת... ✨")
          
          setTimeout(() => {
            onComplete({ ...answers, [questionId]: answer })
          }, 1500)
        }, 1000)
      }, 800)
    }
  }

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && currentQuestion < questions.length) {
      const question = questions[currentQuestion]
      handleAnswer(question.id, inputValue.trim(), inputValue.trim())
    }
  }

  const currentQuestionData = questions[currentQuestion]

  return (
    <div className="min-h-screen min-h-[100dvh] colorful-sprinkles-pattern flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* אלמנטים צפים מעל הרקע */}
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
          delay: 1
        }}
      >
        🥥
      </motion.div>
      
      <motion.div 
        className="absolute bottom-80 left-6 text-lg opacity-40"
        animate={{ 
          y: [0, -8, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      >
        🥜
      </motion.div>

      <motion.div 
        className="absolute bottom-56 right-8 text-xl opacity-45"
        animate={{ 
          y: [0, -12, 0],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      >
        🌈
      </motion.div>
      
      <motion.div 
        className="absolute top-60 left-4 text-lg opacity-35"
        animate={{ 
          y: [0, -6, 0],
          x: [0, 3, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      >
        ✨
      </motion.div>

      <motion.div 
        className="absolute bottom-40 left-12 text-sm opacity-30"
        animate={{ 
          y: [0, -5, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5
        }}
      >
        🎉
      </motion.div>

      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-gray-200 p-4 shadow-sm relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <div className="w-3 h-3 rounded-full bg-gray-300"></div>
              <div className="w-3 h-3 rounded-full bg-[#FD5109]"></div>
            </div>
          </div>
          <img 
            src={logoImage} 
            alt="Next AICream" 
            className="h-8 w-auto max-w-[180px]"
          />
          <div className="w-16"></div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto relative z-10 overscroll-behavior-y-contain">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            isBot={message.isBot}
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Area */}
      {showInput && currentQuestionData && (
        <div className="p-4 pb-[env(safe-area-inset-bottom,1rem)] bg-white/98 backdrop-blur-md border-t border-white/60 shadow-lg relative z-10 sticky bottom-0">
          {/* Quick Reply Chips */}
          {currentQuestionData.options && (
            <div className="flex flex-col gap-3 mb-4">
              {currentQuestionData.options.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestionData.id, option.value, option.label)}
                  className="bg-white/90 hover:bg-white/95 border border-white/60 rounded-full py-3 px-4 text-right font-fredoka text-sm text-gray-700 transition-colors duration-200 shadow-sm backdrop-blur-sm"
                  dir="rtl"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}

          {/* Text Input */}
          <form onSubmit={handleInputSubmit} className="flex gap-3 mb-3">
            <button
              type="submit" 
              disabled={!inputValue.trim()}
              className="bg-[#FD5109] hover:bg-[#E04300] disabled:bg-gray-300 text-white rounded-full h-12 w-12 flex items-center justify-center transition-colors duration-200 font-fredoka"
            >
              שלח
            </button>
            <div className="flex-1">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="או כתוב תשובה משלך..."
                className="text-right bg-white/95 border border-white/70 rounded-full h-12 px-4 font-fredoka text-sm placeholder:text-gray-400 focus:border-[#FD5109] focus:ring-1 focus:ring-[#FD5109] backdrop-blur-sm shadow-sm"
                dir="rtl"
              />
            </div>
          </form>

          {/* Powered by PwC */}
          <div className="flex items-center justify-center gap-2 opacity-60 mt-2">
            <span className="text-xs text-gray-500 font-fredoka">Powered by</span>
            <img 
              src={pwcLogo} 
              alt="PwC" 
              className="h-6 w-auto"
            />
          </div>
        </div>
      )}
    </div>
  )
}