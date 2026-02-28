"use client";

import { useState, useMemo } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/hooks/use-progress";
import {
  calculateSM2,
  getNextReviewDate,
  isDue,
  createInitialFlashcardState,
} from "@/lib/srs/sm2-algorithm";
import { REVIEW_BUTTON_TO_GRADE, type ReviewButton } from "@/types/flashcard";
import type { FlashcardDefinition } from "@/types/flashcard";
import type { Topic } from "@/types/content";
import Link from "next/link";
import { RotateCcw, CheckCircle2 } from "lucide-react";

const REVIEW_BUTTONS: { key: ReviewButton; label: string; color: string }[] = [
  { key: "again", label: "もう一度", color: "bg-red-500 hover:bg-red-600 text-white" },
  { key: "hard", label: "難しい", color: "bg-orange-500 hover:bg-orange-600 text-white" },
  { key: "good", label: "普通", color: "bg-blue-500 hover:bg-blue-600 text-white" },
  { key: "easy", label: "簡単", color: "bg-green-500 hover:bg-green-600 text-white" },
];

export function FlashcardSession({
  topic,
  cards,
}: {
  topic: Topic;
  cards: FlashcardDefinition[];
}) {
  const { state, getFlashcardState, updateFlashcardState, recordActivity } =
    useProgress();

  // Filter to due cards
  const dueCards = useMemo(() => {
    return cards.filter((card) => {
      const cardState = getFlashcardState(card.id);
      return !cardState || isDue(cardState.dueDate);
    });
  }, [cards, getFlashcardState]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewedCount, setReviewedCount] = useState(0);
  const [finished, setFinished] = useState(dueCards.length === 0);

  const currentCard = dueCards[currentIndex];

  const handleFlip = () => setIsFlipped(true);

  const handleReview = (button: ReviewButton) => {
    if (!currentCard) return;

    const grade = REVIEW_BUTTON_TO_GRADE[button];
    const existingState =
      getFlashcardState(currentCard.id) ??
      createInitialFlashcardState(currentCard.id);

    const result = calculateSM2({
      repetition: existingState.repetition,
      easeFactor: existingState.easeFactor,
      interval: existingState.interval,
      grade,
    });

    updateFlashcardState({
      cardId: currentCard.id,
      repetition: result.repetition,
      easeFactor: result.easeFactor,
      interval: result.interval,
      dueDate: getNextReviewDate(result.interval),
      lastReviewedAt: new Date().toISOString(),
    });

    recordActivity();
    setReviewedCount((prev) => prev + 1);
    setIsFlipped(false);

    if (currentIndex + 1 >= dueCards.length) {
      setFinished(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Finished state
  if (finished) {
    return (
      <>
        <Header title={`フラッシュカード: ${topic.title}`} />
        <main className="p-4 md:p-6 max-w-2xl">
          <Card>
            <CardContent className="text-center py-8 space-y-4">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
              <h2 className="text-xl font-bold">
                {dueCards.length === 0
                  ? "復習するカードがありません"
                  : "セッション完了！"}
              </h2>
              {reviewedCount > 0 && (
                <p className="text-muted-foreground">
                  {reviewedCount} 枚のカードを復習しました
                </p>
              )}
              <div className="flex justify-center gap-3">
                <Button asChild variant="outline">
                  <Link href="/flashcards">一覧に戻る</Link>
                </Button>
                <Button asChild>
                  <Link href="/">ダッシュボードへ</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </>
    );
  }

  if (!currentCard) return null;

  return (
    <>
      <Header title={`フラッシュカード: ${topic.title}`} />
      <main className="p-4 md:p-6 max-w-2xl space-y-4">
        {/* Progress */}
        <div className="flex items-center gap-3">
          <Progress
            value={((currentIndex + 1) / dueCards.length) * 100}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground">
            {currentIndex + 1} / {dueCards.length}
          </span>
        </div>

        {/* Flashcard */}
        <div
          className="perspective-1000 cursor-pointer"
          onClick={() => {
            if (!isFlipped) handleFlip();
          }}
          style={{ perspective: "1000px" }}
        >
          <div
            className="relative transition-transform duration-500"
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
              minHeight: 250,
            }}
          >
            {/* Front */}
            <Card
              className="absolute inset-0 flex items-center justify-center"
              style={{ backfaceVisibility: "hidden" }}
            >
              <CardContent className="text-center p-8">
                <p className="text-lg font-medium">{currentCard.front}</p>
                <p className="text-sm text-muted-foreground mt-4">
                  クリックして回答を確認
                </p>
              </CardContent>
            </Card>

            {/* Back */}
            <Card
              className="absolute inset-0 flex items-center justify-center"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <CardContent className="p-8">
                <div className="text-sm space-y-2">
                  {currentCard.back.split("\n").map((line, i) => {
                    if (line.startsWith("**") && line.endsWith("**")) {
                      return (
                        <p key={i} className="font-semibold">
                          {line.slice(2, -2)}
                        </p>
                      );
                    }
                    if (line.startsWith("- ")) {
                      return (
                        <li key={i} className="ml-4 list-disc">
                          {line.slice(2)}
                        </li>
                      );
                    }
                    if (line.trim() === "") return <br key={i} />;
                    return <p key={i}>{line}</p>;
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Review buttons (shown after flip) */}
        {isFlipped && (
          <div className="grid grid-cols-4 gap-2">
            {REVIEW_BUTTONS.map((btn) => {
              const existingState =
                getFlashcardState(currentCard.id) ??
                createInitialFlashcardState(currentCard.id);
              const grade = REVIEW_BUTTON_TO_GRADE[btn.key];
              const result = calculateSM2({
                repetition: existingState.repetition,
                easeFactor: existingState.easeFactor,
                interval: existingState.interval,
                grade,
              });

              return (
                <button
                  key={btn.key}
                  onClick={() => handleReview(btn.key)}
                  className={`py-3 px-2 rounded-lg text-sm font-medium transition-colors ${btn.color}`}
                >
                  <div>{btn.label}</div>
                  <div className="text-xs opacity-75 mt-0.5">
                    {result.interval === 0
                      ? "すぐ"
                      : result.interval === 1
                      ? "1日後"
                      : `${result.interval}日後`}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </main>
    </>
  );
}
