import React, { useState, useEffect } from 'react';
import Dashboard from './Dashboard';
import AdminLogin from './AdminLogin';
import Button from '../components/common/Button';
import authService from '../services/authService';
import { LogOut, UserCheck, Shield } from 'lucide-react';

export default function AdminLayout({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => authService.isAuthenticated());
  const [adminUser, setAdminUser] = useState(() => authService.getCurrentUser());

  // Verify session whenever modal opens
  useEffect(() => {
    if (isOpen) {
      const hasToken = authService.isAuthenticated();
      setIsAuthenticated(hasToken);
      if (hasToken) {
        setAdminUser(authService.getCurrentUser());
        authService.verifySession().then((user) => {
          if (user) {
            setAdminUser(user);
          } else {
            setIsAuthenticated(false);
            setAdminUser(null);
          }
        });
      }
    }
  }, [isOpen]);

  const handleLoginSuccess = (user) => {
    setIsAuthenticated(true);
    setAdminUser(user);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  if (!isOpen) return null;

  // If user is not authenticated, show the Cyber Security Login screen
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/95 backdrop-blur-2xl text-slate-100 flex flex-col justify-center items-center p-4">
        <AdminLogin
          onSuccess={handleLoginSuccess}
          onClose={onClose}
        />
      </div>
    );
  }

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
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-300">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Logged in: <strong className="text-white font-semibold">{adminUser?.username || 'admin'}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-500/30 text-red-300 hover:bg-red-500/10 text-xs font-mono transition cursor-pointer"
            title="Log out of admin session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>

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
        Portfolio Management Console • Authenticated as {adminUser?.username || 'admin'} ({adminUser?.role || 'administrator'})
      </footer>
    </div>
  );
}

