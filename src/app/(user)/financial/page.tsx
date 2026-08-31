'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, DollarSign, Calculator, HelpCircle, AlertTriangle, ShieldAlert } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FinancialPage() {
  const [budget, setBudget] = useState({
    income: '',
    rent: '',
    food: '',
    transportation: '',
    phone: '',
    other: ''
  });

  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('t90_budget');
    if (saved) setBudget(JSON.parse(saved));
  }, []);

  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Allow numbers and decimals only
    if (value && !/^\d*\.?\d*$/.test(value)) return;
    
    setBudget(prev => {
      const updated = { ...prev, [name]: value };
      localStorage.setItem('t90_budget', JSON.stringify(updated));
      return updated;
    });
  };

  const incomeNum = parseFloat(budget.income) || 0;
  const expensesNum = (parseFloat(budget.rent) || 0) + (parseFloat(budget.food) || 0) + 
                      (parseFloat(budget.transportation) || 0) + (parseFloat(budget.phone) || 0) + 
                      (parseFloat(budget.other) || 0);
  const remainingNum = incomeNum - expensesNum;

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
          <DollarSign className="w-6 h-6 text-blue-600" />
          Financial Tools
        </h1>
      </header>

      <main className="flex-1 p-4 max-w-2xl mx-auto w-full space-y-6 pb-20">
        
        {/* Budget Worksheet */}
        <section className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-200">
          <div className="bg-blue-600 p-4 text-white flex items-center gap-2">
            <Calculator className="w-6 h-6" />
            <h2 className="text-lg font-bold">Monthly Budget Worksheet</h2>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Monthly Take-Home Income ($)</label>
              <input
                name="income"
                value={budget.income}
                onChange={handleBudgetChange}
                type="text"
                inputMode="decimal"
                className="w-full p-3 min-h-[48px] border-2 border-green-300 rounded-lg text-xl font-semibold text-green-700 bg-green-50 focus:ring-2 focus:ring-green-500 outline-none"
                placeholder="0.00"
              />
            </div>
            
            <div className="border-t pt-4 space-y-3">
              <h3 className="font-semibold text-slate-900 mb-2">Monthly Expenses ($)</h3>
              {['rent', 'food', 'transportation', 'phone', 'other'].map(field => (
                <div key={field} className="flex items-center gap-4">
                  <label className="w-1/3 text-sm font-medium text-slate-700 capitalize">{field}</label>
                  <input
                    name={field}
                    value={(budget as any)[field]}
                    onChange={handleBudgetChange}
                    type="text"
                    inputMode="decimal"
                    className="flex-1 p-3 min-h-[48px] border border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="0.00"
                  />
                </div>
              ))}
            </div>

            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-slate-700">Total Expenses:</span>
                <span className="text-xl font-bold text-red-600">${expensesNum.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-slate-100">
                <span className="font-bold text-slate-900">Remaining:</span>
                <span className={cn("text-2xl font-bold", remainingNum >= 0 ? "text-green-600" : "text-red-600")}>
                  ${remainingNum.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Understanding Paychecks */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Understanding Your Paycheck
          </h2>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
              <strong className="text-slate-900 block mb-1 text-base">Gross Pay</strong>
              <p className="text-slate-600">The total amount you earned before any deductions (Hours worked × Hourly rate).</p>
            </div>
            <div className="p-3 bg-red-50 rounded-lg border border-red-100">
              <strong className="text-slate-900 block mb-1 text-base">Taxes & Deductions</strong>
              <p className="text-slate-600">Money taken out for federal/state taxes, Social Security, Medicare, and possibly child support or insurance.</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
              <strong className="text-slate-900 block mb-1 text-base">Net Pay (Take-Home)</strong>
              <p className="text-slate-600">The actual amount you receive in your bank account or check (Gross Pay minus Deductions).</p>
            </div>
          </div>
        </section>

        {/* Understanding Credit */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Understanding Credit</h2>
          <div className="space-y-2">
            {[
              { id: 'q1', q: 'What is a credit score?', a: 'A number between 300 and 850 that shows how likely you are to pay back money you borrow. A higher score is better.' },
              { id: 'q2', q: 'How do I check my score?', a: 'You can get a free report once a year at AnnualCreditReport.com. Apps like Credit Karma can also show you an estimate.' },
              { id: 'q3', q: 'How do I build credit?', a: 'Pay your bills on time, keep credit card balances low, and consider a secured credit card or credit-builder loan.' }
            ].map(faq => (
              <div key={faq.id} className="border border-slate-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                  className="w-full text-left p-4 font-semibold text-slate-900 bg-slate-50 hover:bg-slate-100 flex justify-between items-center min-h-[48px]"
                >
                  {faq.q}
                  <span className="text-slate-400 text-xl">{expandedFaq === faq.id ? '−' : '+'}</span>
                </button>
                {expandedFaq === faq.id && (
                  <div className="p-4 bg-white text-slate-600 text-sm border-t">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Child Support */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Child Support (SC DSS)
          </h2>
          <p className="text-sm text-slate-600 mb-3">
            If you are behind on child support, communicate with DSS. If you just got a job, they may garnish your wages automatically.
          </p>
          <div className="bg-amber-50 p-3 rounded-lg text-sm text-amber-900 font-medium">
            Contact SC DSS Child Support Services: <br/>
            <a href="tel:1-800-768-5858" className="text-blue-600 underline font-bold mt-1 inline-block min-h-[44px] flex items-center">1-800-768-5858</a>
          </div>
        </section>

        {/* Probation */}
        <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-500" />
            Probation Obligations
          </h2>
          <ul className="space-y-3">
            {[
              "Pay your supervision fees on time",
              "Keep your agent updated on address and job changes",
              "Attend all scheduled meetings",
              "Complete any court-ordered classes"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
