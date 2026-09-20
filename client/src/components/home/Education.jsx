import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { education } from "../../data/profile";

export function Education() {
  const items = useMemo(() => education, []);
  const [idx, setIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (items.length < 2 || isPaused) return;
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % items.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [items.length, isPaused]);

  const active = items[idx];
  const side = items[(idx + 1) % items.length];

  return (
    <section id="education" className="section-wrap">
      <div
        className="rounded-[2rem] p-5 md:p-8"
        style={{
          background:
            "linear-gradient(180deg, rgba(15,36,138,0.95) 0%, rgba(7,13,82,0.97) 56%, rgba(24,7,64,0.95) 100%)",
          boxShadow:
            "0 30px 80px rgba(7, 17, 95, 0.45), inset 0 1px 0 rgba(165, 209, 255, 0.28)",
        }}
      >
        <h3
          className="text-3xl md:text-5xl font-bold text-white"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Education
        </h3>

        <div
          className="mt-6 grid md:grid-cols-[1.05fr_0.95fr] gap-6 items-stretch"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.article
              key={`edu-main-${idx}`}
              initial={{ opacity: 0, y: 30, x: 25 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: -20, x: -25 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="rounded-[1.8rem] border border-cyan-200/30 p-6 md:p-8 min-h-[260px] flex flex-col justify-center"
              style={{
                background:
                  "linear-gradient(160deg, rgba(10, 14, 60, 0.95), rgba(35, 20, 102, 0.88), rgba(20, 8, 72, 0.92))",
                boxShadow:
                  "0 22px 52px rgba(7, 10, 62, 0.55), inset 0 1px 0 rgba(196, 228, 255, 0.22)",
              }}
            >
              <p className="text-cyan-200 text-xs tracking-[0.3em] uppercase">{active.period}</p>
              <h4 className="text-2xl md:text-3xl text-white font-bold mt-4">{active.degree}</h4>
              <p className="text-blue-100 mt-3 text-lg">{active.school}</p>
              {active.detail && <p className="text-cyan-300/70 text-xs mt-2 font-mono">{active.detail}</p>}
            </motion.article>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.article
              key={`edu-side-${idx}`}
              initial={{ opacity: 0, y: -20, x: -25 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, y: 25, x: 25 }}
              transition={{ duration: 0.55, ease: "easeInOut" }}
              className="rounded-[1.8rem] border border-pink-300/30 p-6 md:p-8 min-h-[260px] flex flex-col justify-center cursor-pointer"
              style={{
                background:
                  "linear-gradient(160deg, rgba(40, 12, 78, 0.95), rgba(70, 16, 90, 0.85))",
                boxShadow:
                  "0 22px 52px rgba(35, 8, 55, 0.45), inset 0 1px 0 rgba(255, 210, 242, 0.2)",
              }}
              onClick={() => setIdx((prev) => (prev + 1) % items.length)}
            >
              <p className="text-pink-200 text-xs tracking-[0.3em] uppercase">{side.period}</p>
              <h4 className="text-xl md:text-2xl text-white font-bold mt-4">{side.degree}</h4>
              <p className="text-pink-100 mt-3 text-base">{side.school}</p>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default Education;
