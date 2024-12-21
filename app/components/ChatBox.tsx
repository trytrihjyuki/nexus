'use client';

import { useState, useEffect, useRef } from 'react';

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const question = input.trim();
    if (!question) return;
    setMessages((m) => [...m, { role: 'user', content: question }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/inference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: question }),
      });
      const data = await res.json();
      const answer = data?.text ?? 'No response';
      setMessages((m) => [...m, { role: 'assistant', content: answer }]);
    } catch (err) {
      console.error(err);
      setMessages((m) => [...m, { role: 'assistant', content: 'Error occurred' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl w-full mx-auto bg-black border border-green-500/50 rounded p-4">
      <h2 className="text-2xl mb-4 text-green-300">Talk to Vicunai</h2>
      <div
        className="h-64 overflow-y-auto bg-black p-2 border border-green-400/20 rounded mb-4 text-green-200 font-mono text-sm"
        ref={scrollRef}
      >
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-green-300' : 'text-green-200'}`}>
            <span className="font-bold">{msg.role === 'user' ? 'You: ' : 'Vicunai: '}</span>
            <span>{msg.content}</span>
          </div>
        ))}
        {loading && <div>Vicunai is thinking...</div>}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          className="flex-1 p-2 bg-black border border-green-400 text-green-100 focus:outline-none font-mono"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-black font-bold rounded"
        >
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
