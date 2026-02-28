"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  AppState,
  LessonProgress,
  UserSettings,
  TopicFreshness,
  LabSession,
  LabMessage,
} from "@/types/progress";
import type { QuizResult } from "@/types/quiz";
import type { FlashcardState } from "@/types/flashcard";
import { createDefaultAppState } from "@/types/progress";
import { loadAppState, saveAppState } from "@/lib/storage/local-storage";

interface ProgressContextValue {
  state: AppState;
  // Lesson progress
  getLessonProgress: (lessonId: string) => LessonProgress | undefined;
  markLessonCompleted: (lessonId: string, topicId: string) => void;
  markLessonInProgress: (lessonId: string, topicId: string) => void;
  // Quiz
  addQuizResult: (result: QuizResult) => void;
  getTopicQuizResults: (topicId: string) => readonly QuizResult[];
  // Flashcards
  getFlashcardState: (cardId: string) => FlashcardState | undefined;
  updateFlashcardState: (state: FlashcardState) => void;
  // Streak
  recordActivity: () => void;
  // Settings
  updateSettings: (settings: Partial<UserSettings>) => void;
  // Topic progress
  getTopicCompletionPercent: (topicId: string, totalLessons: number) => number;
  // Freshness
  updateTopicFreshness: (freshness: TopicFreshness) => void;
  // Lab
  addLabSession: (session: LabSession) => void;
  updateLabSession: (sessionId: string, messages: readonly LabMessage[]) => void;
  deleteLabSession: (sessionId: string) => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(createDefaultAppState);
  const initialized = useRef(false);
  const saveTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Load from localStorage on mount
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const loaded = loadAppState();
      setState(loaded);
    }
  }, []);

  // Debounced save to localStorage
  const persistState = useCallback((newState: AppState) => {
    setState(newState);
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      saveAppState(newState);
    }, 300);
  }, []);

  const getLessonProgress = useCallback(
    (lessonId: string) => state.lessonProgress[lessonId],
    [state.lessonProgress]
  );

  const markLessonCompleted = useCallback(
    (lessonId: string, topicId: string) => {
      const now = new Date().toISOString();
      const progress: LessonProgress = {
        lessonId,
        topicId,
        status: "completed",
        completedAt: now,
        lastAccessedAt: now,
      };
      persistState({
        ...state,
        lessonProgress: { ...state.lessonProgress, [lessonId]: progress },
      });
    },
    [state, persistState]
  );

  const markLessonInProgress = useCallback(
    (lessonId: string, topicId: string) => {
      const existing = state.lessonProgress[lessonId];
      if (existing?.status === "completed") return; // Don't downgrade
      const now = new Date().toISOString();
      const progress: LessonProgress = {
        lessonId,
        topicId,
        status: "in-progress",
        completedAt: null,
        lastAccessedAt: now,
      };
      persistState({
        ...state,
        lessonProgress: { ...state.lessonProgress, [lessonId]: progress },
      });
    },
    [state, persistState]
  );

  const addQuizResult = useCallback(
    (result: QuizResult) => {
      persistState({
        ...state,
        quizResults: [...state.quizResults, result],
      });
    },
    [state, persistState]
  );

  const getTopicQuizResults = useCallback(
    (topicId: string) => state.quizResults.filter((r) => r.topicId === topicId),
    [state.quizResults]
  );

  const getFlashcardState = useCallback(
    (cardId: string) => state.flashcardStates[cardId],
    [state.flashcardStates]
  );

  const updateFlashcardState = useCallback(
    (cardState: FlashcardState) => {
      persistState({
        ...state,
        flashcardStates: {
          ...state.flashcardStates,
          [cardState.cardId]: cardState,
        },
      });
    },
    [state, persistState]
  );

  const recordActivity = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    const { streak } = state;

    let newStreak = streak.currentStreak;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (streak.lastActivityDate === today) {
      // Already recorded today
      return;
    } else if (streak.lastActivityDate === yesterdayStr) {
      newStreak += 1;
    } else if (streak.lastActivityDate !== today) {
      newStreak = 1;
    }

    persistState({
      ...state,
      streak: {
        ...streak,
        currentStreak: newStreak,
        longestStreak: Math.max(streak.longestStreak, newStreak),
        lastActivityDate: today,
      },
    });
  }, [state, persistState]);

  const updateSettings = useCallback(
    (partial: Partial<UserSettings>) => {
      persistState({
        ...state,
        settings: { ...state.settings, ...partial },
      });
    },
    [state, persistState]
  );

  const getTopicCompletionPercent = useCallback(
    (topicId: string, totalLessons: number) => {
      if (totalLessons === 0) return 0;
      const completed = Object.values(state.lessonProgress).filter(
        (p) => p.topicId === topicId && p.status === "completed"
      ).length;
      return Math.round((completed / totalLessons) * 100);
    },
    [state.lessonProgress]
  );

  const updateTopicFreshness = useCallback(
    (freshness: TopicFreshness) => {
      persistState({
        ...state,
        topicFreshness: {
          ...state.topicFreshness,
          [freshness.topicId]: freshness,
        },
      });
    },
    [state, persistState]
  );

  const addLabSession = useCallback(
    (session: LabSession) => {
      const sessions = [session, ...state.labSessions].slice(0, 10);
      persistState({ ...state, labSessions: sessions });
    },
    [state, persistState]
  );

  const updateLabSession = useCallback(
    (sessionId: string, messages: readonly LabMessage[]) => {
      const sessions = state.labSessions.map((s) =>
        s.id === sessionId ? { ...s, messages } : s
      );
      persistState({ ...state, labSessions: sessions });
    },
    [state, persistState]
  );

  const deleteLabSession = useCallback(
    (sessionId: string) => {
      const sessions = state.labSessions.filter((s) => s.id !== sessionId);
      persistState({ ...state, labSessions: sessions });
    },
    [state, persistState]
  );

  return (
    <ProgressContext.Provider
      value={{
        state,
        getLessonProgress,
        markLessonCompleted,
        markLessonInProgress,
        addQuizResult,
        getTopicQuizResults,
        getFlashcardState,
        updateFlashcardState,
        recordActivity,
        updateSettings,
        getTopicCompletionPercent,
        updateTopicFreshness,
        addLabSession,
        updateLabSession,
        deleteLabSession,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    throw new Error("useProgress must be used within a ProgressProvider");
  }
  return ctx;
}
