import { Button } from "./ui/button";
import logoImage from 'figma:asset/617f1a0f201bd41244f5ae726ff59bec7586ea12.png';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WelcomeProps {
  onStart: () => void
}

export function Welcome({ onStart }: WelcomeProps) {
  return (
    <div className="relative h-screen h-[100dvh] overflow-hidden flex items-center justify-center text-white w-full" dir="rtl">
      {/* Video Background */}
      <video 
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 scale-110"
        autoPlay 
        muted 
        loop 
        playsInline 
        preload="auto"
      >
        <source src="https://res.cloudinary.com/dscssx4qf/video/upload/v1757323428/Firefly_Vertical_portrait_9-16_macro_product_shot._Ultra-realistic_chubby_American_soft-serve_ice_cy3cuj.mp4" type="video/mp4" />
      </video>

      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 -z-5"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#D93954]/15 via-transparent to-transparent -z-4"></div>
      
      {/* Subtle texture overlay for glass integration */}
      <div 
        className="absolute inset-0 -z-3 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(217, 57, 84, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(217, 57, 84, 0.05) 0%, transparent 50%)
          `
        }}
      />

      {/* Floating Elements */}
      <motion.div 
        className="absolute top-20 left-8 w-3 h-3 bg-white/20 rounded-full backdrop-blur-sm"
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute top-40 right-12 w-2 h-2 bg-[#FD5109]/40 rounded-full backdrop-blur-sm"
        animate={{ 
          y: [0, 15, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div 
        className="absolute bottom-80 left-6 w-4 h-4 bg-white/10 rounded-full backdrop-blur-sm"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.1, 0.4, 0.1]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      {/* Connection particles for glass integration */}
      <motion.div 
        className="absolute bottom-56 right-8 w-2 h-2 bg-[#FD5109]/30 rounded-full backdrop-blur-sm"
        animate={{ 
          y: [0, -8, 0],
          opacity: [0.2, 0.6, 0.2],
          scale: [1, 1.2, 1]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      <motion.div 
        className="absolute bottom-64 left-12 w-1 h-1 bg-white/40 rounded-full backdrop-blur-sm"
        animate={{ 
          y: [0, -12, 0],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ 
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5
        }}
      />

      {/* Content Container */}
      <div className="flex flex-col h-full w-full z-10">
        {/* Top Section - Logo */}
        <motion.div 
          className="flex-1 flex flex-col justify-center items-center text-center px-6 pt-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-4">
              <ImageWithFallback 
                src={logoImage} 
                alt="Next AICream" 
                className="w-72 max-w-full mx-auto drop-shadow-2xl"
              />

            </div>
          </motion.div>
        </motion.div>
        
        {/* Bottom Rounded Section - Glass Morphism */}
        <motion.div 
          className="h-[38%] relative rounded-t-[2.5rem] px-8 py-8 flex flex-col justify-between backdrop-blur-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            background: `
              linear-gradient(
                to top,
                rgba(253, 81, 9, 0.15) 0%,
                rgba(0, 0, 0, 0.6) 20%,
                rgba(0, 0, 0, 0.4) 60%,
                rgba(0, 0, 0, 0.1) 100%
              ),
              linear-gradient(
                135deg,
                rgba(255, 255, 255, 0.1) 0%,
                rgba(255, 255, 255, 0.05) 100%
              )
            `,
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
            borderRight: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: `
              0 -8px 32px rgba(0, 0, 0, 0.3),
              inset 0 1px 0 rgba(255, 255, 255, 0.2),
              0 0 60px rgba(253, 81, 9, 0.1)
            `
          }}
        >
          {/* Decorative Elements */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white/40 rounded-full shadow-lg"></div>
          
          {/* Additional Glass Effect Overlay */}
          <div 
            className="absolute inset-0 rounded-t-[2.5rem] pointer-events-none"
            style={{
              background: `
                linear-gradient(
                  45deg,
                  transparent 0%,
                  rgba(255, 255, 255, 0.03) 25%,
                  transparent 50%,
                  rgba(255, 255, 255, 0.03) 75%,
                  transparent 100%
                )
              `
            }}
          />
          
          {/* Text Content */}
          <motion.div 
            className="text-center text-white flex-1 flex flex-col justify-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.h1 
              className="text-2xl mb-2 max-w-sm mx-auto leading-relaxed bg-gradient-to-l from-white via-white to-white/90 bg-clip-text text-transparent font-medium"
              animate={{ 
                backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              3 שאלות קצרות | תוספת מותאמת אישית ✨
            </motion.h1>
            <motion.p 
              className="text-base text-gray-200 max-w-xs mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              נגלה ביחד איזו תוספת מתאימה לאישיות שלך
            </motion.p>
          </motion.div>
          
          {/* Enhanced Button */}
          <motion.div 
            className="mt-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                onClick={onStart}
                className="w-full bg-gradient-to-r from-[#FD5109] to-[#FF6B20] hover:from-[#E04300] hover:to-[#FF5500] text-white py-7 text-xl rounded-3xl shadow-2xl shadow-[#FD5109]/25 border border-white/10 backdrop-blur-sm relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  בואו נתחיל! 🍦
                </span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}