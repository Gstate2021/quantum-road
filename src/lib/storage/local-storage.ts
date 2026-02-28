import { type AppState, CURRENT_SCHEMA_VERSION, createDefaultAppState } from "@/types/progress";

const STORAGE_KEY = "quantum-road-state";

export function loadAppState(): AppState {
  if (typeof window === "undefined") {
    return createDefaultAppState();
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return createDefaultAppState();
    }

    const parsed = JSON.parse(raw) as AppState;

    if (parsed.schemaVersion !== CURRENT_SCHEMA_VERSION) {
      return migrateState(parsed as unknown as Record<string, unknown>);
    }

    return parsed;
  } catch {
    return createDefaultAppState();
  }
}

export function saveAppState(state: AppState): void {
  if (typeof window === "undefined") return;

  try {
    const updated: AppState = {
      ...state,
      lastAccessedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save state to localStorage:", e);
  }
}

export function exportAppState(): string {
  const state = loadAppState();
  return JSON.stringify(state, null, 2);
}

export function importAppState(json: string): AppState {
  const parsed = JSON.parse(json) as AppState;
  if (typeof parsed.schemaVersion !== "number") {
    throw new Error("Invalid state format");
  }
  saveAppState(parsed);
  return parsed;
}

export function resetAppState(): AppState {
  const fresh = createDefaultAppState();
  saveAppState(fresh);
  return fresh;
}

function migrateState(state: Record<string, unknown>): AppState {
  let current = { ...state };

  // v1 → v2: Add topicFreshness, labSessions, AI settings
  if ((current.schemaVersion as number) < 2) {
    current = {
      ...current,
      topicFreshness: {},
      labSessions: [],
      settings: {
        ...(current.settings as Record<string, unknown>),
        aiProvider: "gemini",
        aiModel: "gemini-2.5-flash",
        aiBaseUrl: "",
      },
    };
  }

  current.schemaVersion = CURRENT_SCHEMA_VERSION;
  const migrated = current as unknown as AppState;
  saveAppState(migrated);
  return migrated;
}
