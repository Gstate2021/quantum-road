"use client";

import { useState, useRef, useCallback } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { layers } from "@/content/layers";
import { getTopic, getTopicLessons } from "@/content";
import { useProgress } from "@/hooks/use-progress";
import { chatStream } from "@/lib/ai/client";
import { buildFreshnessCheckPrompt } from "@/lib/ai/prompts";
import { getAiApiKey } from "@/lib/ai/storage";
import type { TopicFreshness } from "@/types/progress";
import {
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Loader2,
  Check,
} from "lucide-react";

const STATUS_CONFIG = {
  fresh: { label: "最新", icon: CheckCircle2, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  "review-needed": { label: "要確認", icon: AlertTriangle, color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  outdated: { label: "更新推奨", icon: XCircle, color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
  unchecked: { label: "未チェック", icon: HelpCircle, color: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200" },
} as const;

function parseStatusFromResult(result: string): TopicFreshness["status"] {
  if (result.includes("更新推奨")) return "outdated";
  if (result.includes("要確認")) return "review-needed";
  if (result.includes("最新")) return "fresh";
  return "review-needed";
}

export default function UpdatesPage() {
  const { state, updateTopicFreshness } = useProgress();
  const [checkingTopicId, setCheckingTopicId] = useState<string | null>(null);
  const [streamingResult, setStreamingResult] = useState<string>("");
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [batchRunning, setBatchRunning] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const checkTopic = useCallback(
    async (topicId: string) => {
      const apiKey = getAiApiKey();
      if (!apiKey) {
        alert("設定ページでAPIキーを設定してください");
        return;
      }

      setCheckingTopicId(topicId);
      setStreamingResult("");
      setExpandedTopicId(topicId);

      const topic = getTopic(topicId);
      const lessons = getTopicLessons(topicId);
      const lessonTitles = lessons.map((l) => l.title);
      const prompt = buildFreshnessCheckPrompt(topic, lessonTitles);

      let fullResult = "";
      try {
        const stream = chatStream(
          [{ role: "user", content: prompt }],
          {
            provider: state.settings.aiProvider,
            model: state.settings.aiModel,
            apiKey,
            baseUrl: state.settings.aiBaseUrl || undefined,
          }
        );

        for await (const chunk of stream) {
          fullResult += chunk;
          setStreamingResult(fullResult);
        }

        const status = parseStatusFromResult(fullResult);
        updateTopicFreshness({
          topicId,
          lastVerifiedAt: new Date().toISOString(),
          status,
          lastCheckResult: fullResult,
          keyUpdates: [],
        });
      } catch (e) {
        const msg = e instanceof Error ? e.message : "Unknown error";
        fullResult = `エラー: ${msg}`;
        setStreamingResult(fullResult);
      } finally {
        setCheckingTopicId(null);
      }
    },
    [state.settings, updateTopicFreshness]
  );

  const handleBatchCheck = async () => {
    const apiKey = getAiApiKey();
    if (!apiKey) {
      alert("設定ページでAPIキーを設定してください");
      return;
    }
    setBatchRunning(true);

    const allTopicIds = layers.flatMap((l) => l.topicIds);
    for (const topicId of allTopicIds) {
      if (!batchRunning) break;
      await checkTopic(topicId);
    }

    setBatchRunning(false);
  };

  const handleMarkVerified = (topicId: string) => {
    const existing = state.topicFreshness[topicId];
    updateTopicFreshness({
      topicId,
      lastVerifiedAt: new Date().toISOString(),
      status: "fresh",
      lastCheckResult: existing?.lastCheckResult ?? null,
      keyUpdates: existing?.keyUpdates ?? [],
    });
  };

  return (
    <>
      <Header title="コンテンツ鮮度モニター" />
      <main className="p-4 md:p-6 max-w-3xl space-y-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            各トピックの学習コンテンツが最新かどうかをAIでチェックします
          </p>
          <Button
            onClick={handleBatchCheck}
            disabled={!!checkingTopicId || batchRunning}
            variant="outline"
            size="sm"
          >
            {batchRunning ? (
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-1" />
            )}
            全トピック一括チェック
          </Button>
        </div>

        {layers.map((layer) => (
          <section key={layer.id}>
            <h2 className="text-lg font-bold mb-3">{layer.title}</h2>
            <div className="space-y-3">
              {layer.topicIds.map((topicId) => {
                const topic = getTopic(topicId);
                const freshness = state.topicFreshness[topicId];
                const status = freshness?.status ?? "unchecked";
                const config = STATUS_CONFIG[status];
                const StatusIcon = config.icon;
                const isChecking = checkingTopicId === topicId;
                const isExpanded = expandedTopicId === topicId;
                const displayResult =
                  isChecking
                    ? streamingResult
                    : isExpanded
                    ? freshness?.lastCheckResult
                    : null;

                return (
                  <Card key={topicId}>
                    <CardContent className="py-4">
                      <div className="flex items-center justify-between">
                        <div
                          className="flex items-center gap-3 flex-1 cursor-pointer"
                          onClick={() =>
                            setExpandedTopicId(
                              isExpanded ? null : topicId
                            )
                          }
                        >
                          <StatusIcon className="h-5 w-5 shrink-0" />
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">
                              {topic.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {freshness?.lastVerifiedAt
                                ? `最終チェック: ${new Date(freshness.lastVerifiedAt).toLocaleDateString("ja-JP")}`
                                : "未チェック"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge className={`text-xs ${config.color}`}>
                            {config.label}
                          </Badge>
                          {status !== "fresh" && status !== "unchecked" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleMarkVerified(topicId)}
                              title="確認済みとしてマーク"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => checkTopic(topicId)}
                            disabled={isChecking || batchRunning}
                          >
                            {isChecking ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <RefreshCw className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      {displayResult && (
                        <div className="mt-4 p-3 rounded-md bg-muted/50 text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                          {displayResult}
                          {isChecking && (
                            <span className="inline-block w-2 h-4 bg-foreground animate-pulse ml-0.5" />
                          )}
                        </div>
                      )}
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
