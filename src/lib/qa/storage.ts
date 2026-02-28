import { getSupabase, isSupabaseConfigured } from "@/lib/supabase";

const QA_LOCAL_KEY = "quantum-road-qa";

export interface QaEntry {
  readonly id: string;
  readonly topicId: string;
  readonly lessonId: string;
  readonly topicTitle: string;
  readonly lessonTitle: string;
  readonly question: string;
  readonly answer: string;
  readonly timestamp: string;
}

// ─── Supabase operations ───

async function supabaseInsert(entry: QaEntry): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;

  const { error } = await sb.from("qa_entries").insert({
    id: entry.id,
    topic_id: entry.topicId,
    lesson_id: entry.lessonId,
    topic_title: entry.topicTitle,
    lesson_title: entry.lessonTitle,
    question: entry.question,
    answer: entry.answer,
    created_at: entry.timestamp,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return false;
  }
  return true;
}

async function supabaseFetchAll(): Promise<QaEntry[] | null> {
  const sb = getSupabase();
  if (!sb) return null;

  const { data, error } = await sb
    .from("qa_entries")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    console.error("Supabase fetch error:", error);
    return null;
  }

  return (data ?? []).map((row) => ({
    id: row.id as string,
    topicId: row.topic_id as string,
    lessonId: row.lesson_id as string,
    topicTitle: row.topic_title as string,
    lessonTitle: row.lesson_title as string,
    question: row.question as string,
    answer: row.answer as string,
    timestamp: row.created_at as string,
  }));
}

async function supabaseDelete(id: string): Promise<boolean> {
  const sb = getSupabase();
  if (!sb) return false;

  const { error } = await sb.from("qa_entries").delete().eq("id", id);
  if (error) {
    console.error("Supabase delete error:", error);
    return false;
  }
  return true;
}

// ─── localStorage fallback ───

function localLoad(): QaEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(QA_LOCAL_KEY);
    return raw ? (JSON.parse(raw) as QaEntry[]) : [];
  } catch {
    return [];
  }
}

function localSave(entries: QaEntry[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(QA_LOCAL_KEY, JSON.stringify(entries));
}

// ─── Public API (Supabase-first, localStorage fallback) ───

export async function loadQaHistory(): Promise<QaEntry[]> {
  if (isSupabaseConfigured()) {
    const remote = await supabaseFetchAll();
    if (remote) return remote;
  }
  return localLoad();
}

export async function saveQaEntry(entry: QaEntry): Promise<void> {
  // Always save to localStorage as cache
  const local = localLoad();
  local.unshift(entry);
  localSave(local.slice(0, 200));

  // Also save to Supabase if configured
  if (isSupabaseConfigured()) {
    await supabaseInsert(entry);
  }
}

export async function deleteQaEntry(id: string): Promise<void> {
  const local = localLoad().filter((e) => e.id !== id);
  localSave(local);

  if (isSupabaseConfigured()) {
    await supabaseDelete(id);
  }
}

export async function getStumblingPoints(): Promise<
  {
    lessonKey: string;
    topicId: string;
    lessonId: string;
    topicTitle: string;
    lessonTitle: string;
    count: number;
    recentQuestions: string[];
  }[]
> {
  const history = await loadQaHistory();
  const grouped = new Map<
    string,
    {
      topicId: string;
      lessonId: string;
      topicTitle: string;
      lessonTitle: string;
      questions: string[];
    }
  >();

  for (const entry of history) {
    const key = `${entry.topicId}/${entry.lessonId}`;
    const existing = grouped.get(key);
    if (existing) {
      existing.questions.push(entry.question);
    } else {
      grouped.set(key, {
        topicId: entry.topicId,
        lessonId: entry.lessonId,
        topicTitle: entry.topicTitle,
        lessonTitle: entry.lessonTitle,
        questions: [entry.question],
      });
    }
  }

  return Array.from(grouped.entries())
    .map(([lessonKey, data]) => ({
      lessonKey,
      topicId: data.topicId,
      lessonId: data.lessonId,
      topicTitle: data.topicTitle,
      lessonTitle: data.lessonTitle,
      count: data.questions.length,
      recentQuestions: data.questions.slice(0, 5),
    }))
    .sort((a, b) => b.count - a.count);
}
