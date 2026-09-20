import React, { useEffect, useState } from "react";

const links = [
  ["Home", "#home"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Skills", "#skills"],
  ["Education", "#education"],
  ["Certifications", "#certifications"],
  ["Dev Tools", "#creative-tools"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

export function Navbar({ onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/90 backdrop-blur-md border-b border-cyan-300/35 shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
          : "bg-slate-950/80 backdrop-blur-md border-b border-cyan-300/25 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
      }`}
    >
      <nav className="w-full px-6 md:px-10 py-4 flex items-center justify-between">
        <a
          href="#home"
          className="font-bold text-lg tracking-widest text-white hover:text-cyan-300 transition"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Aniket
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-5 text-base text-slate-100 items-center">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-cyan-200 transition font-medium">
              {label}
            </a>
          ))}
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-purple-400/40 text-purple-300 hover:bg-purple-600/20 hover:text-white transition cursor-pointer"
            >
              Admin
            </button>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          {onOpenAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-xs font-mono px-2.5 py-1 rounded-full border border-purple-400/40 text-purple-300"
            >
              Admin
            </button>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-white/80 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`h-0.5 w-full bg-white transition ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
              <span className={`h-0.5 w-full bg-white transition ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-full bg-white transition ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-cyan-300/30 px-6 py-4 flex flex-col gap-3">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-slate-200 hover:text-cyan-300 py-1 transition"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

export default Navbar;
