"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  Award, 
  Clock, 
  BookOpen, 
  ExternalLink, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import { TRADE_TRACKS } from "@/lib/data/trades-modules";
import { cn } from "@/lib/utils";

export default function TradesPage() {
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

  const totalLessons = TRADE_TRACKS.reduce((acc, t) => acc + t.lessons.length, 0);
  const completedCount = completedLessons.length;
  const overallPercentage = Math.round((completedCount / (totalLessons || 1)) * 100);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 pb-28">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header with Back Navigation */}
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard"
            className="p-3 bg-white rounded-full shadow-sm border border-slate-200 text-slate-600 hover:bg-slate-100 min-h-[48px] min-w-[48px] flex items-center justify-center"
            aria-label="Back to Dashboard"
          >
            <ChevronLeft size={28} />
          </Link>
          <div>
            <span className="text-blue-600 font-bold text-sm tracking-wider uppercase">
              SkillsCommons & Workforce Training
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Trades & Certifications
            </h1>
          </div>
        </div>

        {/* Progress Summary Card */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-3xl p-6 md:p-8 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-blue-200 text-sm font-semibold mb-2">
                <Sparkles size={18} className="text-amber-300" />
                <span>Your Trades Progress</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                {completedCount} of {totalLessons} Lessons Completed
              </h2>
              <p className="text-blue-100 text-base max-w-lg leading-relaxed">
                Complete these courses to earn trade badges. Finished credentials automatically add to your Turn90 Resume!
              </p>
            </div>
            
            {/* Circular or Radial Progress */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-center min-w-[120px] text-center border border-white/20">
              <div>
                <span className="text-4xl font-extrabold text-white">{overallPercentage}%</span>
                <p className="text-xs text-blue-200 font-medium uppercase mt-1">Complete</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 h-3 rounded-full mt-6 overflow-hidden">
            <div 
              className="bg-amber-400 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(overallPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Spotlight: Free Home Depot Certifications */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 md:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="text-4xl p-3 bg-amber-200/60 rounded-2xl">🟧</div>
            <div className="flex-1">
              <div className="inline-block px-3 py-1 bg-amber-200 text-amber-900 text-xs font-bold rounded-lg mb-2 uppercase tracking-wide">
                Free Partner Resource
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
                Home Depot Free Pro Certifications
              </h3>
              <p className="text-slate-700 text-base leading-relaxed mb-4">
                Access official trade credentials online for free. Recognized by thousands of construction and trade employers in South Carolina and nationwide.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.homedepot.com/c/pro_learning"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold px-6 py-3 rounded-xl min-h-[48px] shadow-sm transition-colors text-base"
                >
                  <span>Open Home Depot Academy</span>
                  <ExternalLink size={18} />
                </a>
                <Link
                  href="/trades/home-depot-certs"
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-bold px-6 py-3 rounded-xl border border-slate-300 min-h-[48px] shadow-sm transition-colors text-base"
                >
                  <span>View Turn90 Walkthrough</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Trade Tracks List */}
        <div className="space-y-4 pt-2">
          <h2 className="text-2xl font-extrabold text-slate-900 px-1">
            Explore Trade Tracks
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TRADE_TRACKS.map((track) => {
              const trackCompleted = track.lessons.filter(l => completedLessons.includes(l.id)).length;
              const isFinished = trackCompleted === track.lessons.length && track.lessons.length > 0;

              return (
                <div
                  key={track.id}
                  className={cn(
                    "bg-white rounded-3xl p-6 border-2 transition-all flex flex-col justify-between shadow-sm hover:shadow-md",
                    isFinished ? "border-green-300 bg-green-50/20" : "border-slate-200 hover:border-blue-300"
                  )}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <span className="text-4xl p-2.5 bg-slate-100 rounded-2xl">{track.icon}</span>
                      {isFinished ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">
                          <CheckCircle2 size={16} className="text-green-600" />
                          Earned Badge
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-semibold">
                          <Clock size={14} />
                          {track.estimatedHours} hrs
                        </span>
                      )}
                    </div>

                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                      {track.category}
                    </span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1 mb-2">
                      {track.title}
                    </h3>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4 leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  <div>
                    {/* Track progress indicator */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-slate-500 font-semibold mb-1.5">
                        <span>{trackCompleted} of {track.lessons.length} Lessons</span>
                        <span>{Math.round((trackCompleted / track.lessons.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-blue-600 h-full rounded-full transition-all"
                          style={{ width: `${(trackCompleted / track.lessons.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <Link
                      href={`/trades/${track.id}`}
                      className={cn(
                        "w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-base min-h-[48px] transition-all",
                        isFinished 
                          ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                          : "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.99]"
                      )}
                    >
                      <span>{isFinished ? "Review Lessons" : "Start Track"}</span>
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why Learn Trades Section */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 md:p-8 mt-8">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck size={28} className="text-amber-400" />
            <h3 className="text-xl font-bold text-white">Why Learn a Trade?</h3>
          </div>
          <p className="text-slate-300 text-base leading-relaxed mb-4">
            Skilled trades in South Carolina (Framing, Electrical, Plumbing, and HVAC) are in high demand, pay competitive wages, and frequently offer apprenticeship pathways for individuals with justice-involved backgrounds.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-sm font-semibold text-slate-200 pt-2">
            <div className="bg-slate-800 p-3 rounded-xl">🔨 Hands-On Work</div>
            <div className="bg-slate-800 p-3 rounded-xl">💵 $18–$35/hr Wage Potential</div>
            <div className="bg-slate-800 p-3 rounded-xl">📈 Career Advancement</div>
          </div>
        </div>

      </div>
    </div>
  );
}
