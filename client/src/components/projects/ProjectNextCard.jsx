import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export function ProjectNextCard({ project, index, total, direction = 0, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  // Resolve correct image URL seamlessly
  const resolveImage = (p) => {
    if (p?.image) return p.image;
    const title = (p?.title || "").toLowerCase();
    if (title.includes("jewel") || title.includes("shiv")) return "/projects/new-shiv-jewellers.png";
    if (title.includes("real") || title.includes("estate")) return "/projects/real-estate.png";
    if (title.includes("relay") || title.includes("mart") || title.includes("commerce")) return "/projects/relaymart.png";
    return p?.heroImage || p?.images?.[0] || "/projects/new-shiv-jewellers.png";
  };

  const nextImage = resolveImage(project);

  const nextCardVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 35 : dir < 0 ? -35 : 0,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      },
    },
    exit: (dir) => ({
      x: dir > 0 ? -35 : dir < 0 ? 35 : 0,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  };

  return (
    <div className="hidden md:flex w-[24%] lg:w-[22%] shrink-0 my-auto relative flex-col">
      {/* Ambient Glow Aura around Next Card on Hover */}
      <div
        className="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-purple-600/50 to-pink-600/40 blur-2xl pointer-events-none transition-all duration-500 ease-out"
        style={{
          opacity: isHovered ? 0.75 : 0,
          transform: isHovered ? "scale(1.02)" : "scale(0.96)",
        }}
      />

      <motion.aside
        key={project.title}
        custom={direction}
        variants={nextCardVariants}
        initial="enter"
        animate="center"
        exit="exit"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        title="Click to view next project"
        className="relative z-10 w-full rounded-[1.6rem] border p-4 lg:p-5 cursor-pointer transition-all duration-500 flex flex-col justify-between group select-none"
        style={{
          background: "linear-gradient(160deg, rgba(16, 12, 34, 0.95), rgba(28, 14, 48, 0.92))",
          borderColor: isHovered ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.15)",
          boxShadow: isHovered
            ? "0 0 35px 6px rgba(168, 85, 247, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.2)"
            : "0 12px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.08)",
        }}
      >
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-purple-300/90 font-mono">
              NEXT PROJECT
            </p>
            <span className="text-[10px] font-mono text-purple-200/70 border border-purple-300/30 rounded-full px-2 py-0.5 group-hover:border-purple-300 group-hover:text-white transition">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>

          {/* Project Screenshot Thumbnail */}
          <div className="mt-3 relative w-full h-24 rounded-lg overflow-hidden border border-white/10 bg-slate-950">
            <img
              src={nextImage}
              alt={project.title}
              className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
          </div>

          <h4 className="mt-3 text-base font-bold text-white group-hover:text-purple-200 transition-colors leading-snug line-clamp-1">
            {project.title}
          </h4>

          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {project.stack &&
              project.stack.slice(0, 3).map((item) => (
                <span key={item} className="neon-chip text-[9.5px] py-0.5 px-2">
                  {item}
                </span>
              ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-purple-200 group-hover:text-white transition-colors font-mono">
          <span className="text-[10px] uppercase tracking-wider">View Project</span>
          <ChevronRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.aside>
    </div>
  );
}

export default ProjectNextCard;
