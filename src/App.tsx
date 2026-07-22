import React, { useState, useEffect, useCallback } from 'react';
import { 
  ClassName, 
  FeeItem, 
  ReceiptRecord, 
  ConcessionItem 
} from './types';
import { 
  FEE_STRUCTURE, 
  MONTHS 
} from './data/feeStructure';
import { 
  fetchReceiptsFromFirestore, 
  getNextReceiptNumberFromFirestore, 
  saveReceiptToFirestore, 
  deleteReceiptFromFirestore, 
  fetchConcessionsFromFirestore, 
  saveConcessionToFirestore, 
  removeConcessionFromFirestore, 
  importReceiptsToFirestore 
} from './firebase';

import { Header } from './components/Header';
import { DatabaseStatus } from './components/DatabaseStatus';
import { StudentForm } from './components/StudentForm';
import { DuePanel } from './components/DuePanel';
import { ConcessionPanel } from './components/ConcessionPanel';
import { FeeSelector } from './components/FeeSelector';
import { ReceiptPreview } from './components/ReceiptPreview';
import { HistoryTable } from './components/HistoryTable';
import { Footer } from './components/Footer';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';

import { Printer, Save, FileSpreadsheet, Sparkles, CheckCircle2 } from 'lucide-react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export default function App() {
  // Student Form State
  const [studentName, setStudentName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [parentName, setParentName] = useState('');
  const [selectedClass, setSelectedClass] = useState<ClassName>('Play');
  const [paymentMode, setPaymentMode] = useState('Cash');
  const [receiptDate, setReceiptDate] = useState(() => {
    const today = new Date();
    return today.toISOString().slice(0, 10);
  });

  // Fee Items State
  const [feeItems, setFeeItems] = useState<FeeItem[]>(() => {
    const now = new Date();
    const acaIndex = (now.getMonth() - 3 + 12) % 12;
    return [
      {
        id: 1,
        month: MONTHS[acaIndex],
        particular: 'Tution Fee',
        amount: FEE_STRUCTURE['Play']?.monthly || 400,
        originalAmount: FEE_STRUCTURE['Play']?.monthly || 400,
        concessionNote: '',
      },
    ];
  });

  // Database & History State
  const [history, setHistory] = useState<ReceiptRecord[]>([]);
  const [nextReceiptNo, setNextReceiptNo] = useState<number>(1000);
  const [dbConnected, setDbConnected] = useState<boolean>(true);
  const [concessions, setConcessions] = useState<Record<string, ConcessionItem>>({});
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Helper student key for concessions
  const getStudentKey = useCallback(() => {
    const sid = studentId.trim().toLowerCase();
    const name = studentName.trim().toLowerCase();
    const key = sid || name;
    return `${selectedClass}||${key}`;
  }, [studentId, studentName, selectedClass]);

  // Load History and Next Receipt Number from Firestore
  const loadDataFromCloud = useCallback(async () => {
    try {
      const cloudReceipts = await fetchReceiptsFromFirestore();
      setHistory(cloudReceipts);

      const nextNo = await getNextReceiptNumberFromFirestore();
      setNextReceiptNo(nextNo);

      setDbConnected(true);
    } catch (err) {
      console.warn('Firestore fallback to local storage:', err);
      setDbConnected(false);

      // Local storage fallback
      const localHistory = JSON.parse(localStorage.getItem('receipt_history') || '[]');
      setHistory(localHistory);

      const localCounter = parseInt(localStorage.getItem('gplr_receipt_counter') || '1000', 10);
      setNextReceiptNo(localCounter);
    }
  }, []);

  // Load concessions for currently entered student
  const loadConcessions = useCallback(async () => {
    const key = getStudentKey();
    if (!studentId.trim() && !studentName.trim()) {
      setConcessions({});
      return;
    }
    try {
      const res = await fetchConcessionsFromFirestore(key);
      setConcessions(res);
    } catch (err) {
      const local = JSON.parse(localStorage.getItem('gplr_concessions') || '{}');
      setConcessions(local[key] || {});
    }
  }, [getStudentKey, studentId, studentName]);

  useEffect(() => {
    loadDataFromCloud();
  }, [loadDataFromCloud]);

  useEffect(() => {
    loadConcessions();
  }, [loadConcessions]);

  // Toast notice helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Save Concession
  const handleSaveConcession = async (particular: string, type: 'percent' | 'flat', value: number) => {
    const key = getStudentKey();
    try {
      await saveConcessionToFirestore(key, particular, type, value);
    } catch (err) {
      const local = JSON.parse(localStorage.getItem('gplr_concessions') || '{}');
      if (!local[key]) local[key] = {};
      local[key][particular] = { particular, type, value };
      localStorage.setItem('gplr_concessions', JSON.stringify(local));
    }
    await loadConcessions();
    showToast(`Concession saved for ${particular}`);
  };

  // Remove Concession
  const handleRemoveConcession = async (particular: string) => {
    const key = getStudentKey();
    try {
      await removeConcessionFromFirestore(key, particular);
    } catch (err) {
      const local = JSON.parse(localStorage.getItem('gplr_concessions') || '{}');
      if (local[key]) delete local[key][particular];
      localStorage.setItem('gplr_concessions', JSON.stringify(local));
    }
    await loadConcessions();
    showToast(`Concession removed for ${particular}`);
  };

  // Save & Issue Receipt
  const handleSaveAndIssue = async () => {
    if (!studentName.trim()) {
      alert('Please enter Student Name before issuing receipt.');
      return;
    }
    if (feeItems.length === 0) {
      alert('Please add at least one fee line item.');
      return;
    }

    setSaving(true);

    // Format date as DD-MM-YYYY
    const [y, m, d] = receiptDate.split('-');
    const formattedDate = `${d}-${m}-${y}`;

    const totalAmount = feeItems.reduce((sum, item) => sum + (Number(item.amount) || 0), 0);

    const newRecord: Omit<ReceiptRecord, 'id' | '_id'> = {
      date: formattedDate,
      studentId: studentId.trim(),
      student: studentName.trim(),
      parent: parentName.trim(),
      class: selectedClass,
      mode: paymentMode,
      total: totalAmount,
      items: feeItems.map((item) => ({
        month: item.month,
        particular: item.particular,
        amount: Number(item.amount) || 0,
        originalAmount: Number(item.originalAmount) || Number(item.amount) || 0,
        concessionNote: item.concessionNote || '',
      })),
    };

    try {
      const saved = await saveReceiptToFirestore(newRecord);
      showToast(`Receipt #${saved.receiptNo} saved permanently to Google Cloud Database!`);
    } catch (err) {
      // Local fallback
      const counter = parseInt(localStorage.getItem('gplr_receipt_counter') || '1000', 10);
      const localRec: ReceiptRecord = {
        ...newRecord,
        receiptNo: counter,
        id: `local-${Date.now()}`,
      };
      const updatedHistory = [localRec, ...history];
      localStorage.setItem('receipt_history', JSON.stringify(updatedHistory));
      localStorage.setItem('gplr_receipt_counter', String(counter + 1));
      showToast(`Saved receipt #${counter} locally in browser storage.`);
    } finally {
      setSaving(false);
      await loadDataFromCloud();
    }
  };

  // Print Receipt
  const handlePrint = () => {
    window.print();
  };

  // Delete Record
  const handleDeleteRecord = async (id: string) => {
    if (!confirm('Are you sure you want to delete this receipt record from the cloud ledger?')) {
      return;
    }
    try {
      await deleteReceiptFromFirestore(id);
      showToast('Receipt deleted successfully.');
    } catch (err) {
      const local = history.filter((h) => h.id !== id && h._id !== id);
      localStorage.setItem('receipt_history', JSON.stringify(local));
      showToast('Receipt removed from local history.');
    } finally {
      await loadDataFromCloud();
    }
  };

  // Load Record into Editor
  const handleLoadRecord = (record: ReceiptRecord) => {
    setStudentName(record.student || '');
    setStudentId(record.studentId || '');
    setParentName(record.parent || '');
    setSelectedClass((record.class as ClassName) || 'Play');
    setPaymentMode(record.mode || 'Cash');

    // Parse date DD-MM-YYYY to YYYY-MM-DD
    if (record.date && record.date.includes('-')) {
      const parts = record.date.split('-');
      if (parts.length === 3) {
        setReceiptDate(`${parts[2]}-${parts[1]}-${parts[0]}`);
      }
    }

    if (record.items && record.items.length > 0) {
      setFeeItems(
        record.items.map((item, idx) => ({
          ...item,
          id: Date.now() + idx,
        }))
      );
    }

    showToast(`Loaded receipt #${record.receiptNo} into editor.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Export to Excel
  const handleExportExcel = () => {
    if (history.length === 0) {
      alert('No receipt history available to export.');
      return;
    }

    const rows: any[] = [];
    history.forEach((rec) => {
      rec.items.forEach((item) => {
        rows.push({
          'Receipt No': rec.receiptNo || '',
          Date: rec.date,
          'Student ID': rec.studentId || '',
          'Student Name': rec.student,
          'Parent Name': rec.parent,
          Class: rec.class,
          Mode: rec.mode || 'Cash',
          Month: item.month,
          Particular: item.particular,
          'Original Amount (₹)': item.originalAmount ?? item.amount,
          'Concession Note': item.concessionNote || '',
          'Final Amount (₹)': item.amount,
        });
      });
    });

    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'GPLR_Fee_Ledger');
    XLSX.writeFile(wb, `GPLR_School_Fee_Ledger_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  // Import CSV / XLSX
  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isExcel = file.name.toLowerCase().endsWith('.xlsx');
    const reader = new FileReader();

    reader.onload = async (event) => {
      let rawRows: any[] = [];
      try {
        if (isExcel) {
          const wb = XLSX.read(event.target?.result, { type: 'binary' });
          const sheet = wb.Sheets[wb.SheetNames[0]];
          rawRows = XLSX.utils.sheet_to_json(sheet);
        } else {
          const parsed = Papa.parse(event.target?.result as string, { header: true, skipEmptyLines: true });
          rawRows = parsed.data;
        }

        // Group rows into receipts
        const grouped: Record<string, any> = {};
        rawRows.forEach((r) => {
          const rNo = r['Receipt No'] || '';
          const date = r['Date'] || '';
          const student = r['Student Name'] || r['Student'] || '';
          const cls = r['Class'] || '';
          const gKey = `${rNo}||${date}||${student}||${cls}`;

          if (!grouped[gKey]) {
            grouped[gKey] = {
              receiptNo: parseInt(rNo, 10) || undefined,
              date,
              studentId: r['Student ID'] || '',
              student,
              parent: r['Parent Name'] || '',
              class: cls,
              mode: r['Mode'] || 'Cash',
              items: [],
              total: 0,
            };
          }

          const amt = parseFloat(r['Final Amount (₹)'] || r['Amount'] || 0) || 0;
          grouped[gKey].items.push({
            month: r['Month'] || '',
            particular: r['Particular'] || '',
            amount: amt,
            originalAmount: parseFloat(r['Original Amount (₹)']) || amt,
            concessionNote: r['Concession Note'] || '',
          });
          grouped[gKey].total += amt;
        });

        const importedArray = Object.values(grouped);
        const res = await importReceiptsToFirestore(importedArray);
        showToast(`Imported ${res.added} receipts to Google Cloud Database (${res.skipped} duplicates skipped).`);
        await loadDataFromCloud();
      } catch (err) {
        alert('Could not parse file. Ensure it is a valid .csv or .xlsx exported from this system.');
      }
      e.target.value = '';
    };

    if (isExcel) {
      reader.readAsBinaryString(file);
    } else {
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 p-3 md:p-8 font-sans transition-colors">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Masthead Header */}
        <Header 
          dbConnected={dbConnected} 
          totalReceiptsCount={history.length} 
        />

        {/* Database Status Panel */}
        <DatabaseStatus
          dbConnected={dbConnected}
          nextReceiptNo={nextReceiptNo}
          totalReceipts={history.length}
          onRefresh={loadDataFromCloud}
        />

        {/* Controls Card */}
        <div className="no-print bg-white rounded-2xl p-5 md:p-7 border border-slate-200 shadow-sm">
          
          {/* Section Heading */}
          <div className="flex items-center justify-between pb-3 mb-5 border-b border-slate-200">
            <h2 className="font-display font-bold text-slate-900 text-lg md:text-xl flex items-center gap-2">
              <span>Receipt Generation Controls</span>
              <span className="text-xs font-sans font-normal bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full border border-indigo-100">
                GPLR School Form
              </span>
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              Next Receipt: #{nextReceiptNo}
            </span>
          </div>

          {/* Student Info Form */}
          <StudentForm
            studentName={studentName}
            setStudentName={setStudentName}
            studentId={studentId}
            setStudentId={setStudentId}
            parentName={parentName}
            setParentName={setParentName}
            selectedClass={selectedClass}
            setSelectedClass={setSelectedClass}
            paymentMode={paymentMode}
            setPaymentMode={setPaymentMode}
            receiptDate={receiptDate}
            setReceiptDate={setReceiptDate}
          />

          {/* Outstanding Fee Due Panel */}
          <DuePanel
            selectedClass={selectedClass}
            studentName={studentName}
            studentId={studentId}
            history={history}
          />

          {/* Permanent Concession Panel */}
          <ConcessionPanel
            studentName={studentName}
            studentId={studentId}
            selectedClass={selectedClass}
            concessions={concessions}
            onSaveConcession={handleSaveConcession}
            onRemoveConcession={handleRemoveConcession}
            onItemChange={loadConcessions}
          />

          {/* Fee Item Selector */}
          <FeeSelector
            selectedClass={selectedClass}
            feeItems={feeItems}
            setFeeItems={setFeeItems}
            concessions={concessions}
          />

          {/* Primary Action Buttons */}
          <div className="mt-8 pt-5 border-t border-slate-200 flex flex-wrap gap-3 items-center justify-between">
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={handleSaveAndIssue}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-2.5 bg-indigo-900 hover:bg-indigo-950 text-white font-bold rounded-xl text-sm transition-all shadow-sm active:scale-95 disabled:opacity-50"
              >
                <Save className="w-4 h-4 text-amber-400" />
                <span>{saving ? 'Saving to Cloud...' : '💾 Save to Cloud & Issue'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-800 font-bold rounded-xl text-sm transition-all border-2 border-slate-800 active:scale-95 shadow-2xs"
              >
                <Printer className="w-4 h-4 text-slate-700" />
                <span>🖨️ Print Receipt</span>
              </button>

              <button
                onClick={handleExportExcel}
                className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-sm transition-all active:scale-95 shadow-2xs"
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>📊 Export Excel</span>
              </button>
            </div>

            <p className="text-xs text-slate-400">
              ⚡ Receipts save directly to Google Cloud Firestore database with instant sync.
            </p>
          </div>
        </div>

        {/* Printable Receipt Preview */}
        <div className="no-print text-center pt-2">
          <span className="text-xs uppercase tracking-wider font-bold text-slate-400 bg-slate-200/70 px-3 py-1 rounded-full border border-slate-300">
            Official Receipt Live Preview
          </span>
        </div>

        <ReceiptPreview
          receiptNo={`${nextReceiptNo} (preview)`}
          studentId={studentId}
          studentName={studentName}
          parentName={parentName}
          selectedClass={selectedClass}
          paymentMode={paymentMode}
          receiptDate={receiptDate}
          feeItems={feeItems}
        />

        {/* Saved Receipts History */}
        <HistoryTable
          history={history}
          onLoadRecord={handleLoadRecord}
          onDeleteRecord={handleDeleteRecord}
          onExportExcel={handleExportExcel}
          onImportFile={handleImportFile}
          dbConnected={dbConnected}
        />

        {/* Footer with Social Links, Privacy Policy & Developer Credit */}
        <Footer onOpenPrivacyPolicy={() => setIsPrivacyOpen(true)} />

        {/* Privacy Policy Modal */}
        <PrivacyPolicyModal
          isOpen={isPrivacyOpen}
          onClose={() => setIsPrivacyOpen(false)}
        />
      </div>
    </div>
  );
}
