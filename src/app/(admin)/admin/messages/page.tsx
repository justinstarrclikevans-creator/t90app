'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Send, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const mockConversations = [
  { id: '1', name: 'John Doe', lastMessage: 'Thanks, I will check that out.', unread: true, time: '10:30 AM' },
  { id: '2', name: 'Jane Smith', lastMessage: 'Do you have the address?', unread: false, time: 'Yesterday' },
  { id: '3', name: 'Marcus Johnson', lastMessage: 'I completed the housing module.', unread: true, time: 'Yesterday' }
];

export default function AdminMessagesPage() {
  const [active, setActive] = useState<string | null>(null);
  
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      <div className={cn("w-full md:w-1/3 bg-white border-r flex flex-col h-screen", active ? 'hidden md:flex' : 'flex')}>
        <div className="p-4 border-b">
          <div className="flex items-center gap-3 mb-4">
            <Link href="/admin" className="p-2 -ml-2 rounded-lg hover:bg-slate-100 md:hidden">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold">Messages</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input type="text" placeholder="Search participants..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {mockConversations.map(conv => (
            <div 
              key={conv.id} 
              onClick={() => setActive(conv.id)}
              className={cn("p-4 border-b cursor-pointer hover:bg-slate-50 transition-colors", active === conv.id ? 'bg-blue-50' : '')}
            >
              <div className="flex justify-between items-start mb-1">
                <h3 className={cn("font-medium", conv.unread ? "text-slate-900 font-bold" : "text-slate-700")}>{conv.name}</h3>
                <span className="text-xs text-slate-500">{conv.time}</span>
              </div>
              <p className={cn("text-sm truncate", conv.unread ? "text-slate-800 font-medium" : "text-slate-500")}>
                {conv.lastMessage}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className={cn("w-full md:w-2/3 bg-slate-50 flex flex-col h-screen", !active ? 'hidden md:flex' : 'flex')}>
        {active ? (
          <>
            <div className="p-4 bg-white border-b flex items-center gap-3 shadow-sm z-10 shrink-0">
              <button onClick={() => setActive(null)} className="p-2 -ml-2 rounded-lg hover:bg-slate-100 md:hidden">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="font-bold text-lg">{mockConversations.find(c => c.id === active)?.name}</h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
              <div className="mr-auto bg-white p-3 rounded-lg rounded-tl-none shadow-sm text-slate-700 max-w-[80%]">
                Hello, how can I assist you today?
              </div>
              <div className="ml-auto bg-blue-600 text-white p-3 rounded-lg rounded-tr-none shadow-sm max-w-[80%]">
                {mockConversations.find(c => c.id === active)?.lastMessage}
              </div>
            </div>
            <div className="p-4 bg-white border-t shrink-0">
              <div className="flex gap-2">
                <input type="text" placeholder="Type a reply..." className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" />
                <button className="bg-blue-600 text-white p-2 px-4 rounded-lg flex items-center justify-center hover:bg-blue-700">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400">
            Select a conversation to start messaging
          </div>
        )}
      </div>
    </div>
  );
}
