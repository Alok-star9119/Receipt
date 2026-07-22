import React from 'react';
import { FeeItem } from '../types';
import { LOGO_URL, numberToWords } from '../data/feeStructure';

interface ReceiptPreviewProps {
  receiptNo: number | string;
  studentId: string;
  studentName: string;
  parentName: string;
  selectedClass: string;
  paymentMode: string;
  receiptDate: string; // ISO or DD-MM-YYYY
  feeItems: FeeItem[];
  cashierName?: string;
}

export const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({
  receiptNo,
  studentId,
  studentName,
  parentName,
  selectedClass,
  paymentMode,
  receiptDate,
  feeItems,
  cashierName = 'Jyoti Verma',
}) => {
  const totalAmount = feeItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);
  const wordsAmount = numberToWords(totalAmount);

  // Format date as DD-MM-YYYY
  let formattedDate = receiptDate;
  if (receiptDate && receiptDate.includes('-')) {
    const parts = receiptDate.split('-');
    if (parts.length === 3 && parts[0].length === 4) {
      formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
  }

  const fillerCount = Math.max(0, 5 - feeItems.length);

  return (
    <div className="print-container bg-white receipt-border shadow-xl mx-auto rounded-lg overflow-hidden my-6 max-w-[800px] border-2 border-slate-900 text-slate-900 font-sans">
      {/* Header */}
      <div className="p-4 flex flex-col items-center border-b-2 border-slate-900 bg-slate-50/50">
        <img
          src={LOGO_URL}
          alt="GPLR School Logo"
          className="w-16 h-16 md:w-20 md:h-20 object-contain mb-2 rounded-full border border-slate-300 p-0.5 shadow-xs"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
          }}
        />
        <h1 className="font-display text-xl md:text-2xl font-bold uppercase tracking-wider text-center text-slate-950">
          Gaya Prasad Lokai Ram School
        </h1>
        <p className="text-xs md:text-sm font-medium text-slate-700">
          Shahpur Itai, Utraula, Balrampur - 271609
        </p>
      </div>

      {/* Receipt Info Bar 1 */}
      <div className="grid grid-cols-12 border-b-2 border-slate-900 font-semibold text-xs md:text-sm">
        <div className="col-span-3 p-2 bg-slate-100/60 border-r border-slate-900 flex items-center">
          Receipt No :
        </div>
        <div className="col-span-3 p-2 border-r border-slate-900 font-mono font-bold text-indigo-900">
          {receiptNo || '—'}
        </div>
        <div className="col-span-2 p-2 bg-slate-100/60 border-r border-slate-900 flex items-center">
          Student ID :
        </div>
        <div className="col-span-4 p-2 font-mono">
          {studentId || '—'}
        </div>
      </div>

      {/* Receipt Info Bar 2 */}
      <div className="grid grid-cols-12 border-b-2 border-slate-900 font-semibold text-xs md:text-sm">
        <div className="col-span-3 p-2 bg-slate-100/60 border-r border-slate-900 flex items-center">
          Student Name :
        </div>
        <div className="col-span-5 p-2 border-r border-slate-900 uppercase font-bold">
          {studentName || '—'}
        </div>
        <div className="col-span-2 p-2 bg-slate-100/60 border-r border-slate-900 flex items-center">
          Parent Name :
        </div>
        <div className="col-span-2 p-2">
          {parentName || '—'}
        </div>
      </div>

      {/* Receipt Info Bar 3 */}
      <div className="grid grid-cols-12 border-b-2 border-slate-900 font-semibold text-xs md:text-sm">
        <div className="col-span-3 p-2 bg-slate-100/60 border-r border-slate-900 flex items-center">
          Class :
        </div>
        <div className="col-span-5 p-2 border-r border-slate-900 font-bold">
          {selectedClass}
        </div>
        <div className="col-span-2 p-2 bg-slate-100/60 border-r border-slate-900 flex items-center">
          Mode :
        </div>
        <div className="col-span-2 p-2">
          {paymentMode || 'Cash'}
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 border-b border-slate-900 font-bold text-xs uppercase text-center bg-slate-200/80">
        <div className="col-span-1 border-r border-slate-900 p-1.5">No</div>
        <div className="col-span-1 border-r border-slate-900 p-1.5">Due For</div>
        <div className="col-span-2 border-r border-slate-900 p-1.5">Installment</div>
        <div className="col-span-6 border-r border-slate-900 p-1.5">Particulars</div>
        <div className="col-span-2 p-1.5">Amount (₹)</div>
      </div>

      {/* Table Items */}
      <div className="min-h-[160px] text-xs">
        {feeItems.map((item, index) => (
          <div
            key={item.id || index}
            className="grid grid-cols-12 border-b border-slate-900 text-center min-h-[34px] items-center"
          >
            <div className="col-span-1 border-r border-slate-900 p-1 font-mono font-medium">{index + 1}</div>
            <div className="col-span-1 border-r border-slate-900 p-1"></div>
            <div className="col-span-2 border-r border-slate-900 p-1 font-bold">{item.month}</div>
            <div className="col-span-6 border-r border-slate-900 p-1.5 text-left px-4 font-medium">
              {item.particular}
              {item.concessionNote && (
                <span className="block text-[11px] text-emerald-700 font-normal">
                  {item.concessionNote}
                </span>
              )}
            </div>
            <div className="col-span-2 p-1.5 text-right px-4 font-mono font-bold">
              {item.amount.toLocaleString('en-IN')}
            </div>
          </div>
        ))}

        {/* Filler rows */}
        {Array.from({ length: fillerCount }).map((_, i) => (
          <div key={`filler-${i}`} className="grid grid-cols-12 border-b border-slate-900 h-[34px]">
            <div className="col-span-1 border-r border-slate-900"></div>
            <div className="col-span-1 border-r border-slate-900"></div>
            <div className="col-span-2 border-r border-slate-900"></div>
            <div className="col-span-6 border-r border-slate-900"></div>
            <div className="col-span-2"></div>
          </div>
        ))}
      </div>

      {/* Total & Words Row */}
      <div className="grid grid-cols-12 border-t-2 border-slate-900 font-bold text-xs md:text-sm">
        <div className="col-span-9 p-2.5 border-r border-slate-900 flex items-center gap-2 bg-slate-50/50">
          <span className="text-slate-600">Rupees in words:</span>
          <span className="capitalize font-semibold text-slate-900 italic">
            {wordsAmount ? `${wordsAmount} Rupees Only` : 'Zero Rupees'}
          </span>
        </div>
        <div className="col-span-1 p-2.5 border-r border-slate-900 text-center bg-slate-200/80 uppercase">
          Total
        </div>
        <div className="col-span-2 p-2.5 text-right px-4 font-mono font-bold text-indigo-950 text-sm md:text-base">
          ₹{totalAmount.toLocaleString('en-IN')}
        </div>
      </div>

      {/* Footer / Cashier Signature */}
      <div className="grid grid-cols-12 border-t-2 border-slate-900 h-16 text-xs">
        <div className="col-span-1 border-r border-slate-900 flex items-center justify-center bg-slate-100/50"></div>
        <div className="col-span-1 border-r border-slate-900 flex items-center justify-center font-bold text-slate-600 bg-slate-100/50 uppercase">
          Date
        </div>
        <div className="col-span-2 border-r border-slate-900 flex items-center justify-center font-bold font-mono text-sm">
          {formattedDate}
        </div>
        <div className="col-span-8 flex items-center justify-center font-semibold italic text-slate-800">
          Cashier ( <span className="px-2 underline font-bold">{cashierName}</span> )
        </div>
      </div>
    </div>
  );
};
