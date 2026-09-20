import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectNextCard from "./ProjectNextCard";
import SectionTitle from "../common/SectionTitle";
import useProjects from "../../hooks/useProjects";

export function ProjectCarousel() {
  const { projects } = useProjects();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = () => {
    if (projects.length < 2) return;
    setDirection(1);
    setIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    if (projects.length < 2) return;
    setDirection(-1);
    setIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleSelect = (newIndex) => {
    if (newIndex === index) return;
    setDirection(newIndex > index ? 1 : -1);
    setIndex(newIndex);
  };

  useEffect(() => {
    if (projects.length < 2 || isPaused) return;
    const timer = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev + 1) % projects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, projects.length, index]);

  if (!projects || projects.length === 0) return null;

  const active = projects[index];
  const nextProject = projects[(index + 1) % projects.length];

  return (
    <section id="projects" className="section-wrap">
      <SectionTitle kicker="Featured Work" title="Project Lab" />

      {/* ================= HORIZONTAL PROJECT CAROUSEL ================= */}
      <div
        className="mx-auto mt-6 md:mt-10 max-w-6xl xl:max-w-7xl w-full flex flex-col md:flex-row gap-5 lg:gap-7 items-stretch justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* ================= 1. MAIN LARGE PROJECT CARD (~76–78% WIDTH) ================= */}
        <AnimatePresence mode="wait" custom={direction}>
          <ProjectCard key={active.title} project={active} direction={direction} />
        </AnimatePresence>

        {/* ================= 2. NEXT PROJECT (SMALL CARD ~22–24% WIDTH) ================= */}
        {projects.length > 1 && (
          <AnimatePresence mode="wait" custom={direction}>
            <ProjectNextCard
              key={nextProject.title}
              project={nextProject}
              index={(index + 1) % projects.length}
              total={projects.length}
              direction={direction}
              onClick={handleNext}
            />
          </AnimatePresence>
        )}
      </div>

      {/* ================= BOTTOM NAVIGATION CONTROLS ================= */}
      <div className="mx-auto mt-7 max-w-6xl xl:max-w-7xl w-full flex flex-col sm:flex-row items-center justify-between gap-4 px-3">
        {/* Pagination indicators */}
        <div className="flex items-center gap-2 sm:gap-3">
          {projects.map((p, i) => (
            <button
              key={p.title}
              onClick={() => handleSelect(i)}
              aria-label={`Go to project ${i + 1}: ${p.title}`}
              className={`group flex items-center gap-2.5 px-3.5 py-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                i === index
                  ? "bg-purple-600/30 border border-purple-400/80 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                  : "bg-white/5 border border-white/10 text-white/50 hover:border-white/30 hover:text-white"
              }`}
            >
              <span
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.9)] w-4"
                    : "bg-white/30 w-2"
                }`}
              />
              <span className="text-xs font-mono">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={`text-xs hidden md:inline ${
                  i === index ? "text-white font-medium" : "text-white/60"
                }`}
              >
                {p.title}
              </span>
            </button>
          ))}
        </div>

        {/* Previous / Next Arrows and Counter */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-2.5 rounded-full border border-white/20 bg-white/5 text-white/70 hover:text-white hover:border-white/50 hover:bg-white/10 transition cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-xs font-mono text-white/70 px-2 tracking-widest">
            {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <button
            onClick={handleNext}
            className="p-2.5 rounded-full border border-white/20 bg-white/5 text-white/70 hover:text-white hover:border-white/50 hover:bg-white/10 transition cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProjectCarousel;
