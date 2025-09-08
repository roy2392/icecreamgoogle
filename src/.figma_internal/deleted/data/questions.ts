export interface QuestionOption {
  value: string
  label: string
}

export interface Question {
  id: string
  text: string
  options?: QuestionOption[]
}

export const questionSets: Question[][] = [
  // Set 1
  [
    {
      id: "mood",
      text: "איך אתה מרגיש היום? 😊",
      options: [
        { value: "energetic", label: "אנרגטי ומלא חיים" },
        { value: "chill", label: "רגוע ונינוח" },
        { value: "creative", label: "יצירתי ומשחק" }
      ]
    },
    {
      id: "activity",
      text: "מה הדבר הכי כיפי שעשית השבוע? 🎉",
      options: [
        { value: "social", label: "בילוי עם חברים" },
        { value: "nature", label: "זמן בטבע" },
        { value: "creative", label: "משהו יצירתי" }
      ]
    },
    {
      id: "flavor_preference",
      text: "איזה טעם הכי מדבר אליך? 🍧",
      options: [
        { value: "natural", label: "טבעי ועדין" },
        { value: "bold", label: "עשיר ועז" },
        { value: "sweet", label: "מתוק וצבעוני" }
      ]
    }
  ],
  // Set 2
  [
    {
      id: "personality",
      text: "החברים שלך יגידו שאתה... 🤗",
      options: [
        { value: "adventurous", label: "הרפתקן אמיתי" },
        { value: "peaceful", label: "נפש רגועה" },
        { value: "fun", label: "נשמה כיפית" }
      ]
    },
    {
      id: "weekend",
      text: "סוף השבוע המושלם שלך כולל... 🌈",
      options: [
        { value: "active", label: "הרבה פעילות ואנשים" },
        { value: "calm", label: "רגיעה ושקט" },
        { value: "colorful", label: "צבעים ויצירתיות" }
      ]
    },
    {
      id: "style",
      text: "הסטייל שלך הוא בעיקר... ✨",
      options: [
        { value: "classic", label: "קלאסי ונקי" },
        { value: "bold", label: "בולט ומעניין" },
        { value: "playful", label: "משחק וצבעוני" }
      ]
    }
  ],
  // Set 3
  [
    {
      id: "dream_vacation",
      text: "החופשה הכי מושלמת שלך תהיה... 🏝️",
      options: [
        { value: "tropical", label: "אי טרופי שקט" },
        { value: "city", label: "עיר גדולה ותוססת" },
        { value: "adventure", label: "הרפתקה צבעונית" }
      ]
    },
    {
      id: "food_choice",
      text: "במסעדה אתה בוחר... 🍽️",
      options: [
        { value: "healthy", label: "משהו בריא וטבעי" },
        { value: "rich", label: "משהו עשיר וטעים" },
        { value: "sweet", label: "קינוח מהמם" }
      ]
    },
    {
      id: "color_mood",
      text: "איזה צבע הכי מייצג אותך היום? 🎨",
      options: [
        { value: "earth", label: "צבעי אדמה חמים" },
        { value: "deep", label: "צבעים עמוקים" },
        { value: "bright", label: "צבעים בהירים" }
      ]
    }
  ]
]

export const allergyQuestion: Question = {
  id: "peanut_allergy",
  text: "האם יש לך אלרגיה לבוטנים? 🥜",
  options: [
    { value: "yes", label: "כן, יש לי אלרגיה" },
    { value: "no", label: "לא, אין לי אלרגיה" }
  ]
}

// Topping assignment logic
export function calculateTopping(answers: Record<string, string>): string {
  const hasAllergy = answers.peanut_allergy === "yes"
  
  if (hasAllergy) {
    // If allergic to peanuts, choose between coconut and sprinkles
    const naturalAnswers = ["energetic", "chill", "nature", "natural", "peaceful", "calm", "classic", "tropical", "healthy", "earth"]
    const naturalCount = Object.values(answers).filter(answer => naturalAnswers.includes(answer)).length
    
    return naturalCount >= 2 ? "coconut" : "sprinkles"
  }
  
  // No allergy - can choose any topping
  const coconutAnswers = ["chill", "nature", "natural", "peaceful", "calm", "classic", "tropical", "healthy", "earth"]
  const peanutAnswers = ["energetic", "social", "bold", "adventurous", "active", "city", "rich", "deep"]
  const sprinklesAnswers = ["creative", "sweet", "fun", "colorful", "playful", "adventure", "bright"]
  
  const coconutCount = Object.values(answers).filter(answer => coconutAnswers.includes(answer)).length
  const peanutCount = Object.values(answers).filter(answer => peanutAnswers.includes(answer)).length
  const sprinklesCount = Object.values(answers).filter(answer => sprinklesAnswers.includes(answer)).length
  
  if (peanutCount >= coconutCount && peanutCount >= sprinklesCount) return "peanuts"
  if (coconutCount >= sprinklesCount) return "coconut"
  return "sprinkles"
}