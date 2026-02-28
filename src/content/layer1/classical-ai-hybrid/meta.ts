import type { Topic } from "@/types/content";

export const classicalAiHybridMeta: Topic = {
  id: "classical-ai-hybrid",
  layerId: "layer1",
  title: "古典×AIハイブリッド設計",
  subtitle: "Classical-AI Hybrid Design",
  description:
    "AIによる問題定義・パラメータチューニングと、数理最適化による厳密な求解を組み合わせるハイブリッド設計パターンを学ぶ。計算設計会社としての差別化の核心となるスキル。",
  icon: "GitMerge",
  estimatedHours: 10,
  prerequisites: ["mathematical-optimization"],
  lessonCount: 3,
  quizQuestionCount: 8,
  flashcardCount: 10,
} as const satisfies Topic;
