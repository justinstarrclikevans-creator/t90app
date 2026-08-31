'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const SUGGESTIONS = [
  'Help me find a referral',
  'Help me with my resume',
  'What is the DMT tool?'
];

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
      });

      if (res.ok) {
        const data = await res.json();
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response || "I'm sorry, I couldn't understand that."
        };
        setMessages((prev) => [...prev, aiMessage]);
      } else {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Oops! Something went wrong. Please try again later.'
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error(error);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I am having trouble connecting right now.'
      };
      setMessages((prev) => [...prev, aiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-600/50"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-8 w-8" />
        </button>
      )}

      {isOpen && (
        <div className="flex h-[100dvh] w-[100dvw] flex-col overflow-hidden bg-slate-50 sm:h-[600px] sm:w-[400px] sm:rounded-2xl sm:shadow-2xl fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 border border-slate-200">
          {/* Header */}
          <div className="flex items-center justify-between bg-blue-600 p-4 text-white">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              <h2 className="text-xl font-bold">Turn90 Assistant</h2>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label="Close Assistant"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-slate-600 mt-8">
                <p className="text-lg font-medium mb-6">How can I help you today?</p>
                <div className="flex flex-col gap-3">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSend(suggestion)}
                      className="rounded-xl border-2 border-blue-100 bg-white p-3 text-left text-blue-700 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 min-h-[48px] transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex w-full",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl p-4 text-base",
                    msg.role === 'user'
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-slate-900 shadow-sm border border-slate-100 rounded-bl-none"
                  )}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-slate-900 shadow-sm border border-slate-100 rounded-2xl rounded-bl-none p-4 flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t bg-white p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 rounded-xl border-2 border-slate-200 px-4 py-3 text-lg focus:border-blue-600 focus:outline-none focus:ring-0 min-h-[48px]"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="flex items-center justify-center rounded-xl bg-blue-600 px-4 text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/50 disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] min-w-[48px]"
                aria-label="Send message"
              >
                <Send className="h-6 w-6" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
