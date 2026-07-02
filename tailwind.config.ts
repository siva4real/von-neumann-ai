import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base surfaces (Apple-clean light theme)
        canvas: "#f5f5f7",
        surface: "#ffffff",
        // Dark showcase / code surfaces
        ink: "#0a0a0a",
        "ink-soft": "#141414",
        "ink-line": "#242424",
        // Text
        primary: "#0a0a0a",
        secondary: "#6b6b70",
        muted: "#999999",
        // Brand accents ("spectrum")
        amber: "#ffab2a",
        cyan: "#00bbff",
        blue: "#0099ff",
        violet: "#bb88ff",
        teal: "#77dddd",
        coral: "#ff8866",
        line: "#e6e6e9",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: [
          "var(--font-geist-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      borderRadius: {
        card: "16px",
        pill: "999px",
      },
      maxWidth: {
        container: "1200px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        pulseline: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 32s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        pulseline: "pulseline 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
