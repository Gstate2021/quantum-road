import type { Topic } from "@/types/content";

export const mathematicalOptimizationMeta: Topic = {
  id: "mathematical-optimization",
  layerId: "layer1",
  title: "数理最適化",
  subtitle: "Mathematical Optimization",
  description:
    "線形計画法から整数計画法、制約充足問題、メタヒューリスティクスまで、最適化の理論と手法を体系的に学ぶ。計算設計の核心スキルであり、量子インスパイアド最適化の土台となる。",
  icon: "TrendingUp",
  estimatedHours: 14,
  prerequisites: [],
  lessonCount: 4,
  quizQuestionCount: 10,
  flashcardCount: 15,
} as const satisfies Topic;
