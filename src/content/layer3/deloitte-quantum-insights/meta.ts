import type { Topic } from "@/types/content";

export const deloitteQuantumInsightsMeta: Topic = {
  id: "deloitte-quantum-insights",
  layerId: "layer3",
  title: "デロイト量子インサイト",
  subtitle: "Deloitte Quantum Computing Insights",
  description:
    "デロイトトーマツおよびDeloitte Globalが公開する量子コンピューティング関連レポートを体系的に学ぶ。市場予測、Q-Dayタイムライン、PQC移行フレームワーク、産業別インパクト、企業のQuantum Readinessまで、コンサルティングファームの視座から量子の全体像を把握する。",
  icon: "Building2",
  estimatedHours: 10,
  prerequisites: ["quantum-threat", "pqc-standards"],
  lessonCount: 5,
  quizQuestionCount: 10,
  flashcardCount: 12,
} as const satisfies Topic;
