"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useProgress } from "@/hooks/use-progress";
import { exportAppState, importAppState, resetAppState } from "@/lib/storage/local-storage";
import { getAiApiKey, setAiApiKey } from "@/lib/ai/storage";
import { testConnection } from "@/lib/ai/client";
import type { AiProvider } from "@/types/progress";
import { useTheme } from "next-themes";
import {
  Download,
  Upload,
  Trash2,
  Sun,
  Moon,
  Monitor,
  Bot,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const AI_PROVIDERS: { value: AiProvider; label: string; placeholder: string }[] = [
  { value: "gemini", label: "Google Gemini", placeholder: "gemini-3-flash-preview" },
  { value: "openai", label: "OpenAI", placeholder: "gpt-4.1-mini" },
  { value: "anthropic", label: "Anthropic", placeholder: "claude-sonnet-4-6" },
  { value: "openrouter", label: "OpenRouter", placeholder: "google/gemini-3-flash-preview" },
  { value: "custom", label: "Custom (OpenAI互換)", placeholder: "model-name" },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { state, updateSettings } = useProgress();
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  // AI settings local state
  const [apiKey, setApiKeyLocal] = useState("");
  const [testStatus, setTestStatus] = useState<{
    testing: boolean;
    result?: { ok: boolean; message: string };
  }>({ testing: false });

  useEffect(() => {
    setApiKeyLocal(getAiApiKey());
  }, []);

  const handleApiKeyChange = (value: string) => {
    setApiKeyLocal(value);
    setAiApiKey(value);
  };

  const handleTestConnection = async () => {
    setTestStatus({ testing: true });
    const result = await testConnection({
      provider: state.settings.aiProvider,
      model: state.settings.aiModel,
      apiKey,
      baseUrl: state.settings.aiBaseUrl || undefined,
    });
    setTestStatus({ testing: false, result });
  };

  const handleExport = () => {
    const json = exportAppState();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quantum-road-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const json = ev.target?.result as string;
          importAppState(json);
          window.location.reload();
        } catch {
          alert("Invalid backup file");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleReset = () => {
    resetAppState();
    setResetDialogOpen(false);
    window.location.reload();
  };

  const themes = [
    { value: "light", label: "ライト", icon: Sun },
    { value: "dark", label: "ダーク", icon: Moon },
    { value: "system", label: "システム", icon: Monitor },
  ] as const;

  const currentProviderInfo = AI_PROVIDERS.find(
    (p) => p.value === state.settings.aiProvider
  );
  const showBaseUrl =
    state.settings.aiProvider === "custom" ||
    state.settings.aiProvider === "openrouter";

  return (
    <>
      <Header title="設定" />
      <main className="p-4 md:p-6 max-w-2xl space-y-6">
        {/* Theme */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">テーマ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              {themes.map(({ value, label, icon: Icon }) => (
                <Button
                  key={value}
                  variant={theme === value ? "default" : "outline"}
                  onClick={() => {
                    setTheme(value);
                    updateSettings({ theme: value });
                  }}
                  className="gap-2 flex-1"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="h-5 w-5" />
              AI 設定
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ai-provider">プロバイダー</Label>
              <Select
                value={state.settings.aiProvider}
                onValueChange={(value: AiProvider) => {
                  updateSettings({ aiProvider: value });
                  setTestStatus({ testing: false });
                }}
              >
                <SelectTrigger id="ai-provider">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {AI_PROVIDERS.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ai-model">モデル名</Label>
              <Input
                id="ai-model"
                value={state.settings.aiModel}
                onChange={(e) => updateSettings({ aiModel: e.target.value })}
                placeholder={currentProviderInfo?.placeholder}
              />
              <p className="text-xs text-muted-foreground">
                最新モデルの名前を自由に入力できます
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ai-key">API キー</Label>
              <Input
                id="ai-key"
                type="password"
                value={apiKey}
                onChange={(e) => handleApiKeyChange(e.target.value)}
                placeholder="sk-... / AIza..."
              />
              <p className="text-xs text-muted-foreground">
                キーはブラウザの localStorage に保存されます（サーバーには送信しません）
              </p>
            </div>

            {showBaseUrl && (
              <div className="space-y-2">
                <Label htmlFor="ai-baseurl">Base URL</Label>
                <Input
                  id="ai-baseurl"
                  value={state.settings.aiBaseUrl}
                  onChange={(e) => updateSettings({ aiBaseUrl: e.target.value })}
                  placeholder={
                    state.settings.aiProvider === "openrouter"
                      ? "https://openrouter.ai/api/v1/chat/completions"
                      : "http://localhost:11434"
                  }
                />
              </div>
            )}

            <div className="flex items-center gap-3">
              <Button
                onClick={handleTestConnection}
                variant="outline"
                size="sm"
                disabled={testStatus.testing || !apiKey}
              >
                {testStatus.testing && (
                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                )}
                接続テスト
              </Button>
              {testStatus.result && (
                <span
                  className={`text-sm flex items-center gap-1 ${
                    testStatus.result.ok
                      ? "text-green-600"
                      : "text-destructive"
                  }`}
                >
                  {testStatus.result.ok ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  {testStatus.result.message}
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Data management */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">データ管理</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">データをエクスポート</p>
                <p className="text-xs text-muted-foreground">
                  学習進捗をJSONファイルとしてバックアップ
                </p>
              </div>
              <Button onClick={handleExport} variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                エクスポート
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">データをインポート</p>
                <p className="text-xs text-muted-foreground">
                  バックアップファイルから復元
                </p>
              </div>
              <Button onClick={handleImport} variant="outline" size="sm" className="gap-2">
                <Upload className="h-4 w-4" />
                インポート
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-destructive">
                  進捗をリセット
                </p>
                <p className="text-xs text-muted-foreground">
                  すべての学習データを削除
                </p>
              </div>
              <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="gap-2">
                    <Trash2 className="h-4 w-4" />
                    リセット
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>進捗をリセットしますか？</DialogTitle>
                    <DialogDescription>
                      すべてのレッスン進捗、クイズ結果、フラッシュカード学習データが削除されます。この操作は取り消せません。
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setResetDialogOpen(false)}
                    >
                      キャンセル
                    </Button>
                    <Button variant="destructive" onClick={handleReset}>
                      リセットする
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">統計情報</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1 text-muted-foreground">
            <p>
              レッスン完了数:{" "}
              {
                Object.values(state.lessonProgress).filter(
                  (p) => p.status === "completed"
                ).length
              }
            </p>
            <p>クイズ受験回数: {state.quizResults.length}</p>
            <p>
              フラッシュカード学習枚数:{" "}
              {
                Object.values(state.flashcardStates).filter(
                  (s) => s.lastReviewedAt
                ).length
              }
            </p>
            <p>連続学習日数: {state.streak.currentStreak} 日</p>
            <p>最長記録: {state.streak.longestStreak} 日</p>
          </CardContent>
        </Card>
      </main>
    </>
  );
}
