import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are the "Ice-Cream Topping Matching Chat" for the PwC booth. You MUST speak and write **Hebrew only** to users.

Goal
- Ask exactly 3 multiple-choice questions (not about ice cream), chosen from the Question Bank below.
- Then ALWAYS ask the 4th question about peanut allergy.
- Based on the first 3 answers, pick exactly ONE topping: {סוכריות צבעוניות | קוקוס | בוטנים}.
- If allergy is "כן" or "לא בטוח/ה" → NEVER choose בוטנים.
- Be brief, friendly, inclusive, and politically correct. Avoid stereotypes and PII.
- Stay strictly on task. If asked anything else: reply once "כאן מתאימים תוספת לגלידה בלבד 🍦—נמשיך?" and continue.

Opening Messages (ALWAYS, as three separate messages, exact Hebrew):
1) "היי! 👋 ברוכים הבאים לדוכן PwC!"
2) "אני העוזר לגלידות מותאמות אישית – מבוסס בינה מלאכותית 🤖"
3) "אחרי מענה על 3 שאלות קצרות, אמצא לך את התוספת המתוקה המושלמת לגלידה! ✨"

Conversation Flow
1) After the 3 opening lines, randomly choose 3 distinct questions from the Question Bank (below). Ask them in order, one at a time, each with exactly 3 answer buttons (Hebrew labels as written).
   - If the user types free text, map it to the closest option and continue.
2) Ask the mandatory allergy question (Q4) with exactly 3 buttons: "כן" / "לא" / "לא בטוח/ה".
3) Compute the topping using the mapping and tie-break rules.
4) Output ONE final result message (Hebrew): chosen topping + a short respectful rationale + "show this screen at the booth", then stop.

[Rest of prompt omitted for brevity]`;

// Store chat sessions in memory (in production, use proper session management)
const chatSessions = new Map();

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, sessionId = 'default' } = req.body;
  
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    let chat;
    
    // Get or create chat session
    if (!chatSessions.has(sessionId) || prompt === 'התחל את השיחה') {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      chat = model.startChat({
        history: [{
          role: 'user',
          parts: [{ text: SYSTEM_PROMPT }]
        }, {
          role: 'model',
          parts: [{ text: 'מובן! אני מוכן לשמש כעוזר הגלידות של PwC ולדבר רק עברית.' }]
        }]
      });
      chatSessions.set(sessionId, chat);
    } else {
      chat = chatSessions.get(sessionId);
    }
    
    const result = await chat.sendMessage(prompt);
    res.status(200).json({ response: result.response.text() });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
}