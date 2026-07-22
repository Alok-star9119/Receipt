import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  addDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  runTransaction,
  serverTimestamp 
} from 'firebase/firestore';
import firebaseConfigData from '../firebase-applet-config.json';

const firebaseConfig = {
  apiKey: firebaseConfigData.apiKey,
  authDomain: firebaseConfigData.authDomain,
  projectId: firebaseConfigData.projectId,
  storageBucket: firebaseConfigData.storageBucket,
  messagingSenderId: firebaseConfigData.messagingSenderId,
  appId: firebaseConfigData.appId
};

// Initialize Firebase App
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore with specific database ID if provided, or default
const databaseId = firebaseConfigData.firestoreDatabaseId && firebaseConfigData.firestoreDatabaseId !== '(default)'
  ? firebaseConfigData.firestoreDatabaseId
  : undefined;

export const db = databaseId ? getFirestore(app, databaseId) : getFirestore(app);

export interface FeeItem {
  id?: number;
  month: string;
  particular: string;
  amount: number;
  originalAmount?: number;
  concessionNote?: string;
}

export interface ReceiptRecord {
  id?: string;
  _id?: string;
  receiptNo?: number;
  date: string;
  studentId?: string;
  student: string;
  parent: string;
  class: string;
  mode: string;
  total: number;
  items: FeeItem[];
  createdAt?: string;
}

export interface ConcessionItem {
  particular: string;
  type: 'percent' | 'flat';
  value: number;
}

// Service methods for Cloud Firestore

export async function fetchReceiptsFromFirestore(): Promise<ReceiptRecord[]> {
  try {
    const receiptsCol = collection(db, 'receipts');
    const q = query(receiptsCol, orderBy('receiptNo', 'desc'));
    const snapshot = await getDocs(q);
    
    const receipts: ReceiptRecord[] = [];
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      receipts.push({
        id: docSnap.id,
        _id: docSnap.id,
        receiptNo: data.receiptNo,
        date: data.date,
        studentId: data.studentId || '',
        student: data.student || '',
        parent: data.parent || '',
        class: data.class || '',
        mode: data.mode || 'Cash',
        total: data.total || 0,
        items: data.items || [],
        createdAt: data.createdAt
      });
    });
    return receipts;
  } catch (error) {
    console.error('Error fetching receipts from Firestore:', error);
    throw error;
  }
}

export async function getNextReceiptNumberFromFirestore(): Promise<number> {
  const counterRef = doc(db, 'counters', 'receiptCounter');
  try {
    const counterSnap = await getDoc(counterRef);
    if (counterSnap.exists()) {
      return counterSnap.data().nextReceiptNo || 1000;
    } else {
      return 1000;
    }
  } catch (error) {
    console.error('Error getting next receipt number:', error);
    return 1000;
  }
}

export async function saveReceiptToFirestore(record: Omit<ReceiptRecord, 'id' | '_id'>): Promise<ReceiptRecord> {
  const counterRef = doc(db, 'counters', 'receiptCounter');
  
  return await runTransaction(db, async (transaction) => {
    const counterSnap = await transaction.get(counterRef);
    let nextNo = 1000;
    if (counterSnap.exists()) {
      nextNo = counterSnap.data().nextReceiptNo || 1000;
    }

    const newReceiptRef = doc(collection(db, 'receipts'));
    const receiptToSave = {
      ...record,
      receiptNo: nextNo,
      createdAt: new Date().toISOString()
    };

    transaction.set(newReceiptRef, receiptToSave);
    transaction.set(counterRef, { nextReceiptNo: nextNo + 1 }, { merge: true });

    return {
      id: newReceiptRef.id,
      _id: newReceiptRef.id,
      ...receiptToSave
    };
  });
}

export async function deleteReceiptFromFirestore(id: string): Promise<void> {
  const docRef = doc(db, 'receipts', id);
  await deleteDoc(docRef);
}

export async function fetchConcessionsFromFirestore(studentKey: string): Promise<Record<string, ConcessionItem>> {
  if (!studentKey) return {};
  try {
    const concessionsCol = collection(db, 'concessions');
    const q = query(concessionsCol, where('studentKey', '==', studentKey));
    const snapshot = await getDocs(q);
    
    const result: Record<string, ConcessionItem> = {};
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.particular) {
        result[data.particular] = {
          particular: data.particular,
          type: data.type || 'percent',
          value: Number(data.value) || 0
        };
      }
    });
    return result;
  } catch (error) {
    console.error('Error fetching concessions from Firestore:', error);
    return {};
  }
}

export async function saveConcessionToFirestore(
  studentKey: string, 
  particular: string, 
  type: 'percent' | 'flat', 
  value: number
): Promise<void> {
  const docId = `${studentKey}_${particular}`.replace(/[\/\s]/g, '_');
  const docRef = doc(db, 'concessions', docId);
  await setDoc(docRef, {
    studentKey,
    particular,
    type,
    value,
    updatedAt: new Date().toISOString()
  });
}

export async function removeConcessionFromFirestore(studentKey: string, particular: string): Promise<void> {
  const docId = `${studentKey}_${particular}`.replace(/[\/\s]/g, '_');
  const docRef = doc(db, 'concessions', docId);
  await deleteDoc(docRef);
}

export async function importReceiptsToFirestore(importedReceipts: any[]): Promise<{ added: number; skipped: number }> {
  let added = 0;
  let skipped = 0;
  
  const existingReceipts = await fetchReceiptsFromFirestore();
  const existingNos = new Set(existingReceipts.map(r => r.receiptNo));
  
  let maxNo = existingReceipts.reduce((max, r) => Math.max(max, r.receiptNo || 0), 999);

  for (const rec of importedReceipts) {
    if (rec.receiptNo && existingNos.has(rec.receiptNo)) {
      skipped++;
      continue;
    }

    const assignedNo = rec.receiptNo || (maxNo + 1);
    if (assignedNo > maxNo) maxNo = assignedNo;

    const newDocRef = doc(collection(db, 'receipts'));
    await setDoc(newDocRef, {
      ...rec,
      receiptNo: assignedNo,
      createdAt: new Date().toISOString()
    });
    added++;
  }

  // Update counter
  const counterRef = doc(db, 'counters', 'receiptCounter');
  await setDoc(counterRef, { nextReceiptNo: maxNo + 1 }, { merge: true });

  return { added, skipped };
}
