import React from "react";

export function SectionTitle({ kicker, title, align = "center", className = "" }) {
  const alignment = {
    center: "text-center items-center",
    left: "text-left items-start",
    right: "text-right items-end",
  }[align] || "text-center items-center";

  return (
    <div className={`flex flex-col ${alignment} mb-8 md:mb-12 ${className}`}>
      {kicker && <p className="section-kicker">{kicker}</p>}
      <h2
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-wide leading-tight"
        style={{ fontFamily: "Rajdhani, sans-serif" }}
      >
        {title}
      </h2>
    </div>
  );
}

export default SectionTitle;
