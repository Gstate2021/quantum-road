import { getAllTopics, getTopic, getTopicQuiz } from "@/content";
import { QuizSession } from "./quiz-session";

export function generateStaticParams() {
  return getAllTopics().map((topic) => ({
    topicId: topic.id,
  }));
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ topicId: string }>;
}) {
  const { topicId } = await params;
  const topic = getTopic(topicId);
  const questions = getTopicQuiz(topicId);

  return <QuizSession topic={topic} questions={[...questions]} />;
}
