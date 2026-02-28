import type { Topic } from "@/types/content";

export const computationalAssessmentMeta: Topic = {
  id: "computational-assessment",
  layerId: "layer3",
  title: "計算構造アセスメント",
  subtitle: "Computational Structure Assessment",
  description:
    "顧客のビジネス課題を計算問題として構造化し、古典計算・量子インスパイアード・量子コンピューティングのどのアプローチが最適かを判断する能力を養う。ヒアリングから数理モデル化、判断基準の適用まで、コンサルティングの全プロセスをカバーする。",
  icon: "Search",
  estimatedHours: 12,
  prerequisites: ["optimization-tools", "hybrid-design"],
  lessonCount: 3,
  quizQuestionCount: 8,
  flashcardCount: 10,
} as const satisfies Topic;
