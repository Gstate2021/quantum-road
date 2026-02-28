export interface QuizQuestion {
  readonly id: string;
  readonly topicId: string;
  readonly lessonId?: string;
  readonly type: "multiple-choice" | "true-false";
  readonly difficulty: "beginner" | "intermediate" | "advanced";
  readonly question: string;
  readonly options: readonly QuizOption[];
  readonly explanation: string;
}

export interface QuizOption {
  readonly id: string;
  readonly text: string;
  readonly isCorrect: boolean;
}

export interface QuizResult {
  readonly topicId: string;
  readonly completedAt: number;
  readonly totalQuestions: number;
  readonly correctCount: number;
  readonly scorePercent: number;
  readonly timeSpentSeconds: number;
}
