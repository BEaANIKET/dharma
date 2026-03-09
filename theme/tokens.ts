import tokensJson from "./tokens.json";

export const tokens = tokensJson;
export const colors = tokens.colors;
export const gradients = tokens.gradients;

export type ColorTokens = typeof colors;
export type GradientTokens = typeof gradients;
