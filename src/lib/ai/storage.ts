const AI_KEY_STORAGE_KEY = "quantum-road-ai-key";

export function getAiApiKey(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(AI_KEY_STORAGE_KEY) ?? "";
}

export function setAiApiKey(key: string): void {
  if (typeof window === "undefined") return;
  if (key) {
    localStorage.setItem(AI_KEY_STORAGE_KEY, key);
  } else {
    localStorage.removeItem(AI_KEY_STORAGE_KEY);
  }
}
