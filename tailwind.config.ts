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
      fontSize: {
        "fluid-xs": "var(--fs-xs)",
        "fluid-sm": "var(--fs-sm)",
        "fluid-base": "var(--fs-base)",
        "fluid-md": "var(--fs-md)",
        "fluid-lg": "var(--fs-lg)",
        "fluid-xl": "var(--fs-xl)",
        "fluid-2xl": "var(--fs-2xl)",
        "fluid-3xl": "var(--fs-3xl)",
        display: ["var(--fs-display)", { lineHeight: "1" }],
        hero: ["var(--fs-hero)", { lineHeight: ".95" }],
      },
      spacing: {
        "fluid-1": "var(--space-1)",
        "fluid-2": "var(--space-2)",
        "fluid-3": "var(--space-3)",
        "fluid-4": "var(--space-4)",
        "fluid-5": "var(--space-5)",
        "fluid-6": "var(--space-6)",
        "fluid-7": "var(--space-7)",
        "fluid-8": "var(--space-8)",
        section: "var(--space-section)",
        gutter: "var(--space-gutter)",
        nav: "var(--nav-h)",
      },
      maxWidth: {
        content: "var(--content-max)",
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
