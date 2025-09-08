import { useState, useEffect } from "react"
import { IceButton } from "./ui/ice-button"
import { RotateCcw } from "lucide-react"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { fireConfetti } from "./ui/confetti"
import peanutIceCreamImage from 'figma:asset/9246e55ad23bfa7af934a881437786412fb94bdd.png'
import coconutIceCreamImage from 'figma:asset/c6c82b9d575f6b1d12962f9d5de70b1d967c0a71.png'
import sprinklesIceCreamImage from 'figma:asset/d1e61714a1619c0754d49f200116dd8fde1d8eab.png'
import pwcLogo from 'figma:asset/17ec2cf0792188f890167fc945e9be5f10b81f22.png'

interface ResultScreenProps {
  topping: string
  hasAllergy: boolean
  onRestart: () => void
}

const toppingData = {
  coconut: {
    name: "קוקוס",
    image: coconutIceCreamImage,
    description: "אישיות רגועה ומאוזנת שאוהבת את הטעם העדין והטבעי",
    emoji: "🥥"
  },
  peanuts: {
    name: "בוטנים",
    image: peanutIceCreamImage,
    description: "אישיות אנרגטית וחברתית שאוהבת טעמים עשירים",
    emoji: "🥜"
  },
  sprinkles: {
    name: "סוכריות צבעוניות",
    image: sprinklesIceCreamImage,
    description: "אישיות יצירתית ועליזה שאוהבת להוסיף צבע לחיים",
    emoji: "🌈"
  }
}

export function ResultScreen({ topping, hasAllergy, onRestart }: ResultScreenProps) {
  const toppingInfo = toppingData[topping as keyof typeof toppingData]

  useEffect(() => {
    // וידוא שהעמוד מתחיל מלמעלה
    window.scrollTo(0, 0)
    
    // קונפטי נוסף כשנכנסים לעמוד התוצאות - מותאם למובייל
    const timer = setTimeout(() => {
      const isMobile = window.innerWidth <= 768
      
      fireConfetti({
        particleCount: isMobile ? 80 : 150,
        angle: 90,
        spread: isMobile ? 80 : 100,
        origin: { x: 0.5, y: isMobile ? 0.25 : 0.3 },
        colors: ['#FD5109', '#FF6B20', '#FF8C00', '#FFD700', '#32CD32', '#00BFFF', '#DA70D6', '#FF4444'],
        startVelocity: isMobile ? 35 : 45
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-surface-subtle via-background to-accent/20 flex flex-col items-center justify-start pt-8 md:pt-12 p-6 md:p-8 pb-[env(safe-area-inset-bottom,1.5rem)] text-center animate-fade-in-up w-full" dir="rtl">
      {/* Result Image */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-full blur-xl animate-pulse-rainbow"></div>
          <ImageWithFallback 
            src={toppingInfo.image} 
            alt={`גלידה עם ${toppingInfo.name}`}
            className="relative w-48 sm:w-56 md:w-72 lg:w-80 xl:w-96 h-48 sm:h-56 md:h-72 lg:h-80 xl:h-96 object-cover rounded-full drop-shadow-2xl animate-bounce-gentle transform hover:scale-105 transition-all duration-500"
          />
          <div className="absolute -top-4 -right-4 text-5xl md:text-6xl animate-wiggle">
            {toppingInfo.emoji}
          </div>
          <div className="absolute -bottom-2 -left-4 text-3xl md:text-4xl animate-bounce-gentle">🎉</div>
          <div className="absolute top-2 left-2 text-2xl md:text-3xl animate-pulse">⭐</div>
        </div>
      </div>

      {/* Result Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 animate-rainbow-text font-fredoka">
        התוספת שלך: {toppingInfo.name}! 🎊
      </h1>

      {/* Description */}
      <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-6 max-w-sm md:max-w-md lg:max-w-lg leading-relaxed animate-fade-in-up font-medium">
        מבוסס על האישיות הייחודית שלך ✨🌈✨
      </p>

      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground mb-8 max-w-xs md:max-w-sm lg:max-w-md animate-slide-in-fun font-medium bg-gradient-to-r from-accent/20 to-secondary/20 p-4 md:p-6 lg:p-8 rounded-2xl border-2 border-accent/30">
        {toppingInfo.description} 💫
      </p>

      {/* Allergy Notice */}
      {hasAllergy && (
        <div className="bg-gradient-to-r from-warning/20 via-warning/10 to-accent/20 border-2 border-warning/40 rounded-2xl p-4 md:p-6 lg:p-8 mb-6 animate-wiggle shadow-lg">
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-warning-foreground font-semibold">
            💡🌟 התאמנו את הבחירה ללא בוטנים בגלל האלרגיה שלך 🌟💡
          </p>
        </div>
      )}

      {/* Redemption Section */}
      <div className="bg-gradient-to-br from-card via-accent/10 to-secondary/20 rounded-3xl p-6 md:p-8 lg:p-10 shadow-rainbow mb-8 w-full max-w-sm md:max-w-md lg:max-w-lg animate-scale-bounce border-2 border-accent/30 backdrop-blur-sm">
        <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-4 animate-rainbow-text font-fredoka">
          🍨✨ איך לקבל את הגלידה שלך ✨🍦
        </h3>
        
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground font-medium">
          פנו למוכר הגלידה בדוכן והציגו את התוצאה שלכם! 🏪✨
        </p>
      </div>

      {/* Restart Button */}
      <IceButton 
        variant="secondary" 
        onClick={onRestart}
        className="mb-6"
      >
        <RotateCcw className="w-5 h-5 ml-2" />
        🔄 נסה שוב 🔄
      </IceButton>

      {/* Footer */}
      <div className="flex items-center justify-center gap-2 opacity-60 animate-fade-in-up">
        <img 
          src={pwcLogo} 
          alt="PwC" 
          className="h-6 w-auto"
        />
        <span className="text-xs text-gray-500 font-fredoka">Powered by</span>
      </div>
    </div>
  )
}