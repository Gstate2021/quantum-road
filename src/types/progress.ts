import type { FlashcardState } from "./flashcard";
import type { QuizResult } from "./quiz";

// AI provider types
export type AiProvider = "gemini" | "openai" | "anthropic" | "openrouter" | "custom";

export interface AppState {
  readonly schemaVersion: number;
  readonly lastAccessedAt: string;
  readonly lessonProgress: Readonly<Record<string, LessonProgress>>;
  readonly quizResults: readonly QuizResult[];
  readonly flashcardStates: Readonly<Record<string, FlashcardState>>;
  readonly streak: StreakState;
  readonly settings: UserSettings;
  readonly topicFreshness: Readonly<Record<string, TopicFreshness>>;
  readonly labSessions: readonly LabSession[];
}

// Content freshness monitoring
export interface TopicFreshness {
  readonly topicId: string;
  readonly lastVerifiedAt: string | null;
  readonly status: "fresh" | "review-needed" | "outdated" | "unchecked";
  readonly lastCheckResult: string | null;
  readonly keyUpdates: readonly string[];
}

// AI brainstorm lab
export interface LabMessage {
  readonly role: "user" | "assistant";
  readonly content: string;
  readonly timestamp: string;
}

export interface LabSession {
  readonly id: string;
  readonly title: string;
  readonly createdAt: string;
  readonly messages: readonly LabMessage[];
}

export interface LessonProgress {
  readonly lessonId: string;
  readonly topicId: string;
  readonly status: "not-started" | "in-progress" | "completed";
  readonly completedAt: string | null;
  readonly lastAccessedAt: string;
}

export interface StreakState {
  readonly currentStreak: number;
  readonly longestStreak: number;
  readonly lastActivityDate: string;
  readonly activityLog: readonly DailyActivity[];
}

export interface DailyActivity {
  readonly date: string;
  readonly lessonsCompleted: number;
  readonly quizzesTaken: number;
  readonly flashcardsReviewed: number;
  readonly minutesSpent: number;
}

export interface UserSettings {
  readonly theme: "light" | "dark" | "system";
  readonly dailyFlashcardGoal: number;
  readonly quizShuffleQuestions: boolean;
  readonly showEnglishTerms: boolean;
  readonly aiProvider: AiProvider;
  readonly aiModel: string;
  readonly aiBaseUrl: string;
}

export const DEFAULT_SETTINGS: UserSettings = {
  theme: "system",
  dailyFlashcardGoal: 20,
  quizShuffleQuestions: true,
  showEnglishTerms: true,
  aiProvider: "gemini",
  aiModel: "gemini-2.5-flash",
  aiBaseUrl: "",
} as const;

export const CURRENT_SCHEMA_VERSION = 2;

export function createDefaultAppState(): AppState {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    lastAccessedAt: new Date().toISOString(),
    lessonProgress: {},
    quizResults: [],
    flashcardStates: {},
    streak: {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: "",
      activityLog: [],
    },
    settings: DEFAULT_SETTINGS,
    topicFreshness: {},
    labSessions: [],
  };
}
