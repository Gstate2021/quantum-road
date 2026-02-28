import type { Topic } from "@/types/content";

export const quantumInspiredOptimizationMeta: Topic = {
  id: "quantum-inspired-optimization",
  layerId: "layer3",
  title: "量子インスパイアード最適化",
  subtitle: "Quantum-Inspired Optimization",
  description:
    "量子力学の原理に着想を得た古典アルゴリズムを実ビジネスの最適化問題に適用する。シミュレーテッドアニーリングの深い理解から、Simulated Bifurcation等の最新手法、物流・スケジューリング・ポートフォリオ最適化の実案件パターンまでを網羅する。",
  icon: "Zap",
  estimatedHours: 14,
  prerequisites: ["quantum-algorithms", "optimization-tools"],
  lessonCount: 3,
  quizQuestionCount: 8,
  flashcardCount: 10,
} as const satisfies Topic;
