'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Target, Info, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

type ItemState = 'Need' | 'Working On It' | 'Have It';

type GoalItem = {
  id: string;
  title: string;
  category: string;
  state: ItemState;
  tutorial?: string;
};

const INITIAL_GOALS: GoalItem[] = [
  { id: 'id', title: 'Picture ID', category: 'Stability Documents', state: 'Need', tutorial: 'To get a SC ID card, visit the SCDMV. You will need proof of identity, US citizenship/legal presence, social security number, and proof of SC address.' },
  { id: 'license', title: "Driver's License", category: 'Stability Documents', state: 'Need', tutorial: 'If your license was suspended, check your status at SCDMVOnline.com to see what fines or requirements are needed for reinstatement.' },
  { id: 'ssn', title: 'Social Security Card', category: 'Stability Documents', state: 'Need', tutorial: 'Request a replacement card online through your my Social Security account or visit your local SSA office.' },
  { id: 'birth', title: 'Birth Certificate', category: 'Stability Documents', state: 'Need', tutorial: 'Order a SC birth certificate from DHEC online, by phone, by mail, or in person at a county health department.' },
  
  { id: 'housing', title: 'Stable Housing', category: 'Life Stability', state: 'Need' },
  { id: 'transport', title: 'Transportation', category: 'Life Stability', state: 'Need' },
  { id: 'health', title: 'Health Insurance/Care', category: 'Life Stability', state: 'Need', tutorial: 'Check if you qualify for Medicaid or use Welvista for free prescription assistance in SC.' },
  { id: 'bank', title: 'Bank Account', category: 'Life Stability', state: 'Need', tutorial: 'Look for "second chance" checking accounts if you have a ChexSystems record. Credit unions are often good options.' },
  { id: 'email', title: 'Professional Email', category: 'Life Stability', state: 'Need', tutorial: 'Create a free Gmail account. Use a simple name format like firstname.lastname@gmail.com for job applications.' },
  
  { id: 'job', title: 'Employment', category: 'Employment', state: 'Need' },
];

export default function LifeGoalsPage() {
  const [goals, setGoals] = useState<GoalItem[]>(INITIAL_GOALS);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('t90_life_goals');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge saved state with initial structure in case structure changed
      const merged = INITIAL_GOALS.map(initialGoal => {
        const found = parsed.find((p: any) => p.id === initialGoal.id);
        return found ? { ...initialGoal, state: found.state } : initialGoal;
      });
      setGoals(merged);
    }
  }, []);

  const toggleState = (id: string) => {
    setGoals(prev => {
      const updated = prev.map(goal => {
        if (goal.id === id) {
          const nextState: Record<ItemState, ItemState> = {
            'Need': 'Working On It',
            'Working On It': 'Have It',
            'Have It': 'Need'
          };
          return { ...goal, state: nextState[goal.state] };
        }
        return goal;
      });
      localStorage.setItem('t90_life_goals', JSON.stringify(updated));
      return updated;
    });
  };

  const getStateColor = (state: ItemState) => {
    switch(state) {
      case 'Need': return 'bg-red-50 text-red-700 border-red-200';
      case 'Working On It': return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Have It': return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  const getStateIcon = (state: ItemState) => {
    switch(state) {
      case 'Need': return <AlertCircle className="w-6 h-6 text-red-500" />;
      case 'Working On It': return <Clock className="w-6 h-6 text-amber-500" />;
      case 'Have It': return <CheckCircle2 className="w-6 h-6 text-green-500" />;
    }
  };

  const categories = Array.from(new Set(goals.map(g => g.category)));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white p-4 shadow-sm flex items-center gap-4 sticky top-0 z-10">
        <Link 
          href="/dashboard"
          className="p-2 -ml-2 rounded-lg hover:bg-slate-100 flex items-center justify-center min-h-[48px] min-w-[48px]"
        >
          <ChevronLeft className="w-6 h-6 text-slate-900" />
        </Link>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-600" />
          Life Goals Tracker
        </h1>
      </header>

      <main className="flex-1 p-4 max-w-2xl mx-auto w-full space-y-8 pb-20">
        <div className="bg-blue-50 p-4 rounded-xl text-blue-900">
          <p>Tap a button to change its status: <strong className="text-red-600">Need</strong> → <strong className="text-amber-600">Working On It</strong> → <strong className="text-green-600">Have It</strong>.</p>
        </div>

        {categories.map(category => (
          <section key={category} className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-2">{category}</h2>
            <div className="space-y-3">
              {goals.filter(g => g.category === category).map(goal => (
                <div key={goal.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                  <div className="p-4 flex items-center justify-between gap-4">
                    <div className="flex-1 font-semibold text-lg text-slate-900">
                      {goal.title}
                    </div>
                    <button
                      onClick={() => toggleState(goal.id)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-lg border font-medium min-h-[48px] min-w-[140px] justify-center transition-colors",
                        getStateColor(goal.state)
                      )}
                    >
                      {getStateIcon(goal.state)}
                      {goal.state}
                    </button>
                    {goal.tutorial && (
                      <button
                        onClick={() => setExpandedId(expandedId === goal.id ? null : goal.id)}
                        className="p-2 text-slate-500 hover:text-blue-600 min-h-[48px] min-w-[48px] flex items-center justify-center bg-slate-50 rounded-lg"
                        aria-label="Toggle info"
                      >
                        <Info className="w-6 h-6" />
                      </button>
                    )}
                  </div>
                  {goal.tutorial && expandedId === goal.id && (
                    <div className="px-4 py-3 bg-blue-50 border-t border-blue-100 text-blue-900 animate-in fade-in slide-in-from-top-2">
                      <p className="text-sm">{goal.tutorial}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
