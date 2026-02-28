import type { Topic } from "@/types/content";

export const pqcMigrationMeta: Topic = {
  id: "pqc-migration",
  layerId: "layer3",
  title: "PQC移行コンサルティング",
  subtitle: "Post-Quantum Cryptography Migration Consulting",
  description:
    "エンタープライズ顧客の暗号資産を棚卸しし、リスク評価から移行計画策定、提案書作成までを一気通貫で実施できるコンサルティング力を身につける。NIST PQC標準の知識を、顧客価値に直結するサービスへ昇華させる。",
  icon: "ShieldCheck",
  estimatedHours: 14,
  prerequisites: ["pqc-standards"],
  lessonCount: 4,
  quizQuestionCount: 8,
  flashcardCount: 10,
} as const satisfies Topic;
