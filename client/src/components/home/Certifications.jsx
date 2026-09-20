import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { certifications } from "../../data/profile";
import SectionTitle from "../common/SectionTitle";

function toCertCards(items) {
  return items.map((item) => {
    const [title, metaRaw] = item.split("|").map((s) => s.trim());
    const meta = metaRaw || "Certified";
    return {
      title,
      meta,
      description:
        "Recognized credential validating practical skills, consistent learning, and professional capability.",
    };
  });
}

const creativeCards = [
  {
    title: "VS Code",
    meta: "IDE & Development",
    description:
      "Primary development environment for writing clean React, Node.js, and modern TypeScript/JavaScript with live debugging.",
  },
  {
    title: "Git & GitHub",
    meta: "Version Control",
    description:
      "Managing code repositories, branching workflows, collaborative pull requests, and automated deployment pipelines.",
  },
  {
    title: "Power BI",
    meta: "Data & Analytics",
    description:
      "Certified in building interactive dashboards, data modeling, and business insights visualization using DAX.",
  },
];

export function CertificationsSection() {
  const cards = useMemo(() => toCertCards(certifications), []);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (cards.length < 2 || isPaused) return;
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 3200);
    return () => clearInterval(t);
  }, [cards.length, isPaused]);

  const active = cards[index];
  const side = cards[(index + 1) % cards.length];

  return (
    <section id="certifications" className="section-wrap">
      <SectionTitle kicker="Recognitions" title="Certifications" />

      <div
        className="mx-auto mt-6 md:mt-8 grid max-w-5xl gap-8 md:grid-cols-[1.08fr_0.92fr] md:items-stretch"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.article
            key={`cert-main-${index}`}
            className="relative overflow-hidden rounded-[1.8rem] border border-cyan-200/25 p-7 md:p-10"
            style={{
              background:
                "linear-gradient(150deg, rgba(8, 18, 68, 0.92), rgba(16, 35, 139, 0.76), rgba(55, 12, 96, 0.82))",
              boxShadow:
                "0 26px 65px rgba(7, 15, 82, 0.42), inset 0 1px 0 rgba(191, 236, 255, 0.24)",
            }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-300/20 blur-2xl" />
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Verified Credential</p>
            <h3 className="mt-4 text-3xl md:text-4xl font-bold text-white">{active.title}</h3>
            <p className="mt-5 text-lg leading-relaxed text-blue-50/90">{active.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="neon-chip">{active.meta}</span>
            </div>
          </motion.article>
        </AnimatePresence>

        <div className="flex flex-col justify-center gap-8">
          <AnimatePresence mode="wait">
            <motion.article
              key={`cert-side-${index}`}
              className="rounded-[1.6rem] p-6 cursor-pointer"
              style={{
                background:
                  "linear-gradient(155deg, rgba(81, 20, 124, 0.62), rgba(134, 17, 91, 0.5))",
                boxShadow: "inset 0 1px 0 rgba(255, 210, 242, 0.18)",
              }}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={() => setIndex((prev) => (prev + 1) % cards.length)}
            >
              <p className="text-xs uppercase tracking-[0.28em] text-pink-300">Next Certificate</p>
              <h3 className="mt-4 text-2xl font-bold text-white">{side.title}</h3>
              <p className="mt-4 leading-relaxed text-pink-50/90">{side.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="neon-chip">{side.meta}</span>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="flex justify-center gap-2">
            {cards.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to certificate ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-pink-300" : "w-2.5 bg-pink-100/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function CreativeToolsSection() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (creativeCards.length < 2 || isPaused) return;
    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % creativeCards.length);
    }, 3200);
    return () => clearInterval(t);
  }, [isPaused]);

  const active = creativeCards[index];
  const side = creativeCards[(index + 1) % creativeCards.length];

  return (
    <section id="creative-tools" className="section-wrap">
      <SectionTitle kicker="Ecosystem" title="Dev & Creative Tools" />

      <div
        className="mx-auto mt-6 md:mt-8 grid max-w-5xl gap-8 md:grid-cols-[1.08fr_0.92fr] md:items-stretch"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.article
            key={`tool-main-${index}`}
            className="relative overflow-hidden rounded-[1.8rem] border border-cyan-200/25 p-7 md:p-10"
            style={{
              background:
                "linear-gradient(150deg, rgba(8, 18, 68, 0.92), rgba(16, 35, 139, 0.76), rgba(55, 12, 96, 0.82))",
              boxShadow:
                "0 26px 65px rgba(7, 15, 82, 0.42), inset 0 1px 0 rgba(191, 236, 255, 0.24)",
            }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            <div className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-300/20 blur-2xl" />
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-200">Dev Stack</p>
            <h3 className="mt-4 text-3xl md:text-4xl font-bold text-white">{active.title}</h3>
            <p className="mt-5 text-lg leading-relaxed text-blue-50/90">{active.description}</p>
            <div className="mt-8 flex flex-wrap gap-2">
              <span className="neon-chip">{active.meta}</span>
            </div>
          </motion.article>
        </AnimatePresence>

        <div className="flex flex-col justify-center gap-8">
          <AnimatePresence mode="wait">
            <motion.article
              key={`tool-side-${index}`}
              className="rounded-[1.6rem] p-6 cursor-pointer"
              style={{
                background:
                  "linear-gradient(155deg, rgba(81, 20, 124, 0.62), rgba(134, 17, 91, 0.5))",
                boxShadow: "inset 0 1px 0 rgba(255, 210, 242, 0.18)",
              }}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={() => setIndex((prev) => (prev + 1) % creativeCards.length)}
            >
              <p className="text-xs uppercase tracking-[0.28em] text-pink-300">Tool Overview</p>
              <h3 className="mt-4 text-2xl font-bold text-white">{side.title}</h3>
              <p className="mt-4 leading-relaxed text-pink-50/90">{side.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="neon-chip">{side.meta}</span>
              </div>
            </motion.article>
          </AnimatePresence>

          <div className="flex justify-center gap-2">
            {creativeCards.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to tool ${i + 1}`}
                className={`h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-pink-300" : "w-2.5 bg-pink-100/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CertificationsSection;
