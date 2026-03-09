import * as FileSystem from "expo-file-system/legacy";

const SESSION_FILE = `${FileSystem.documentDirectory ?? ""}dharma-session.json`;
const CACHE_FILE = `${FileSystem.documentDirectory ?? ""}dharma-api-cache.json`;

type StorageRecord = Record<string, unknown>;

async function readJson(fileUri: string): Promise<StorageRecord | null> {
  if (!FileSystem.documentDirectory) return null;
  const info = await FileSystem.getInfoAsync(fileUri);
  if (!info.exists) return null;
  const raw = await FileSystem.readAsStringAsync(fileUri);
  try {
    return JSON.parse(raw) as StorageRecord;
  } catch {
    return null;
  }
}

async function writeJson(fileUri: string, data: StorageRecord): Promise<void> {
  if (!FileSystem.documentDirectory) return;
  await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
}

export async function loadSessionFromDisk<T>() {
  return (await readJson(SESSION_FILE)) as T | null;
}

export async function saveSessionToDisk<T extends StorageRecord>(data: T) {
  await writeJson(SESSION_FILE, data);
}

export async function clearSessionFromDisk() {
  if (!FileSystem.documentDirectory) return;
  const info = await FileSystem.getInfoAsync(SESSION_FILE);
  if (info.exists) {
    await FileSystem.deleteAsync(SESSION_FILE, { idempotent: true });
  }
}

export type CachedEntry<T> = {
  value: T;
  expiresAt: number;
};

export async function loadCacheStore(): Promise<Record<string, CachedEntry<unknown>>> {
  return ((await readJson(CACHE_FILE)) ?? {}) as Record<string, CachedEntry<unknown>>;
}

export async function saveCacheStore(store: Record<string, CachedEntry<unknown>>) {
  await writeJson(CACHE_FILE, store);
}
