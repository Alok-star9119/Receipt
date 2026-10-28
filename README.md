# 🧾 Alok Mishra Public School - Fee Receipt & Ledger System

A modern, responsive web application designed for **Alok Mishra Public School (Shahpur Itai, Utraula, Balrampur)** to streamline student fee calculation, concession tracking, pending due management, real-time Cloud Firestore synchronization, and instant print-ready receipt generation.

---

## ✨ Features

- **🎓 Comprehensive Fee Structure Management**: Automatically calculates tuition, computer fees, exam fees, books, notebooks, and transport charges categorized by class grades (Play/Nursery to Class 10th).
- **💳 Payment & Due Tracking**: Supports multiple payment modes (Cash, GPay, PhonePe, BHIM Pay, UPI, Net Banking, Cheque) with real-time due tracking against academic months (Apr–Mar).
- **🎁 Concessions & Scholarships**: Flexible permanent fee concessions (percentage or flat discounts) linked per student and class.
- **⚡ Real-Time Cloud Firestore Sync**: Powered by Google Cloud Firestore database (`hip-region-qxfb9`) with seamless local storage fallback.
- **🖨️ Printable & Exportable Receipts**: Styled specifically for A4 portrait printing, receipt reloading into editor, and bulk data export/import (Excel XLSX & CSV).
- **📜 Transaction History & Filtering**: Searchable transaction ledger with receipt auto-increment numbering.
- **🎨 Modern Responsive UI**: Built with React 19, Tailwind CSS v4, Lucide Icons, and Motion for fluid interactions.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool / Runtime**: [Vite](https://vitejs.dev/) & [Bun](https://bun.sh/) / Node.js
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Motion](https://motion.dev/)
- **Cloud Database**: [Google Cloud Firestore (Firebase v12)](https://firebase.google.com/docs/firestore)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Export & Parsing**: [SheetJS (XLSX)](https://sheetjs.com/) & [PapaParse](https://www.papaparse.com/)

---

## 📂 Project Structure

```text
Receipt-main/
├── src/
│   ├── components/
│   │   ├── ConcessionPanel.tsx    # Permanent student discount settings component
│   │   ├── DatabaseStatus.tsx     # Firestore connectivity & stats bar
│   │   ├── DuePanel.tsx            # Outstanding fee due calculator component
│   │   ├── FeeSelector.tsx         # Class-wise fee structure dynamic selector
│   │   ├── Footer.tsx              # App footer with legal modals & developer credits
│   │   ├── Header.tsx              # School masthead & database indicator
│   │   ├── HistoryTable.tsx        # Searchable transaction ledger & data import/export
│   │   ├── PrivacyPolicyModal.tsx  # Data protection policy overlay modal
│   │   ├── ReceiptPreview.tsx      # Printable receipt preview layout
│   │   └── StudentForm.tsx         # Primary student detail input form
│   ├── data/
│   │   └── feeStructure.ts         # Pre-configured class-wise fee schedules & utilities
│   ├── App.tsx                     # Main application layout & application state hub
│   ├── firebase.ts                 # Firebase Cloud Firestore setup & service methods
│   ├── main.tsx                    # React application entry point
│   ├── types.ts                    # TypeScript interface definitions
│   └── index.css                   # Global styles & A4 print media rules
├── firebase-applet-config.json     # Firebase app credentials & Database ID
├── firebase-blueprint.json        # Database entity schemas & descriptions
├── firestore.rules                 # Cloud Firestore security rules
├── package.json                    # Project metadata & npm dependencies
├── vite.config.ts                  # Vite build tool configuration
└── README.md                       # Documentation
```
