import type { Topic } from "@/types/content";

export const computationalComplexityMeta: Topic = {
  id: "computational-complexity",
  layerId: "layer1",
  title: "計算量理論",
  subtitle: "Computational Complexity Theory",
  description:
    "計算問題の本質的な難しさを理解する。P, NP, NP完全といったクラス分類を学び、なぜ量子コンピュータが注目されるのかの理論的背景を掴む。近似アルゴリズムや確率的手法による実用的な対処法も習得する。",
  icon: "Brain",
  estimatedHours: 12,
  prerequisites: [],
  lessonCount: 4,
  quizQuestionCount: 10,
  flashcardCount: 15,
} as const satisfies Topic;
