import type { Topic } from "@/types/content";

export const quantumAlgorithmsTopic: Topic = {
  id: "quantum-algorithms",
  layerId: "layer2",
  title: "量子アルゴリズム",
  subtitle: "Quantum Algorithms in Depth",
  description:
    "Shor、Groverの詳細に加え、QAOA・VQEなどのNISQアルゴリズムを学ぶ。量子コンピュータが実際に「何ができるか」を具体的に理解する。",
  icon: "Cpu",
  estimatedHours: 10,
  prerequisites: ["computational-complexity", "quantum-threat"],
  lessonCount: 4,
  quizQuestionCount: 10,
  flashcardCount: 12,
} as const satisfies Topic;
