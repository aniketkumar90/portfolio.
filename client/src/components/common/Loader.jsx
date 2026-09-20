import React from "react";

export function Loader({ size = "md", text = "Loading..." }) {
  const sizeMap = {
    sm: "h-5 w-5 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
  }[size] || "h-8 w-8 border-2";

  return (
    <div className="flex flex-col items-center justify-center gap-3 p-6 select-none">
      <div
        className={`${sizeMap} animate-spin rounded-full border-cyan-400 border-t-transparent shadow-[0_0_15px_rgba(57,231,255,0.5)]`}
      />
      {text && <span className="font-mono text-xs uppercase tracking-widest text-cyan-300/80">{text}</span>}
    </div>
  );
}

export default Loader;
