import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { profile } from "../../data/profile";

export function Hero() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8]);

  const today = new Date();
  const prettyDate = today.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  const weekday = today.toLocaleDateString("en-US", { weekday: "long" });

  const cards = [
    { title: "MERN STACK", subtitle: "FULL STACK WEB" },
    { title: "REACT & NODE", subtitle: "FRONTEND & BACKEND" },
    { title: "MONGODB & SQL", subtitle: "DATABASE SYSTEMS" },
  ];

  return (
    <section id="home" className="pt-24 md:pt-28 pb-8 relative z-10 scroll-mt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="grid md:grid-cols-[1.05fr_0.95fr] gap-8 items-center"
      >
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-1 md:mt-0"
        >
          <h1
            className="text-4xl md:text-6xl font-bold leading-tight -mt-2"
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            <span className="text-white">{profile.name}</span>
          </h1>
          <p className="mt-2 text-white text-2xl md:text-3xl">{profile.role}</p>
          {profile.tagline ? (
            <p className="mt-4 text-slate-200 max-w-2xl text-lg">{profile.tagline}</p>
          ) : null}
          <div className="mt-6 flex flex-wrap gap-4">
            <a href="#projects" className="neo-btn">
              Explore Projects
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="neo-btn border-pink-400/40 text-pink-200 hover:text-white"
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* Right Column: 3D Hologram Phone */}
        <motion.div
          initial={{ opacity: 0, x: 35, rotate: 8 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative max-w-lg mx-auto w-full min-h-[340px] sm:min-h-[390px] md:min-h-[460px] flex flex-col items-center justify-center gap-3 select-none"
          style={{ perspective: 1200 }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            mx.set((e.clientX - rect.left) / rect.width - 0.5);
            my.set((e.clientY - rect.top) / rect.height - 0.5);
          }}
          onMouseLeave={() => {
            mx.set(0);
            my.set(0);
          }}
        >
          <div className="liquid-ribbon" />
          <motion.div
            className="phone-shell p-2 md:p-2.5 h-[clamp(420px,68dvh,560px)] w-auto aspect-[9/19.5] relative z-10"
            animate={{ y: [0, -6, 0], rotateZ: [-6, -4, -6] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <div className="phone-inner p-4 md:p-5">
              <div className="rounded-xl md:rounded-2xl border border-cyan-300/25 bg-slate-900/35 px-3.5 md:px-4 py-2.5 md:py-3 shadow-[inset_0_1px_0_rgba(180,239,255,0.22)]">
                <p className="text-[10px] uppercase tracking-[0.28em] text-cyan-200/85">
                  Live Dashboard
                </p>
                <h3 className="mt-1 text-2xl md:text-3xl font-semibold leading-tight text-cyan-100">
                  {prettyDate}
                </h3>
                <p className="mt-1 text-xs tracking-[0.16em] text-fuchsia-200/80">{weekday}</p>
              </div>

              <div className="mt-3 rounded-xl md:rounded-2xl border border-fuchsia-300/20 bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-fuchsia-500/10 px-3.5 md:px-4 py-2.5 md:py-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="tracking-[0.12em] text-slate-200/85">Mission Progress</span>
                  <span className="font-semibold text-yellow-300">4 / 5 Active</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-700/70">
                  <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-cyan-300 via-blue-400 to-fuchsia-400" />
                </div>
              </div>

              <div className="mt-3 space-y-2.5">
                {cards.map((card) => (
                  <div
                    key={card.title}
                    className="flex items-center rounded-lg md:rounded-xl border border-cyan-300/20 bg-slate-900/45 px-2.5 md:px-3 py-2 md:py-2.5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative h-8 w-8 md:h-10 md:w-10 rounded-lg bg-gradient-to-br from-cyan-200 via-sky-300 to-indigo-500 [transform:perspective(500px)_rotateX(14deg)_rotateY(-12deg)] shadow-[0_14px_24px_rgba(56,189,248,0.5),0_2px_0_rgba(10,22,60,0.9),inset_-6px_-8px_12px_rgba(67,56,202,0.48),inset_5px_5px_12px_rgba(255,255,255,0.33)] before:absolute before:left-[16%] before:top-[14%] before:h-[34%] before:w-[34%] before:rounded-full before:bg-white/60 after:absolute after:inset-[18%] after:rounded-md after:border after:border-white/20 after:bg-gradient-to-br after:from-white/10 after:to-transparent" />
                      <div>
                        <p className="text-[13px] md:text-[15px] leading-none text-white font-medium">
                          {card.title}
                        </p>
                        <p className="mt-1 text-[10px] tracking-[0.14em] text-cyan-200/90 font-mono">
                          {card.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
