'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronDown, ChevronUp } from 'lucide-react';

const mockProgress = [
  { id: 1, name: 'John Doe', cbt: '3/8', goals: '5/10', lastActive: '2 hrs ago', details: 'Completed module on conflict resolution. Needs follow-up on employment goal.' },
  { id: 2, name: 'Jane Smith', cbt: '8/8', goals: '9/10', lastActive: '1 day ago', details: 'Graduating program next week. All CBT modules complete.' },
  { id: 3, name: 'Marcus Johnson', cbt: '1/8', goals: '2/10', lastActive: '4 days ago', details: 'Just started. Attended first group session.' },
  { id: 4, name: 'Sarah Williams', cbt: '5/8', goals: '6/10', lastActive: '5 hrs ago', details: 'Progressing steadily. Requested housing referral.' },
  { id: 5, name: 'Michael Brown', cbt: '4/8', goals: '4/10', lastActive: '2 days ago', details: 'Missed last appointment. Need to check in.' },
];

export default function AdminProgressPage() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin" className="p-2 -ml-2 rounded-lg hover:bg-slate-200">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-bold text-slate-900">Participant Progress</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                <th className="p-4 font-medium">Participant</th>
                <th className="p-4 font-medium">CBT Modules</th>
                <th className="p-4 font-medium">Life Goals</th>
                <th className="p-4 font-medium">Last Active</th>
                <th className="p-4 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody>
              {mockProgress.map(p => (
                <>
                  <tr 
                    key={p.id}
                    onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                    className={`border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${expanded === p.id ? 'bg-slate-50' : ''}`}
                  >
                    <td className="p-4 font-medium text-slate-900">{p.name}</td>
                    <td className="p-4 text-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${(parseInt(p.cbt[0])/parseInt(p.cbt[2])) * 100}%` }}></div>
                        </div>
                        <span className="text-xs">{p.cbt}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-700">
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500" style={{ width: `${(parseInt(p.goals.split('/')[0])/parseInt(p.goals.split('/')[1])) * 100}%` }}></div>
                        </div>
                        <span className="text-xs">{p.goals}</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-500 text-sm">{p.lastActive}</td>
                    <td className="p-4 text-slate-400">
                      {expanded === p.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </td>
                  </tr>
                  {expanded === p.id && (
                    <tr key={`${p.id}-expanded`} className="bg-slate-50 border-b border-slate-200">
                      <td colSpan={5} className="p-6">
                        <div className="text-slate-800 text-sm">
                          <strong>Latest Notes:</strong> {p.details}
                        </div>
                        <div className="mt-3 flex gap-3">
                          <button className="text-sm text-blue-600 font-medium hover:underline">View Full Profile</button>
                          <button className="text-sm text-blue-600 font-medium hover:underline">Send Message</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
