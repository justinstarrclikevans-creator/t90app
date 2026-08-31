'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, Send } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MessagesPage() {
  const [messages, setMessages] = useState<{id: string, text: string, sender: 'user' | 'staff', timestamp: string}[]>([]);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('t90_messages');
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      setMessages([{
        id: '1',
        text: "Welcome to Turn90! I'm here to help. Send me a message anytime.",
        sender: 'staff',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('t90_messages', JSON.stringify(messages));
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg = {
      id: Date.now().toString(),
      text: input,
      sender: 'user' as const,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! A staff member will get back to you soon.",
        sender: 'staff',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50">
      <header className="bg-white p-4 shadow-sm flex items-center shrink-0">
        <Link href="/dashboard" className="p-2 -ml-2 rounded-lg hover:bg-slate-100 min-h-[48px] min-w-[48px] flex items-center justify-center">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold ml-2">Messages</h1>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={cn("flex flex-col max-w-[80%]", msg.sender === 'user' ? "ml-auto items-end" : "mr-auto items-start")}>
            <div className={cn("p-4 rounded-2xl text-lg", msg.sender === 'user' ? "bg-blue-600 text-white rounded-tr-none" : "bg-white border border-slate-200 text-slate-900 rounded-tl-none shadow-sm")}>
              {msg.text}
            </div>
            <span className="text-xs text-slate-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}
        <div ref={endRef} />
      </main>

      <footer className="bg-white p-4 border-t shrink-0 mb-safe">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..."
            className="flex-1 min-h-[56px] border-2 border-slate-200 rounded-xl px-4 text-lg focus:border-blue-600 focus:outline-none"
          />
          <button 
            onClick={handleSend}
            className="min-h-[56px] min-w-[56px] bg-blue-600 text-white rounded-xl flex items-center justify-center active:bg-blue-700"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </footer>
    </div>
  );
}
