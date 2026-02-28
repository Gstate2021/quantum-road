import { getAllTopics, getTopicLessons, getTopic, getLesson } from "@/content";
import { LessonView } from "./lesson-view";

export function generateStaticParams() {
  return getAllTopics().flatMap((topic) =>
    getTopicLessons(topic.id).map((lesson) => ({
      topicId: topic.id,
      lessonId: lesson.id,
    }))
  );
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ topicId: string; lessonId: string }>;
}) {
  const { topicId, lessonId } = await params;
  const topic = getTopic(topicId);
  const lesson = getLesson(topicId, lessonId);
  const allLessons = getTopicLessons(topicId);

  if (!lesson) {
    return <div className="p-6">Lesson not found</div>;
  }

  const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  return (
    <LessonView
      topic={topic}
      lesson={lesson}
      prevLesson={prevLesson ?? undefined}
      nextLesson={nextLesson ?? undefined}
    />
  );
}
