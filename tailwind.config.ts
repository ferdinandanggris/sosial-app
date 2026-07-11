import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "zoom-in-95": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "zoom-out-95": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" },
        },
        "slide-in-from-top-48": {
          from: { transform: "translateY(-48%)", opacity: "0" },
          to: { transform: "translateY(-50%)", opacity: "1" },
        },
        "slide-out-to-top-48": {
          from: { transform: "translateY(-50%)", opacity: "1" },
          to: { transform: "translateY(-48%)", opacity: "0" },
        },
        "slide-in-from-left-1/2": {
          from: { transform: "translateX(-50%)", opacity: "0" },
          to: { transform: "translateX(-50%)", opacity: "1" },
        },
        "slide-out-to-left-1/2": {
          from: { transform: "translateX(-50%)", opacity: "1" },
          to: { transform: "translateX(-50%)", opacity: "0" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-in",
        "zoom-in-95": "zoom-in-95 0.2s ease-out",
        "zoom-out-95": "zoom-out-95 0.2s ease-in",
        "slide-in-from-top-48": "slide-in-from-top-48 0.2s ease-out",
        "slide-out-to-top-48": "slide-out-to-top-48 0.2s ease-in",
        "slide-in-from-left-1/2": "slide-in-from-left-1/2 0.2s ease-out",
        "slide-out-to-left-1/2": "slide-out-to-left-1/2 0.2s ease-in",
      },
    },
  },
  plugins: [],
};

export default config;
