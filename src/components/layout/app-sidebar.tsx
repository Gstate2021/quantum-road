"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  BookOpen,
  HelpCircle,
  Layers,
  Settings,
  Atom,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { layers } from "@/content/layers";
import { getTopic } from "@/content";
import { useProgress } from "@/hooks/use-progress";
import { getTopicFlashcards } from "@/content";
import { isDue } from "@/lib/srs/sm2-algorithm";

const layerColors: Record<string, string> = {
  layer1: "text-blue-500",
  layer2: "text-purple-500",
  layer3: "text-emerald-500",
};

function TopicStatusIcon({ topicId, totalLessons }: { topicId: string; totalLessons: number }) {
  const { getTopicCompletionPercent } = useProgress();
  const percent = getTopicCompletionPercent(topicId, totalLessons);

  if (percent === 100) return <span className="text-green-500 text-xs">&#10003;</span>;
  if (percent > 0) return <span className="text-yellow-500 text-xs">&#9679;</span>;
  return <span className="text-muted-foreground text-xs">&#9675;</span>;
}

function DueFlashcardCount() {
  const { state } = useProgress();
  const allCards = getTopicFlashcards;
  let dueCount = 0;

  for (const cardState of Object.values(state.flashcardStates)) {
    if (isDue(cardState.dueDate)) {
      dueCount++;
    }
  }

  if (dueCount === 0) return null;
  return (
    <Badge variant="destructive" className="ml-auto text-xs px-1.5 py-0">
      {dueCount}
    </Badge>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Atom className="h-6 w-6 text-primary" />
          <span>Quantum Road</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        {/* Main navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/"}>
                  <Link href="/">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>ダッシュボード</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/roadmap"}>
                  <Link href="/roadmap">
                    <Map className="h-4 w-4" />
                    <span>ロードマップ</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Learning layers */}
        <SidebarGroup>
          <SidebarGroupLabel>学習</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {layers.map((layer) => (
                <SidebarMenuItem key={layer.id}>
                  <SidebarMenuButton className="font-medium">
                    <Layers className={`h-4 w-4 ${layerColors[layer.id]}`} />
                    <span>{layer.title}</span>
                  </SidebarMenuButton>
                  <SidebarMenuSub>
                    {layer.topicIds.map((topicId) => {
                      const topic = getTopic(topicId);
                      const href = `/lessons/${topicId}`;
                      return (
                        <SidebarMenuSubItem key={topicId}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={pathname.startsWith(href)}
                          >
                            <Link href={href}>
                              <TopicStatusIcon
                                topicId={topicId}
                                totalLessons={topic.lessonCount}
                              />
                              <span className="ml-1">{topic.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Practice */}
        <SidebarGroup>
          <SidebarGroupLabel>演習</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname.startsWith("/quiz")}>
                  <Link href="/quiz">
                    <HelpCircle className="h-4 w-4" />
                    <span>クイズ</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith("/flashcards")}
                >
                  <Link href="/flashcards">
                    <BookOpen className="h-4 w-4" />
                    <span>フラッシュカード</span>
                    <DueFlashcardCount />
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/* AI Tools */}
        <SidebarGroup>
          <SidebarGroupLabel>AI ツール</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/updates"}>
                  <Link href="/updates">
                    <RefreshCw className="h-4 w-4" />
                    <span>鮮度チェック</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/lab"}>
                  <Link href="/lab">
                    <Sparkles className="h-4 w-4" />
                    <span>ブレストラボ</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/settings"}>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>設定</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
