import React, { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";
import ProjectLaptop from "./ProjectLaptop";

export function ProjectCard({ project, direction = 0, onNext, onPrev }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Phone detection
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024 || (window.matchMedia && window.matchMedia("(hover: none)").matches);
    }
    return false;
  });

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        typeof window !== "undefined" &&
        (window.innerWidth < 1024 ||
          (window.matchMedia && window.matchMedia("(hover: none)").matches) ||
          (window.matchMedia && window.matchMedia("(pointer: coarse)").matches));
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Detect when card is in active view range:
  // - Turns ON when entering from bottom as in Image 2
  // - Turns OFF when scrolling past top as in Image 1
  const isInRange = useInView(cardRef, {
    margin: "-26% 0px 8% 0px",
    amount: 0.08,
  });

  // Smooth touch swipe support for phone view
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (diff < -50 && onNext) onNext();
    if (diff > 50 && onPrev) onPrev();
  };

  // On phone: effect & image activate when in the active view range (or on tap)
  // On desktop: effect & image activate on mouse hover
  const isCardActive = isMobile ? (isInRange || isHovered) : isHovered;

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
    <div ref={cardRef} className="w-full md:w-[76%] lg:w-[78%] shrink-0 relative flex flex-col mx-auto">
      {/* Ambient Glow Aura around Card Sides (Auto-active when in MID of phone view, hover on desktop) */}
      <div
        className="absolute -inset-2.5 sm:-inset-4 rounded-[2.2rem] bg-gradient-to-r from-purple-600/70 via-fuchsia-600/60 to-indigo-600/70 blur-3xl pointer-events-none transition-all duration-700 ease-out"
        style={{
          opacity: isCardActive ? (isMobile ? 0.75 : 0.85) : 0,
          transform: isCardActive ? "scale(1.02)" : "scale(0.96)",
        }}
      />

      <motion.article
        key={project.title}
        custom={direction}
        variants={mainCardVariants}
        initial="enter"
        animate="center"
        exit="exit"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 overflow-hidden rounded-[1.8rem] border p-6 sm:p-8 lg:p-10 transition-all duration-500 h-full flex flex-col justify-between"
        style={{
          background:
            "linear-gradient(150deg, rgba(10, 10, 26, 0.98), rgba(16, 15, 38, 0.96), rgba(24, 12, 45, 0.95))",
          borderColor: isCardActive ? "rgba(255, 255, 255, 0.85)" : "rgba(255, 255, 255, 0.2)",
          boxShadow: isCardActive
            ? "0 0 45px 8px rgba(168, 85, 247, 0.55), 0 0 95px 22px rgba(139, 92, 246, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.3)"
            : "0 20px 45px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
        }}
      >
        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-purple-500/15 blur-2xl pointer-events-none" />

        {/* Inside Main Card: Left Content, Right Laptop (Centered in middle on phone, split on desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-8 lg:gap-10 items-center justify-items-center lg:justify-items-stretch">
          {/* CONTENT: Centered in middle on phone, left-aligned on desktop */}
          <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left w-full">
            <div className="mb-4 grid w-fit grid-cols-3 gap-2 mx-auto lg:mx-0">
              {Array.from({ length: 9 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full ${i % 2 === 0 ? "bg-purple-400" : "bg-purple-200/40"}`}
                />
              ))}
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-2">
              <p className="text-xs uppercase tracking-[0.3em] text-neutral-400 font-mono">WEBSITE</p>
              {isMobile && (
                <span className="text-[10px] font-mono text-purple-300/80 bg-purple-950/70 border border-purple-400/30 px-2 py-0.5 rounded-full">
                  Swipe ↔ to change
                </span>
              )}
            </div>

            <h3 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-wide text-center lg:text-left">
              {project.title}
            </h3>

            <div className="mt-5 flex flex-wrap justify-center lg:justify-start gap-2">
              {project.stack &&
                project.stack.map((item) => (
                  <span key={item} className="neon-chip text-xs">
                    {item}
                  </span>
                ))}
            </div>

            {project.link && (
              <div className="mt-8 flex items-center justify-center lg:justify-start gap-3">
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

          {/* RIGHT: LAPTOP (Centered in middle on phone, auto lights up in mid view) */}
          <div className="flex items-center justify-center w-full mx-auto">
            <ProjectLaptop
              project={project}
              isParentHovered={isCardActive}
              isMobile={isMobile ? (isInRange || isHovered) : false}
            />
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default ProjectCard;
