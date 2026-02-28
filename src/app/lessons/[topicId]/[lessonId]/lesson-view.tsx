"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useProgress } from "@/hooks/use-progress";
import type { Topic, Lesson, LessonSection, KeyConcept } from "@/types/content";
import Link from "next/link";
import { LessonAiChat } from "@/components/lesson-ai-chat";
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Info,
  AlertTriangle,
  Lightbulb,
  AlertCircle,
} from "lucide-react";

function SectionRenderer({ section }: { section: LessonSection }) {
  switch (section.type) {
    case "text":
      return (
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {section.content.split("\n").map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2 key={i} className="text-xl font-bold mt-6 mb-3">
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("### ")) {
              return (
                <h3 key={i} className="text-lg font-semibold mt-4 mb-2">
                  {line.replace("### ", "")}
                </h3>
              );
            }
            if (line.startsWith("- ")) {
              return (
                <li key={i} className="ml-4 list-disc">
                  {line.replace("- ", "")}
                </li>
              );
            }
            if (line.trim() === "") return <br key={i} />;
            return (
              <p key={i} className="mb-2 leading-relaxed">
                {renderInlineMarkdown(line)}
              </p>
            );
          })}
        </div>
      );

    case "code":
      return (
        <div className="my-4">
          {section.language && (
            <div className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-t font-mono">
              {section.language}
            </div>
          )}
          <pre className="bg-muted/50 border rounded-b p-4 overflow-x-auto text-sm font-mono">
            <code>{section.content}</code>
          </pre>
        </div>
      );

    case "callout": {
      const icons = {
        info: <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />,
        warning: <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0" />,
        tip: <Lightbulb className="h-4 w-4 text-green-500 flex-shrink-0" />,
        important: <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />,
      };
      const bgColors = {
        info: "bg-blue-500/5 border-blue-500/20",
        warning: "bg-yellow-500/5 border-yellow-500/20",
        tip: "bg-green-500/5 border-green-500/20",
        important: "bg-red-500/5 border-red-500/20",
      };
      const type = section.calloutType ?? "info";
      return (
        <div className={`my-4 p-4 rounded-lg border ${bgColors[type]} flex gap-3`}>
          {icons[type]}
          <p className="text-sm">{section.content}</p>
        </div>
      );
    }

    case "example":
      return (
        <Card className="my-4 bg-accent/30">
          <CardContent className="pt-4">
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {section.content.split("\n").map((line, i) => {
                if (line.startsWith("### ")) {
                  return (
                    <h3 key={i} className="text-base font-semibold mb-2">
                      {line.replace("### ", "")}
                    </h3>
                  );
                }
                if (line.trim() === "") return <br key={i} />;
                return (
                  <p key={i} className="text-sm mb-1">
                    {renderInlineMarkdown(line)}
                  </p>
                );
              })}
            </div>
          </CardContent>
        </Card>
      );

    case "diagram":
      return (
        <div className="my-4 p-6 bg-muted/30 border rounded-lg text-center text-sm text-muted-foreground">
          {section.content}
        </div>
      );

    default:
      return null;
  }
}

function renderInlineMarkdown(text: string) {
  // Handle **bold** and `code`
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="bg-muted px-1 py-0.5 rounded text-sm font-mono">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

function KeyConceptCard({ concept }: { concept: KeyConcept }) {
  return (
    <Card>
      <CardContent className="py-3">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-sm">{concept.term}</span>
          <span className="text-xs text-muted-foreground">{concept.termEn}</span>
        </div>
        <p className="text-sm text-muted-foreground">{concept.definition}</p>
      </CardContent>
    </Card>
  );
}

export function LessonView({
  topic,
  lesson,
  prevLesson,
  nextLesson,
}: {
  topic: Topic;
  lesson: Lesson;
  prevLesson?: Lesson;
  nextLesson?: Lesson;
}) {
  const { getLessonProgress, markLessonCompleted, markLessonInProgress, recordActivity } =
    useProgress();

  const progress = getLessonProgress(lesson.id);
  const isCompleted = progress?.status === "completed";

  useEffect(() => {
    markLessonInProgress(lesson.id, topic.id);
    recordActivity();
  }, [lesson.id, topic.id, markLessonInProgress, recordActivity]);

  const handleComplete = () => {
    markLessonCompleted(lesson.id, topic.id);
    recordActivity();
  };

  return (
    <>
      <Header title={lesson.title} />
      <main className="p-4 md:p-6 max-w-3xl space-y-6">
        {/* Lesson meta */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <Link
            href={`/lessons/${topic.id}`}
            className="hover:text-foreground transition-colors"
          >
            {topic.title}
          </Link>
          <span>/</span>
          <span>{lesson.title}</span>
          <Badge variant="outline" className="ml-auto">
            約 {lesson.estimatedMinutes} 分
          </Badge>
        </div>

        {/* Sections */}
        <div>
          {lesson.sections.map((section, idx) => (
            <SectionRenderer key={idx} section={section} />
          ))}
        </div>

        {/* Key concepts */}
        {lesson.keyConcepts.length > 0 && (
          <div>
            <Separator className="my-6" />
            <h2 className="text-lg font-semibold mb-3">重要概念</h2>
            <div className="space-y-2">
              {lesson.keyConcepts.map((concept) => (
                <KeyConceptCard key={concept.termEn} concept={concept} />
              ))}
            </div>
          </div>
        )}

        {/* Completion toggle */}
        <Separator className="my-6" />
        <div className="flex items-center justify-center">
          <Button
            onClick={handleComplete}
            variant={isCompleted ? "outline" : "default"}
            size="lg"
            className="gap-2"
          >
            <CheckCircle2
              className={`h-5 w-5 ${isCompleted ? "text-green-500" : ""}`}
            />
            {isCompleted ? "完了済み" : "このレッスンを完了にする"}
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-4">
          {prevLesson ? (
            <Button asChild variant="ghost" size="sm">
              <Link href={`/lessons/${topic.id}/${prevLesson.id}`}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                {prevLesson.title}
              </Link>
            </Button>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Button asChild variant="ghost" size="sm">
              <Link href={`/lessons/${topic.id}/${nextLesson.id}`}>
                {nextLesson.title}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link href={`/lessons/${topic.id}`}>トピック一覧へ戻る</Link>
            </Button>
          )}
        </div>
      </main>
      <LessonAiChat topic={topic} lesson={lesson} />
    </>
  );
}
