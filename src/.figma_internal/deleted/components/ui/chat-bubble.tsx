import { motion } from "motion/react"
import botAvatarImage from 'figma:asset/834277175e6e3ab52c5f7e817e57267086813c09.png'

interface ChatBubbleProps {
  message: string
  isBot: boolean
}

export function ChatBubble({ message, isBot }: ChatBubbleProps) {
  return (
    <motion.div
      className={`flex mb-4 ${isBot ? "justify-start" : "justify-end"}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.4,
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
    >
      {isBot && (
        <motion.div 
          className="flex-shrink-0 mr-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <img 
            src={botAvatarImage} 
            alt="AIce Cream Bot" 
            className="w-8 sm:w-10 md:w-12 lg:w-14 h-8 sm:h-10 md:h-12 lg:h-14 rounded-full shadow-md border-2 border-white"
          />
        </motion.div>
      )}
      <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-3 md:py-4 rounded-2xl font-fredoka ${
        isBot 
          ? "bg-white/95 shadow-lg border border-white/70 text-gray-800 rounded-tl-sm backdrop-blur-sm" 
          : "bg-[#D93954] text-white shadow-lg rounded-br-sm border border-white/20"
      }`}>
        <motion.p 
          className="text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: isBot ? 0.3 : 0.1 }}
          dir="rtl"
        >
          {message}
        </motion.p>
      </div>
    </motion.div>
  )
}

export function TypingIndicator() {
  return (
    <motion.div
      className="flex justify-start mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="flex-shrink-0 mr-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <motion.img 
          src={botAvatarImage} 
          alt="AIce Cream Bot" 
          className="w-8 sm:w-10 md:w-12 lg:w-14 h-8 sm:h-10 md:h-12 lg:h-14 rounded-full shadow-md border-2 border-white"
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-3 md:py-4 rounded-2xl bg-white/95 shadow-lg border border-white/70 rounded-tl-sm backdrop-blur-sm">
        <div className="flex items-center space-x-1 rtl:space-x-reverse" dir="rtl">
          <span className="text-sm text-gray-600">מכין שאלה</span>
          <div className="flex space-x-1 rtl:space-x-reverse">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-[#D93954]/60 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}