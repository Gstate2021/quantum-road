import type { Layer } from "@/types/content";

export const layers: readonly Layer[] = [
  {
    id: "layer1",
    title: "計算基盤層",
    subtitle: "Computational Foundations",
    description: "量子を理解する前に「計算を理解する」。最適化と計算量のマスターが最初の目標。",
    phase: "Phase 1: 6ヶ月",
    color: "blue",
    topicIds: [
      "computational-complexity",
      "mathematical-optimization",
      "optimization-tools",
      "classical-ai-hybrid",
    ],
  },
  {
    id: "layer2",
    title: "量子理解層",
    subtitle: "Quantum Understanding",
    description: "暗号とハイブリッド設計への展開。量子の脅威とPQC標準を理解する。",
    phase: "Phase 2: 6ヶ月",
    color: "purple",
    topicIds: [
      "current-cryptography",
      "quantum-threat",
      "quantum-algorithms",
      "pqc-standards",
      "hybrid-design",
    ],
  },
  {
    id: "layer3",
    title: "ビジネス応用層",
    subtitle: "Business Application",
    description: "抽象的な知識を、顧客への具体的な価値提供に転換する。",
    phase: "Phase 3: 1年〜",
    color: "emerald",
    topicIds: [
      "pqc-migration",
      "computational-assessment",
      "quantum-inspired-optimization",
      "quantum-literacy-training",
    ],
  },
] as const;

export function getLayer(id: Layer["id"]): Layer {
  const layer = layers.find((l) => l.id === id);
  if (!layer) throw new Error(`Layer not found: ${id}`);
  return layer;
}
