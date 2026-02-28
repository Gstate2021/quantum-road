import type { Topic } from "@/types/content";

export const quantumLiteracyTrainingMeta: Topic = {
  id: "quantum-literacy-training",
  layerId: "layer3",
  title: "量子リテラシー研修",
  subtitle: "Quantum Literacy Training",
  description:
    "企業の経営層・管理職・技術者に対して、量子コンピューティングと量子脅威の本質を正確かつ平易に伝える研修プログラムを設計・実施する能力を養う。複雑な技術を非専門家にも理解可能な形で翻訳するスキルは、コンサルティングの根幹をなす。",
  icon: "GraduationCap",
  estimatedHours: 10,
  prerequisites: ["quantum-threat", "pqc-standards"],
  lessonCount: 3,
  quizQuestionCount: 8,
  flashcardCount: 10,
} as const satisfies Topic;
