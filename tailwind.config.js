/**
 * Tailwind + NativeWind Theme Configuration
 *
 * Built from the client design system. Two layers:
 *
 *  1. BRAND PALETTE  — raw named colors (use sparingly, prefer semantic tokens)
 *     bg-dharma-teal, bg-cosmic-violet, bg-bindu-gold, bg-night-indigo …
 *
 *  2. SEMANTIC TOKENS — always use these in components
 *     bg-bg / dark:bg-bg-dark
 *     bg-surface / dark:bg-surface-dark
 *     text-primary / dark:text-text-primary-dark
 *     text-secondary / dark:text-secondary-dark
 *     border / dark:border-border-dark
 *     text-highlight / dark:text-highlight-dark  (gold accents)
 *     text-accent-primary / dark:text-accent-primary-dark  (teal)
 *     text-accent-secondary / dark:text-accent-secondary-dark  (violet)
 *     text-success / dark:text-success-dark
 *     text-error / dark:text-error-dark
 *
 * Card accent scheme:
 *   Verse       → highlight  / highlight-dark   (#D4960A amber → #FFD25A bright gold)
 *   Breathing   → accent-primary / accent-primary-dark  (#3BAFA8 → #4ECDC4 dharma-teal)
 *   Punya       → success / success-dark         (#2D9B6E → #5AD4A6 mint)
 *   Reflections → accent-secondary / accent-secondary-dark  (#7D72AB → #9B8EC4 cosmic-violet)
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",

  presets: [require("nativewind/preset")],

  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {

      colors: {

        // ─────────────────────────────────────────
        // BRAND PALETTE  (client-defined raw colors)
        // ─────────────────────────────────────────
        "dharma-teal":     "#4ECDC4",  // primary brand teal
        "cosmic-violet":   "#9B8EC4",  // brand violet
        "bindu-gold":      "#FFD25A",  // bright gold — dark-mode highlight
        "bindu-gold-dark": "#D4960A",  // rich amber — light-mode highlight
        "parchment":       "#E8E4DC",  // warm off-white
        "deep-space":      "#09090F",  // pure near-black (background overlays)
        "night-indigo":    "#111128",  // brand dark background

        // ─────────────────────────────────────────
        // SEMANTIC — Background / Surface
        // ─────────────────────────────────────────
        bg:             "#E8E4DC",  // light  — parchment
        "bg-dark":      "#111128",  // dark   — night-indigo
        surface:        "#F5F3EF",  // light cards / containers
        "surface-dark": "#0b0b1a",  // dark  cards / containers

        // ─────────────────────────────────────────
        // SEMANTIC — Text
        // ─────────────────────────────────────────
        "text-primary":      "#111128",  // light — night-indigo
        "primary":           "#111128",  // alias
        "text-primary-dark": "#E8E4DC",  // dark  — parchment
        "primary-dark":      "#E8E4DC",  // alias
        "text-secondary":    "#6b6878",  // light muted
        "secondary":         "#6b6878",  // alias
        "text-secondary-dark": "#a8a4a0", // dark muted
        "secondary-dark":    "#a8a4a0",  // alias

        // ─────────────────────────────────────────
        // SEMANTIC — Borders
        // ─────────────────────────────────────────
        border:        "#D8D4CC",  // light
        "border-dark": "#252545",  // dark

        // ─────────────────────────────────────────
        // SEMANTIC — Accents
        // ─────────────────────────────────────────
        "accent-primary":        "#3BAFA8",  // light teal
        "accent-secondary":      "#7D72AB",  // light violet
        "accent-primary-dark":   "#4ECDC4",  // dark  — dharma-teal
        "accent-secondary-dark": "#9B8EC4",  // dark  — cosmic-violet

        // ─────────────────────────────────────────
        // SEMANTIC — Highlight (gold)
        // ─────────────────────────────────────────
        highlight:       "#D4960A",  // light — bindu-gold-dark (rich amber)
        "highlight-dark": "#FFD25A", // dark  — bindu-gold (bright, pops on indigo)

        // ─────────────────────────────────────────
        // SEMANTIC — Status
        // ─────────────────────────────────────────
        success:        "#2D9B6E",
        "success-dark": "#5AD4A6",
        error:          "#C94058",
        "error-dark":   "#E85D75",
        disabled:       "#C8C4BC",
        "disabled-dark": "#3a3a52",
      },

      // ─────────────────────────────────────────
      // TYPOGRAPHY
      // ─────────────────────────────────────────
      fontFamily: {

        /* UI — Inter */
        ui:                  ["Inter-Regular"],
        uiItalic:            ["Inter-Italic"],
        uiMedium:            ["Inter-Medium"],
        uiMediumItalic:      ["Inter-MediumItalic"],
        uiSemiBold:          ["Inter-SemiBold"],
        uiSemiBoldItalic:    ["Inter-SemiBoldItalic"],
        uiBold:              ["Inter-Bold"],
        uiBoldItalic:        ["Inter-BoldItalic"],
        uiExtraBold:         ["Inter-ExtraBold"],
        uiExtraBoldItalic:   ["Inter-ExtraBoldItalic"],

        /* Heading — Cormorant Garamond */
        heading:             ["CormorantGaramond-Regular"],
        headingItalic:       ["CormorantGaramond-Italic"],
        headingMedium:       ["CormorantGaramond-Medium"],
        headingMediumItalic: ["CormorantGaramond-MediumItalic"],
        headingSemiBold:     ["CormorantGaramond-SemiBold"],
        headingSemiBoldItalic: ["CormorantGaramond-SemiBoldItalic"],
        headingBold:         ["CormorantGaramond-Bold"],
        headingBoldItalic:   ["CormorantGaramond-BoldItalic"],

        /* Sanskrit / Hindi */
        devanagari:          ["Noto Sans Devanagari"],
      },

    },
  },

  plugins: [],
};
