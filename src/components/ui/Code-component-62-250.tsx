import { useCallback, useEffect, useRef } from "react"
import { motion } from "motion/react"

export interface ConfettiOptions {
  particleCount?: number
  angle?: number
  spread?: number
  startVelocity?: number
  decay?: number
  gravity?: number
  drift?: number
  ticks?: number
  origin?: { x: number; y: number }
  colors?: string[]
  shapes?: string[]
  scalar?: number
  zIndex?: number
  disableForReducedMotion?: boolean
}

interface ConfettiButtonProps {
  children: React.ReactNode
  options?: ConfettiOptions
  onClick?: () => void
  className?: string
  disabled?: boolean
}

// פונקציה להפעלת הקונפטי
const createConfetti = (options: ConfettiOptions = {}) => {
  // זיהוי אם זה מובייל
  const isMobile = window.innerWidth <= 768
  const screenWidth = window.innerWidth
  const screenHeight = window.innerHeight
  
  const defaults: ConfettiOptions = {
    particleCount: isMobile ? 60 : 100, // פחות פרטיקלים במובייל
    angle: 90,
    spread: isMobile ? 60 : 70, // פיזור קטן יותר במובייל
    startVelocity: isMobile ? 35 : 45, // מהירות מותאמת למובייל
    decay: 0.9,
    gravity: isMobile ? 1.2 : 1, // כבידה מעט יותר חזקה במובייל
    drift: 0,
    ticks: isMobile ? 150 : 200, // פחות זמן במובייל
    origin: { x: 0.5, y: 0.5 },
    colors: ['#D93954', '#E94B67', '#FF6B9D', '#FFD700', '#32CD32', '#00BFFF', '#DA70D6', '#FF8C00'],
    shapes: ['square', 'circle'],
    scalar: isMobile ? 0.8 : 1, // גודל פרטיקלים קטן יותר במובייל
    zIndex: 100,
    disableForReducedMotion: false
  }

  const config = { ...defaults, ...options }

  // יצירת אלמנטים של קונפטי
  const particles: HTMLElement[] = []
  
  for (let i = 0; i < config.particleCount!; i++) {
    const particle = document.createElement('div')
    const color = config.colors![Math.floor(Math.random() * config.colors!.length)]
    const shape = config.shapes![Math.floor(Math.random() * config.shapes!.length)]
    
    // עיצוב הפרטיקל - מותאם למובייל
    const particleSize = isMobile 
      ? Math.random() * 6 + 3  // גודל קטן יותר במובייל (3-9px)
      : Math.random() * 8 + 4  // גודל רגיל במסך רחב (4-12px)
    
    particle.style.position = 'fixed'
    particle.style.width = `${particleSize * config.scalar!}px`
    particle.style.height = particle.style.width
    particle.style.backgroundColor = color
    particle.style.borderRadius = shape === 'circle' ? '50%' : '0'
    particle.style.zIndex = config.zIndex!.toString()
    particle.style.pointerEvents = 'none'
    
    // הוספת צל עדין למובייל
    if (isMobile) {
      particle.style.boxShadow = `0 2px 4px rgba(0,0,0,0.1)`
    }
    
    // מיקום התחלתי - מותאם למובייל
    const startX = screenWidth * config.origin!.x
    const startY = screenHeight * config.origin!.y
    
    particle.style.left = `${startX}px`
    particle.style.top = `${startY}px`
    
    // חישוב מהירות וכיוון - מותאם למובייל
    const angleInRadians = (config.angle! * Math.PI) / 180
    const spread = config.spread! * Math.PI / 180
    const velocity = config.startVelocity! * (0.5 + Math.random() * 0.5)
    
    // התאמת מהירות למסך מובייל
    const velocityMultiplier = isMobile ? 0.8 : 1
    
    const angle = angleInRadians + (Math.random() - 0.5) * spread
    const velocityX = Math.cos(angle) * velocity * velocityMultiplier
    const velocityY = Math.sin(angle) * velocity * velocityMultiplier
    
    // הוספה לעמוד
    document.body.appendChild(particle)
    particles.push(particle)
    
    // אנימציה
    let posX = startX
    let posY = startY
    let velX = velocityX
    let velY = -velocityY // שלילי כי אנחנו רוצים שיעוף למעלה
    let tick = 0
    
    const animate = () => {
      if (tick >= config.ticks!) {
        particle.remove()
        return
      }
      
      // בדיקה אם הפרטיקל יצא מגבולות המסך (אופטימיזציה למובייל)
      if (isMobile && (posX < -50 || posX > screenWidth + 50 || posY > screenHeight + 50)) {
        particle.remove()
        return
      }
      
      // עדכון מיקום
      posX += velX
      posY += velY
      
      // הפעלת כבידה
      velY += config.gravity!
      velX *= config.decay!
      velY *= config.decay!
      
      // עדכון המיקום ב-DOM
      particle.style.left = `${posX}px`
      particle.style.top = `${posY}px`
      
      // עדכון שקיפות
      const opacity = 1 - (tick / config.ticks!)
      particle.style.opacity = opacity.toString()
      
      tick++
      requestAnimationFrame(animate)
    }
    
    requestAnimationFrame(animate)
  }
  
  // ניקוי אחרי זמן מסוים - מותאם למובייל
  const cleanupTime = isMobile ? config.ticks! * 12 : config.ticks! * 16 // מהר יותר במובייל
  setTimeout(() => {
    particles.forEach(particle => {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle)
      }
    })
  }, cleanupTime)
}

export function ConfettiButton({ 
  children, 
  options = {}, 
  onClick,
  className = "",
  disabled = false
}: ConfettiButtonProps) {
  const handleClick = useCallback(() => {
    if (!disabled) {
      createConfetti(options)
      onClick?.()
    }
  }, [options, onClick, disabled])

  return (
    <motion.button
      onClick={handleClick}
      disabled={disabled}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.button>
  )
}

// פונקציה נפרדת להפעלת קונפטי ללא כפתור
export const fireConfetti = (options: ConfettiOptions = {}) => {
  createConfetti(options)
}

// פונקציה להפעלת קונפטי עם אפקטים מיוחדים - מותאמת למובייל
export const fireCelebrationConfetti = () => {
  const isMobile = window.innerWidth <= 768
  
  // יריה ראשונה מהצד השמאלי
  setTimeout(() => {
    fireConfetti({
      particleCount: isMobile ? 30 : 50,
      angle: 60,
      spread: isMobile ? 45 : 55,
      origin: { x: 0, y: isMobile ? 0.5 : 0.6 },
      colors: ['#D93954', '#E94B67', '#FF6B9D'],
      startVelocity: isMobile ? 30 : 45
    })
  }, 0)

  // יריה שנייה מהצד הימני
  setTimeout(() => {
    fireConfetti({
      particleCount: isMobile ? 30 : 50,
      angle: 120,
      spread: isMobile ? 45 : 55,
      origin: { x: 1, y: isMobile ? 0.5 : 0.6 },
      colors: ['#FFD700', '#32CD32', '#00BFFF'],
      startVelocity: isMobile ? 30 : 45
    })
  }, 250)

  // יריה שלישית מהמרכז
  setTimeout(() => {
    fireConfetti({
      particleCount: isMobile ? 60 : 100,
      angle: 90,
      spread: isMobile ? 60 : 70,
      origin: { x: 0.5, y: isMobile ? 0.4 : 0.6 },
      colors: ['#DA70D6', '#FF8C00', '#D93954', '#FFD700'],
      startVelocity: isMobile ? 35 : 45
    })
  }, 400)
}