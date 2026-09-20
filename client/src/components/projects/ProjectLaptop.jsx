import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ProjectPreview from "./ProjectPreview";

export function ProjectLaptop({ project, isParentHovered = false, isMobile = false }) {
  const [localHover, setLocalHover] = useState(false);
  const isHovered = isMobile || localHover || isParentHovered;
  const containerRef = useRef(null);

  // 3D Parallax Tilt based on mouse movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics-based spring dampening
  const springConfig = { stiffness: 260, damping: 22 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), springConfig);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setLocalHover(true);
  };

  const handleMouseLeave = () => {
    setLocalHover(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full flex flex-col items-center justify-center select-none py-2"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3D Tilt Container for the exact 600x480 Laptop */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="relative w-full max-w-[540px] md:max-w-[580px] lg:max-w-[620px] aspect-[600/480]"
      >
        {/* ================= SVG VECTOR LAPTOP FRAME ================= */}
        <svg
          viewBox="0 0 600 480"
          className="w-full h-full drop-shadow-[0_12px_30px_rgba(0,0,0,0.7)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Horizontal Keyboard Gradient */}
            <linearGradient id="keyColorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f43f5e" />
              <stop offset="25%" stopColor="#ec4899" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="75%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>

            {/* Screen Lid Border Gradient */}
            <linearGradient id="screenBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="45%" stopColor="#818cf8" />
              <stop offset="80%" stopColor="#c084fc" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>

            {/* Base Chassis Border Gradient */}
            <linearGradient id="baseBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="35%" stopColor="#a855f7" />
              <stop offset="70%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>

          {/* 1. SCREEN LID (OUTER CHASSIS) */}
          <rect
            x="42"
            y="16"
            width="516"
            height="316"
            rx="18"
            fill={isHovered ? "#2b1464" : "#030712"}
            stroke={isHovered ? "url(#screenBorderGrad)" : "#f5f5f5"}
            strokeWidth={isHovered ? "2.2" : "1.6"}
            style={{ transition: "all 0.4s ease" }}
          />

          {/* Webcam Notch & Dot */}
          <circle
            cx="300"
            cy="24"
            r="2.5"
            fill="none"
            stroke={isHovered ? "#818cf8" : "#f5f5f5"}
            strokeWidth="1"
            strokeOpacity="0.8"
            style={{ transition: "all 0.4s ease" }}
          />
          <circle
            cx="300"
            cy="24"
            r="1"
            fill={isHovered ? "#4ade80" : "#f5f5f5"}
            style={{ transition: "all 0.4s ease" }}
          />

          {/* Screen Inner Border (Display Boundary Bezel) */}
          <rect
            x="56"
            y="32"
            width="488"
            height="286"
            rx="5"
            fill="#02040a"
            stroke={isHovered ? "url(#screenBorderGrad)" : "#f5f5f5"}
            strokeWidth={isHovered ? "1.6" : "1.2"}
            strokeOpacity={isHovered ? "1" : "0.85"}
            style={{ transition: "all 0.4s ease" }}
          />

          {/* 2. LAPTOP HINGE */}
          <rect
            x="225"
            y="330"
            width="150"
            height="6"
            rx="2"
            fill={isHovered ? "#1b0d40" : "#030712"}
            stroke={isHovered ? "#818cf8" : "#f5f5f5"}
            strokeWidth="1.2"
            style={{ transition: "all 0.4s ease" }}
          />

          {/* 3. BASE CHASSIS (BOTTOM BODY) */}
          <path
            d="M 62 334 L 538 334 L 594 440 C 596 444 594 448 590 448 L 10 448 C 6 448 4 444 6 440 Z"
            fill={isHovered ? "#12082b" : "#030712"}
            stroke={isHovered ? "url(#baseBorderGrad)" : "#f5f5f5"}
            strokeWidth={isHovered ? "2.2" : "1.6"}
            style={{ transition: "all 0.4s ease" }}
          />

          {/* Base Front Lip Bevel */}
          <path
            d="M 10 448 L 590 448 L 586 454 C 585 456 582 457 580 457 L 20 457 C 18 457 15 456 14 454 Z"
            fill={isHovered ? "#0d061f" : "#02040a"}
            stroke={isHovered ? "url(#baseBorderGrad)" : "#f5f5f5"}
            strokeWidth={isHovered ? "1.6" : "1.2"}
            style={{ transition: "all 0.4s ease" }}
          />

          {/* Front Notch for Display Opening */}
          <path
            d="M 276 448 L 282 453 L 318 453 L 324 448 Z"
            fill={isHovered ? "#2b1464" : "#000000"}
            stroke={isHovered ? "#c084fc" : "#f5f5f5"}
            strokeWidth="1.2"
            style={{ transition: "all 0.4s ease" }}
          />

          {/* 4. KEYBOARD WELL */}
          <path
            d="M 92 342 L 508 342 L 536 414 L 64 414 Z"
            fill={isHovered ? "#160935" : "#010308"}
            stroke={isHovered ? "url(#keyColorGrad)" : "#f5f5f5"}
            strokeWidth="1.3"
            strokeOpacity={isHovered ? "0.9" : "0.75"}
            style={{ transition: "all 0.4s ease" }}
          />

          {/* KEYBOARD ROWS */}
          {/* Row 1: Function Keys (16 keys) */}
          {Array.from({ length: 16 }).map((_, i) => {
            const x1 = 96 + i * 25.3;
            const x2 = 94 + (i + 1) * 25.3 - 3.5;
            return (
              <polygon
                key={`f-${i}`}
                points={`${x1},345 ${x2},345 ${x2 - 0.7},352 ${x1 - 0.7},352`}
                fill={isHovered ? "#23114a" : "none"}
                stroke={isHovered ? "url(#keyColorGrad)" : "#f5f5f5"}
                strokeWidth="0.95"
                style={{ transition: "all 0.4s ease" }}
              />
            );
          })}

          {/* Row 2: Number Keys (14 keys) */}
          {Array.from({ length: 14 }).map((_, i) => {
            const yTop = 354;
            const yBtm = 363;
            const leftTop = 93 + i * 29.5;
            const rightTop = 93 + (i + 1) * 29.5 - 4;
            const leftBtm = 90 + i * 30.2;
            const rightBtm = 90 + (i + 1) * 30.2 - 4;
            return (
              <polygon
                key={`num-${i}`}
                points={`${leftTop},${yTop} ${rightTop},${yTop} ${rightBtm},${yBtm} ${leftBtm},${yBtm}`}
                fill={isHovered ? "#23114a" : "none"}
                stroke={isHovered ? "url(#keyColorGrad)" : "#f5f5f5"}
                strokeWidth="1"
                style={{ transition: "all 0.4s ease" }}
              />
            );
          })}

          {/* Row 3: QWERTY Row (14 keys) */}
          {Array.from({ length: 14 }).map((_, i) => {
            const yTop = 365;
            const yBtm = 375;
            const leftTop = 89 + i * 30.5;
            const rightTop = 89 + (i + 1) * 30.5 - 4;
            const leftBtm = 85 + i * 31.3;
            const rightBtm = 85 + (i + 1) * 31.3 - 4;
            return (
              <polygon
                key={`q-${i}`}
                points={`${leftTop},${yTop} ${rightTop},${yTop} ${rightBtm},${yBtm} ${leftBtm},${yBtm}`}
                fill={isHovered ? "#23114a" : "none"}
                stroke={isHovered ? "url(#keyColorGrad)" : "#f5f5f5"}
                strokeWidth="1"
                style={{ transition: "all 0.4s ease" }}
              />
            );
          })}

          {/* Row 4: ASDF Row (13 keys) */}
          {Array.from({ length: 13 }).map((_, i) => {
            const yTop = 377;
            const yBtm = 388;
            const leftTop = 84 + i * 33.5;
            const rightTop = 84 + (i + 1) * 33.5 - 4;
            const leftBtm = 80 + i * 34.5;
            const rightBtm = 80 + (i + 1) * 34.5 - 4;
            return (
              <polygon
                key={`a-${i}`}
                points={`${leftTop},${yTop} ${rightTop},${yTop} ${rightBtm},${yBtm} ${leftBtm},${yBtm}`}
                fill={isHovered ? "#23114a" : "none"}
                stroke={isHovered ? "url(#keyColorGrad)" : "#f5f5f5"}
                strokeWidth="1.05"
                style={{ transition: "all 0.4s ease" }}
              />
            );
          })}

          {/* Row 5: ZXCV Row (13 keys) */}
          {Array.from({ length: 13 }).map((_, i) => {
            const yTop = 390;
            const yBtm = 401;
            const leftTop = 79 + i * 34.8;
            const rightTop = 79 + (i + 1) * 34.8 - 4.5;
            const leftBtm = 74 + i * 35.8;
            const rightBtm = 74 + (i + 1) * 35.8 - 4.5;
            return (
              <polygon
                key={`z-${i}`}
                points={`${leftTop},${yTop} ${rightTop},${yTop} ${rightBtm},${yBtm} ${leftBtm},${yBtm}`}
                fill={isHovered ? "#23114a" : "none"}
                stroke={isHovered ? "url(#keyColorGrad)" : "#f5f5f5"}
                strokeWidth="1.05"
                style={{ transition: "all 0.4s ease" }}
              />
            );
          })}

          {/* Row 6: Bottom Spacebar & Modifier Row */}
          <polygon
            points="73,403 108,403 105,412 69,412"
            fill={isHovered ? "#23114a" : "none"}
            stroke={isHovered ? "url(#keyColorGrad)" : "#f5f5f5"}
            strokeWidth="1"
            style={{ transition: "all 0.4s ease" }}
          />
          <polygon
            points="112,403 148,403 146,412 109,412"
            fill={isHovered ? "#23114a" : "none"}
            stroke={isHovered ? "url(#keyColorGrad)" : "#f5f5f5"}
            strokeWidth="1"
            style={{ transition: "all 0.4s ease" }}
          />
          <polygon
            points="152,403 194,403 193,412 150,412"
            fill={isHovered ? "#23114a" : "none"}
            stroke={isHovered ? "url(#keyColorGrad)" : "#f5f5f5"}
            strokeWidth="1"
            style={{ transition: "all 0.4s ease" }}
          />
          {/* Main Spacebar */}
          <polygon
            points="198,403 422,403 424,412 197,412"
            fill={isHovered ? "#281254" : "none"}
            stroke={isHovered ? "url(#keyColorGrad)" : "#f5f5f5"}
            strokeWidth="1.2"
            style={{ transition: "all 0.4s ease" }}
          />
          <polygon
            points="426,403 468,403 470,412 428,412"
            fill={isHovered ? "#23114a" : "none"}
            stroke={isHovered ? "url(#keyColorGrad)" : "#f5f5f5"}
            strokeWidth="1"
            style={{ transition: "all 0.4s ease" }}
          />
          <polygon
            points="472,403 508,403 511,412 474,412"
            fill={isHovered ? "#23114a" : "none"}
            stroke={isHovered ? "url(#keyColorGrad)" : "#f5f5f5"}
            strokeWidth="1"
            style={{ transition: "all 0.4s ease" }}
          />
          <polygon
            points="512,403 547,403 551,412 515,412"
            fill={isHovered ? "#23114a" : "none"}
            stroke={isHovered ? "url(#keyColorGrad)" : "#f5f5f5"}
            strokeWidth="1"
            style={{ transition: "all 0.4s ease" }}
          />

          {/* 5. TRACKPAD */}
          <rect
            x="240"
            y="420"
            width="120"
            height="23"
            rx="4"
            fill={isHovered ? "#1b0c3d" : "none"}
            stroke={isHovered ? "url(#keyColorGrad)" : "#f5f5f5"}
            strokeWidth="1.3"
            style={{ transition: "all 0.4s ease" }}
          />
        </svg>

        {/* Screen Content Overlay with hover image clipping */}
        <ProjectPreview
          project={project}
          isCardHovered={isHovered}
          isLaptopHovered={localHover}
          isMobile={isMobile}
        />
      </motion.div>
    </div>
  );
}

export default ProjectLaptop;
