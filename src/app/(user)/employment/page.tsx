'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Briefcase, FileText, MessageSquare } from 'lucide-react';

export default function EmploymentPage() {
  const [goals, setGoals] = useState({
    careerGoal: '',
    targetIndustry: '',
    entryLevelGoal: '',
    nextCredential: '',
    sixMonthGoal: '',
    longTermWage: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('t90_employment_goals');
    if (saved) setGoals(JSON.parse(saved));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGoals((prev) => {
      const updated = { ...prev, [name]: value };
      localStorage.setItem('t90_employment_goals', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex items-center gap-4 sticky top-0 z-10">
        <Link 
          href="/dashboard"
          className="p-2 -ml-2 rounded-lg hover:bg-slate-100 flex items-center justify-center min-h-[48px] min-w-[48px]"
          aria-label="Back to dashboard"
        >
          <ChevronLeft className="w-6 h-6 text-slate-900" />
        </Link>
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-blue-600" />
          Employment Readiness
        </h1>
      </header>

      <main className="flex-1 p-4 max-w-2xl mx-auto w-full space-y-6 pb-20">
        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link 
            href="/employment/resume"
            className="flex items-center gap-3 bg-blue-600 text-white p-4 rounded-xl shadow-sm hover:bg-blue-700 min-h-[64px]"
          >
            <div className="bg-white/20 p-3 rounded-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="font-semibold text-lg">Resume Builder</div>
              <div className="text-blue-100 text-sm">Create or edit your resume</div>
            </div>
          </Link>
          
          <Link 
            href="/assistant?msg=I+need+help+finding+a+job+or+preparing+for+an+interview"
            className="flex items-center gap-3 bg-white text-slate-900 border border-slate-200 p-4 rounded-xl shadow-sm hover:bg-slate-50 min-h-[64px]"
          >
            <div className="bg-blue-50 text-blue-600 p-3 rounded-lg">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <div className="font-semibold text-lg">Job Help AI</div>
              <div className="text-slate-500 text-sm">Ask about jobs & interviews</div>
            </div>
          </Link>
        </div>

        {/* Goal Tracker */}
        <section className="bg-white rounded-xl shadow-sm p-5 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 border-b pb-3">My Employment Goals</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="careerGoal" className="block text-sm font-medium text-slate-700 mb-1">Career Goal (Dream Job)</label>
              <input 
                id="careerGoal"
                name="careerGoal"
                type="text" 
                value={goals.careerGoal}
                onChange={handleChange}
                className="w-full p-3 min-h-[48px] border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Master Electrician"
              />
            </div>
            
            <div>
              <label htmlFor="targetIndustry" className="block text-sm font-medium text-slate-700 mb-1">Target Industry</label>
              <input 
                id="targetIndustry"
                name="targetIndustry"
                type="text" 
                value={goals.targetIndustry}
                onChange={handleChange}
                className="w-full p-3 min-h-[48px] border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Construction"
              />
            </div>

            <div>
              <label htmlFor="entryLevelGoal" className="block text-sm font-medium text-slate-700 mb-1">Entry-Level Job Goal</label>
              <input 
                id="entryLevelGoal"
                name="entryLevelGoal"
                type="text" 
                value={goals.entryLevelGoal}
                onChange={handleChange}
                className="w-full p-3 min-h-[48px] border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Apprentice or Helper"
              />
            </div>

            <div>
              <label htmlFor="nextCredential" className="block text-sm font-medium text-slate-700 mb-1">Next Credential or Certificate Needed</label>
              <input 
                id="nextCredential"
                name="nextCredential"
                type="text" 
                value={goals.nextCredential}
                onChange={handleChange}
                className="w-full p-3 min-h-[48px] border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. OSHA 10"
              />
            </div>

            <div>
              <label htmlFor="sixMonthGoal" className="block text-sm font-medium text-slate-700 mb-1">6-Month Goal</label>
              <input 
                id="sixMonthGoal"
                name="sixMonthGoal"
                type="text" 
                value={goals.sixMonthGoal}
                onChange={handleChange}
                className="w-full p-3 min-h-[48px] border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. Complete training program"
              />
            </div>

            <div>
              <label htmlFor="longTermWage" className="block text-sm font-medium text-slate-700 mb-1">Long-Term Wage Goal ($/hour)</label>
              <input 
                id="longTermWage"
                name="longTermWage"
                type="text" 
                value={goals.longTermWage}
                onChange={handleChange}
                className="w-full p-3 min-h-[48px] border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g. $25/hr"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
