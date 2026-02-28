"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/use-progress";
import type { Topic, Lesson } from "@/types/content";
import Link from "next/link";
import { CheckCircle2, Circle, Clock, PlayCircle } from "lucide-react";

export function TopicOverview({
  topic,
  lessons,
}: {
  topic: Topic;
  lessons: readonly Lesson[];
}) {
  const { getLessonProgress, getTopicCompletionPercent } = useProgress();
  const percent = getTopicCompletionPercent(topic.id, topic.lessonCount);

  return (
    <>
      <Header title={topic.title} />
      <main className="p-4 md:p-6 max-w-3xl space-y-6">
        <div>
          <p className="text-sm text-muted-foreground">{topic.subtitle}</p>
          <p className="mt-2">{topic.description}</p>
          <div className="flex items-center gap-3 mt-3">
            <Badge variant="outline">{percent}% 完了</Badge>
            <span className="text-sm text-muted-foreground">
              約 {topic.estimatedHours} 時間
            </span>
          </div>
          {topic.prerequisites.length > 0 && (
            <p className="text-xs text-muted-foreground mt-2">
              前提: {topic.prerequisites.join(", ")}
            </p>
          )}
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold">レッスン</h2>
          {lessons.map((lesson, idx) => {
            const progress = getLessonProgress(lesson.id);
            const status = progress?.status ?? "not-started";

            return (
              <Link
                key={lesson.id}
                href={`/lessons/${topic.id}/${lesson.id}`}
              >
                <Card className="hover:shadow-sm transition-shadow">
                  <CardContent className="flex items-center gap-3 py-3">
                    <div className="flex-shrink-0">
                      {status === "completed" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : status === "in-progress" ? (
                        <PlayCircle className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <Circle className="h-5 w-5 text-muted-foreground/40" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">
                        {idx + 1}. {lesson.title}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                        <Clock className="h-3 w-3" />
                        {lesson.estimatedMinutes} 分
                      </p>
                    </div>
                    {status === "completed" && (
                      <Badge className="bg-green-500 text-xs">完了</Badge>
                    )}
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href={`/quiz/${topic.id}`}>クイズに挑戦</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={`/flashcards/${topic.id}`}>フラッシュカード</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
