/**
 * HAVEN Translation Cache — IN-MEMORY ONLY
 * No localStorage, no cookies, no trace. Resets each visit.
 */

const memoryCache: Record<string, { translated: string; timestamp: number }> = {};

function hashString(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash.toString(36);
}

export function getCached(original: string, language: string): string | null {
  const key = `${language}:${hashString(original)}`;
  const entry = memoryCache[key];
  if (entry) return entry.translated;
  return null;
}

export function setCache(original: string, translated: string, language: string): void {
  const key = `${language}:${hashString(original)}`;
  memoryCache[key] = { translated, timestamp: Date.now() };
}

export function clearTranslationCache(): void {
  Object.keys(memoryCache).forEach((k) => delete memoryCache[k]);
}
