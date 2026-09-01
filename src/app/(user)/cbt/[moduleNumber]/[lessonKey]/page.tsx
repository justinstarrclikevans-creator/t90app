'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, CheckCircle, Save, Printer, Sparkles, AlertCircle } from 'lucide-react';
import { getLesson, WorksheetField } from '@/lib/data/cbt-modules';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function CBTLessonPage() {
  const params = useParams();
  const router = useRouter();
  const moduleNumber = Number(params.moduleNumber);
  const lessonKey = String(params.lessonKey);
  
  const lesson = getLesson(moduleNumber, lessonKey);

  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isSaved, setIsSaved] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Load saved data
  useEffect(() => {
    try {
      const saved = localStorage.getItem(`cbt-lesson-${moduleNumber}-${lessonKey}`);
      if (saved) {
        setFormData(JSON.parse(saved));
      }
      const completedList = localStorage.getItem('t90_completed_cbt_lessons');
      if (completedList) {
        const list = JSON.parse(completedList);
        if (list.includes(`${moduleNumber}-${lessonKey}`)) {
          setIsCompleted(true);
        }
      }
    } catch {
      // fallback
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

  const handleInputChange = (id: string, value: any) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    setIsSaved(false);
  };

  const handleToggleChecklist = (fieldId: string, item: string) => {
    const currentList: string[] = formData[fieldId] || [];
    const updated = currentList.includes(item)
      ? currentList.filter(i => i !== item)
      : [...currentList, item];
    handleInputChange(fieldId, updated);
  };

  const handleSave = () => {
    try {
      localStorage.setItem(`cbt-lesson-${moduleNumber}-${lessonKey}`, JSON.stringify(formData));
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleComplete = () => {
    handleSave();
    setIsCompleted(true);
    try {
      const completedList = localStorage.getItem('t90_completed_cbt_lessons');
      const list: string[] = completedList ? JSON.parse(completedList) : [];
      const itemKey = `${moduleNumber}-${lessonKey}`;
      if (!list.includes(itemKey)) {
        list.push(itemKey);
        localStorage.setItem('t90_completed_cbt_lessons', JSON.stringify(list));
      }
    } catch {
      // fallback
    }

    setTimeout(() => {
      router.push(`/cbt/${moduleNumber}`);
    }, 1200);
  };

  const handlePrint = () => {
    window.print();
  };

  const renderField = (field: WorksheetField) => {
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
              className="w-full p-4 text-lg border-2 border-slate-300 rounded-xl focus:border-blue-600 focus:ring-0 outline-none bg-white transition-colors"
              placeholder={field.placeholder || "Type your answer here..."}
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
              className="w-full p-4 text-lg border-2 border-slate-300 rounded-xl focus:border-blue-600 focus:ring-0 outline-none resize-y bg-white transition-colors"
              placeholder={field.placeholder || "Type your answer here..."}
            />
          </div>
        );

      case 'scale':
        return (
          <div key={field.id} className="mb-6">
            <label className="block text-lg font-bold text-slate-900 mb-3">
              {field.label}
            </label>
            <div className="flex gap-3 flex-wrap">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleInputChange(field.id, num.toString())}
                  className={cn(
                    "w-14 h-14 md:w-16 md:h-16 rounded-2xl font-extrabold text-xl flex items-center justify-center border-2 transition-all",
                    value === num.toString() 
                      ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105" 
                      : "bg-white text-slate-700 border-slate-300 hover:border-blue-400"
                  )}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="flex justify-between max-w-[320px] mt-2 text-xs font-bold text-slate-500 uppercase tracking-wide">
              <span>1 = Not at all</span>
              <span>5 = Extremely</span>
            </div>
          </div>
        );

      case 'checklist':
        const checkedList: string[] = formData[field.id] || [];
        return (
          <div key={field.id} className="mb-6">
            <label className="block text-lg font-bold text-slate-900 mb-3">
              {field.label}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {field.checklistItems?.map((item, idx) => {
                const isChecked = checkedList.includes(item);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleToggleChecklist(field.id, item)}
                    className={cn(
                      "p-4 rounded-xl border-2 text-left font-medium text-base flex items-center justify-between transition-all min-h-[48px]",
                      isChecked
                        ? "border-blue-600 bg-blue-50 text-blue-900 shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    )}
                  >
                    <span>{item}</span>
                    <span className={cn(
                      "w-6 h-6 rounded-lg border-2 flex items-center justify-center font-bold text-sm",
                      isChecked ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 bg-white"
                    )}>
                      {isChecked ? "✓" : ""}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 'table':
        const headers = field.tableConfig?.headers || ["Item", "Your Response"];
        const rowCount = field.tableConfig?.rowCount || 4;
        const placeholders = field.tableConfig?.placeholders || [];

        return (
          <div key={field.id} className="mb-8">
            <label className="block text-lg font-bold text-slate-900 mb-3">
              {field.label}
            </label>
            <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="grid grid-cols-2 bg-slate-200 text-slate-800 font-bold p-3 text-sm md:text-base">
                <div>{headers[0]}</div>
                <div>{headers[1]}</div>
              </div>
              <div className="divide-y divide-slate-200">
                {Array.from({ length: rowCount }).map((_, rIdx) => (
                  <div key={rIdx} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 bg-white">
                    <div>
                      <input
                        type="text"
                        value={formData[`${field.id}_row_${rIdx}_col_0`] || ''}
                        onChange={(e) => handleInputChange(`${field.id}_row_${rIdx}_col_0`, e.target.value)}
                        placeholder={placeholders[0] || `${headers[0]} #${rIdx + 1}`}
                        className="w-full p-3 text-base border-2 border-slate-200 rounded-xl focus:border-blue-600 outline-none"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={formData[`${field.id}_row_${rIdx}_col_1`] || ''}
                        onChange={(e) => handleInputChange(`${field.id}_row_${rIdx}_col_1`, e.target.value)}
                        placeholder={placeholders[1] || `${headers[1]} #${rIdx + 1}`}
                        className="w-full p-3 text-base border-2 border-slate-200 rounded-xl focus:border-blue-600 outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'grid':
        if (field.gridConfig) {
          const { rows, columns } = field.gridConfig;
          return (
            <div key={field.id} className="mb-8">
              <label className="block text-lg font-bold text-slate-900 mb-3">
                {field.label}
              </label>
              <div className="space-y-4">
                {rows.map((rowName, rIdx) => (
                  <div key={rIdx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-slate-800 text-base mb-3 pb-2 border-b border-slate-200">
                      {rowName}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {columns.map((colName, cIdx) => (
                        <div key={cIdx} className="bg-white p-3 rounded-xl border border-slate-200">
                          <label className="block font-bold text-slate-700 text-sm mb-1.5">
                            {colName}
                          </label>
                          <textarea
                            rows={3}
                            value={formData[`${field.id}_r${rIdx}_c${cIdx}`] || ''}
                            onChange={(e) => handleInputChange(`${field.id}_r${rIdx}_c${cIdx}`, e.target.value)}
                            placeholder={`List ${colName.toLowerCase()}...`}
                            className="w-full p-2.5 text-base border border-slate-300 rounded-lg focus:border-blue-600 outline-none resize-none"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // fallback cells
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
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 pb-36">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between space-x-4 mb-4">
          <div className="flex items-center space-x-4">
            <Link 
              href={`/cbt/${moduleNumber}`}
              className="p-3 bg-white rounded-full shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-100 min-h-[48px] min-w-[48px] flex items-center justify-center"
              aria-label="Back to Module"
            >
              <ChevronLeft size={28} />
            </Link>
            <div>
              <div className="text-blue-600 font-bold text-xs uppercase tracking-wider">
                Module {moduleNumber} • Lesson {lessonKey.toUpperCase()}
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                {lesson.title}
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            title="Print or Save Worksheet as PDF"
            className="p-3 bg-white hover:bg-slate-100 text-slate-700 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1 text-sm font-semibold min-h-[48px]"
          >
            <Printer size={20} />
            <span className="hidden sm:inline">Print / PDF</span>
          </button>
        </div>

        {/* Lesson Description & Video Note */}
        {lesson.videoNote && (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex items-center gap-3 text-amber-900 text-sm font-medium">
            <Sparkles size={20} className="text-amber-600 flex-shrink-0" />
            <span>{lesson.videoNote}</span>
          </div>
        )}

        {/* Lesson Sections & Worksheets */}
        {lesson.sections.map((section, idx) => (
          <div 
            key={idx} 
            className={cn(
              "p-6 md:p-8 rounded-3xl shadow-sm border mb-6",
              section.type === 'worksheet' 
                ? "bg-white border-blue-200 ring-1 ring-blue-100" 
                : "bg-white border-slate-200"
            )}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
              {section.type === 'worksheet' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-lg uppercase tracking-wider">
                  Interactive Worksheet
                </span>
              )}
            </div>
            
            {section.content && (
              <div className="prose prose-lg text-slate-700 max-w-none mb-6">
                {section.content.split('\n\n').map((paragraph, pIdx) => (
                  <p key={pIdx} className="mb-3 text-lg leading-relaxed text-slate-700">{paragraph}</p>
                ))}
              </div>
            )}
            
            {section.fields && section.fields.length > 0 && (
              <div className="space-y-6 mt-6 border-t border-slate-100 pt-6">
                {section.fields.map(renderField)}
              </div>
            )}
          </div>
        ))}

        {/* Homework Section */}
        {lesson.homework && (
          <div className="bg-blue-50/80 p-6 md:p-8 rounded-3xl border-2 border-blue-300 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-extrabold text-blue-950 flex items-center">
                <span className="bg-blue-200 p-2 rounded-xl mr-3 text-xl">🏠</span>
                {lesson.homework.title || "Homework Assignment"}
              </h2>
              <span className="px-3 py-1 bg-blue-200 text-blue-900 text-xs font-bold rounded-lg uppercase tracking-wider">
                Homework
              </span>
            </div>

            <p className="text-lg text-blue-900 mb-6 leading-relaxed">
              {lesson.homework.instructions}
            </p>

            {lesson.homework.fields && lesson.homework.fields.length > 0 && (
              <div className="space-y-6 bg-white p-6 rounded-2xl border border-blue-200 shadow-sm">
                {lesson.homework.fields.map(renderField)}
              </div>
            )}
          </div>
        )}

        {/* Actions Bottom Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200 p-4 md:p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] z-20 safe-area-bottom">
          <div className="max-w-3xl mx-auto flex gap-3">
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 md:flex-none flex items-center justify-center space-x-2 bg-white text-blue-700 border-2 border-blue-200 px-6 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 active:bg-blue-100 min-h-[52px] transition-colors"
            >
              <Save size={22} />
              <span>{isSaved ? 'Progress Saved! ✓' : 'Save Draft'}</span>
            </button>
            <button
              type="button"
              onClick={handleComplete}
              className={cn(
                "flex-[2] flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl font-bold text-lg min-h-[52px] transition-all",
                isCompleted 
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.99] shadow-md"
              )}
            >
              <CheckCircle size={22} />
              <span>{isCompleted ? 'Completed ✓' : 'Mark as Complete & Finish'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
