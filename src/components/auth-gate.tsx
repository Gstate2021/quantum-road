"use client";

import { useState, useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  isAuthenticated,
  verifyCredentials,
  setAuthenticated,
} from "@/lib/auth";
import { Atom, Loader2 } from "lucide-react";

export function AuthGate({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setAuthed(isAuthenticated());
    setChecking(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const ok = await verifyCredentials(username, password);
    if (ok) {
      setAuthenticated();
      setAuthed(true);
    } else {
      setError("IDまたはパスワードが正しくありません");
    }
    setSubmitting(false);
  };

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (authed) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Atom className="h-10 w-10 text-primary mx-auto mb-2" />
          <CardTitle className="text-xl">Quantum Road</CardTitle>
          <p className="text-sm text-muted-foreground">
            ログインして学習を開始
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-id">ID</Label>
              <Input
                id="login-id"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-pw">パスワード</Label>
              <Input
                id="login-pw"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
            </div>
            {error && (
              <p className="text-sm text-destructive">{error}</p>
            )}
            <Button
              type="submit"
              className="w-full"
              disabled={submitting || !username || !password}
            >
              {submitting && (
                <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              )}
              ログイン
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
