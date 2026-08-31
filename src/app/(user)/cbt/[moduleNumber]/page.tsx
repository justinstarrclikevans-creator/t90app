'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, BookOpen, CheckCircle, Circle, ArrowRight } from 'lucide-react';
import { getModule } from '@/lib/data/cbt-modules';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function CBTModuleDetailPage() {
  const params = useParams();
  const moduleNumber = Number(params.moduleNumber);
  const moduleData = getModule(moduleNumber);

  // Temporary local state for lesson completion
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  if (!moduleData) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Module not found</h1>
        <Link href="/cbt" className="text-blue-600 text-lg font-medium hover:underline">
          Return to CBT Training
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 pb-20">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link 
            href="/cbt"
            className="p-3 bg-white rounded-full shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-100"
            aria-label="Back to CBT Modules"
          >
            <ChevronLeft size={28} />
          </Link>
          <div>
            <div className="text-blue-600 font-bold text-lg mb-1">
              Module {moduleData.number}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              {moduleData.title}
            </h1>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 mb-8">
          <p className="text-xl text-slate-700 leading-relaxed">
            {moduleData.description}
          </p>
        </div>

        {/* Lessons List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-4 px-2">Lessons in this module:</h2>
          
          {moduleData.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.key);
            
            return (
              <Link 
                key={lesson.key}
                href={`/cbt/${moduleData.number}/${lesson.key}`}
                className={cn(
                  "block bg-white p-5 md:p-6 rounded-2xl shadow-sm border-2 transition-all hover:shadow-md",
                  isCompleted ? "border-green-200 bg-green-50/30" : "border-slate-200 hover:border-blue-200"
                )}
              >
                <div className="flex items-start md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 md:mt-0">
                      {isCompleted ? (
                        <CheckCircle size={32} className="text-green-500" />
                      ) : (
                        <Circle size={32} className="text-slate-300" />
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        Lesson {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">
                        {lesson.title}
                      </h3>
                      <p className="text-slate-600 text-lg">
                        {lesson.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="hidden md:flex p-3 rounded-full bg-slate-50 text-slate-400">
                    <ArrowRight size={24} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
