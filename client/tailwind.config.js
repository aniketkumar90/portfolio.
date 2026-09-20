/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#f3f7ff",
        space: "#05070f",
        card: "#0c1224",
        neon: "#39e7ff",
        glow: "#63ffbe",
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        rajdhani: ["Rajdhani", "sans-serif"],
      },
    },
  },
  plugins: [],
};
