import React, { useState } from 'react';
import { ConcessionItem } from '../types';
import { Tag, Plus, Trash2, ShieldCheck } from 'lucide-react';

interface ConcessionPanelProps {
  studentName: string;
  studentId: string;
  selectedClass: string;
  concessions: Record<string, ConcessionItem>;
  onSaveConcession: (particular: string, type: 'percent' | 'flat', value: number) => Promise<void>;
  onRemoveConcession: (particular: string) => Promise<void>;
  onItemChange: () => void;
}

export const ConcessionPanel: React.FC<ConcessionPanelProps> = ({
  studentName,
  studentId,
  selectedClass,
  concessions,
  onSaveConcession,
  onRemoveConcession,
  onItemChange,
}) => {
  const [particular, setParticular] = useState('Tution Fee');
  const [type, setType] = useState<'percent' | 'flat'>('percent');
  const [value, setValue] = useState<string>('');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!studentName.trim() && !studentId.trim()) {
      alert('Enter Student Name or Student ID first to link the concession.');
      return;
    }
    const valNum = parseFloat(value);
    if (isNaN(valNum) || valNum <= 0) {
      alert('Please enter a valid positive discount value.');
      return;
    }

    setSaving(true);
    try {
      await onSaveConcession(particular, type, valNum);
      setValue('');
      onItemChange();
    } catch (e) {
      alert('Failed to save concession');
    } finally {
      setSaving(false);
    }
  };

  const concessionEntries = Object.entries(concessions) as [string, ConcessionItem][];

  return (
    <div className="no-print mb-5 p-4 md:p-5 rounded-xl border bg-amber-50/40 border-amber-200">
      <div className="flex items-center gap-2 mb-1">
        <Tag className="w-4 h-4 text-amber-700" />
        <h3 className="font-semibold text-sm md:text-base text-amber-950">
          Permanent Student Concession / Discount Setting
        </h3>
      </div>
      <p className="text-xs text-slate-600 mb-3">
        Saved in <b>Google Cloud Database (Firestore)</b> against this Student ID/Name + Class ({selectedClass}). Applied automatically to every future receipt item of that type.
      </p>

      {/* Input row */}
      <div className="flex flex-wrap gap-2.5 items-end mb-3 bg-white p-3 rounded-lg border border-amber-200/80 shadow-xs">
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Particular</label>
          <select
            value={particular}
            onChange={(e) => setParticular(e.target.value)}
            className="p-1.5 border border-slate-300 rounded text-xs bg-white font-medium"
          >
            <option>Tution Fee</option>
            <option>Books Amount</option>
            <option>Computer Fee</option>
            <option>Exam Fee</option>
            <option>Notebooks</option>
            <option>Stationary</option>
            <option>Diary &amp; Tie Belt</option>
            <option>ID Card</option>
            <option>Practical Exam</option>
            <option>Registration Fee</option>
            <option>Transport Fee</option>
            <option>Shirt Fee</option>
            <option>Renewal Fee</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'percent' | 'flat')}
            className="p-1.5 border border-slate-300 rounded text-xs bg-white font-medium"
          >
            <option value="percent">% Percentage</option>
            <option value="flat">₹ Flat Amount</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1">Value</label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="e.g. 10"
            className="p-1.5 border border-slate-300 rounded text-xs w-24 font-mono font-medium"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-500 transition-colors shadow-xs active:scale-95 disabled:opacity-50"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>{saving ? 'Saving...' : 'Save Concession'}</span>
        </button>
      </div>

      {/* Active concessions list */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-slate-500 font-medium">Active Discounts:</span>
        {concessionEntries.length === 0 ? (
          <span className="text-xs text-slate-400 italic">No concessions configured for this student.</span>
        ) : (
          concessionEntries.map(([p, c]) => (
            <span
              key={p}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs"
            >
              <ShieldCheck className="w-3 h-3 text-amber-700" />
              <span>{p}: {c.type === 'percent' ? `${c.value}%` : `₹${c.value}`} discount</span>
              <button
                onClick={() => {
                  onRemoveConcession(p);
                  onItemChange();
                }}
                className="text-red-700 hover:text-red-900 font-bold ml-1 hover:bg-amber-200 rounded-full p-0.5 transition-colors"
                title="Remove concession"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))
        )}
      </div>
    </div>
  );
};
