import { motion } from "motion/react"

interface ProgressDotsProps {
  current: number
  total: number
}

export function ProgressDots({ current, total }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index < current
        const isCurrent = index === current - 1
        
        return (
          <motion.div
            key={index}
            className={`
              rounded-full transition-all duration-300
              ${isActive 
                ? "bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/30" 
                : "bg-muted/50 border border-muted"
              }
              ${isCurrent ? "w-4 h-4 animate-pulse-glow" : "w-3 h-3"}
            `}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              boxShadow: isCurrent ? "0 0 15px rgba(217, 57, 84, 0.4)" : "none"
            }}
            transition={{ 
              duration: 0.3,
              delay: index * 0.1,
              type: "spring",
              stiffness: 300
            }}
            whileHover={{ 
              scale: 1.2,
              transition: { duration: 0.2 }
            }}
          >
            {isActive && (
              <motion.div
                className="w-full h-full rounded-full bg-gradient-to-r from-white/30 to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              />
            )}
          </motion.div>
        )
      })}
    </div>
  )
}