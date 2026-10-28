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
                alt="Alok Mishra Public School Logo"
                className="w-10 h-10 rounded-full object-contain border border-amber-500/50 bg-white/10 p-0.5"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <h2 className="font-display font-bold text-amber-100 text-base md:text-lg">
                  Alok Mishra Public School
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
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V7.4c0-3.01 1.793-4.678 4.533-4.678 1.314 0 2.686.236 2.686.236v2.951H15.83c-1.49 0-1.953.924-1.953 1.868v2.242h3.329l-.532 3.47h-2.797v8.385C19.612 23.027 24 18.063 24 12.073z" /></svg>
                <span>Facebook</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-pink-600 text-xs text-slate-200 hover:text-white transition-all border border-slate-700/60 hover:border-pink-500"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.07 4.85-.148 3.228-1.667 4.771-4.919 4.919-1.266.058-1.645.07-4.85.07-3.204 0-3.584-.012-4.85-.07-3.252-.148-4.771-1.691-4.919-4.919C2.175 15.584 2.163 15.205 2.163 12c0-3.205.012-3.584.07-4.85.148-3.228 1.667-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.9c-3.171 0-3.542.013-4.785.07-2.742.125-3.778 1.157-3.903 3.903-.057 1.243-.07 1.614-.07 4.785s.013 3.542.07 4.785c.125 2.746 1.161 3.778 3.903 3.903 1.243.057 1.614.07 4.785.07s3.542-.013 4.785-.07c2.742-.125 3.778-1.157 3.903-3.903.057-1.243.07-1.614.07-4.785s-.013-3.542-.07-4.785c-.125-2.746-1.161-3.778-3.903-3.903C15.542 4.076 15.171 4.063 12 4.063zm0 3.243A4.694 4.694 0 1 1 7.306 12 4.694 4.694 0 0 1 12 7.306zm0 1.9A2.794 2.794 0 1 0 14.794 12 2.794 2.794 0 0 0 12 9.206zm4.857-3.06a1.088 1.088 0 1 1-1.088 1.088 1.088 1.088 0 0 1 1.088-1.088z" /></svg>
                <span>Instagram</span>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 hover:text-white transition-all border border-slate-700/60"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.71 6.829 5.454-6.829zm-2.445 17.53h1.832L7.785 4.096H5.917l9.882 15.684z" /></svg>
                <span>Twitter / X</span>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-red-600 text-xs text-slate-200 hover:text-white transition-all border border-slate-700/60 hover:border-red-500"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.016 3.016 0 0 0 2.501 6.186C2.005 8.235 2 12 2 12s.005 3.765.501 5.814a3.016 3.016 0 0 0 2.122 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.016 3.016 0 0 0 2.122-2.136C21.995 15.765 22 12 22 12s-.005-3.765-.502-5.814zM10 15.545V8.455L16 12l-6 3.545z" /></svg>
                <span>YouTube</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-blue-600 text-xs text-slate-200 hover:text-white transition-all border border-slate-700/60 hover:border-blue-500"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.268h-3v-4.5c0-1.071-.021-2.451-1.493-2.451-1.494 0-1.723 1.165-1.723 2.366v4.585h-3v-9h2.882v1.233h.041c.402-.762 1.385-1.563 2.853-1.563 3.054 0 3.613 2.008 3.613 4.618v5.712z" /></svg>
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
          &copy; {new Date().getFullYear()} Alok Mishra Public School. All Rights Reserved.
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
