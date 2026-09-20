import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import ProjectLaptop from "./ProjectLaptop";

export function ProjectCard({ project, direction = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  const mainCardVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 55 : dir < 0 ? -55 : 0,
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
      x: dir > 0 ? -55 : dir < 0 ? 55 : 0,
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
  };

  return (
    <div className="w-full md:w-[76%] lg:w-[78%] shrink-0 relative flex flex-col">
      {/* Ambient Glow Aura around Card Sides on Hover */}
      <div
        className="absolute -inset-2.5 sm:-inset-4 rounded-[2.2rem] bg-gradient-to-r from-purple-600/70 via-fuchsia-600/60 to-indigo-600/70 blur-3xl pointer-events-none transition-all duration-500 ease-out"
        style={{
          opacity: isHovered ? 0.85 : 0,
          transform: isHovered ? "scale(1.02)" : "scale(0.96)",
        }}
      />

      <motion.article
        key={project.title}
        custom={direction}
        variants={mainCardVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="relative z-10 overflow-hidden rounded-[1.8rem] border p-6 sm:p-8 lg:p-10 transition-all duration-500 h-full flex flex-col justify-between"
        style={{
          background:
            "linear-gradient(150deg, rgba(10, 10, 26, 0.98), rgba(16, 15, 38, 0.96), rgba(24, 12, 45, 0.95))",
          borderColor: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.2)",
          boxShadow: isHovered
            ? "0 0 50px 10px rgba(168, 85, 247, 0.55), 0 0 100px 25px rgba(139, 92, 246, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.3)"
            : "0 20px 45px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-purple-500/15 blur-2xl pointer-events-none" />

        {/* Inside Main Card: Left Content (~40%), Right Laptop (~60%) */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-10 items-center">
          {/* LEFT: PROJECT CONTENT */}
          <div className="flex flex-col justify-center">
            <div className="mb-4 grid w-fit grid-cols-3 gap-2">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full ${i % 2 === 0 ? "bg-purple-400" : "bg-purple-200/40"}`}
                />
              ))}
            </div>

            <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-mono">WEBSITE</p>
            <h3 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide">
              {project.title}
            </h3>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack &&
                project.stack.map((item) => (
                  <span key={item} className="neon-chip text-xs">
                    {item}
                  </span>
                ))}
            </div>

            {project.link && (
              <div className="mt-8 flex items-center gap-3">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-md border border-white/80 text-white font-mono text-xs tracking-[0.2em] uppercase transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.75)]"
                >
                  <span>LAUNCH SITE</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </div>

          {/* RIGHT: LAPTOP (Large, vertically centered, no overlap, inside card) */}
          <div className="flex items-center justify-center w-full">
            <ProjectLaptop project={project} isParentHovered={isHovered} />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default ProjectCard;
