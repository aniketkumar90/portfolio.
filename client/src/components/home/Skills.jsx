import React from "react";
import { motion } from "framer-motion";
import { skills } from "../../data/profile";
import SectionTitle from "../common/SectionTitle";

export function Skills() {
  const allSkills = [...skills].sort((a, b) => b.level - a.level);
  const max = Math.max(...allSkills.map((s) => s.level), 100);

  return (
    <section id="skills" className="section-wrap">
      <SectionTitle kicker="Capabilities" title="Skills Matrix" />

      <div className="panel-3d border-0 mt-6 p-0 overflow-hidden">
        <div className="px-6 md:px-8 pt-6 pb-5 border-b border-pink-300/20 flex flex-wrap items-center justify-between gap-4">
          <p className="text-lg md:text-2xl font-semibold text-white">
            Statistics: Skill Strength Profile
          </p>
          <div className="flex items-center gap-5 text-xs md:text-sm text-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-300 shadow-[0_0_10px_rgba(249,168,212,0.9)]" />
              <span>SKILL LEVEL</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500 shadow-[0_0_10px_rgba(217,70,239,0.8)]" />
              <span>BASELINE</span>
            </div>
          </div>
        </div>

        <div className="relative px-4 md:px-8 py-8 md:py-10">
          <div className="absolute left-0 right-0 top-[55%] h-[2px] bg-pink-300/70" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3 md:gap-4 h-[280px] items-end">
            {allSkills.map((skill, index) => {
              const height = `${Math.max(35, (skill.level / max) * 100)}%`;
              return (
                <div key={skill.name} className="h-full flex flex-col justify-end">
                  <motion.div
                    initial={{ height: 0, opacity: 0.6 }}
                    whileInView={{ height, opacity: 1 }}
                    viewport={{ once: false, amount: 0.35 }}
                    transition={{ duration: 0.8, delay: index * 0.08 }}
                    className="rounded-t-md border border-pink-300/30 bg-gradient-to-b from-pink-300 via-fuchsia-500 to-purple-900 shadow-[0_10px_25px_rgba(217,70,239,0.35)]"
                  />
                  <p className="text-center text-[11px] md:text-xs text-slate-200 mt-2 leading-tight">
                    {skill.name}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;
