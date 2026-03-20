import { getCachedValue, setCachedValue } from "./cache";
import { httpRequest } from "./http";
import { MetadataConfig } from "./types";

const METADATA_TTL_MS = 60 * 60 * 1000; // 1 hour

export async function getConfigs(): Promise<MetadataConfig> {
  const cacheKey = "metadata:configs";
  const cached = await getCachedValue<MetadataConfig>(cacheKey);
  if (cached) return cached;

  const response = await httpRequest<MetadataConfig>("/metadata/configs");
  await setCachedValue(cacheKey, response, METADATA_TTL_MS);
  return response;
}
