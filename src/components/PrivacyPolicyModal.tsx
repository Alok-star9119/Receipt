import React from 'react';
import { X, ShieldCheck, Lock, Database, FileText } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-slate-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-amber-100">
                GPLR School Fee Ledger Privacy Policy
              </h2>
              <p className="text-xs text-amber-200/70">
                Official Data Protection &amp; Cloud Security Information
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-600 leading-relaxed">
          <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-xl text-xs text-indigo-950 flex items-start gap-2.5">
            <Lock className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <p>
              Gaya Prasad Lokai Ram School (Shahpur Itai, Utraula, Balrampur) is committed to safeguarding student fee records and guardian details with enterprise Google Cloud security standards.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-600" />
              1. Information We Collect
            </h3>
            <p className="text-xs text-slate-600">
              This Fee Ledger application processes student names, roll/student IDs, parent/guardian names, class designations, payment amounts, fee categories, and receipt issue dates. No sensitive banking details or passwords are stored.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              2. Google Cloud Database Security
            </h3>
            <p className="text-xs text-slate-600">
              All fee receipt data is stored securely on <b>Google Cloud Database (Firestore)</b> with encrypted transit (TLS 1.3) and encrypted at-rest storage. Access is restricted strictly to authorized school administrators and finance cashiers.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-1 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              3. Data Retention &amp; Excel Export
            </h3>
            <p className="text-xs text-slate-600">
              Fee records are retained permanently for institutional auditing and academic history tracking. School staff can export structured Excel ledger reports at any time for offline archiving and physical printing.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-1">4. Contact &amp; Grievances</h3>
            <p className="text-xs text-slate-600">
              For privacy requests or record corrections, please visit the GPLR School Administrative Office at Shahpur Itai, Utraula, Balrampur - 271609 or contact authorized cashier <b>Jyoti Verma</b>.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Last Updated: July 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
          >
            I Understand &amp; Close
          </button>
        </div>
      </div>
    </div>
  );
};
