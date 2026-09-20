import React, { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ProjectsPage from './pages/Projects';
import AboutPage from './pages/About';
import BlogsPage from './pages/Blogs';
import ContactPage from './pages/Contact';
import AdminLayout from './admin/AdminLayout';

export default function App() {
  const [adminOpen, setAdminOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Listen to hash changes if someone navigates directly to a page route
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#/admin') {
        setAdminOpen(true);
      } else if (hash === '#/projects-view') {
        setCurrentPage('projects');
      } else if (hash === '#/about-view') {
        setCurrentPage('about');
      } else if (hash === '#/blogs-view') {
        setCurrentPage('blogs');
      } else if (hash === '#/contact-view') {
        setCurrentPage('contact');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('hashchange', handleHash);
    handleHash();
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      <Layout onOpenAdmin={() => setAdminOpen(true)}>
        {currentPage === 'home' && <Home />}
        {currentPage === 'projects' && <ProjectsPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'blogs' && <BlogsPage />}
        {currentPage === 'contact' && <ContactPage />}
      </Layout>

      {/* Admin Panel Modal Overlay */}
      <AdminLayout
        isOpen={adminOpen}
        onClose={() => {
          setAdminOpen(false);
          if (window.location.hash === '#/admin') {
            window.location.hash = '#home';
          }
        }}
      />

      {/* Floating Quick Admin Toggle (bottom-right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setAdminOpen(true)}
          title="Open Admin Dashboard"
          className="group flex items-center gap-2 px-3 py-2 rounded-full bg-slate-900/90 border border-purple-500/40 text-purple-300 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:bg-purple-600/20 hover:border-purple-400 transition-all duration-300 text-xs font-mono"
        >
          <span className="h-2 w-2 rounded-full bg-purple-400 group-hover:animate-ping" />
          <span className="hidden sm:inline">ADMIN</span>
          <svg className="w-3.5 h-3.5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
