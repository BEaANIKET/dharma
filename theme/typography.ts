import { TextStyle } from "react-native";

export const fontFamilies = {
  ui: "Inter-Regular",
  heading: "CormorantGaramond-Regular",
  devanagari: "Noto Sans Devanagari",
} as const;

export const fontVariants = {
  ui: {
    thin: "Inter-Thin",
    thinItalic: "Inter-ThinItalic",
    extraLight: "Inter-ExtraLight",
    extraLightItalic: "Inter-ExtraLightItalic",
    light: "Inter-Light",
    lightItalic: "Inter-LightItalic",
    regular: "Inter-Regular",
    italic: "Inter-Italic",
    medium: "Inter-Medium",
    mediumItalic: "Inter-MediumItalic",
    semiBold: "Inter-SemiBold",
    semiBoldItalic: "Inter-SemiBoldItalic",
    bold: "Inter-Bold",
    boldItalic: "Inter-BoldItalic",
    extraBold: "Inter-ExtraBold",
    extraBoldItalic: "Inter-ExtraBoldItalic",
    black: "Inter-Black",
    blackItalic: "Inter-BlackItalic",
  },
  heading: {
    light: "CormorantGaramond-Light",
    lightItalic: "CormorantGaramond-LightItalic",
    regular: "CormorantGaramond-Regular",
    italic: "CormorantGaramond-Italic",
    medium: "CormorantGaramond-Medium",
    mediumItalic: "CormorantGaramond-MediumItalic",
    semiBold: "CormorantGaramond-SemiBold",
    semiBoldItalic: "CormorantGaramond-SemiBoldItalic",
    bold: "CormorantGaramond-Bold",
    boldItalic: "CormorantGaramond-BoldItalic",
  },
} as const;

export const typography = {
  body: {
    fontFamily: fontFamilies.ui,
  } as TextStyle,
  label: {
    fontFamily: fontFamilies.ui,
  } as TextStyle,
  button: {
    fontFamily: fontFamilies.ui,
  } as TextStyle,
  heading: {
    fontFamily: fontFamilies.heading,
  } as TextStyle,
  headingRegular: {
    fontFamily: fontVariants.heading.regular,
  } as TextStyle,
  headingSemiBold: {
    fontFamily: fontVariants.heading.semiBold,
  } as TextStyle,
  headingBold: {
    fontFamily: fontVariants.heading.bold,
  } as TextStyle,
  quote: {
    // fontFamily: fontFamilies.heading,
    fontStyle: "italic",
  } as TextStyle,
  devanagari: {
    fontFamily: fontFamilies.devanagari,
  } as TextStyle,
};

export const textStyles = {
  label: "text-xs font-uiSemiBold tracking-wide",
  caption: "text-sm font-ui",
  body: "text-base font-ui",
  heading: "text-xl font-headingSemiBold",
  title: "text-2xl font-headingSemiBold",
} as const;
