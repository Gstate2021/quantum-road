import type { Topic } from "@/types/content";

export const quantumThreatTopic: Topic = {
  id: "quantum-threat",
  layerId: "layer2",
  title: "量子の脅威",
  subtitle: "Quantum Threat to Cryptography",
  description:
    "量子コンピュータが現行暗号に与える影響を理解する。量子ビットの基本概念からShor・Groverのアルゴリズムまで、脅威の全体像を把握する。",
  icon: "Zap",
  estimatedHours: 8,
  prerequisites: ["current-cryptography"],
  lessonCount: 4,
  quizQuestionCount: 10,
  flashcardCount: 15,
} as const satisfies Topic;
