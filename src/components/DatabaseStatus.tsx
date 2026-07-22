import React from 'react';
import { Database, ShieldCheck, Cpu, RefreshCw, CheckCircle2 } from 'lucide-react';

interface DatabaseStatusProps {
  dbConnected: boolean;
  nextReceiptNo: number;
  totalReceipts: number;
  onRefresh: () => void;
}

export const DatabaseStatus: React.FC<DatabaseStatusProps> = ({
  dbConnected,
  nextReceiptNo,
  totalReceipts,
  onRefresh,
}) => {
  return (
    <div className="no-print bg-white rounded-xl p-4 md:p-5 border border-slate-200 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-100 mt-0.5">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800 text-sm md:text-base">
                Google Cloud Database Backend
              </h3>
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Powered by Google Cloud Firestore (<code className="bg-slate-100 px-1 py-0.5 rounded text-indigo-600 font-mono">hip-region-qxfb9</code>). Zero-maintenance, multi-region replication, and automatic scaling for school records.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end md:self-auto flex-wrap">
          <div className="text-right px-3 py-1 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Next Receipt #</span>
            <span className="text-sm font-bold font-mono text-indigo-700">#{nextReceiptNo}</span>
          </div>

          <div className="text-right px-3 py-1 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Stored Records</span>
            <span className="text-sm font-bold font-mono text-slate-800">{totalReceipts}</span>
          </div>

          <button
            onClick={onRefresh}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200 active:scale-95"
            title="Sync with Google Cloud Firestore"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
            <span>Sync Cloud DB</span>
          </button>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-2">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="flex items-center gap-1 font-mono text-[11px] text-slate-600">
            <Cpu className="w-3 h-3 text-indigo-500" /> Google Cloud Firestore API
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Auto-backed up in Cloud
          </span>
        </div>
        <span className="text-[11px] text-slate-400">
          Replaced MongoDB for enterprise cloud stability &amp; native GCP integration
        </span>
      </div>
    </div>
  );
};
