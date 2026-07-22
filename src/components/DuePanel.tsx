import React from 'react';
import { ClassName, ReceiptRecord } from '../types';
import { FEE_STRUCTURE, MONTHS } from '../data/feeStructure';
import { AlertCircle, CheckCircle, CalendarDays } from 'lucide-react';

interface DuePanelProps {
  selectedClass: ClassName;
  studentName: string;
  studentId: string;
  history: ReceiptRecord[];
}

export const DuePanel: React.FC<DuePanelProps> = ({
  selectedClass,
  studentName,
  studentId,
  history,
}) => {
  const fees = FEE_STRUCTURE[selectedClass];
  if (!fees) return null;

  // Calculate academic months up to current calendar month
  const now = new Date();
  const calMonth = now.getMonth(); // 0 = Jan
  const acaIndex = (calMonth - 3 + 12) % 12; // April = 0
  const coveredMonths = MONTHS.slice(0, acaIndex + 1);

  // Find paid months from history for this student
  const paidMonthsSet = new Set<string>();
  const normId = studentId.trim().toLowerCase();
  const normName = studentName.trim().toLowerCase();

  history.forEach((rec) => {
    const recId = (rec.studentId || '').trim().toLowerCase();
    const recName = (rec.student || '').trim().toLowerCase();
    const isMatch =
      rec.class === selectedClass &&
      ((normId && recId && recId === normId) ||
        (!normId && normName && recName === normName));

    if (isMatch) {
      rec.items.forEach((item) => {
        if (item.particular && item.particular.toLowerCase().includes('tution')) {
          paidMonthsSet.add(item.month);
        }
      });
    }
  });

  const paidMonths = Array.from(paidMonthsSet);
  const unpaidMonths = coveredMonths.filter((m) => !paidMonthsSet.has(m));
  const monthlyFee = fees.monthly;
  const dueAmount = unpaidMonths.length * monthlyFee;

  const isClear = dueAmount === 0;

  return (
    <div
      id="due-panel"
      className={`mb-5 p-4 md:p-5 rounded-xl border transition-all ${
        isClear
          ? 'bg-emerald-50/80 border-emerald-200'
          : 'bg-amber-50/80 border-amber-300'
      }`}
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {isClear ? (
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-amber-600" />
            )}
            <h3
              className={`font-semibold text-sm md:text-base ${
                isClear ? 'text-emerald-900' : 'text-amber-900'
              }`}
            >
              {isClear ? 'Fee Account Up to Date' : 'Outstanding Fee Due'}
            </h3>
          </div>

          <p className="text-xs text-slate-600 flex items-center gap-1.5 flex-wrap">
            <CalendarDays className="w-3.5 h-3.5 text-slate-400" />
            <span>
              Months checked (Apr to {MONTHS[acaIndex]}):{' '}
              <strong className="text-slate-800">{coveredMonths.join(', ')}</strong>
            </span>
          </p>

          <p className="text-xs text-slate-500 mt-1">
            Paid Tuition Months:{' '}
            <span className="font-medium text-slate-700">
              {paidMonths.length > 0 ? paidMonths.join(', ') : 'None in history'}
            </span>
          </p>
        </div>

        <div className="text-left md:text-right bg-white/70 px-4 py-2 rounded-lg border border-slate-200/60 shadow-xs self-stretch md:self-auto">
          <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
            Total Outstanding
          </span>
          <span
            className={`text-2xl font-bold font-mono ${
              isClear ? 'text-emerald-600' : 'text-red-600'
            }`}
          >
            ₹{dueAmount.toLocaleString('en-IN')}
          </span>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Class {selectedClass} rate: ₹{monthlyFee}/mo × {unpaidMonths.length} unpaid
          </p>
        </div>
      </div>

      {/* Month status pills */}
      <div className="mt-3.5 pt-3 border-t border-slate-200/50 flex flex-wrap gap-1.5">
        {coveredMonths.map((m) => {
          const paid = paidMonthsSet.has(m);
          return (
            <span
              key={m}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 border ${
                paid
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : 'bg-red-100 text-red-800 border-red-300'
              }`}
            >
              {m} {paid ? '✓' : '✗'}
            </span>
          );
        })}
      </div>
    </div>
  );
};
