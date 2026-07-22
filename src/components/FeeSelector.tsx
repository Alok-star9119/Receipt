import React, { useState, useEffect } from 'react';
import { FeeItem, ClassName, ConcessionItem } from '../types';
import { FEE_STRUCTURE, ITEM_TO_FEE_KEY, MONTHS } from '../data/feeStructure';
import { Plus, Trash2, Zap, HelpCircle } from 'lucide-react';

interface FeeSelectorProps {
  selectedClass: ClassName;
  feeItems: FeeItem[];
  setFeeItems: React.Dispatch<React.SetStateAction<FeeItem[]>>;
  concessions: Record<string, ConcessionItem>;
}

export const FeeSelector: React.FC<FeeSelectorProps> = ({
  selectedClass,
  feeItems,
  setFeeItems,
  concessions,
}) => {
  const [quickItem, setQuickItem] = useState('');
  const [quickMonth, setQuickMonth] = useState('APR');
  const [quickAmount, setQuickAmount] = useState<string>('');
  const [hint, setHint] = useState<string>('');

  // Set default month to current academic month
  useEffect(() => {
    const now = new Date();
    const acaIndex = (now.getMonth() - 3 + 12) % 12;
    setQuickMonth(MONTHS[acaIndex]);
  }, []);

  // Calculate quick amount whenever item or class or concessions change
  useEffect(() => {
    if (!quickItem || !FEE_STRUCTURE[selectedClass]) {
      setHint('');
      setQuickAmount('');
      return;
    }
    if (quickItem === 'Custom') {
      setHint('Enter amount manually');
      setQuickAmount('');
      return;
    }

    const key = ITEM_TO_FEE_KEY[quickItem];
    const baseAmt = key ? FEE_STRUCTURE[selectedClass][key] : undefined;

    if (baseAmt === undefined || baseAmt === null) {
      setQuickAmount('');
      setHint(`No fixed rate for ${quickItem} in Class ${selectedClass} — enter manually.`);
      return;
    }

    // Apply concession if available
    const c = concessions[quickItem];
    if (c) {
      let final = baseAmt;
      let note = '';
      if (c.type === 'percent') {
        final = Math.round(baseAmt * (1 - c.value / 100));
        note = `(${c.value}% concession applied)`;
      } else {
        final = Math.max(0, baseAmt - c.value);
        note = `(₹${c.value} concession applied)`;
      }
      setQuickAmount(final.toString());
      setHint(`Class ${selectedClass} base ₹${baseAmt} → ₹${final} ${note}`);
    } else {
      setQuickAmount(baseAmt.toString());
      setHint(`Class ${selectedClass} base fee: ₹${baseAmt}`);
    }
  }, [quickItem, selectedClass, concessions]);

  const handleQuickAdd = () => {
    if (!quickItem) {
      alert('Select a fee item');
      return;
    }
    const particular = quickItem === 'Custom' ? 'Other Fee' : quickItem;
    const amt = parseFloat(quickAmount) || 0;

    let concessionNote = '';
    const baseKey = ITEM_TO_FEE_KEY[quickItem];
    const origAmt = baseKey ? FEE_STRUCTURE[selectedClass]?.[baseKey] : amt;
    const c = concessions[particular];
    if (c) {
      concessionNote = c.type === 'percent' ? `(${c.value}% discount)` : `(₹${c.value} discount)`;
    }

    const newItem: FeeItem = {
      id: Date.now() + Math.random(),
      month: quickMonth,
      particular,
      amount: amt,
      originalAmount: origAmt,
      concessionNote,
    };

    setFeeItems((prev) => [...prev, newItem]);
    setQuickItem('');
    setQuickAmount('');
    setHint('');
  };

  const addBlankRow = () => {
    const lastMonth = feeItems.length > 0 ? feeItems[feeItems.length - 1].month : 'APR';
    const nextIdx = (MONTHS.indexOf(lastMonth) + 1) % 12;
    const nextM = MONTHS[nextIdx];

    const newItem: FeeItem = {
      id: Date.now() + Math.random(),
      month: nextM,
      particular: 'Tution Fee',
      amount: FEE_STRUCTURE[selectedClass]?.monthly || 0,
      originalAmount: FEE_STRUCTURE[selectedClass]?.monthly || 0,
      concessionNote: '',
    };
    setFeeItems((prev) => [...prev, newItem]);
  };

  const removeRow = (id: number) => {
    setFeeItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateFee = (id: number, field: keyof FeeItem, value: any) => {
    setFeeItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        if (field === 'particular') {
          const particularVal = value;
          const key = ITEM_TO_FEE_KEY[particularVal];
          const baseAmt = key ? FEE_STRUCTURE[selectedClass]?.[key] : undefined;
          
          let finalAmt = item.amount;
          let note = '';
          let orig = item.originalAmount;

          if (baseAmt !== undefined && baseAmt !== null) {
            orig = baseAmt;
            finalAmt = baseAmt;
            const c = concessions[particularVal];
            if (c) {
              if (c.type === 'percent') {
                finalAmt = Math.round(baseAmt * (1 - c.value / 100));
                note = `(${c.value}% discount)`;
              } else {
                finalAmt = Math.max(0, baseAmt - c.value);
                note = `(₹${c.value} discount)`;
              }
            }
          }

          return {
            ...item,
            particular: particularVal,
            amount: finalAmt,
            originalAmount: orig,
            concessionNote: note,
          };
        }

        if (field === 'amount') {
          const parsed = parseFloat(value) || 0;
          return {
            ...item,
            amount: parsed,
            originalAmount: parsed,
            concessionNote: '',
          };
        }

        return { ...item, [field]: value };
      })
    );
  };

  return (
    <div className="border-t border-slate-200 pt-5 mt-4">
      <h3 className="font-display font-semibold text-slate-800 text-base mb-3 flex items-center gap-2">
        <span>Fee Line Items</span>
        <span className="text-xs font-sans font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
          Class {selectedClass}
        </span>
      </h3>

      {/* Quick Add from Fee Structure */}
      <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-3.5 mb-4 shadow-2xs">
        <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-900 mb-2">
          <Zap className="w-4 h-4 text-indigo-600 fill-indigo-600" />
          <span>Quick Add from Fee Structure</span>
        </div>

        <div className="flex flex-wrap gap-2.5 items-end">
          <div className="grow min-w-[160px]">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Fee Particular</label>
            <select
              value={quickItem}
              onChange={(e) => setQuickItem(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-lg text-xs bg-white font-medium"
            >
              <option value="">-- Select Item --</option>
              <option value="Tution Fee">Tution Fee (Monthly)</option>
              <option value="Books Amount">Books Amount (One Time)</option>
              <option value="Computer Fee">Computer Fee (One Time)</option>
              <option value="Exam Fee">Exam Fee (One Time)</option>
              <option value="Notebooks">Notebooks</option>
              <option value="Stationary">Stationary</option>
              <option value="Diary & Tie Belt">Diary &amp; Tie Belt</option>
              <option value="ID Card">ID Card</option>
              <option value="Practical Exam">Practical Exam</option>
              <option value="Registration Fee">Registration Fee (One Time)</option>
              <option value="Transport Fee">Transport Fee</option>
              <option value="Shirt Fee">Shirt Fee</option>
              <option value="Renewal Fee">Renewal Fee</option>
              <option value="Custom">Custom / Other</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Installment Month</label>
            <select
              value={quickMonth}
              onChange={(e) => setQuickMonth(e.target.value)}
              className="p-2 border border-slate-300 rounded-lg text-xs bg-white font-medium"
            >
              {MONTHS.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">Amount (₹)</label>
            <input
              type="number"
              value={quickAmount}
              onChange={(e) => setQuickAmount(e.target.value)}
              placeholder="₹"
              className="p-2 border border-slate-300 rounded-lg text-xs w-28 font-mono font-bold text-slate-800 bg-white"
            />
          </div>

          <button
            onClick={handleQuickAdd}
            className="flex items-center gap-1.5 px-4 py-2 bg-indigo-900 hover:bg-indigo-950 text-white rounded-lg text-xs font-bold transition-all shadow-sm active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Add Row</span>
          </button>
        </div>

        {hint && (
          <p className="text-xs text-indigo-700 font-medium mt-2 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
            <span>{hint}</span>
          </p>
        )}
      </div>

      {/* Manual fee rows table */}
      <div className="space-y-2">
        {feeItems.length === 0 ? (
          <div className="text-center p-6 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
            No fee items added yet. Use "Quick Add" above or click "+ Add Blank Row" below.
          </div>
        ) : (
          feeItems.map((item, index) => (
            <div
              key={item.id}
              className="flex items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-100/80 transition-colors"
            >
              <span className="text-xs font-bold text-slate-400 w-5 text-center">{index + 1}.</span>

              {/* Month */}
              <select
                value={item.month}
                onChange={(e) => updateFee(item.id, 'month', e.target.value)}
                className="p-1.5 border border-slate-300 rounded text-xs bg-white font-medium"
              >
                {MONTHS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>

              {/* Particular */}
              <select
                value={item.particular}
                onChange={(e) => updateFee(item.id, 'particular', e.target.value)}
                className="grow p-1.5 border border-slate-300 rounded text-xs bg-white font-medium"
              >
                <option value="Tution Fee">Tution Fee</option>
                <option value="Books Amount">Books Amount</option>
                <option value="Computer Fee">Computer Fee</option>
                <option value="Exam Fee">Exam Fee</option>
                <option value="Notebooks">Notebooks</option>
                <option value="Stationary">Stationary</option>
                <option value="Diary & Tie Belt">Diary &amp; Tie Belt</option>
                <option value="ID Card">ID Card</option>
                <option value="Practical Exam">Practical Exam</option>
                <option value="Registration Fee">Registration Fee</option>
                <option value="Transport Fee">Transport Fee</option>
                <option value="Shirt Fee">Shirt Fee</option>
                <option value="Renewal Fee">Renewal Fee</option>
                <option value="Other Fee">Other / Custom Fee</option>
              </select>

              {/* Amount */}
              <div className="relative">
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) => updateFee(item.id, 'amount', e.target.value)}
                  placeholder="₹"
                  className="p-1.5 border border-slate-300 rounded text-xs w-28 font-mono font-bold text-right text-slate-800 bg-white"
                />
              </div>

              {/* Delete button */}
              <button
                onClick={() => removeRow(item.id)}
                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Remove row"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>

      <button
        onClick={addBlankRow}
        className="mt-3 text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 px-2 py-1 rounded hover:bg-indigo-50 transition-colors"
      >
        <Plus className="w-3.5 h-3.5" />
        <span>+ Add Blank Row</span>
      </button>
    </div>
  );
};
