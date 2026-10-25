import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        jungle: {
          950: "#06120d",
          900: "#07160f",
          800: "#0a1f17",
          700: "#0a2f22",
          600: "#123a27",
        },
        lagoon: { 900: "#08171e", 800: "#0a1c26", 700: "#0a3550", 600: "#173d3a" },
        earth: {
          950: "#241508",
          900: "#35210f",
          800: "#4a2f1b",
          700: "#5b3b22",
          600: "#755034",
          500: "#92683f",
          400: "#b58a5c",
        },
        glow: {
          DEFAULT: "var(--glow)",
          teal: "#6ef0e0",
          amber: "#ffc46e",
          pink: "#ff8fb1",
        },
        leaf: "#eef6e0",
        parchment: "#f1d9a8",
      },
      fontFamily: {
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        sans: ["var(--font-figtree)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      spacing: {
        section: "clamp(80px, 9vw, 130px)",
        gutter: "clamp(20px, 4vw, 56px)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)", opacity: "0.2" },
          "50%": { transform: "translateY(-18px)", opacity: "1" },
        },
      },
      animation: { float: "float 4s ease-in-out infinite" },
    },
  },
};

export default config;
