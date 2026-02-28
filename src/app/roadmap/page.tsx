"use client";

import { Header } from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { layers } from "@/content/layers";
import { getTopic } from "@/content";
import { useProgress } from "@/hooks/use-progress";
import Link from "next/link";

interface NodePosition {
  readonly x: number;
  readonly y: number;
}

const nodePositions: Record<string, NodePosition> = {
  // Layer 1
  "computational-complexity": { x: 100, y: 60 },
  "mathematical-optimization": { x: 100, y: 200 },
  "optimization-tools": { x: 350, y: 200 },
  "classical-ai-hybrid": { x: 350, y: 340 },
  // Layer 2
  "current-cryptography": { x: 350, y: 60 },
  "quantum-threat": { x: 600, y: 60 },
  "quantum-algorithms": { x: 600, y: 200 },
  "pqc-standards": { x: 600, y: 340 },
  "hybrid-design": { x: 850, y: 200 },
  // Layer 3
  "pqc-migration": { x: 850, y: 340 },
  "computational-assessment": { x: 1100, y: 200 },
  "quantum-inspired-optimization": { x: 850, y: 60 },
  "quantum-literacy-training": { x: 1100, y: 340 },
};

const edges: readonly { from: string; to: string }[] = [
  { from: "computational-complexity", to: "current-cryptography" },
  { from: "mathematical-optimization", to: "optimization-tools" },
  { from: "mathematical-optimization", to: "classical-ai-hybrid" },
  { from: "current-cryptography", to: "quantum-threat" },
  { from: "computational-complexity", to: "quantum-algorithms" },
  { from: "quantum-threat", to: "quantum-algorithms" },
  { from: "current-cryptography", to: "pqc-standards" },
  { from: "quantum-algorithms", to: "hybrid-design" },
  { from: "classical-ai-hybrid", to: "hybrid-design" },
  { from: "pqc-standards", to: "pqc-migration" },
  { from: "optimization-tools", to: "computational-assessment" },
  { from: "hybrid-design", to: "computational-assessment" },
  { from: "quantum-algorithms", to: "quantum-inspired-optimization" },
  { from: "optimization-tools", to: "quantum-inspired-optimization" },
  { from: "quantum-threat", to: "quantum-literacy-training" },
  { from: "pqc-standards", to: "quantum-literacy-training" },
];

const layerBgColors: Record<string, string> = {
  layer1: "bg-blue-500/10 border-blue-500/30 hover:border-blue-500",
  layer2: "bg-purple-500/10 border-purple-500/30 hover:border-purple-500",
  layer3: "bg-emerald-500/10 border-emerald-500/30 hover:border-emerald-500",
};

const NODE_WIDTH = 180;
const NODE_HEIGHT = 70;

function getTopicStatus(
  topicId: string,
  completionPercent: number,
  allPrereqsMet: boolean
): "locked" | "available" | "in-progress" | "completed" {
  if (completionPercent === 100) return "completed";
  if (!allPrereqsMet) return "locked";
  if (completionPercent > 0) return "in-progress";
  return "available";
}

export default function RoadmapPage() {
  const { getTopicCompletionPercent } = useProgress();

  const topicStatuses: Record<string, ReturnType<typeof getTopicStatus>> = {};

  // Calculate statuses (simplified: check if all prerequisite topics are 100%)
  for (const layer of layers) {
    for (const topicId of layer.topicIds) {
      const topic = getTopic(topicId);
      const percent = getTopicCompletionPercent(topicId, topic.lessonCount);
      const prereqsMet =
        topic.prerequisites.length === 0 ||
        topic.prerequisites.every(
          (pid) =>
            getTopicCompletionPercent(pid, getTopic(pid).lessonCount) === 100
        );
      topicStatuses[topicId] = getTopicStatus(topicId, percent, prereqsMet);
    }
  }

  const svgWidth = 1300;
  const svgHeight = 460;

  return (
    <>
      <Header title="ロードマップ" />
      <main className="p-4 md:p-6">
        <div className="overflow-x-auto">
          <div className="relative" style={{ minWidth: svgWidth, minHeight: svgHeight }}>
            {/* SVG edges */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width={svgWidth}
              height={svgHeight}
            >
              {edges.map((edge) => {
                const from = nodePositions[edge.from];
                const to = nodePositions[edge.to];
                if (!from || !to) return null;

                const x1 = from.x + NODE_WIDTH / 2;
                const y1 = from.y + NODE_HEIGHT / 2;
                const x2 = to.x + NODE_WIDTH / 2;
                const y2 = to.y + NODE_HEIGHT / 2;

                const midX = (x1 + x2) / 2;

                const isLocked = topicStatuses[edge.to] === "locked";

                return (
                  <path
                    key={`${edge.from}-${edge.to}`}
                    d={`M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`}
                    fill="none"
                    className={
                      isLocked
                        ? "stroke-muted-foreground/20"
                        : "stroke-muted-foreground/50"
                    }
                    strokeWidth={2}
                    strokeDasharray={isLocked ? "6 4" : undefined}
                  />
                );
              })}
            </svg>

            {/* Topic nodes */}
            {layers.map((layer) =>
              layer.topicIds.map((topicId) => {
                const topic = getTopic(topicId);
                const pos = nodePositions[topicId];
                if (!pos) return null;

                const status = topicStatuses[topicId];
                const percent = getTopicCompletionPercent(
                  topicId,
                  topic.lessonCount
                );
                const isLocked = status === "locked";

                return (
                  <Link
                    key={topicId}
                    href={`/lessons/${topicId}`}
                    className={`absolute block transition-all ${
                      isLocked ? "opacity-40 pointer-events-none" : ""
                    }`}
                    style={{
                      left: pos.x,
                      top: pos.y,
                      width: NODE_WIDTH,
                      height: NODE_HEIGHT,
                    }}
                  >
                    <Card
                      className={`h-full flex flex-col justify-center px-3 py-2 border-2 transition-colors ${layerBgColors[layer.id]}`}
                    >
                      <div className="text-xs font-semibold truncate">
                        {topic.title}
                      </div>
                      <div className="text-[10px] text-muted-foreground truncate">
                        {topic.subtitle}
                      </div>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className="flex-1 bg-muted rounded-full h-1.5">
                          <div
                            className={`h-full rounded-full transition-all ${
                              status === "completed"
                                ? "bg-green-500"
                                : status === "in-progress"
                                ? "bg-yellow-500"
                                : "bg-muted-foreground/20"
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <Badge
                          variant={
                            status === "completed"
                              ? "default"
                              : status === "locked"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-[9px] px-1 py-0"
                        >
                          {status === "completed"
                            ? "完了"
                            : status === "in-progress"
                            ? "学習中"
                            : status === "locked"
                            ? "🔒"
                            : "未開始"}
                        </Badge>
                      </div>
                    </Card>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-blue-500/20 border border-blue-500/40" />
            Layer 1: 計算基盤
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-purple-500/20 border border-purple-500/40" />
            Layer 2: 量子理解
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/40" />
            Layer 3: ビジネス応用
          </div>
        </div>
      </main>
    </>
  );
}
