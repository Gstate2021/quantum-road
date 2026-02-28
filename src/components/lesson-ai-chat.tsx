"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { chatStream } from "@/lib/ai/client";
import { getAiApiKey } from "@/lib/ai/storage";
import { saveQaEntry } from "@/lib/qa/storage";
import { useProgress } from "@/hooks/use-progress";
import type { Lesson, Topic } from "@/types/content";
import {
  MessageCircleQuestion,
  X,
  Send,
  Loader2,
  Settings,
} from "lucide-react";
import Link from "next/link";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function buildLessonContext(topic: Topic, lesson: Lesson): string {
  const sectionTexts = lesson.sections
    .map((s) => s.content)
    .join("\n\n");

  const concepts = lesson.keyConcepts
    .map((c) => `- ${c.term} (${c.termEn}): ${c.definition}`)
    .join("\n");

  return `あなたは量子コンピューティング・暗号技術・数理最適化の専門チューターです。
学習者が以下のレッスンを勉強中です。質問にはこのレッスンの内容に基づいて正確に回答してください。

## 現在のトピック: ${topic.title}
## 現在のレッスン: ${lesson.title}

### レッスン内容:
${sectionTexts}

### 重要概念:
${concepts}

## 回答ルール:
- 日本語で回答
- レッスン内容に基づいた正確な回答を優先
- レッスン範囲外の質問には、そのことを明示した上で回答
- 具体例や比喩を使ってわかりやすく説明
- 誤情報を避け、不確かな場合は「確認が必要」と明示`;
}

function renderMarkdown(text: string) {
  return text.split("\n").map((line, i) => {
    const processed = line
      .replace(
        /\*\*(.+?)\*\*/g,
        '<strong class="font-semibold">$1</strong>'
      )
      .replace(
        /`([^`]+)`/g,
        '<code class="bg-muted px-1 py-0.5 rounded text-xs">$1</code>'
      );

    if (line.startsWith("### "))
      return (
        <h3
          key={i}
          className="font-bold text-sm mt-2 mb-1"
          dangerouslySetInnerHTML={{ __html: processed.slice(4) }}
        />
      );
    if (line.startsWith("## "))
      return (
        <h2
          key={i}
          className="font-bold text-base mt-3 mb-1"
          dangerouslySetInnerHTML={{ __html: processed.slice(3) }}
        />
      );
    if (line.startsWith("- "))
      return (
        <li
          key={i}
          className="ml-3 list-disc text-xs"
          dangerouslySetInnerHTML={{ __html: processed.slice(2) }}
        />
      );
    if (line.trim() === "") return <br key={i} />;
    return (
      <p
        key={i}
        className="text-xs"
        dangerouslySetInnerHTML={{ __html: processed }}
      />
    );
  });
}

export function LessonAiChat({
  topic,
  lesson,
}: {
  topic: Topic;
  lesson: Lesson;
}) {
  const { state } = useProgress();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  // Reset when lesson changes
  useEffect(() => {
    setMessages([]);
    setStreamingContent("");
  }, [lesson.id]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || isStreaming) return;

    const apiKey = getAiApiKey();
    if (!apiKey) {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: input.trim() },
        {
          role: "assistant",
          content:
            "APIキーが設定されていません。設定ページで API キーを登録してください。",
        },
      ]);
      setInput("");
      return;
    }

    const userMsg: Message = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);
    setStreamingContent("");

    try {
      const systemPrompt = buildLessonContext(topic, lesson);
      const chatMessages = [
        { role: "system" as const, content: systemPrompt },
        ...updatedMessages.map((m) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ];

      let fullResponse = "";
      const stream = chatStream(chatMessages, {
        provider: state.settings.aiProvider,
        model: state.settings.aiModel,
        apiKey,
        baseUrl: state.settings.aiBaseUrl || undefined,
      });

      for await (const chunk of stream) {
        fullResponse += chunk;
        setStreamingContent(fullResponse);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fullResponse },
      ]);

      // Save Q&A to history
      saveQaEntry({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        topicId: topic.id,
        lessonId: lesson.id,
        topicTitle: topic.title,
        lessonTitle: lesson.title,
        question: userMsg.content,
        answer: fullResponse,
        timestamp: new Date().toISOString(),
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: `エラー: ${msg}` },
      ]);
    } finally {
      setIsStreaming(false);
      setStreamingContent("");
    }
  }, [input, isStreaming, messages, topic, lesson, state.settings]);

  if (!open) {
    return (
      <Button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50 p-0"
        title="AIに質問する"
      >
        <MessageCircleQuestion className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 w-96 h-[32rem] flex flex-col shadow-2xl z-50 border">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-muted/30">
        <div className="flex items-center gap-2 min-w-0">
          <MessageCircleQuestion className="h-4 w-4 shrink-0 text-primary" />
          <span className="text-sm font-medium truncate">
            AIに質問 — {lesson.title}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
            <Link href="/settings" title="AI設定">
              <Settings className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.length === 0 && !isStreaming && (
          <div className="text-center py-8 text-muted-foreground">
            <MessageCircleQuestion className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p className="text-xs">
              このレッスンについて
              <br />
              何でも質問してください
            </p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-lg px-3 py-2 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground text-xs"
                  : "bg-muted text-xs"
              }`}
            >
              {msg.role === "assistant" ? (
                <div className="space-y-0.5">
                  {renderMarkdown(msg.content)}
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{msg.content}</p>
              )}
            </div>
          </div>
        ))}

        {isStreaming && streamingContent && (
          <div className="flex justify-start">
            <div className="max-w-[85%] rounded-lg px-3 py-2 bg-muted text-xs">
              <div className="space-y-0.5">
                {renderMarkdown(streamingContent)}
              </div>
              <span className="inline-block w-1.5 h-3 bg-foreground animate-pulse ml-0.5" />
            </div>
          </div>
        )}

        {isStreaming && !streamingContent && (
          <div className="flex justify-start">
            <div className="rounded-lg px-3 py-2 bg-muted">
              <Loader2 className="h-4 w-4 animate-spin" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-3 flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="質問を入力..."
          className="text-sm h-9"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          disabled={isStreaming}
        />
        <Button
          onClick={handleSend}
          disabled={isStreaming || !input.trim()}
          size="icon"
          className="h-9 w-9 shrink-0"
        >
          {isStreaming ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </Card>
  );
}
