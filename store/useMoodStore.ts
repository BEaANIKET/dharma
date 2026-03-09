import { create } from "zustand";

interface MoodState {
  selectedMood: string | null;
  setMood: (mood: string | null) => void;
}

export const useMoodStore = create<MoodState>((set) => ({
  selectedMood: null,
  setMood: (mood) => set({ selectedMood: mood }),
}));
