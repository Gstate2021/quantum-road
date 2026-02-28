"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  loadQaHistory,
  getStumblingPoints,
  deleteQaEntry,
  type QaEntry,
} from "@/lib/qa/storage";
import Link from "next/link";
import {
  AlertTriangle,
  MessageCircleQuestion,
  Trash2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type StumblingPoint = Awaited<ReturnType<typeof getStumblingPoints>>[number];

export default function QaPage() {
  const [stumblingPoints, setStumblingPoints] = useState<StumblingPoint[]>([]);
  const [history, setHistory] = useState<QaEntry[]>([]);
  const [view, setView] = useState<"stumbling" | "history">("stumbling");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const refresh = async () => {
    const [sp, h] = await Promise.all([getStumblingPoints(), loadQaHistory()]);
    setStumblingPoints(sp);
    setHistory(h);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteQaEntry(id);
    refresh();
  };

  return (
    <>
      <Header title="質問履歴・つまづきポイント" />
      <main className="p-4 md:p-6 max-w-3xl space-y-6">
        {/* View toggle */}
        <div className="flex gap-2">
          <Button
            variant={view === "stumbling" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("stumbling")}
            className="gap-2"
          >
            <AlertTriangle className="h-4 w-4" />
            つまづきポイント
          </Button>
          <Button
            variant={view === "history" ? "default" : "outline"}
            size="sm"
            onClick={() => setView("history")}
            className="gap-2"
          >
            <MessageCircleQuestion className="h-4 w-4" />
            全履歴 ({history.length})
          </Button>
        </div>

        {view === "stumbling" ? (
          <>
            <p className="text-sm text-muted-foreground">
              質問が多いレッスンほど上に表示されます。復習の優先順位付けに活用できます。
            </p>

            {stumblingPoints.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  <MessageCircleQuestion className="h-8 w-8 mx-auto mb-2 opacity-40" />
                  <p className="text-sm">
                    まだ質問履歴がありません。
                    <br />
                    レッスン画面の右下ボタンからAIに質問してみましょう。
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {stumblingPoints.map((point) => (
                  <Card key={point.lessonKey}>
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant="destructive"
                              className="text-xs shrink-0"
                            >
                              {point.count} 回質問
                            </Badge>
                            <p className="text-xs text-muted-foreground truncate">
                              {point.topicTitle}
                            </p>
                          </div>
                          <Link
                            href={`/lessons/${point.topicId}/${point.lessonId}`}
                            className="font-medium text-sm hover:underline"
                          >
                            {point.lessonTitle}
                          </Link>
                          <div className="mt-2 space-y-1">
                            {point.recentQuestions.map((q, i) => (
                              <p
                                key={i}
                                className="text-xs text-muted-foreground pl-3 border-l-2 border-muted"
                              >
                                {q}
                              </p>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="shrink-0"
                        >
                          <Link
                            href={`/lessons/${point.topicId}/${point.lessonId}`}
                          >
                            復習
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {history.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  <p className="text-sm">質問履歴がありません</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {history.map((entry) => {
                  const isExpanded = expandedId === entry.id;
                  return (
                    <Card key={entry.id}>
                      <CardContent className="py-3">
                        <div
                          className="flex items-start justify-between gap-2 cursor-pointer"
                          onClick={() =>
                            setExpandedId(isExpanded ? null : entry.id)
                          }
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-xs text-muted-foreground">
                                {entry.topicTitle} / {entry.lessonTitle}
                              </p>
                              <span className="text-xs text-muted-foreground ml-auto shrink-0">
                                {new Date(entry.timestamp).toLocaleDateString(
                                  "ja-JP"
                                )}
                              </span>
                            </div>
                            <p className="text-sm font-medium">
                              {entry.question}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {isExpanded ? (
                              <ChevronUp className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            )}
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="mt-3 space-y-2">
                            <div className="p-3 bg-muted/50 rounded-md text-sm whitespace-pre-wrap max-h-64 overflow-y-auto">
                              {entry.answer}
                            </div>
                            <div className="flex justify-end">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive h-7 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDelete(entry.id);
                                }}
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                削除
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
