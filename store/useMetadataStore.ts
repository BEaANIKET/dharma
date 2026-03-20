import { create } from "zustand";
import { metadataApi } from "@/services/api";
import type { ApiMood, MetadataConfig } from "@/services/api/types";

/**
 * Local accent color mapping keyed by API mood value.
 * TODO: Remove once the API provides color data.
 */
const MOOD_ACCENT: Record<string, string> = {
  ANXIOUS:   "#9B8EC4", // cosmic-violet
  LOW:       "#6b6878", // muted
  SCATTERED: "#9B8EC4", // cosmic-violet
  GRATEFUL:  "#4ECDC4", // dharma-teal
  TIRED:     "#6b6878", // muted
  CURIOUS:   "#4ECDC4", // dharma-teal
  NOT_SURE:  "#a8a4a0", // secondary-dark
};

export type AppMood = ApiMood & {
  /** Temporary id — generated locally until the API provides one. */
  id: string;
  /** Local accent color mapped from value. */
  accent: string;
};

interface MetadataState {
  config: MetadataConfig | null;
  moods: AppMood[];
  isLoading: boolean;
  error: string | null;
  fetchMetadata: () => Promise<void>;
  getMoodByValue: (value: string) => AppMood | undefined;
}

export const useMetadataStore = create<MetadataState>((set, get) => ({
  config: null,
  moods: [],
  isLoading: false,
  error: null,

  fetchMetadata: async () => {
    if (get().isLoading) return;
    set({ isLoading: true, error: null });
    try {
      const config = await metadataApi.getConfigs();
      const moods: AppMood[] = config.moods.map((mood, index) => ({
        ...mood,
        id: `mood_${index}_${mood.value.toLowerCase()}`,
        accent: MOOD_ACCENT[mood.value] ?? "#9B8EC4",
      }));
      set({ config, moods, isLoading: false });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to load app configuration";
      set({ error: message, isLoading: false });
    }
  },

  getMoodByValue: (value) => get().moods.find((m) => m.value === value),
}));
