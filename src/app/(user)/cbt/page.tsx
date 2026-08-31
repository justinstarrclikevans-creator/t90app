'use client';

import Link from 'next/link';
import { ChevronLeft, Brain, ArrowRight } from 'lucide-react';
import { CBT_MODULES } from '@/lib/data/cbt-modules';
import { cn } from '@/lib/utils';

export default function CBTListingPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link 
            href="/dashboard"
            className="p-3 bg-white rounded-full shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-100"
            aria-label="Back to dashboard"
          >
            <ChevronLeft size={28} />
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center">
              <Brain className="mr-3 text-blue-600" size={32} />
              CBT Training
            </h1>
            <p className="text-lg text-slate-600 mt-1">
              Complete your modules at your own pace
            </p>
          </div>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          {CBT_MODULES.map((module) => (
            <div 
              key={module.number}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-6">
                  
                  <div className="flex-1">
                    <div className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-bold rounded-lg mb-3">
                      Module {module.number}
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">
                      {module.title}
                    </h2>
                    <p className="text-slate-600 text-lg mb-4">
                      {module.description}
                    </p>
                    <div className="text-slate-500 font-medium">
                      {module.lessons.length} Lessons
                    </div>
                  </div>
                  
                  <Link
                    href={`/cbt/${module.number}`}
                    className="w-full md:w-auto flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 active:bg-blue-800 transition-colors"
                  >
                    <span>Start Module</span>
                    <ArrowRight size={24} />
                  </Link>
                  
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
