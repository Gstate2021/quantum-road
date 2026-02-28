"use client";

import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { layers } from "@/content/layers";
import { getTopic, getTopicFlashcards } from "@/content";
import { useProgress } from "@/hooks/use-progress";
import { isDue } from "@/lib/srs/sm2-algorithm";
import Link from "next/link";
import { Brain } from "lucide-react";

export default function FlashcardsHubPage() {
  const { state } = useProgress();

  return (
    <>
      <Header title="フラッシュカード" />
      <main className="p-4 md:p-6 max-w-3xl space-y-8">
        {layers.map((layer) => (
          <section key={layer.id}>
            <h2 className="text-lg font-bold mb-3">{layer.title}</h2>
            <div className="space-y-3">
              {layer.topicIds.map((topicId) => {
                const topic = getTopic(topicId);
                const cards = getTopicFlashcards(topicId);

                let dueCount = 0;
                let reviewedCount = 0;
                for (const card of cards) {
                  const cardState = state.flashcardStates[card.id];
                  if (!cardState || isDue(cardState.dueDate)) {
                    dueCount++;
                  }
                  if (cardState?.lastReviewedAt) {
                    reviewedCount++;
                  }
                }

                return (
                  <Card key={topicId}>
                    <CardContent className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-3">
                        <Brain className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-sm">{topic.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {cards.length} 枚 ・ {reviewedCount} 枚学習済み
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {dueCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {dueCount} 枚期限
                          </Badge>
                        )}
                        <Button asChild size="sm">
                          <Link href={`/flashcards/${topicId}`}>復習</Link>
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
