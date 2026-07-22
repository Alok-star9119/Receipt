import React from 'react';
import { LOGO_URL } from '../data/feeStructure';
import { Database, ShieldCheck, Sparkles } from 'lucide-react';

interface HeaderProps {
  dbConnected: boolean;
  totalReceiptsCount: number;
}

export const Header: React.FC<HeaderProps> = ({ dbConnected, totalReceiptsCount }) => {
  return (
    <div className="no-print masthead p-5 md:p-6 text-white rounded-xl shadow-lg border border-slate-700/50 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <img
            src={LOGO_URL}
            alt="GPLR School Logo"
            className="w-14 h-14 md:w-16 md:h-16 rounded-full object-contain border-2 shadow-md bg-white/10 backdrop-blur-sm p-0.5"
            style={{ borderColor: '#B98418' }}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl md:text-2xl font-bold tracking-wide text-amber-100">
                Gaya Prasad Lokai Ram School
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30">
                <Sparkles className="w-3 h-3" /> Managed Cloud Backend
              </span>
            </div>
            <p className="text-xs md:text-sm font-medium text-amber-200/80 mt-0.5">
              Fee Receipt &amp; Ledger System — Shahpur Itai, Utraula, Balrampur
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-md transition-all ${
            dbConnected 
              ? 'bg-emerald-500/15 text-emerald-200 border-emerald-500/40 shadow-sm' 
              : 'bg-amber-500/15 text-amber-200 border-amber-500/40'
          }`}>
            <span className={`w-2 h-2 rounded-full ${dbConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <Database className="w-3.5 h-3.5" />
            <span>{dbConnected ? 'Google Cloud Database (Firestore)' : 'Offline Local Storage'}</span>
          </div>

          <div className="hidden md:flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-white/10 text-slate-200 border border-white/10">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{totalReceiptsCount} Receipts Saved</span>
          </div>
        </div>
      </div>
    </div>
  );
};
