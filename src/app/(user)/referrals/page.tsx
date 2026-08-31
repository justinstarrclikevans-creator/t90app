'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, Search, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    import('@/lib/data/referrals.json').then(data => {
      setReferrals(data.default || []);
    }).catch(err => console.error('Error loading referrals', err));
  }, []);

  const handleRequest = (id: string) => {
    if (confirm('Staff will be notified about this referral. Continue?')) {
      const requested = JSON.parse(localStorage.getItem('t90_requested_referrals') || '[]');
      requested.push(id);
      localStorage.setItem('t90_requested_referrals', JSON.stringify(requested));
      alert('Referral requested successfully!');
    }
  };

  const filtered = referrals.filter(r => 
    (r.organization?.toLowerCase() || '').includes(search.toLowerCase()) || 
    (r.serviceType?.toLowerCase() || '').includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white p-4 shadow-sm flex items-center shrink-0">
        <Link href="/dashboard" className="p-2 -ml-2 rounded-lg hover:bg-slate-100 min-h-[48px] min-w-[48px] flex items-center justify-center">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-xl font-bold ml-2">Referrals</h1>
      </header>

      <div className="p-4 bg-white border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
          <input 
            type="text" 
            placeholder="Search resources..." 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 min-h-[56px] border-2 border-slate-200 rounded-xl text-lg focus:border-blue-600 focus:outline-none"
          />
        </div>
      </div>

      <main className="p-4 space-y-4 flex-1">
        {filtered.map((ref, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div 
              className="p-5 cursor-pointer flex flex-col gap-1"
              onClick={() => setExpanded(expanded === i.toString() ? null : i.toString())}
            >
              <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider">{ref.serviceType}</div>
              <h2 className="text-xl font-bold text-slate-900">{ref.organization}</h2>
              <div className="text-slate-600 mt-1">{ref.city} • {ref.phone}</div>
              <div className="font-medium text-slate-700 mt-1">{ref.cost}</div>
            </div>
            
            {expanded === i.toString() && (
              <div className="px-5 pb-5 border-t border-slate-100 pt-4 bg-slate-50 space-y-3 text-lg">
                <p><strong>Hours:</strong> {ref.hours || 'Varies'}</p>
                <p><strong>Required:</strong> {ref.documentsRequired || 'ID'}</p>
                <p><strong>Instructions:</strong> {ref.referralInstructions || 'Call to set up appointment'}</p>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleRequest(ref.id || i.toString()); }}
                  className="w-full min-h-[56px] mt-4 bg-blue-600 text-white rounded-xl font-bold active:bg-blue-700"
                >
                  I Want This Referral
                </button>
              </div>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
