'use client';
import Link from 'next/link';
import { Users, MessageSquare, FileText, Activity } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500 mt-2">Welcome back, Staff.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600"><Users className="w-6 h-6"/></div>
            <div>
              <div className="text-3xl font-bold">24</div>
              <div className="text-slate-500 text-sm">Total Participants</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-lg text-green-600"><Activity className="w-6 h-6"/></div>
            <div>
              <div className="text-3xl font-bold">18</div>
              <div className="text-slate-500 text-sm">Active This Week</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-lg text-amber-600"><FileText className="w-6 h-6"/></div>
            <div>
              <div className="text-3xl font-bold">5</div>
              <div className="text-slate-500 text-sm">Pending Referrals</div>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-lg text-red-600"><MessageSquare className="w-6 h-6"/></div>
            <div>
              <div className="text-3xl font-bold">3</div>
              <div className="text-slate-500 text-sm">Unread Messages</div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-slate-900 mb-4">Quick Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/messages" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-blue-500 transition-colors flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <MessageSquare className="text-slate-400 group-hover:text-blue-500" />
            <span className="font-semibold text-slate-700">View Messages</span>
          </div>
        </Link>
        <Link href="/admin/referrals" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-blue-500 transition-colors flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <FileText className="text-slate-400 group-hover:text-blue-500" />
            <span className="font-semibold text-slate-700">View Referrals</span>
          </div>
        </Link>
        <Link href="/admin/progress" className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-blue-500 transition-colors flex items-center justify-between group">
          <div className="flex items-center gap-3">
            <Activity className="text-slate-400 group-hover:text-blue-500" />
            <span className="font-semibold text-slate-700">View Progress</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
