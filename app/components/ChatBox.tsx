'use client';

import { useState, useEffect, useRef} from 'react';
import React from 'react'

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
    <div className="max-w-3xl w-full mx-auto bg-black border border-blue-500/50 rounded p-4">
      <h2 className="text-2xl mb-4 text-blue-300">Decrypt. Discover. Disrupt.</h2>
      <div
        className="h-64 overflow-y-auto bg-black p-2 border border-blue-400/20 rounded mb-4 text-blue-200 font-mono text-sm"
        ref={scrollRef}
      >
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-blue-300' : 'text-blue-200'}`}>
            <span className="font-bold">{msg.role === 'user' ? 'You: ' : 'Nexus: '}</span>
            <span>{msg.content}</span>
          </div>
        ))}
        {loading && <div>Whisper into the void. Nexus is thinking...</div>}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <input
          className="flex-1 p-2 bg-black border border-blue-400 text-blue-100 focus:outline-none font-mono"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here..."
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-black font-bold rounded"
        >
          {loading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
