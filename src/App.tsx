import { useState } from "react"
import { Welcome } from "./components/Welcome"
import { ChatScreen } from "./components/ChatScreen"
import { ResultScreen } from "./components/ResultScreen"
import { calculateTopping } from "./data/questions"
import { Toaster } from "./components/ui/sonner"

type Screen = "welcome" | "chat" | "result"

interface AppState {
  screen: Screen
  answers?: Record<string, string>
  topping?: string
  hasAllergy?: boolean
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({ screen: "welcome" })

  const handleWelcomeComplete = () => {
    setAppState({ screen: "chat" })
  }

  const handleChatComplete = (answers: Record<string, string>) => {
    const topping = calculateTopping(answers)
    const hasAllergy = answers.peanut_allergy === "yes"
    
    setAppState({ 
      screen: "result", 
      answers,
      topping,
      hasAllergy 
    })
  }

  const handleRestart = () => {
    setAppState({ screen: "welcome" })
  }

  const renderScreen = () => {
    switch (appState.screen) {
      case "welcome":
        return <Welcome onStart={handleWelcomeComplete} />
      case "chat":
        return <ChatScreen onComplete={handleChatComplete} />
      case "result":
        return (
          <ResultScreen 
            topping={appState.topping!}
            hasAllergy={appState.hasAllergy!}
            onRestart={handleRestart}
          />
        )
      default:
        return <Welcome onStart={handleWelcomeComplete} />
    }
  }

  return (
    <>
      {renderScreen()}
      <Toaster />
    </>
  )
}