import React from 'react';
import { 
  Heart, 
  Shield, 
  FileText, 
  ExternalLink, 
  HelpCircle, 
  GraduationCap,
  Globe
} from 'lucide-react';
import { LOGO_URL } from '../data/feeStructure';

interface FooterProps {
  onOpenPrivacyPolicy: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacyPolicy }) => {
  return (
    <footer className="no-print mt-12 bg-slate-900 text-slate-300 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      {/* Top Banner section */}
      <div className="p-6 md:p-8 border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* School Brand & Details */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                alt="GPLR School Logo"
                className="w-10 h-10 rounded-full object-contain border border-amber-500/50 bg-white/10 p-0.5"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <h2 className="font-display font-bold text-amber-100 text-base md:text-lg">
                  Gaya Prasad Lokai Ram School
                </h2>
                <p className="text-xs text-amber-300/70 font-medium">
                  Shahpur Itai, Utraula, Balrampur - 271609
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Official institutional fee ledger and receipt issuance software integrated directly with Google Cloud Firestore database backend for security and multi-year auditing.
            </p>
          </div>

          {/* Social Media Links Section */}
          <div className="md:col-span-4 space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" /> Social Media &amp; Connect
            </h3>
            <div className="flex flex-wrap gap-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-indigo-600 text-xs text-slate-200 hover:text-white transition-all border border-slate-700/60 hover:border-indigo-500"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <span>Facebook</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-pink-600 text-xs text-slate-200 hover:text-white transition-all border border-slate-700/60 hover:border-pink-500"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                <span>Instagram</span>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 hover:text-white transition-all border border-slate-700/60"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                <span>Twitter / X</span>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-red-600 text-xs text-slate-200 hover:text-white transition-all border border-slate-700/60 hover:border-red-500"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                <span>YouTube</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-blue-600 text-xs text-slate-200 hover:text-white transition-all border border-slate-700/60 hover:border-blue-500"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Policies & Legal Links */}
          <div className="md:col-span-3 space-y-2.5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" /> Policy &amp; Info Pages
            </h3>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={onOpenPrivacyPolicy}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors group"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
                  <span>Privacy Policy &amp; Data Security</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenPrivacyPolicy}
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors group"
                >
                  <Shield className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
                  <span>Terms of Service &amp; Compliance</span>
                </button>
              </li>
              <li>
                <a
                  href="#due-panel"
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors group"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
                  <span>Fee Structure Breakdown (2026-27)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Built with love by Alok Kumar Mishra */}
      <div className="px-6 py-4 bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
        <p>
          &copy; {new Date().getFullYear()} Gaya Prasad Lokai Ram School. All Rights Reserved.
        </p>

        {/* Developer Credit Requirement: Built with love(symbol) by Alok Kumar Mishra */}
        <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-1.5 rounded-full border border-slate-800 shadow-inner">
          <span className="text-slate-300 font-medium">Built with</span>
          <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
          <span className="text-slate-300 font-medium">by</span>
          <span className="font-semibold text-amber-300 tracking-wide hover:text-amber-200 transition-colors">
            Alok Kumar Mishra
          </span>
        </div>
      </div>
    </footer>
  );
};
