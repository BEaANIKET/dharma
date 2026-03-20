import { create } from "zustand";

interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (dark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDark: true, // default: dark mode
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
  setTheme: (dark) => set({ isDark: dark }),
}));
