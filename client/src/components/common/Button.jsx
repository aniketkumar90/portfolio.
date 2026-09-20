import React from "react";

export function Button({
  children,
  variant = "neo",
  size = "md",
  className = "",
  onClick,
  type = "button",
  href,
  target,
  rel,
  disabled = false,
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-300 select-none cursor-pointer";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-5 py-2.5 text-sm rounded-xl gap-2",
    lg: "px-7 py-3 text-base rounded-2xl gap-2.5",
  }[size] || "px-5 py-2.5 text-sm rounded-xl gap-2";

  const variantStyles = {
    neo: "neo-btn text-white",
    outline:
      "border border-white/80 text-white font-mono text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-black hover:shadow-[0_0_25px_rgba(255,255,255,0.75)] rounded-md px-6 py-2.5",
    ghost:
      "bg-white/5 border border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/10",
    chip: "neon-chip",
  }[variant] || "neo-btn";

  const combined = `${baseStyles} ${sizeStyles} ${variantStyles} ${disabled ? "opacity-50 pointer-events-none" : ""} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={combined} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combined} {...props}>
      {children}
    </button>
  );
}

export default Button;
