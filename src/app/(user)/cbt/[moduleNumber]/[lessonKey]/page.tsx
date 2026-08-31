'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, CheckCircle, Save } from 'lucide-react';
import { getLesson } from '@/lib/data/cbt-modules';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function CBTLessonPage() {
  const params = useParams();
  const router = useRouter();
  const moduleNumber = Number(params.moduleNumber);
  const lessonKey = String(params.lessonKey);
  
  const lesson = getLesson(moduleNumber, lessonKey);

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSaved, setIsSaved] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load saved data
  useEffect(() => {
    const saved = localStorage.getItem(`cbt-lesson-${moduleNumber}-${lessonKey}`);
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  }, [moduleNumber, lessonKey]);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Lesson not found</h1>
        <Link href={`/cbt/${moduleNumber}`} className="text-blue-600 text-lg font-medium hover:underline">
          Return to Module
        </Link>
      </div>
    );
  }

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    setIsSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(`cbt-lesson-${moduleNumber}-${lessonKey}`, JSON.stringify(formData));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleComplete = () => {
    handleSave();
    setIsCompleted(true);
    // In a real app, save completion status to DB here
    setTimeout(() => {
      router.push(`/cbt/${moduleNumber}`);
    }, 1500);
  };

  const renderField = (field: any) => {
    const value = formData[field.id] || '';

    switch (field.type) {
      case 'text':
        return (
          <div key={field.id} className="mb-6">
            <label className="block text-lg font-bold text-slate-900 mb-2">
              {field.label}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className="w-full p-4 text-lg border-2 border-slate-300 rounded-xl focus:border-blue-600 focus:ring-0 outline-none"
              placeholder="Type your answer here..."
            />
          </div>
        );
      case 'textarea':
        return (
          <div key={field.id} className="mb-6">
            <label className="block text-lg font-bold text-slate-900 mb-2">
              {field.label}
            </label>
            <textarea
              rows={4}
              value={value}
              onChange={(e) => handleInputChange(field.id, e.target.value)}
              className="w-full p-4 text-lg border-2 border-slate-300 rounded-xl focus:border-blue-600 focus:ring-0 outline-none resize-none"
              placeholder="Type your answer here..."
            />
          </div>
        );
      case 'scale':
        return (
          <div key={field.id} className="mb-6">
            <label className="block text-lg font-bold text-slate-900 mb-4">
              {field.label}
            </label>
            <div className="flex gap-4 flex-wrap">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleInputChange(field.id, num.toString())}
                  className={cn(
                    "w-14 h-14 md:w-16 md:h-16 rounded-full font-bold text-xl flex items-center justify-center border-2 transition-colors",
                    value === num.toString() 
                      ? "bg-blue-600 text-white border-blue-600" 
                      : "bg-white text-slate-700 border-slate-300 hover:border-blue-400"
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="flex justify-between max-w-[350px] mt-2 text-sm font-medium text-slate-500">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>
        );
      case 'grid':
        return (
          <div key={field.id} className="mb-6">
            <label className="block text-lg font-bold text-slate-900 mb-4">
              {field.label}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {field.cells?.map((cell: string, idx: number) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <label className="block font-bold text-slate-700 mb-2">{cell}</label>
                  <textarea
                    rows={3}
                    value={formData[`${field.id}_${idx}`] || ''}
                    onChange={(e) => handleInputChange(`${field.id}_${idx}`, e.target.value)}
                    className="w-full p-3 text-lg border-2 border-slate-300 rounded-lg focus:border-blue-600 outline-none resize-none bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 pb-32">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link 
            href={`/cbt/${moduleNumber}`}
            className="p-3 bg-white rounded-full shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-100"
            aria-label="Back to Module"
          >
            <ChevronLeft size={28} />
          </Link>
          <div>
            <div className="text-blue-600 font-bold text-lg mb-1">
              Lesson Content
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
              {lesson.title}
            </h1>
          </div>
        </div>

        {/* Lesson Sections */}
        {lesson.sections.map((section, idx) => (
          <div key={idx} className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200 mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">{section.title}</h2>
            
            {section.content && (
              <div className="prose prose-lg text-slate-700 max-w-none mb-6">
                {section.content.split('\\n\\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="mb-4 text-xl leading-relaxed">{paragraph}</p>
                ))}
              </div>
            )}
            
            {section.type === 'worksheet' && section.fields && (
              <div className="space-y-8 mt-8 border-t border-slate-200 pt-8">
                {section.fields.map(renderField)}
              </div>
            )}
          </div>
        ))}

        {/* Homework Section */}
        {lesson.homework && (
          <div className="bg-blue-50 p-6 md:p-8 rounded-2xl border-2 border-blue-200 mb-6">
            <h2 className="text-2xl font-bold text-blue-900 mb-4 flex items-center">
              <span className="bg-blue-200 p-2 rounded-lg mr-3">🏠</span>
              Homework
            </h2>
            <p className="text-xl text-blue-800 mb-6 leading-relaxed">
              {lesson.homework.instructions}
            </p>
            {lesson.homework.fields && (
              <div className="space-y-8">
                {lesson.homework.fields.map(renderField)}
              </div>
            )}
          </div>
        )}

        {/* Actions Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-10">
          <div className="max-w-3xl mx-auto flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-white text-blue-700 border-2 border-blue-200 px-6 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 active:bg-blue-100 transition-colors"
            >
              <Save size={24} />
              <span>{isSaved ? 'Saved!' : 'Save'}</span>
            </button>
            <button
              onClick={handleComplete}
              disabled={isCompleted}
              className={cn(
                "flex-[2] flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-bold text-lg transition-colors",
                isCompleted 
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
              )}
            >
              <CheckCircle size={24} />
              <span>{isCompleted ? 'Completed!' : 'Mark as Complete'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
