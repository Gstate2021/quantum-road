import type { Topic } from "@/types/content";

export const pqcStandardsTopic: Topic = {
  id: "pqc-standards",
  layerId: "layer2",
  title: "PQC標準",
  subtitle: "Post-Quantum Cryptography Standards",
  description:
    "NISTが標準化したPQCアルゴリズム（ML-KEM、ML-DSA、SLH-DSA、FN-DSA）の仕組みと実装方法を学ぶ。liboqsでの実践も含む。",
  icon: "Lock",
  estimatedHours: 12,
  prerequisites: ["current-cryptography"],
  lessonCount: 5,
  quizQuestionCount: 10,
  flashcardCount: 15,
} as const satisfies Topic;
