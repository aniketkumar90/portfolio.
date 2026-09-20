import React, { useEffect } from "react";
import { X } from "lucide-react";

export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`relative z-10 w-full ${maxWidth} rounded-2xl border border-cyan-300/30 bg-slate-950 p-6 shadow-[0_0_50px_rgba(6,182,212,0.25)]`}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="text-xl font-bold text-white font-rajdhani">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
