import { ClassName, ClassFees } from '../types';

export const FEE_STRUCTURE: Record<ClassName, ClassFees> = {
  Play: { registration: 1000, monthly: 400, books: 1310, examFee: 300, computerFee: 0, notebooks: 80, stationary: 0, diary: 200, idCard: 100, practical: 0 },
  Nur: { registration: 1000, monthly: 400, books: 1760, examFee: 300, computerFee: 0, notebooks: 80, stationary: 0, diary: 200, idCard: 100, practical: 0 },
  LKG: { registration: 1000, monthly: 450, books: 2050, examFee: 300, computerFee: 0, notebooks: 80, stationary: 0, diary: 200, idCard: 100, practical: 0 },
  UKG: { registration: 1000, monthly: 500, books: 2270, examFee: 300, computerFee: 0, notebooks: 80, stationary: 0, diary: 200, idCard: 100, practical: 0 },
  '1st': { registration: 1200, monthly: 600, books: 2715, examFee: 300, computerFee: 200, notebooks: 345, stationary: 0, diary: 200, idCard: 100, practical: 0 },
  '2nd': { registration: 1200, monthly: 600, books: 2880, examFee: 300, computerFee: 200, notebooks: 345, stationary: 0, diary: 200, idCard: 100, practical: 0 },
  '3rd': { registration: 1200, monthly: 600, books: 3015, examFee: 300, computerFee: 200, notebooks: 345, stationary: 0, diary: 200, idCard: 100, practical: 0 },
  '4th': { registration: 1500, monthly: 650, books: 3260, examFee: 300, computerFee: 200, notebooks: 435, stationary: 0, diary: 200, idCard: 100, practical: 0 },
  '5th': { registration: 1500, monthly: 650, books: 3430, examFee: 300, computerFee: 250, notebooks: 435, stationary: 0, diary: 200, idCard: 100, practical: 0 },
  '6th': { registration: 1500, monthly: 700, books: 4030, examFee: 300, computerFee: 250, notebooks: 435, stationary: 0, diary: 200, idCard: 100, practical: 0 },
  '7th': { registration: 1500, monthly: 700, books: 4245, examFee: 400, computerFee: 250, notebooks: 435, stationary: 0, diary: 200, idCard: 100, practical: 0 },
  '8th': { registration: 1500, monthly: 700, books: 4390, examFee: 400, computerFee: 250, notebooks: 435, stationary: 0, diary: 200, idCard: 100, practical: 0 },
  '9th': { registration: 1500, monthly: 900, books: 1831, examFee: 600, computerFee: 700, notebooks: 540, stationary: 0, diary: 200, idCard: 100, practical: 1000 },
  '10th': { registration: 1500, monthly: 900, books: 1831, examFee: 600, computerFee: 700, notebooks: 540, stationary: 0, diary: 200, idCard: 100, practical: 1000 },
};

export const ITEM_TO_FEE_KEY: Record<string, keyof ClassFees> = {
  'Tution Fee': 'monthly',
  'Books Amount': 'books',
  'Computer Fee': 'computerFee',
  'Exam Fee': 'examFee',
  'Notebooks': 'notebooks',
  'Stationary': 'stationary',
  'Diary & Tie Belt': 'diary',
  'ID Card': 'idCard',
  'Practical Exam': 'practical',
  'Registration Fee': 'registration',
};

export const MONTHS = ['APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR'];

export const LOGO_URL = "https://scontent.flko13-2.fna.fbcdn.net/v/t39.30808-6/405206088_122115447710094198_8636370551815732762_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=bwycSK0QIPsQ7kNvwELN8Oe&_nc_oc=AdrqQ1PE4fmBrOcjNk8KSALxMz_kirJcQewh8H6zATvajXKqHSYgWuPhvskQPlVQvRQoREySKVpnN6XzzxImOrQc&_nc_zt=23&_nc_ht=scontent.flko13-2.fna&_nc_gid=UEh7gdAyvh4ySHWDblBGYg&oh=00_Af0p6OHcOaJHLhYR9TOTXblXxMIZGWMhqE7GfUxfEbtEuA&oe=69F0E788";

export function numberToWords(num: number): string {
  const a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
  const b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const numStr = Math.floor(num).toString();
  if (numStr.length > 9) return 'overflow';
  const n = ('000000000' + numStr).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';
  let str = '';
  str += (Number(n[1]) !== 0) ? (a[Number(n[1])] || b[Number(n[1][0])] + ' ' + a[Number(n[1][1])]) + 'crore ' : '';
  str += (Number(n[2]) !== 0) ? (a[Number(n[2])] || b[Number(n[2][0])] + ' ' + a[Number(n[2][1])]) + 'lakh ' : '';
  str += (Number(n[3]) !== 0) ? (a[Number(n[3])] || b[Number(n[3][0])] + ' ' + a[Number(n[3][1])]) + 'thousand ' : '';
  str += (Number(n[4]) !== 0) ? (a[Number(n[4])] || b[Number(n[4][0])] + ' ' + a[Number(n[4][1])]) + 'hundred ' : '';
  str += (Number(n[5]) !== 0) ? ((str !== '') ? 'and ' : '') + (a[Number(n[5])] || b[Number(n[5][0])] + ' ' + a[Number(n[5][1])]) : '';
  return str.trim();
}
