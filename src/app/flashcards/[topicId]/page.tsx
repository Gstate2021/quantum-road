import { getAllTopics, getTopic, getTopicFlashcards } from "@/content";
import { FlashcardSession } from "./flashcard-session";

export function generateStaticParams() {
  return getAllTopics().map((topic) => ({
    topicId: topic.id,
  }));
}

export default async function FlashcardPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  const cards = getTopicFlashcards(topicId);

  return <FlashcardSession topic={topic} cards={[...cards]} />;
}
