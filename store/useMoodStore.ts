import { create } from "zustand";

interface MoodState {
  selectedMood: string | null;
  setMood: (mood: string) => void;
}

export const useMoodStore = create<MoodState>((set) => ({
  selectedMood: null,
  setMood: (mood) => set({ selectedMood: mood }),
}));