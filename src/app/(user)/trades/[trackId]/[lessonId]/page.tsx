"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ChevronLeft, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  Award, 
  ArrowRight,
  BookOpen,
  Sparkles
} from "lucide-react";
import { getTradeTrack, getTradeLesson } from "@/lib/data/trades-modules";
import { cn } from "@/lib/utils";

export default function TradeLessonPage() {
  const params = useParams();
  const router = useRouter();
  const trackId = params.trackId as string;
  const lessonId = params.lessonId as string;

  const track = getTradeTrack(trackId);
  const lesson = getTradeLesson(trackId, lessonId);

  // Local state for quiz answers
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedQuiz, setSubmittedQuiz] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("t90_trades_progress");
      if (stored) {
        const completedList: string[] = JSON.parse(stored);
        if (completedList.includes(lessonId)) {
          setIsCompleted(true);
        }
      }
    } catch {
      // fallback
    }
  }, [lessonId]);

  if (!track || !lesson) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Lesson Not Found</h1>
        <Link href="/trades" className="text-blue-600 font-semibold hover:underline">
          Return to Trades Training
        </Link>
      </div>
    );
  }

  // Find next lesson
  const currentIndex = track.lessons.findIndex((l) => l.id === lesson.id);
  const nextLesson = track.lessons[currentIndex + 1];

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    if (submittedQuiz) return;
    setSelectedAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  const handleCheckQuiz = () => {
    setSubmittedQuiz(true);
  };

  const handleCompleteLesson = () => {
    try {
      const stored = localStorage.getItem("t90_trades_progress");
      const list: string[] = stored ? JSON.parse(stored) : [];
      if (!list.includes(lesson.id)) {
        list.push(lesson.id);
        localStorage.setItem("t90_trades_progress", JSON.stringify(list));
      }
      setIsCompleted(true);
      setShowCelebration(true);

      // Auto-update Resume with Trade Badge if all lessons in track completed
      const trackCompleted = track.lessons.every((l) => list.includes(l.id));
      if (trackCompleted) {
        try {
          const storedResume = localStorage.getItem("t90_resume_data");
          if (storedResume) {
            const resumeObj = JSON.parse(storedResume);
            if (!resumeObj.certifications) resumeObj.certifications = [];
            if (!resumeObj.certifications.includes(track.badgeName)) {
              resumeObj.certifications.push(track.badgeName);
              localStorage.setItem("t90_resume_data", JSON.stringify(resumeObj));
            }
          }
        } catch {
          // ignore
        }
      }
    } catch {
      // fallback
    }
  };

  const allQuestionsAnswered =
    lesson.quiz.length === 0 ||
    lesson.quiz.every((_, idx) => selectedAnswers[idx] !== undefined);

  const score = lesson.quiz.reduce((acc, q, idx) => {
    return selectedAnswers[idx] === q.correctIndex ? acc + 1 : acc;
  }, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 pb-32">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Top Header */}
        <div className="flex items-center space-x-4">
          <Link
            href={`/trades/${track.id}`}
            className="p-3 bg-white rounded-full shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-100 min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Back to Track"
          >
            <ChevronLeft size={28} />
          </Link>
          <div>
            <div className="text-blue-600 font-bold text-xs uppercase tracking-wider">
              {track.title} • Lesson {currentIndex + 1} of {track.lessons.length}
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {lesson.title}
            </h1>
          </div>
        </div>

        {/* Video Player */}
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-lg border border-slate-800 aspect-video relative">
          <iframe
            src={lesson.videoUrl}
            title={lesson.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Safety Tip Alert */}
        {lesson.safetyTip && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-5 md:p-6 shadow-sm flex items-start gap-4">
            <AlertTriangle className="text-amber-600 w-8 h-8 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-amber-900 font-bold text-lg mb-1">
                ⚠️ Critical Jobsite Safety Rule
              </h3>
              <p className="text-amber-800 text-base leading-relaxed">
                {lesson.safetyTip}
              </p>
            </div>
          </div>
        )}

        {/* Key Takeaways Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <BookOpen className="text-blue-600 w-6 h-6" />
            <h2 className="text-xl font-bold text-slate-900">Key Takeaways</h2>
          </div>
          <ul className="space-y-3">
            {lesson.keyTakeaways.map((point, index) => (
              <li key={index} className="flex items-start gap-3 text-slate-700 text-base leading-relaxed">
                <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          {lesson.skillsCommonsRef && (
            <p className="text-xs text-slate-400 font-medium pt-2 border-t border-slate-100">
              Curriculum Source: {lesson.skillsCommonsRef}
            </p>
          )}
        </div>

        {/* Interactive Knowledge Check / Quiz */}
        {lesson.quiz.length > 0 && (
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <HelpCircle className="text-indigo-600 w-7 h-7" />
              <div>
                <h2 className="text-xl font-bold text-slate-900">Knowledge Check</h2>
                <p className="text-sm text-slate-500">Test what you learned in this lesson</p>
              </div>
            </div>

            <div className="space-y-6">
              {lesson.quiz.map((q, qIdx) => {
                const selected = selectedAnswers[qIdx];
                return (
                  <div key={qIdx} className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <p className="font-bold text-slate-900 text-base">
                      {qIdx + 1}. {q.question}
                    </p>

                    <div className="space-y-2">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = selected === oIdx;
                        const isCorrect = q.correctIndex === oIdx;

                        let buttonStyle = "border-slate-200 bg-white text-slate-800 hover:border-blue-300";
                        if (submittedQuiz) {
                          if (isCorrect) {
                            buttonStyle = "border-green-500 bg-green-50 text-green-900 font-semibold";
                          } else if (isChosen && !isCorrect) {
                            buttonStyle = "border-red-400 bg-red-50 text-red-900";
                          }
                        } else if (isChosen) {
                          buttonStyle = "border-blue-600 bg-blue-50 text-blue-900 font-semibold";
                        }

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleSelectAnswer(qIdx, oIdx)}
                            className={cn(
                              "w-full text-left p-4 rounded-xl border-2 text-base transition-all min-h-[48px] flex items-center justify-between",
                              buttonStyle
                            )}
                          >
                            <span>{opt}</span>
                            {submittedQuiz && isCorrect && (
                              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {submittedQuiz && (
                      <div className={cn(
                        "p-3 rounded-xl text-sm leading-relaxed",
                        selected === q.correctIndex ? "bg-green-100 text-green-900" : "bg-amber-100 text-amber-900"
                      )}>
                        <strong>{selected === q.correctIndex ? "Correct!" : "Review:"}</strong> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {!submittedQuiz ? (
              <button
                type="button"
                onClick={handleCheckQuiz}
                disabled={!allQuestionsAnswered}
                className="w-full bg-indigo-600 text-white font-bold py-4 px-6 rounded-2xl min-h-[48px] hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-base shadow-sm"
              >
                Check My Answers
              </button>
            ) : (
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl text-center">
                <p className="text-indigo-900 font-bold text-lg">
                  You scored {score} out of {lesson.quiz.length}!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Completion Celebration Banner */}
        {showCelebration && (
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-3xl p-6 shadow-md flex items-center gap-4 animate-in fade-in slide-in-from-bottom-3 duration-300">
            <Sparkles className="w-10 h-10 text-amber-300 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold">Great Job! Lesson Complete!</h3>
              <p className="text-sm text-emerald-100 mt-1">
                Your progress has been saved. Keep going to earn your {track.badgeName}!
              </p>
            </div>
          </div>
        )}

        {/* Bottom Action Controls */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          {!isCompleted ? (
            <button
              type="button"
              onClick={handleCompleteLesson}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold py-4 px-6 rounded-2xl min-h-[56px] text-lg flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <CheckCircle2 size={24} />
              <span>Mark Lesson Complete</span>
            </button>
          ) : (
            <div className="flex-1 bg-emerald-100 border border-emerald-300 text-emerald-800 font-bold py-4 px-6 rounded-2xl min-h-[56px] flex items-center justify-center gap-2 text-lg">
              <CheckCircle2 size={24} className="text-emerald-600" />
              <span>Lesson Completed</span>
            </div>
          )}

          {nextLesson ? (
            <button
              type="button"
              onClick={() => router.push(`/trades/${track.id}/${nextLesson.id}`)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold py-4 px-6 rounded-2xl min-h-[56px] text-lg flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <span>Next Lesson</span>
              <ArrowRight size={22} />
            </button>
          ) : (
            <Link
              href="/trades"
              className="flex-1 bg-slate-900 hover:bg-black active:scale-[0.99] text-white font-bold py-4 px-6 rounded-2xl min-h-[56px] text-lg flex items-center justify-center gap-2 shadow-md transition-all text-center"
            >
              <Award size={22} className="text-amber-400" />
              <span>Back to Trades</span>
            </Link>
          )}
        </div>

      </div>
    </div>
  );
}
