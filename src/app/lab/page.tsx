"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProgress } from "@/hooks/use-progress";
import { chatStream } from "@/lib/ai/client";
import { LAB_PRESETS } from "@/lib/ai/prompts";
import { getAiApiKey } from "@/lib/ai/storage";
import type { LabSession, LabMessage } from "@/types/progress";
import {
  Sparkles,
  Plus,
  Send,
  Loader2,
  Trash2,
  MessageSquare,
} from "lucide-react";

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function renderMarkdown(text: string) {
  return text.split("\n").map((line, i) => {
    // Bold
    const processed = line.replace(
      /\*\*(.+?)\*\*/g,
      '<strong class="font-semibold">$1</strong>'
    );
    // Inline code
    const withCode = processed.replace(
      /`([^`]+)`/g,
      '<code class="bg-muted px-1 py-0.5 rounded text-sm">$1</code>'
    );

    if (line.startsWith("### ")) {
      return (
        <h3
          key={i}
          className="font-bold text-base mt-3 mb-1"
          dangerouslySetInnerHTML={{ __html: withCode.slice(4) }}
        />
      );
    }
    if (line.startsWith("## ")) {
      return (
        <h2
          key={i}
          className="font-bold text-lg mt-4 mb-1"
          dangerouslySetInnerHTML={{ __html: withCode.slice(3) }}
        />
      );
    }
    if (line.startsWith("- ")) {
      return (
        <li
          key={i}
          className="ml-4 list-disc"
          dangerouslySetInnerHTML={{ __html: withCode.slice(2) }}
        />
      );
    }
    if (line.match(/^\d+\. /)) {
      const content = line.replace(/^\d+\. /, "");
      return (
        <li
          key={i}
          className="ml-4 list-decimal"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      );
    }
    if (line.trim() === "") return <br key={i} />;
    return <p key={i} dangerouslySetInnerHTML={{ __html: withCode }} />;
  });
}

export default function LabPage() {
  const { state, addLabSession, updateLabSession, deleteLabSession } =
    useProgress();
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [showPresets, setShowPresets] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [systemPrompt, setSystemPrompt] = useState("");

  const activeSession = state.labSessions.find(
    (s) => s.id === activeSessionId
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages, streamingContent]);

  const handleNewSession = (presetId: string) => {
    const preset = LAB_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    const session: LabSession = {
      id: generateId(),
      title: preset.title,
      createdAt: new Date().toISOString(),
      messages: [],
    };

    setSystemPrompt(preset.systemPrompt);
    addLabSession(session);
    setActiveSessionId(session.id);
    setShowPresets(false);
  };

  const handleSend = useCallback(async () => {
    if (!inputValue.trim() || isStreaming || !activeSessionId) return;

    const apiKey = getAiApiKey();
    if (!apiKey) {
      alert("設定ページでAPIキーを設定してください");
      return;
    }

    const userMessage: LabMessage = {
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };

    const currentMessages = activeSession?.messages ?? [];
    const updatedMessages = [...currentMessages, userMessage];
    updateLabSession(activeSessionId, updatedMessages);
    setInputValue("");
    setIsStreaming(true);
    setStreamingContent("");

    try {
      const chatMessages = [
        ...(systemPrompt
          ? [{ role: "system" as const, content: systemPrompt }]
          : []),
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

      const assistantMessage: LabMessage = {
        role: "assistant",
        content: fullResponse,
        timestamp: new Date().toISOString(),
      };

      updateLabSession(activeSessionId, [
        ...updatedMessages,
        assistantMessage,
      ]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Unknown error";
      const errorMessage: LabMessage = {
        role: "assistant",
        content: `エラーが発生しました: ${msg}`,
        timestamp: new Date().toISOString(),
      };
      updateLabSession(activeSessionId, [
        ...updatedMessages,
        errorMessage,
      ]);
    } finally {
      setIsStreaming(false);
      setStreamingContent("");
    }
  }, [
    inputValue,
    isStreaming,
    activeSessionId,
    activeSession,
    systemPrompt,
    state.settings,
    updateLabSession,
  ]);

  const handleDeleteSession = (sessionId: string) => {
    deleteLabSession(sessionId);
    if (activeSessionId === sessionId) {
      setActiveSessionId(null);
    }
  };

  return (
    <>
      <Header title="AIブレストラボ" />
      <main className="p-4 md:p-6 max-w-5xl">
        <div className="flex gap-4 h-[calc(100vh-8rem)]">
          {/* Session list */}
          <div className="w-64 shrink-0 space-y-3">
            <Button
              onClick={() => setShowPresets(true)}
              className="w-full gap-2"
              size="sm"
            >
              <Plus className="h-4 w-4" />
              新規セッション
            </Button>

            <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-14rem)]">
              {state.labSessions.map((session) => (
                <div
                  key={session.id}
                  className={`group flex items-center gap-2 p-2 rounded-md cursor-pointer text-sm transition-colors ${
                    activeSessionId === session.id
                      ? "bg-accent"
                      : "hover:bg-accent/50"
                  }`}
                  onClick={() => {
                    setActiveSessionId(session.id);
                    setShowPresets(false);
                  }}
                >
                  <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{session.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(session.createdAt).toLocaleDateString("ja-JP")}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSession(session.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Chat area */}
          <div className="flex-1 flex flex-col min-w-0">
            {showPresets ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="space-y-4 max-w-md w-full">
                  <div className="text-center mb-6">
                    <Sparkles className="h-10 w-10 text-primary mx-auto mb-2" />
                    <h2 className="text-lg font-bold">
                      テンプレートを選択
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      ブレストのテーマを選んでください
                    </p>
                  </div>
                  {LAB_PRESETS.map((preset) => (
                    <Card
                      key={preset.id}
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleNewSession(preset.id)}
                    >
                      <CardContent className="py-3">
                        <p className="font-medium text-sm">{preset.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {preset.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : activeSession ? (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 pb-4">
                  {activeSession.messages.length === 0 && !isStreaming && (
                    <div className="text-center py-12 text-muted-foreground">
                      <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">
                        メッセージを入力して会話を始めましょう
                      </p>
                    </div>
                  )}

                  {activeSession.messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${
                        msg.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-3 text-sm ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {msg.role === "assistant" ? (
                          <div className="space-y-1">
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
                      <div className="max-w-[80%] rounded-lg px-4 py-3 text-sm bg-muted">
                        <div className="space-y-1">
                          {renderMarkdown(streamingContent)}
                        </div>
                        <span className="inline-block w-2 h-4 bg-foreground animate-pulse ml-0.5" />
                      </div>
                    </div>
                  )}

                  {isStreaming && !streamingContent && (
                    <div className="flex justify-start">
                      <div className="rounded-lg px-4 py-3 bg-muted">
                        <Loader2 className="h-4 w-4 animate-spin" />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="border-t pt-3 flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="メッセージを入力..."
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
                    disabled={isStreaming || !inputValue.trim()}
                    size="icon"
                  >
                    {isStreaming ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <Sparkles className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">
                    セッションを選択するか、新規作成してください
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
