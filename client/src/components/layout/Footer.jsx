import React from "react";
import { profile } from "../../data/profile";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-cyan-400/20 bg-slate-950/80 py-8 text-center text-sm text-slate-400">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-neutral-400">
          © {year} {profile.name}. All rights reserved.
        </p>

        <div className="flex items-center gap-6">
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-300 transition text-xs font-mono uppercase tracking-wider"
          >
            LinkedIn
          </a>
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-cyan-300 transition text-xs font-mono uppercase tracking-wider"
          >
            GitHub
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-cyan-300 transition text-xs font-mono uppercase tracking-wider"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
