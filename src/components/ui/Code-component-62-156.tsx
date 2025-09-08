import { useEffect, useState } from 'react'

export function useKeyboardVisible() {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  useEffect(() => {
    const initialViewportHeight = window.visualViewport?.height ?? window.innerHeight
    
    const handleViewportChange = () => {
      const currentHeight = window.visualViewport?.height ?? window.innerHeight
      const heightDifference = initialViewportHeight - currentHeight
      
      // אם הגובה השתנה ביותר מ-150px, כנראה שהמקלדת נפתחה
      setIsKeyboardVisible(heightDifference > 150)
    }

    // תמיכה במקלדת ווירטואלית מודרנית
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleViewportChange)
      return () => {
        window.visualViewport?.removeEventListener('resize', handleViewportChange)
      }
    } else {
      // פתרון חלופי למכשירים ישנים יותר
      window.addEventListener('resize', handleViewportChange)
      return () => {
        window.removeEventListener('resize', handleViewportChange)
      }
    }
  }, [])

  return isKeyboardVisible
}