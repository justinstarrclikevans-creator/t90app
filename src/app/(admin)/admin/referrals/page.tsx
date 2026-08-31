'use client';
import Link from 'next/link';
import { ChevronLeft, Filter } from 'lucide-react';

const mockReferrals = [
  { id: 1, name: 'John Doe', org: 'SC Housing Authority', type: 'Housing', status: 'Pending', date: '2023-10-24' },
  { id: 2, name: 'Jane Smith', org: 'Mental Health Assoc.', type: 'Mental Health', status: 'Accepted', date: '2023-10-23' },
  { id: 3, name: 'Marcus Johnson', org: 'Local Transit', type: 'Transportation', status: 'Completed', date: '2023-10-22' },
  { id: 4, name: 'Sarah Williams', org: 'Second Chance Jobs', type: 'Employment', status: 'Declined', date: '2023-10-20' },
  { id: 5, name: 'Michael Brown', org: 'Legal Aid Society', type: 'Legal', status: 'Suggested', date: '2023-10-19' },
];

const statusColors = {
  'Pending': 'bg-amber-100 text-amber-800',
  'Accepted': 'bg-green-100 text-green-800',
  'Completed': 'bg-blue-100 text-blue-800',
  'Declined': 'bg-red-100 text-red-800',
  'Suggested': 'bg-slate-100 text-slate-800',
};

export default function AdminReferralsPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="p-2 -ml-2 rounded-lg hover:bg-slate-200">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Referral Tracking</h1>
        </div>
        <button className="flex items-center gap-2 bg-white px-4 py-2 border rounded-lg shadow-sm text-sm font-medium hover:bg-slate-50">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                <th className="p-4 font-medium">Participant</th>
                <th className="p-4 font-medium">Organization</th>
                <th className="p-4 font-medium">Service Type</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {mockReferrals.map(ref => (
                <tr key={ref.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-900">{ref.name}</td>
                  <td className="p-4 text-slate-700">{ref.org}</td>
                  <td className="p-4 text-slate-600">{ref.type}</td>
                  <td className="p-4 text-slate-500 text-sm">{ref.date}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColors[ref.status as keyof typeof statusColors]}`}>
                      {ref.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Update</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
