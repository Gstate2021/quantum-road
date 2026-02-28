"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { layers } from "@/content/layers";
import { getTopic, getAllFlashcards } from "@/content";
import { useProgress } from "@/hooks/use-progress";
import { isDue } from "@/lib/srs/sm2-algorithm";
import { BookOpen, Brain, Flame, Target } from "lucide-react";
import Link from "next/link";

function OverallProgress() {
  const { state } = useProgress();

  const totalLessons = layers.reduce((sum, layer) => {
    return (
      sum +
      layer.topicIds.reduce((s, id) => s + getTopic(id).lessonCount, 0)
    );
  }, 0);

  const completedLessons = Object.values(state.lessonProgress).filter(
    (p) => p.status === "completed"
  ).length;

  const percent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">全体進捗</CardTitle>
        <Target className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{percent}%</div>
        <Progress value={percent} className="mt-2" />
        <p className="text-xs text-muted-foreground mt-1">
          {completedLessons} / {totalLessons} レッスン完了
        </p>
      </CardContent>
    </Card>
  );
}

function StreakCard() {
  const { state } = useProgress();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">連続学習</CardTitle>
        <Flame className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{state.streak.currentStreak} 日</div>
        <p className="text-xs text-muted-foreground mt-1">
          最長記録: {state.streak.longestStreak} 日
        </p>
      </CardContent>
    </Card>
  );
}

function DueFlashcardsCard() {
  const { state } = useProgress();
  const allCards = getAllFlashcards();

  let dueCount = 0;
  for (const card of allCards) {
    const cardState = state.flashcardStates[card.id];
    if (!cardState || isDue(cardState.dueDate)) {
      dueCount++;
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">復習カード</CardTitle>
        <Brain className="h-4 w-4 text-purple-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{dueCount} 枚</div>
        <p className="text-xs text-muted-foreground mt-1">復習期限のカード</p>
        {dueCount > 0 && (
          <Button asChild size="sm" className="mt-2 w-full">
            <Link href="/flashcards">復習を始める</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

function QuizStatsCard() {
  const { state } = useProgress();
  const totalQuizzes = state.quizResults.length;
  const avgScore =
    totalQuizzes > 0
      ? Math.round(
          state.quizResults.reduce((s, r) => s + r.scorePercent, 0) / totalQuizzes
        )
      : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">クイズ成績</CardTitle>
        <BookOpen className="h-4 w-4 text-blue-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{avgScore > 0 ? `${avgScore}%` : "—"}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {totalQuizzes} 回受験
        </p>
      </CardContent>
    </Card>
  );
}

const layerBorderColors: Record<string, string> = {
  layer1: "border-l-blue-500",
  layer2: "border-l-purple-500",
  layer3: "border-l-emerald-500",
};

function LayerProgress() {
  const { getTopicCompletionPercent } = useProgress();

  return (
    <div className="space-y-6">
      {layers.map((layer) => {
        const topics = layer.topicIds.map((id) => getTopic(id));
        const layerPercent =
          topics.length > 0
            ? Math.round(
                topics.reduce(
                  (sum, t) =>
                    sum + getTopicCompletionPercent(t.id, t.lessonCount),
                  0
                ) / topics.length
              )
            : 0;

        return (
          <Card
            key={layer.id}
            className={`border-l-4 ${layerBorderColors[layer.id]}`}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">{layer.title}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {layer.subtitle} — {layer.phase}
                  </p>
                </div>
                <Badge variant="outline">{layerPercent}%</Badge>
              </div>
              <Progress value={layerPercent} className="mt-2" />
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                {topics.map((topic) => {
                  const percent = getTopicCompletionPercent(
                    topic.id,
                    topic.lessonCount
                  );
                  return (
                    <Link
                      key={topic.id}
                      href={`/lessons/${topic.id}`}
                      className="flex items-center justify-between text-sm hover:bg-accent rounded px-2 py-1.5 transition-colors"
                    >
                      <span>{topic.title}</span>
                      <div className="flex items-center gap-2">
                        <Progress value={percent} className="w-20 h-1.5" />
                        <span className="text-xs text-muted-foreground w-8 text-right">
                          {percent}%
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default function DashboardPage() {
  return (
    <>
      <Header title="ダッシュボード" />
      <main className="p-4 md:p-6 space-y-6 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <OverallProgress />
          <StreakCard />
          <DueFlashcardsCard />
          <QuizStatsCard />
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3">フェーズ別進捗</h2>
          <LayerProgress />
        </div>
      </main>
    </>
  );
}
