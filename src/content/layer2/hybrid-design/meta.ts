import type { Topic } from "@/types/content";

export const hybridDesignTopic: Topic = {
  id: "hybrid-design",
  layerId: "layer2",
  title: "ハイブリッド設計",
  subtitle: "Classical-Quantum Hybrid Design",
  description:
    "古典前処理→量子コア→古典後処理のハイブリッドアーキテクチャを学ぶ。計算資源の最適配分と実用的な設計パターンを習得する。",
  icon: "GitMerge",
  estimatedHours: 8,
  prerequisites: ["quantum-algorithms", "classical-ai-hybrid"],
  lessonCount: 3,
  quizQuestionCount: 8,
  flashcardCount: 10,
} as const satisfies Topic;
