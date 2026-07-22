import React from 'react';
import { ClassName } from '../types';
import { User, CreditCard, Calendar, BookOpen, Hash } from 'lucide-react';

interface StudentFormProps {
  studentName: string;
  setStudentName: (val: string) => void;
  studentId: string;
  setStudentId: (val: string) => void;
  parentName: string;
  setParentName: (val: string) => void;
  selectedClass: ClassName;
  setSelectedClass: (val: ClassName) => void;
  paymentMode: string;
  setPaymentMode: (val: string) => void;
  receiptDate: string;
  setReceiptDate: (val: string) => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  studentName,
  setStudentName,
  studentId,
  setStudentId,
  parentName,
  setParentName,
  selectedClass,
  setSelectedClass,
  paymentMode,
  setPaymentMode,
  receiptDate,
  setReceiptDate,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">
      {/* Student Name */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-indigo-600" /> Student Name *
        </label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          placeholder="Enter full name"
          className="w-full text-sm bg-white border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all shadow-sm"
        />
      </div>

      {/* Student ID */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Hash className="w-3.5 h-3.5 text-indigo-600" /> Student ID <span className="text-slate-400 font-normal lowercase">(recommended)</span>
        </label>
        <input
          type="text"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          placeholder="e.g. GPLR-2026-045"
          className="w-full text-sm bg-white border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all shadow-sm font-mono"
        />
      </div>

      {/* Parent Name */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-indigo-600" /> Parent / Guardian Name
        </label>
        <input
          type="text"
          value={parentName}
          onChange={(e) => setParentName(e.target.value)}
          placeholder="Enter father / mother name"
          className="w-full text-sm bg-white border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all shadow-sm"
        />
      </div>

      {/* Class */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <BookOpen className="w-3.5 h-3.5 text-indigo-600" /> Class *
        </label>
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value as ClassName)}
          className="w-full text-sm bg-white border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all shadow-sm font-medium"
        >
          <option value="Play">Play</option>
          <option value="Nur">Nursery</option>
          <option value="LKG">LKG</option>
          <option value="UKG">UKG</option>
          <option value="1st">1st</option>
          <option value="2nd">2nd</option>
          <option value="3rd">3rd</option>
          <option value="4th">4th</option>
          <option value="5th">5th</option>
          <option value="6th">6th</option>
          <option value="7th">7th</option>
          <option value="8th">8th</option>
          <option value="9th">9th</option>
          <option value="10th">10th</option>
        </select>
      </div>

      {/* Payment Mode */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <CreditCard className="w-3.5 h-3.5 text-indigo-600" /> Payment Mode
        </label>
        <select
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
          className="w-full text-sm bg-white border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all shadow-sm font-medium"
        >
          <option value="Cash">💵 Cash</option>
          <option value="GPay">GPay</option>
          <option value="PhonePe">PhonePe</option>
          <option value="BHIM Pay">BHIM Pay</option>
          <option value="Navi Pay">Navi Pay</option>
          <option value="UPI">UPI</option>
          <option value="Net Banking">Net Banking</option>
          <option value="Cheque">Cheque</option>
        </select>
      </div>

      {/* Receipt Date */}
      <div>
        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Receipt Issue Date
        </label>
        <input
          type="date"
          value={receiptDate}
          onChange={(e) => setReceiptDate(e.target.value)}
          className="w-full text-sm bg-white border border-slate-300 rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 outline-none transition-all shadow-sm font-medium"
        />
        <p className="text-[11px] text-slate-400 mt-1">Defaults to today — backdate if issuing past receipt.</p>
      </div>
    </div>
  );
};
