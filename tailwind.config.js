/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0C1222",       // deeper, more premium
        backgroundSoft: "#111827",   // gradient mid
        backgroundDeep: "#0A0F1E",   // darkest tone

        card: "#151C2F",             // slightly lighter than bg
        cardBorder: "rgba(255,255,255,0.05)",

        primary: "#22D3EE",          // more cyan (less green)
        primarySoft: "#06B6D4",      // softer glow
        glow: "#67E8F9",

        textPrimary: "#F1F5F9",
        textSecondary: "#9CA3AF",
        textMuted: "#6B7280",
      },
    }
  },
  plugins: [],
};