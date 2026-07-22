export interface FeeItem {
  id: number;
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
  date: string; // DD-MM-YYYY or YYYY-MM-DD
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

export type ClassName = 'Play' | 'Nur' | 'LKG' | 'UKG' | '1st' | '2nd' | '3rd' | '4th' | '5th' | '6th' | '7th' | '8th' | '9th' | '10th';

export interface ClassFees {
  registration: number;
  monthly: number;
  books: number;
  examFee: number;
  computerFee: number;
  notebooks: number;
  stationary: number;
  diary: number;
  idCard: number;
  practical: number;
}
