import type { ReviewGrade } from "@/types/flashcard";

interface SM2Input {
  readonly repetition: number;
  readonly easeFactor: number;
  readonly interval: number;
  readonly grade: ReviewGrade;
}

interface SM2Output {
  readonly repetition: number;
  readonly easeFactor: number;
  readonly interval: number;
}

export function calculateSM2(input: SM2Input): SM2Output {
  const { repetition, easeFactor, interval, grade } = input;

  // Incorrect answer: reset
  if (grade < 3) {
    return {
      repetition: 0,
      easeFactor: easeFactor,
      interval: 1,
    };
  }

  // Correct answer
  const newRepetition = repetition + 1;

  let newInterval: number;
  if (repetition === 0) {
    newInterval = 1;
  } else if (repetition === 1) {
    newInterval = 6;
  } else {
    newInterval = Math.round(interval * easeFactor);
  }

  // Update ease factor (minimum 1.3)
  const newEaseFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02))
  );

  return {
    repetition: newRepetition,
    easeFactor: newEaseFactor,
    interval: newInterval,
  };
}

export function getNextReviewDate(interval: number): string {
  const date = new Date();
  date.setDate(date.getDate() + interval);
  return date.toISOString().split("T")[0];
}

export function isDue(dueDate: string): boolean {
  const today = new Date().toISOString().split("T")[0];
  return dueDate <= today;
}

export function createInitialFlashcardState(cardId: string) {
  return {
    cardId,
    repetition: 0,
    easeFactor: 2.5,
    interval: 0,
    dueDate: new Date().toISOString().split("T")[0],
    lastReviewedAt: null,
  } as const;
}
