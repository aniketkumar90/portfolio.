import React from "react";

export function ProjectFilters({ categories, activeCategory, onSelectCategory }) {
  if (!categories || categories.length <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-8 select-none">
      {categories.map((cat) => {
        const isActive = activeCategory === cat;
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              isActive
                ? "bg-cyan-400/20 border border-cyan-300 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                : "bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30"
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}

export default ProjectFilters;
