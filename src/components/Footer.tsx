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
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V7.3c0-3.007 1.792-4.67 4.533-4.67 1.314 0 2.686.235 2.686.235v2.952h-1.513c-1.491 0-1.953.925-1.953 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073Z"/></svg>
                <span>Facebook</span>
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-pink-600 text-xs text-slate-200 hover:text-white transition-all border border-slate-700/60 hover:border-pink-500"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.011 3.584-.069 4.849-.148 3.228-1.667 4.771-4.919 4.919-1.266.058-1.646.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.252-.148-4.771-1.691-4.919-4.919C2.234 15.747 2.223 15.367 2.223 12c0-3.205.011-3.584.069-4.849.148-3.228 1.667-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163zm0 1.8c-3.15 0-3.513.013-4.748.068-2.407.109-3.4 1.103-3.509 3.509-.055 1.236-.068 1.598-.068 4.748s.013 3.513.068 4.748c.109 2.406 1.102 3.4 3.509 3.509 1.235.055 1.598.068 4.748.068s3.513-.013 4.748-.068c2.406-.109 3.4-1.103 3.509-3.509.055-1.235.068-1.598.068-4.748s-.013-3.513-.068-4.748c-.109-2.406-1.103-3.4-3.509-3.509C15.513 3.975 15.15 3.963 12 3.963zm0 3.091A5.846 5.846 0 1 1 12 18.7a5.846 5.846 0 0 1 0-11.646zm0 1.8A4.046 4.046 0 1 0 12 16.146a4.046 4.046 0 0 0 0-8.092zm6.122-3.294a1.363 1.363 0 1 1-2.726 0 1.363 1.363 0 0 1 2.726 0z"/></svg>
                <span>Instagram</span>
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-200 hover:text-white transition-all border border-slate-700/60"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.71 6.442L18.244 2.25Zm-1.163 17.04h1.83L7.17 3.64H5.23l11.85 15.65Z"/></svg>
                <span>Twitter / X</span>
              </a>

              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-red-600 text-xs text-slate-200 hover:text-white transition-all border border-slate-700/60 hover:border-red-500"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.056 0 12 0 12s0 3.944.502 5.814a3.016 3.016 0 0 0 2.121 2.136C4.495 20.455 12 20.455 12 20.455s7.505 0 9.377-.505a3.016 3.016 0 0 0 2.122-2.136C24 15.944 24 12 24 12s0-3.944-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"/></svg>
                <span>YouTube</span>
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-blue-600 text-xs text-slate-200 hover:text-white transition-all border border-slate-700/60 hover:border-blue-500"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 10.268h-3v-4.5c0-1.074-.02-2.45-1.492-2.45-1.492 0-1.72 1.164-1.72 2.365v4.585h-3v-9h2.881v1.233h.041c.402-.762 1.387-1.565 2.857-1.565 3.058 0 3.621 2.01 3.621 4.622v4.71z"/></svg>
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
