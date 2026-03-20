export const API_BASE_URL = "https://dharma-api.kindbay-48de15ee.eastus2.azurecontainerapps.io";

export type ApiTokenPair = {
  access_token: string;
  refresh_token: string;
  token_type: string;
};

export type ApiAuthResponse = ApiTokenPair & {
  is_new_user: boolean;
};

export type UserStats = {
  current_streak: number;
  longest_streak: number;
  last_activity_date: string | null;
};

export type ApiUser = {
  id: string;
  mobile: string;
  name: string | null;
  email: string | null;
  dob: string | null;
  city: string | null;
  created_at: string;
  stats: UserStats;
};

export type UserUpdateInput = {
  name?: string | null;
  email?: string | null;
  dob?: string | null;
  city?: string | null;
};

export type ApiMood = {
  value: string;
  label: string;
  emoji: string;
  description: string;
  ai_hint: string;
};

export type ApiActivityType = {
  value: string;
  label: string;
};

export type MetadataConfig = {
  activity_types: ApiActivityType[];
  moods: ApiMood[];
  supported_cities: string[];
  panchang_data_start: string;
  app_version: string;
};

export type RecipeQuery = {
  mood: string;
  feelings?: string;
};

export type RecipeApiResponse = {
  gita?: Record<string, unknown>;
  punya?: Record<string, unknown>;
  breathing?: Record<string, unknown>;
  reflections?: string[] | Record<string, unknown>;
  [key: string]: unknown;
};
