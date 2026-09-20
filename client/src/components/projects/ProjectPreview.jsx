import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Globe, Power } from "lucide-react";

export function ProjectPreview({ project, isCardHovered = false, isLaptopHovered = false, isMobile = false }) {
  const [internalHover, setInternalHover] = useState(false);
  const targetLink = project?.link || project?.websiteUrl || "#";
  const urlDisplay = targetLink.replace(/^https?:\/\//, "").replace(/\/$/, "");

  // Resolve correct image URL seamlessly
  const resolveImage = (p) => {
    if (p?.image) return p.image;
    const title = (p?.title || "").toLowerCase();
    if (title.includes("jewel") || title.includes("shiv")) return "/projects/new-shiv-jewellers.png";
    if (title.includes("real") || title.includes("estate")) return "/projects/real-estate.png";
    if (title.includes("relay") || title.includes("mart") || title.includes("commerce")) return "/projects/relaymart.png";
    return p?.heroImage || p?.images?.[0] || "/projects/new-shiv-jewellers.png";
  };

  const currentImage = resolveImage(project);

  const handleOpenLive = (e) => {
    e.stopPropagation();
    if (targetLink && targetLink !== "#") {
      window.open(targetLink, "_blank", "noopener,noreferrer");
    }
  };

  // On phone view, screen and image are automatically active without hover
  const isActive = isMobile || isCardHovered;
  // Show "View Live Project" overlay on desktop hover
  const showLiveButton = !isMobile && (isLaptopHovered || internalHover);

  return (
    <div
      className="absolute overflow-hidden rounded-[4px] flex flex-col cursor-pointer select-none"
      onClick={handleOpenLive}
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
      title="Click to view live project"
      style={{
        left: "9.8%",
        top: "7.3%",
        width: "80.4%",
        height: "58.6%",
      }}
    >
      <AnimatePresence mode="wait">
        {!isActive ? (
          <motion.div
            key="standby"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-full bg-[#030610] flex flex-col items-center justify-center cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-2.5">
              <div className="flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full border border-white/30 bg-white/5 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                <Power className="h-4 w-4 md:h-5 md:w-5 text-white/80" />
              </div>
              <p className="text-[9px] md:text-[11px] font-mono tracking-[0.25em] text-white/70 uppercase">
                {isMobile ? "TAP TO PREVIEW" : "HOVER TO PREVIEW"}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="relative w-full h-full flex flex-col bg-slate-950"
          >
            {/* Browser Top Navigation Bar */}
            <div className="flex items-center justify-between border-b border-white/15 bg-slate-900/95 px-2 py-1 shrink-0 z-20">
              <div className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400/90" />
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400/90" />
                <span className="h-1.5 w-1.5 rounded-full bg-green-400/90" />
              </div>
              <div className="max-w-[130px] sm:max-w-[170px] md:max-w-[210px] truncate rounded-full bg-slate-800/90 px-2 py-0.5 text-[8px] md:text-[9.5px] text-white/90 font-mono flex items-center gap-1 shadow-inner">
                <Globe className="h-2.5 w-2.5 shrink-0 text-cyan-400/80" />
                <span className="truncate">{urlDisplay || "portfolio.live"}</span>
              </div>
              {targetLink && targetLink !== "#" ? (
                <a
                  href={targetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition"
                  title="Open live site in new tab"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <div className="w-3" />
              )}
            </div>

            {/* Screenshot Display */}
            <div className="relative flex-1 w-full overflow-hidden bg-slate-950">
              <img
                src={currentImage}
                alt={project?.title || "Project preview"}
                className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out ${
                  showLiveButton ? "scale-105" : "scale-100"
                }`}
                loading="eager"
                onError={(e) => {
                  const fallback = resolveImage({ title: project?.title });
                  if (e.target.src !== fallback) {
                    e.target.src = fallback;
                  }
                }}
              />

              {/* Ambient Gloss Reflection */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />

              {/* On Mobile: Subtle tap to open indicator */}
              {isMobile && targetLink && targetLink !== "#" && (
                <div className="absolute bottom-1.5 right-1.5 z-20 pointer-events-none">
                  <span className="rounded-full bg-slate-950/80 backdrop-blur-sm border border-cyan-400/30 text-cyan-200 px-1.5 py-0.5 text-[7.5px] font-mono flex items-center gap-1 shadow-md">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    TAP TO OPEN
                  </span>
                </div>
              )}

              {/* ================= 3. VIEW LIVE PROJECT (Desktop hover overlay) ================= */}
              {!isMobile && (
                <div
                  className={`absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] transition-opacity duration-300 ${
                    showLiveButton ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                >
                  <span className="rounded-full bg-white/95 hover:bg-white text-slate-950 px-4 py-1.5 text-xs font-semibold shadow-2xl flex items-center gap-1.5 transform hover:scale-105 transition-all border border-white/50">
                    View Live Project <ExternalLink className="h-3.5 w-3.5 text-slate-900" />
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProjectPreview;
