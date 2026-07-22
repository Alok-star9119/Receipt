import React, { useState } from 'react';
import { ReceiptRecord } from '../types';
import { Search, Download, Upload, Trash2, Edit3, FileSpreadsheet, ShieldCheck } from 'lucide-react';

interface HistoryTableProps {
  history: ReceiptRecord[];
  onLoadRecord: (record: ReceiptRecord) => void;
  onDeleteRecord: (id: string) => Promise<void>;
  onExportExcel: () => void;
  onImportFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dbConnected: boolean;
}

export const HistoryTable: React.FC<HistoryTableProps> = ({
  history,
  onLoadRecord,
  onDeleteRecord,
  onExportExcel,
  onImportFile,
  dbConnected,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter((rec) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const rNo = String(rec.receiptNo || '');
    const sName = (rec.student || '').toLowerCase();
    const sId = (rec.studentId || '').toLowerCase();
    const pName = (rec.parent || '').toLowerCase();
    const cls = (rec.class || '').toLowerCase();

    return (
      rNo.includes(term) ||
      sName.includes(term) ||
      sId.includes(term) ||
      pName.includes(term) ||
      cls.includes(term)
    );
  });

  return (
    <div className="no-print bg-white rounded-2xl p-5 md:p-6 border border-slate-200 shadow-sm mt-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg md:text-xl font-bold text-slate-900">
              Saved Receipt Ledger History
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
              {history.length} Saved
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Synchronized with {dbConnected ? 'Google Cloud Database (Firestore)' : 'Browser Storage'}. Loads instantly.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onExportExcel}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-all shadow-xs active:scale-95"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export to Excel</span>
          </button>

          <label className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs active:scale-95">
            <Upload className="w-4 h-4" />
            <span>Import CSV / XLSX</span>
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={onImportFile}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-4 relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search receipts by student name, ID, receipt number, parent, or class..."
          className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-900 text-slate-200 uppercase font-semibold tracking-wider">
              <th className="p-3 border-b border-slate-800">Receipt #</th>
              <th className="p-3 border-b border-slate-800">Date</th>
              <th className="p-3 border-b border-slate-800">Student Info</th>
              <th className="p-3 border-b border-slate-800">Class</th>
              <th className="p-3 border-b border-slate-800">Mode</th>
              <th className="p-3 border-b border-slate-800 text-right">Total (₹)</th>
              <th className="p-3 border-b border-slate-800">Line Items</th>
              <th className="p-3 border-b border-slate-800 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {filteredHistory.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-slate-400">
                  No receipts found matching your search term.
                </td>
              </tr>
            ) : (
              filteredHistory.map((rec) => {
                const key = rec.id || rec._id || `${rec.receiptNo}-${rec.date}`;
                return (
                  <tr key={key} className="hover:bg-indigo-50/40 transition-colors text-slate-700">
                    <td className="p-3 font-mono font-bold text-indigo-900">
                      #{rec.receiptNo || '—'}
                    </td>
                    <td className="p-3 text-slate-600 font-mono">
                      {rec.date}
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{rec.student}</div>
                      {rec.studentId && (
                        <div className="text-[11px] font-mono text-slate-500">ID: {rec.studentId}</div>
                      )}
                      {rec.parent && (
                        <div className="text-[11px] text-slate-400">Parent: {rec.parent}</div>
                      )}
                    </td>
                    <td className="p-3 font-bold text-slate-800">
                      {rec.class}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {rec.mode || 'Cash'}
                      </span>
                    </td>
                    <td className="p-3 text-right font-mono font-bold text-emerald-700 text-sm">
                      ₹{rec.total.toLocaleString('en-IN')}
                    </td>
                    <td className="p-3 text-[11px] text-slate-500 max-w-[200px] truncate">
                      {rec.items.map((i) => `${i.particular} (${i.month})`).join(', ')}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={() => onLoadRecord(rec)}
                          className="p-1.5 text-indigo-600 hover:bg-indigo-100 rounded transition-colors"
                          title="Load into editor"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteRecord(key)}
                          className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Delete receipt"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
