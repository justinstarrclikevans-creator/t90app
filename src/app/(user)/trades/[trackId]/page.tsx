"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { 
  ChevronLeft, 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowRight, 
  Award,
  Sparkles
} from "lucide-react";
import { getTradeTrack } from "@/lib/data/trades-modules";
import { cn } from "@/lib/utils";

export default function TradeTrackDetailPage() {
  const params = useParams();
  const trackId = params.trackId as string;
  const track = getTradeTrack(trackId);

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("t90_trades_progress");
      if (stored) {
        setCompletedLessons(JSON.parse(stored));
      }
    } catch {
      // fallback
    }
  }, []);

  if (!track) {
    return (
      <div className="min-h-screen bg-slate-50 p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Trade Track Not Found</h1>
        <Link href="/trades" className="text-blue-600 font-semibold hover:underline">
          Return to Trades Training
        </Link>
      </div>
    );
  }

  const completedCount = track.lessons.filter(l => completedLessons.includes(l.id)).length;
  const isAllComplete = completedCount === track.lessons.length && track.lessons.length > 0;
  const trackPercentage = Math.round((completedCount / (track.lessons.length || 1)) * 100);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 pb-28">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link
            href="/trades"
            className="p-3 bg-white rounded-full shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-100 min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Back to Trades"
          >
            <ChevronLeft size={28} />
          </Link>
          <div>
            <div className="text-blue-600 font-bold text-xs uppercase tracking-wider">
              Trade Track
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
              {track.title}
            </h1>
          </div>
        </div>

        {/* Track Info Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-start gap-4">
            <span className="text-5xl p-3 bg-blue-50 rounded-2xl">{track.icon}</span>
            <div className="flex-1">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                About this Track
              </h2>
              <p className="text-slate-700 text-base leading-relaxed">
                {track.description}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
              <Clock size={18} className="text-blue-600" />
              <span>Estimated Time: ~{track.estimatedHours} Hours</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Award size={18} className="text-amber-500" />
              <span className="text-sm font-bold text-slate-800">Badge: {track.badgeName}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="pt-2">
            <div className="flex justify-between text-sm font-bold mb-1.5">
              <span className="text-slate-700">Track Progress</span>
              <span className="text-blue-600">{trackPercentage}%</span>
            </div>
            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
              <div 
                className="bg-blue-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${trackPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* Earned Badge Announcement if complete */}
        {isAllComplete && (
          <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 flex items-center gap-4 text-emerald-900 shadow-sm">
            <Award size={42} className="text-emerald-600 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold">🎉 Congratulations! Track Complete!</h3>
              <p className="text-sm text-emerald-800">
                You earned the <strong>{track.badgeName}</strong> badge. This credential has been automatically attached to your Turn90 Resume!
              </p>
            </div>
          </div>
        )}

        {/* Lessons List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-extrabold text-slate-900 px-1">
            Lessons in this Track ({track.lessons.length})
          </h2>

          <div className="space-y-3">
            {track.lessons.map((lesson, index) => {
              const isDone = completedLessons.includes(lesson.id);

              return (
                <Link
                  key={lesson.id}
                  href={`/trades/${track.id}/${lesson.id}`}
                  className={cn(
                    "block bg-white p-5 md:p-6 rounded-3xl border-2 shadow-sm transition-all hover:shadow-md",
                    isDone 
                      ? "border-emerald-200 bg-emerald-50/20 hover:border-emerald-300" 
                      : "border-slate-200 hover:border-blue-300"
                  )}
                >
                  <div className="flex items-start md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="mt-0.5">
                        {isDone ? (
                          <CheckCircle2 size={32} className="text-emerald-500 fill-emerald-50" />
                        ) : (
                          <Circle size={32} className="text-slate-300" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                          <span>Lesson {index + 1}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock size={12} /> {lesson.durationMinutes} mins
                          </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-1">
                          {lesson.title}
                        </h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {lesson.description}
                        </p>
                      </div>
                    </div>

                    <div className="hidden md:flex p-3 rounded-full bg-slate-50 text-slate-400">
                      <ArrowRight size={22} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
