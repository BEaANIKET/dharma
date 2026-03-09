import { TextStyle } from "react-native";

export const fontFamilies = {
  ui: "Outfit",
  heading: "CormorantGaramond",
  devanagari: "Noto Sans Devanagari",
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
  quote: {
    fontFamily: fontFamilies.heading,
    fontStyle: "italic",
  } as TextStyle,
  devanagari: {
    fontFamily: fontFamilies.devanagari,
  } as TextStyle,
};
