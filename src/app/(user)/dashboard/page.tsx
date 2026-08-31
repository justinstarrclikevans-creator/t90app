'use client';

import Link from 'next/link';
import { 
  Brain, 
  Wrench, 
  Briefcase, 
  Target, 
  CircleDollarSign, 
  MessageCircle 
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const cards = [
    {
      title: 'CBT Training',
      description: 'Continue your lessons',
      href: '/cbt',
      icon: Brain,
      color: 'bg-blue-100 text-blue-700',
      borderColor: 'border-blue-200'
    },
    {
      title: 'Trades Training',
      description: 'Learn a trade',
      href: '/trades',
      icon: Wrench,
      color: 'bg-amber-100 text-amber-700',
      borderColor: 'border-amber-200'
    },
    {
      title: 'Employment',
      description: 'Build your career',
      href: '/employment',
      icon: Briefcase,
      color: 'bg-green-100 text-green-700',
      borderColor: 'border-green-200'
    },
    {
      title: 'Life Goals',
      description: 'Track your progress',
      href: '/life-goals',
      icon: Target,
      color: 'bg-purple-100 text-purple-700',
      borderColor: 'border-purple-200'
    },
    {
      title: 'Financial Tools',
      description: 'Manage your money',
      href: '/financial',
      icon: CircleDollarSign,
      color: 'bg-emerald-100 text-emerald-700',
      borderColor: 'border-emerald-200'
    },
    {
      title: 'Messages',
      description: 'Talk to staff',
      href: '/messages',
      icon: MessageCircle,
      color: 'bg-rose-100 text-rose-700',
      borderColor: 'border-rose-200'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Welcome back!
          </h1>
          <p className="text-lg text-slate-600 mt-2">
            What would you like to work on today?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href={card.href}
                className={cn(
                  "flex items-center p-6 bg-white rounded-2xl shadow-sm border-2 transition-all hover:shadow-md min-h-[120px]",
                  card.borderColor,
                  "active:scale-[0.98]"
                )}
              >
                <div className={cn("p-4 rounded-xl mr-5", card.color)}>
                  <Icon size={36} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{card.title}</h2>
                  <p className="text-slate-600 font-medium mt-1 text-lg">
                    {card.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
