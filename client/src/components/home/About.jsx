import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "../../data/profile";
import SectionTitle from "../common/SectionTitle";

export function About() {
  const aboutSlides = [
    {
      title: "Profile Summary",
      description: profile.about,
      chips: ["MERN Stack", "Frontend & Backend", "REST APIs"],
    },
    {
      title: "Experience & Roles",
      description:
        "MERN Developer Intern at Addymize Web Solution and SEO Intern at IMTS Institute, delivering responsive web interfaces and dynamic apps.",
      chips: ["Addymize", "React.js", "Node.js", "MongoDB"],
    },
    {
      title: "Education & Foundation",
      description:
        "Master of Computer Applications (MCA) at Sharda University, with a solid grounding in Data Structures, Object-Oriented Programming, and Web Technologies.",
      chips: ["MCA Sharda", "BCA BRABU", "Computer Science"],
    },
  ];

  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (aboutSlides.length < 2 || isPaused) return;
    const t = setInterval(() => setIndex((prev) => (prev + 1) % aboutSlides.length), 3500);
    return () => clearInterval(t);
  }, [aboutSlides.length, isPaused]);

  const active = aboutSlides[index];
  const side = aboutSlides[(index + 1) % aboutSlides.length];

  return (
    <section id="about" className="section-wrap">
      <SectionTitle kicker="Featured Work" title="Design and Technology" />

      <div
        className="mx-auto mt-6 md:mt-8 grid max-w-5xl gap-8 md:grid-cols-[1.08fr_0.92fr] md:items-stretch"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.article
            key={active.title}
            className="relative overflow-hidden rounded-[1.8rem] border border-cyan-200/25 p-7 md:p-10 flex flex-col justify-between"
            style={{
              background:
                "linear-gradient(150deg, rgba(8, 18, 68, 0.92), rgba(16, 35, 139, 0.76), rgba(55, 12, 96, 0.82))",
              boxShadow:
                "0 26px 65px rgba(7, 15, 82, 0.42), inset 0 1px 0 rgba(191, 236, 255, 0.24)",
            }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Featured Build</p>
              <h3 className="mt-4 text-3xl md:text-4xl font-bold text-white">{active.title}</h3>
              <p className="mt-4 text-base md:text-lg leading-relaxed text-blue-50/90">
                {active.description}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {active.chips.map((chip) => (
                <span key={chip} className="neon-chip text-xs">
                  {chip}
                </span>
              ))}
            </div>
          </motion.article>
        </AnimatePresence>

        <div className="flex flex-col justify-between gap-6">
          <AnimatePresence mode="wait">
            <motion.article
              key={side.title}
              className="rounded-[1.6rem] p-6 cursor-pointer border border-pink-400/30 hover:border-pink-400/60 transition group flex flex-col justify-between"
              onClick={() => setIndex((prev) => (prev + 1) % aboutSlides.length)}
              style={{
                background:
                  "linear-gradient(155deg, rgba(81, 20, 124, 0.65), rgba(134, 17, 91, 0.52))",
                boxShadow:
                  "inset 0 1px 0 rgba(255, 210, 242, 0.2), 0 12px 30px rgba(81, 20, 124, 0.25)",
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-pink-300">Next Focus</p>
                <h4 className="mt-2 text-2xl font-bold text-white group-hover:text-pink-200 transition">
                  {side.title}
                </h4>
                <p className="mt-3 text-sm leading-relaxed text-pink-50/90">{side.description}</p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {side.chips.map((chip) => (
                  <span key={chip} className="neon-chip text-xs">
                    {chip}
                  </span>
                ))}
              </div>
            </motion.article>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex justify-center items-center gap-3">
            {aboutSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-8 bg-cyan-300 shadow-[0_0_12px_rgba(103,232,249,0.8)]"
                    : "w-2.5 bg-pink-100/40 hover:bg-pink-100/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
