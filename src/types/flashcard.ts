export interface FlashcardDefinition {
  readonly id: string;
  readonly topicId: string;
  readonly front: string;
  readonly back: string;
  readonly tags: readonly string[];
  readonly relatedLessonId?: string;
}

export interface FlashcardState {
  readonly cardId: string;
  readonly repetition: number;
  readonly easeFactor: number;
  readonly interval: number;
  readonly dueDate: string;
  readonly lastReviewedAt: string | null;
}

export type ReviewGrade = 0 | 1 | 2 | 3 | 4 | 5;

export type ReviewButton = "again" | "hard" | "good" | "easy";

export const REVIEW_BUTTON_TO_GRADE: Record<ReviewButton, ReviewGrade> = {
  again: 1,
  hard: 2,
  good: 4,
  easy: 5,
} as const;
