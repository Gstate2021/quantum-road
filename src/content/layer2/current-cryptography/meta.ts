import type { Topic } from "@/types/content";

export const currentCryptographyTopic: Topic = {
  id: "current-cryptography",
  layerId: "layer2",
  title: "現行暗号の基礎",
  subtitle: "Foundations of Current Cryptography",
  description:
    "AES、RSA、楕円曲線暗号など、現在のインターネットを支える暗号技術の仕組みと安全性の根拠を理解する。量子の脅威を語る前提知識。",
  icon: "Shield",
  estimatedHours: 8,
  prerequisites: ["computational-complexity"],
  lessonCount: 4,
  quizQuestionCount: 10,
  flashcardCount: 15,
} as const satisfies Topic;
