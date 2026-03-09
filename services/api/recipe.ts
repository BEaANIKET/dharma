import { getCachedValue, setCachedValue } from "./cache";
import { httpRequest } from "./http";
import { RecipeApiResponse, RecipeQuery } from "./types";

const RECIPE_TTL_MS = 5 * 60 * 1000;

export async function getRecipe(input: RecipeQuery) {
  const cacheKey = `recipe:${input.mood.toLowerCase()}:${(input.feelings ?? "").trim().toLowerCase()}`;
  const cached = await getCachedValue<RecipeApiResponse>(cacheKey);
  if (cached) return cached;

  const response = await httpRequest<RecipeApiResponse>(
    "/recipe/",
    {
      mood: input.mood,
      feelings: input.feelings ?? "",
    },
    { auth: true }
  );
  await setCachedValue(cacheKey, response, RECIPE_TTL_MS);
  return response;
}
