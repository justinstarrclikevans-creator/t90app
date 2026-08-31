'use client';

import Link from 'next/link';
import { ChevronLeft, Hammer, Zap, Wrench, ThermometerSun, ExternalLink } from 'lucide-react';

const TRADES = [
  {
    title: 'Construction & Building',
    icon: <Hammer className="w-6 h-6 text-amber-600" />,
    color: 'bg-amber-50 border-amber-200',
    links: [
      { label: 'Intro to Carpentry Basics', url: '#' },
      { label: 'Reading a Tape Measure', url: '#' },
      { label: 'Home Depot Pro Certifications', url: '#' }
    ]
  },
  {
    title: 'Electrical',
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    color: 'bg-yellow-50 border-yellow-200',
    links: [
      { label: 'Electrical Safety Basics', url: '#' },
      { label: 'How to Wire an Outlet', url: '#' }
    ]
  },
  {
    title: 'Plumbing',
    icon: <Wrench className="w-6 h-6 text-blue-500" />,
    color: 'bg-blue-50 border-blue-200',
    links: [
      { label: 'Basic Pipe Fittings', url: '#' },
      { label: 'Intro to Plumbing Tools', url: '#' }
    ]
  },
  {
    title: 'HVAC',
    icon: <ThermometerSun className="w-6 h-6 text-red-500" />,
    color: 'bg-red-50 border-red-200',
    links: [
      { label: 'How Air Conditioning Works', url: '#' },
      { label: 'HVAC Maintenance Basics', url: '#' }
    ]
  }
];

export default function TradesTrainingPage() {
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
          <Hammer className="w-6 h-6 text-blue-600" />
          Trades Training
        </h1>
      </header>

      <main className="flex-1 p-4 max-w-2xl mx-auto w-full space-y-6 pb-20">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 text-slate-700">
          <p>Explore introductory videos and training resources for various skilled trades. These resources can help you prepare for an apprenticeship or entry-level job.</p>
        </div>

        <div className="space-y-6">
          {TRADES.map((trade, idx) => (
            <section key={idx} className={`rounded-xl border p-4 shadow-sm ${trade.color}`}>
              <div className="flex items-center gap-3 mb-4 bg-white/50 p-2 rounded-lg inline-flex">
                {trade.icon}
                <h2 className="font-bold text-lg text-slate-900">{trade.title}</h2>
              </div>
              
              <div className="space-y-3">
                {trade.links.map((link, linkIdx) => (
                  <a 
                    key={linkIdx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow min-h-[56px] text-slate-700 font-medium group border border-transparent hover:border-blue-200"
                  >
                    <span>{link.label}</span>
                    <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="text-center p-6 text-slate-500 font-medium">
          More videos and resources coming soon!
        </div>
      </main>
    </div>
  );
}
