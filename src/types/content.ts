export interface Layer {
  readonly id: "layer1" | "layer2" | "layer3";
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly phase: string;
  readonly color: string;
  readonly topicIds: readonly string[];
}

export interface Topic {
  readonly id: string;
  readonly layerId: Layer["id"];
  readonly title: string;
  readonly subtitle: string;
  readonly description: string;
  readonly icon: string;
  readonly estimatedHours: number;
  readonly prerequisites: readonly string[];
  readonly lessonCount: number;
  readonly quizQuestionCount: number;
  readonly flashcardCount: number;
}

export interface Lesson {
  readonly id: string;
  readonly topicId: string;
  readonly order: number;
  readonly title: string;
  readonly estimatedMinutes: number;
  readonly sections: readonly LessonSection[];
  readonly keyConcepts: readonly KeyConcept[];
}

export interface LessonSection {
  readonly type: "text" | "code" | "diagram" | "callout" | "example";
  readonly content: string;
  readonly language?: string;
  readonly calloutType?: "info" | "warning" | "tip" | "important";
}

export interface KeyConcept {
  readonly term: string;
  readonly termEn: string;
  readonly definition: string;
}
