import { getTopic, getTopicLessons, getAllTopics } from "@/content";
import { TopicOverview } from "./topic-overview";

export function generateStaticParams() {
  return getAllTopics().map((topic) => ({
    topicId: topic.id,
  }));
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  const lessons = getTopicLessons(topicId);

  return <TopicOverview topic={topic} lessons={lessons} />;
}
