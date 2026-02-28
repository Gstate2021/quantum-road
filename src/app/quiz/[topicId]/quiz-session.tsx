"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useProgress } from "@/hooks/use-progress";
import type { Topic } from "@/types/content";
import type { QuizQuestion } from "@/types/quiz";
import Link from "next/link";
import { CheckCircle2, XCircle, RotateCcw, ArrowRight } from "lucide-react";

type Phase = "intro" | "questioning" | "feedback" | "result";

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function QuizSession({
  topic,
  questions,
}: {
  topic: Topic;
  questions: QuizQuestion[];
}) {
  const { addQuizResult, recordActivity } = useProgress();

  const shuffledQuestions = useMemo(() => shuffleArray(questions), [questions]);

  const [phase, setPhase] = useState<Phase>("intro");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, { selected: string; correct: boolean }>>({});
  const [startTime] = useState(Date.now());

  const currentQuestion = shuffledQuestions[currentIndex];
  const totalQuestions = shuffledQuestions.length;

  const handleStart = () => {
    setPhase("questioning");
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId || !currentQuestion) return;

    const isCorrect = currentQuestion.options.some(
      (o) => o.id === selectedOptionId && o.isCorrect
    );

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: { selected: selectedOptionId, correct: isCorrect },
    }));

    setPhase("feedback");
  };

  const handleNext = () => {
    setSelectedOptionId(null);
    if (currentIndex + 1 >= totalQuestions) {
      // Finish quiz
      const correctCount = Object.values(answers).filter((a) => a.correct).length;
      // Include current question's answer in count
      const currentCorrect = currentQuestion?.options.some(
        (o) => o.id === selectedOptionId && o.isCorrect
      );
      const finalCorrect = correctCount + (currentCorrect ? 1 : 0) - (answers[currentQuestion?.id]?.correct ? 1 : 0);

      const result = {
        topicId: topic.id,
        completedAt: Date.now(),
        totalQuestions,
        correctCount: Object.values({ ...answers }).filter((a) => a.correct).length,
        scorePercent: Math.round(
          (Object.values({ ...answers }).filter((a) => a.correct).length / totalQuestions) *
            100
        ),
        timeSpentSeconds: Math.round((Date.now() - startTime) / 1000),
      };

      addQuizResult(result);
      recordActivity();
      setPhase("result");
    } else {
      setCurrentIndex((prev) => prev + 1);
      setPhase("questioning");
    }
  };

  const handleRetry = () => {
    setPhase("intro");
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setAnswers({});
  };

  // Intro phase
  if (phase === "intro") {
    return (
      <>
        <Header title={`クイズ: ${topic.title}`} />
        <main className="p-4 md:p-6 max-w-2xl">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">{topic.title} クイズ</CardTitle>
              <p className="text-muted-foreground mt-2">
                {totalQuestions} 問のクイズに挑戦しましょう
              </p>
            </CardHeader>
            <CardContent className="text-center">
              <Button onClick={handleStart} size="lg">
                開始する
              </Button>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  // Result phase
  if (phase === "result") {
    const correctCount = Object.values(answers).filter((a) => a.correct).length;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);

    return (
      <>
        <Header title="クイズ結果" />
        <main className="p-4 md:p-6 max-w-2xl space-y-6">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-4xl font-bold">
                {scorePercent}%
              </CardTitle>
              <p className="text-muted-foreground mt-1">
                {correctCount} / {totalQuestions} 正解
              </p>
              <p className="text-sm text-muted-foreground">
                所要時間: {Math.round((Date.now() - startTime) / 1000)} 秒
              </p>
            </CardHeader>
            <CardContent className="flex justify-center gap-3">
              <Button onClick={handleRetry} variant="outline" className="gap-2">
                <RotateCcw className="h-4 w-4" />
                もう一度
              </Button>
              <Button asChild>
                <Link href={`/lessons/${topic.id}`}>レッスンに戻る</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Answer review */}
          <div className="space-y-3">
            <h2 className="font-semibold">回答一覧</h2>
            {shuffledQuestions.map((q, idx) => {
              const answer = answers[q.id];
              return (
                <Card
                  key={q.id}
                  className={
                    answer?.correct
                      ? "border-green-500/30"
                      : "border-red-500/30"
                  }
                >
                  <CardContent className="py-3">
                    <div className="flex items-start gap-2">
                      {answer?.correct ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-sm font-medium">
                          {idx + 1}. {q.question}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {q.explanation}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </main>
      </>
    );
  }

  // Questioning & Feedback phases
  if (!currentQuestion) return null;

  const correctOption = currentQuestion.options.find((o) => o.isCorrect);

  return (
    <>
      <Header title={`クイズ: ${topic.title}`} />
      <main className="p-4 md:p-6 max-w-2xl space-y-4">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <Progress
            value={((currentIndex + 1) / totalQuestions) * 100}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {currentIndex + 1} / {totalQuestions}
          </span>
        </div>

        {/* Question */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-base leading-relaxed">
                {currentQuestion.question}
              </CardTitle>
              <Badge variant="outline" className="ml-2 text-xs flex-shrink-0">
                {currentQuestion.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const showFeedback = phase === "feedback";
              const isCorrectOption = option.isCorrect;

              let borderClass = "border-border";
              if (showFeedback && isCorrectOption) {
                borderClass = "border-green-500 bg-green-500/10";
              } else if (showFeedback && isSelected && !isCorrectOption) {
                borderClass = "border-red-500 bg-red-500/10";
              } else if (isSelected) {
                borderClass = "border-primary";
              }

              return (
                <button
                  key={option.id}
                  onClick={() => {
                    if (phase === "questioning") setSelectedOptionId(option.id);
                  }}
                  disabled={phase === "feedback"}
                  className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${borderClass} ${
                    phase === "questioning"
                      ? "hover:border-primary/50 cursor-pointer"
                      : "cursor-default"
                  }`}
                >
                  <span className="text-sm">{option.text}</span>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Feedback */}
        {phase === "feedback" && (
          <Card
            className={
              answers[currentQuestion.id]?.correct
                ? "bg-green-500/5 border-green-500/20"
                : "bg-red-500/5 border-red-500/20"
            }
          >
            <CardContent className="py-3">
              <p className="text-sm font-medium mb-1">
                {answers[currentQuestion.id]?.correct ? "正解！" : "不正解"}
              </p>
              <p className="text-sm text-muted-foreground">
                {currentQuestion.explanation}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <div className="flex justify-end">
          {phase === "questioning" ? (
            <Button
              onClick={handleSubmitAnswer}
              disabled={!selectedOptionId}
            >
              回答する
            </Button>
          ) : (
            <Button onClick={handleNext} className="gap-2">
              {currentIndex + 1 >= totalQuestions ? "結果を見る" : "次の問題"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </main>
    </>
  );
}
