import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          DEFAULT: "#1AC47D",
          dark: "#128F5A",
          pale: "#EAF8F1",
        },
        ink: "#1A1A1A",
        stone: {
          DEFAULT: "#6B7280",
          light: "#9CA3AF",
        },
        parchment: "#F7F4EF",
        "warm-white": "#FDFCFA",
      },
      fontFamily: {
        serif: ["var(--font-plus-jakarta)", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-reverse": "marquee-reverse 30s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
