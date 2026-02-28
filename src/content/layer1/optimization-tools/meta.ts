import type { Topic } from "@/types/content";

export const optimizationToolsMeta: Topic = {
  id: "optimization-tools",
  layerId: "layer1",
  title: "最適化ツール実践",
  subtitle: "Optimization Tools in Practice",
  description:
    "Google OR-Tools、PuLP、CVXPYといった実用的な最適化ライブラリを使いこなす。理論を実装に落とし込み、実際の問題を解くスキルを身につける。計算設計のコンサルティングにおける武器となるツール群。",
  icon: "Wrench",
  estimatedHours: 10,
  prerequisites: ["mathematical-optimization"],
  lessonCount: 3,
  quizQuestionCount: 8,
  flashcardCount: 10,
} as const satisfies Topic;
