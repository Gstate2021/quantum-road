"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { layers } from "@/content/layers";
import { getTopic, getTopicQuiz } from "@/content";
import { useProgress } from "@/hooks/use-progress";
import Link from "next/link";
import { HelpCircle, Trophy } from "lucide-react";

export default function QuizHubPage() {
  const { getTopicQuizResults } = useProgress();

  return (
    <>
      <Header title="クイズ" />
      <main className="p-4 md:p-6 max-w-3xl space-y-8">
        {layers.map((layer) => (
          <section key={layer.id}>
            <h2 className="text-lg font-bold mb-3">{layer.title}</h2>
            <div className="space-y-3">
              {layer.topicIds.map((topicId) => {
                const topic = getTopic(topicId);
                const quiz = getTopicQuiz(topicId);
                const results = getTopicQuizResults(topicId);
                const bestScore =
                  results.length > 0
                    ? Math.max(...results.map((r) => r.scorePercent))
                    : null;

                return (
                  <Card key={topicId}>
                    <CardContent className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-3">
                        <HelpCircle className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{topic.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {quiz.length} 問 ・ {results.length} 回受験
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {bestScore !== null && (
                          <Badge
                            variant={bestScore >= 80 ? "default" : "outline"}
                            className="gap-1"
                          >
                            <Trophy className="h-3 w-3" />
                            {bestScore}%
                          </Badge>
                        )}
                        <Button asChild size="sm">
                          <Link href={`/quiz/${topicId}`}>挑戦</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
