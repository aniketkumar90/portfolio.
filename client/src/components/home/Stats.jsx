import React from "react";
import { profile } from "../../data/profile";

export function Stats() {
  return (
    <section className="relative z-10 mt-4 md:mt-6">
      <div className="stats-strip grid grid-cols-2 md:grid-cols-4 gap-5">
        <Stat value="2+" label="Years Building" />
        <Stat value="12+" label="Core Skills" />
        <Stat value="3" label="Certifications" />
        <Stat value={profile.location.split(",")[0]} label="Current Base" />
      </div>
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p
        className="text-2xl md:text-3xl font-semibold text-cyan-200"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        {value}
      </p>
      <p className="text-slate-300 text-sm mt-1 tracking-wide">{label}</p>
    </div>
  );
}

export default Stats;
