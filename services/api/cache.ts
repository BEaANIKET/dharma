import { CachedEntry, loadCacheStore, saveCacheStore } from "./storage";

const memoryCache = new Map<string, CachedEntry<unknown>>();
let diskLoaded = false;

async function ensureDiskCacheLoaded() {
  if (diskLoaded) return;
  const diskStore = await loadCacheStore();
  Object.entries(diskStore).forEach(([key, entry]) => {
    memoryCache.set(key, entry);
  });
  diskLoaded = true;
}

async function flushToDisk() {
  const store: Record<string, CachedEntry<unknown>> = {};
  memoryCache.forEach((value, key) => {
    store[key] = value;
  });
  await saveCacheStore(store);
}

export async function getCachedValue<T>(key: string): Promise<T | null> {
  await ensureDiskCacheLoaded();
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    memoryCache.delete(key);
    await flushToDisk();
    return null;
  }
  return entry.value as T;
}

export async function setCachedValue<T>(key: string, value: T, ttlMs: number): Promise<void> {
  await ensureDiskCacheLoaded();
  memoryCache.set(key, { value, expiresAt: Date.now() + ttlMs });
  await flushToDisk();
}

export async function clearCacheKey(key: string): Promise<void> {
  await ensureDiskCacheLoaded();
  memoryCache.delete(key);
  await flushToDisk();
}
