const tokens = require("./theme/tokens.json");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: tokens.colors,
      fontFamily: {
        ui: ["Inter-Regular"],
        uiItalic: ["Inter-Italic"],
        uiMedium: ["Inter-Medium"],
        uiMediumItalic: ["Inter-MediumItalic"],
        uiSemiBold: ["Inter-SemiBold"],
        uiSemiBoldItalic: ["Inter-SemiBoldItalic"],
        uiBold: ["Inter-Bold"],
        uiBoldItalic: ["Inter-BoldItalic"],
        uiExtraBold: ["Inter-ExtraBold"],
        uiExtraBoldItalic: ["Inter-ExtraBoldItalic"],
        heading: ["CormorantGaramond-Regular"],
        headingItalic: ["CormorantGaramond-Italic"],
        headingMedium: ["CormorantGaramond-Medium"],
        headingMediumItalic: ["CormorantGaramond-MediumItalic"],
        headingSemiBold: ["CormorantGaramond-SemiBold"],
        headingSemiBoldItalic: ["CormorantGaramond-SemiBoldItalic"],
        headingBold: ["CormorantGaramond-Bold"],
        headingBoldItalic: ["CormorantGaramond-BoldItalic"],
        devanagari: ["Noto Sans Devanagari"],
      },
    }
  },
  plugins: [],
};
