import { useState } from 'react';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export function GeminiChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const prompt = input;
    setMessages(prev => [...prev, { role: 'user', text: prompt }]);
    setInput('');
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'bot', text: data.response || 'No response' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', text: 'Error contacting server.' }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <div className="h-96 overflow-y-auto mb-4 border p-2 space-y-2">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <span className={m.role === 'user' ? 'bg-blue-200 p-2 rounded inline-block' : 'bg-gray-200 p-2 rounded inline-block'}>
              {m.text}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4">
          Send
        </button>
      </form>
    </div>
  );
}
