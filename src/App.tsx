import { useState } from 'react';
import { Welcome } from './components/Welcome';
import { GeminiChatScreen } from './components/GeminiChatScreen';
import { ResultScreen } from './components/ResultScreen';

type Screen = 'welcome' | 'chat' | 'result';

interface AppState {
  screen: Screen;
  answers: Record<string, string>;
  topping: string;
  hasAllergy: boolean;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    screen: 'welcome',
    answers: {},
    topping: '',
    hasAllergy: false
  });

  const handleStart = () => {
    setAppState(prev => ({ ...prev, screen: 'chat' }));
  };

  const handleChatComplete = (answers: Record<string, string>) => {
    // Extract topping from Gemini's final response
    const finalResult = answers.finalResult || '';
    let topping = 'sprinkles';
    let hasAllergy = false;

    if (finalResult.includes('קוקוס')) {
      topping = 'coconut';
    } else if (finalResult.includes('בוטנים')) {
      topping = 'peanuts';
    } else if (finalResult.includes('סוכריות')) {
      topping = 'sprinkles';
    }

    // Check for allergy mention in the conversation
    hasAllergy = finalResult.includes('אלרגיה') || finalResult.includes('רגישות');

    setAppState({
      screen: 'result',
      answers,
      topping,
      hasAllergy
    });
  };

  const handleRestart = () => {
    setAppState({
      screen: 'welcome',
      answers: {},
      topping: '',
      hasAllergy: false
    });
  };

  switch (appState.screen) {
    case 'welcome':
      return <Welcome onStart={handleStart} />;
    case 'chat':
      return <GeminiChatScreen onComplete={handleChatComplete} />;
    case 'result':
      return <ResultScreen 
        topping={appState.topping} 
        hasAllergy={appState.hasAllergy} 
        onRestart={handleRestart} 
      />;
    default:
      return <Welcome onStart={handleStart} />;
  }
}
