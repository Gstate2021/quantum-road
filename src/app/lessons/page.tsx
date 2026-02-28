"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { layers } from "@/content/layers";
import { getTopic } from "@/content";
import { useProgress } from "@/hooks/use-progress";
import Link from "next/link";
import { Clock, BookOpen, HelpCircle, Brain } from "lucide-react";

const layerColors: Record<string, string> = {
  layer1: "border-l-blue-500",
  layer2: "border-l-purple-500",
  layer3: "border-l-emerald-500",
};

export default function LessonsPage() {
  const { getTopicCompletionPercent } = useProgress();

  return (
    <>
      <Header title="レッスン一覧" />
      <main className="p-4 md:p-6 max-w-5xl space-y-8">
        {layers.map((layer) => (
          <section key={layer.id}>
            <div className="mb-4">
              <h2 className="text-xl font-bold">{layer.title}</h2>
              <p className="text-sm text-muted-foreground">
                {layer.subtitle} — {layer.phase}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {layer.topicIds.map((topicId) => {
                const topic = getTopic(topicId);
                const percent = getTopicCompletionPercent(
                  topicId,
                  topic.lessonCount
                );

                return (
                  <Link key={topicId} href={`/lessons/${topicId}`}>
                    <Card
                      className={`border-l-4 ${layerColors[layer.id]} hover:shadow-md transition-shadow h-full`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base">
                            {topic.title}
                          </CardTitle>
                          {percent === 100 && (
                            <Badge className="bg-green-500">完了</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {topic.subtitle}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {topic.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {topic.estimatedHours}h
                          </span>
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            {topic.lessonCount} レッスン
                          </span>
                          <span className="flex items-center gap-1">
                            <HelpCircle className="h-3 w-3" />
                            {topic.quizQuestionCount} 問
                          </span>
                          <span className="flex items-center gap-1">
                            <Brain className="h-3 w-3" />
                            {topic.flashcardCount} 枚
                          </span>
                        </div>
                        <Progress value={percent} className="h-1.5" />
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
