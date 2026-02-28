-- Quantum Road Q&A History Table
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)

create table if not exists qa_entries (
  id text primary key,
  topic_id text not null,
  lesson_id text not null,
  topic_title text not null,
  lesson_title text not null,
  question text not null,
  answer text not null,
  created_at timestamptz not null default now()
);

-- Index for fast queries by lesson
create index if not exists idx_qa_entries_lesson
  on qa_entries (topic_id, lesson_id);

-- Index for ordering by date
create index if not exists idx_qa_entries_created
  on qa_entries (created_at desc);

-- Enable Row Level Security
alter table qa_entries enable row level security;

-- Allow all operations via anon key (personal app, auth handled client-side)
create policy "Allow all for anon" on qa_entries
  for all
  using (true)
  with check (true);
