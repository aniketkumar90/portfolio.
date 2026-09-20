import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Button from '../components/common/Button';

export default function AdminLayout({ isOpen, onClose }) {
  const [activeSection, setActiveSection] = useState('projects');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/90 backdrop-blur-2xl text-slate-100 flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-6 py-4 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-base font-black tracking-widest uppercase font-mono text-cyan-400">
              CYBER_ADMIN // v2.0
            </span>
          </div>
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            | Authenticated Session
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            className="text-xs !py-1.5 !px-3"
          >
            ✕ Exit Admin
          </Button>
        </div>
      </header>

      {/* Main Admin Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 md:p-8">
        <Dashboard onClose={onClose} />
      </main>

      {/* Admin Status Footer */}
      <footer className="border-t border-white/5 bg-slate-950/60 px-6 py-3 text-center text-xs text-slate-500 font-mono">
        Portfolio Management Console • Connected to REST Services & Mongo Seed Fallback
      </footer>
    </div>
  );
}
