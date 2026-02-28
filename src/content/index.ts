import type { Topic } from "@/types/content";
import type { Lesson } from "@/types/content";
import type { QuizQuestion } from "@/types/quiz";
import type { FlashcardDefinition } from "@/types/flashcard";

// Layer 1
import { computationalComplexityMeta } from "./layer1/computational-complexity/meta";
import { computationalComplexityLessons } from "./layer1/computational-complexity/lessons";
import { computationalComplexityQuiz } from "./layer1/computational-complexity/quiz";
import { computationalComplexityFlashcards } from "./layer1/computational-complexity/flashcards";

import { mathematicalOptimizationMeta } from "./layer1/mathematical-optimization/meta";
import { mathematicalOptimizationLessons } from "./layer1/mathematical-optimization/lessons";
import { mathematicalOptimizationQuiz } from "./layer1/mathematical-optimization/quiz";
import { mathematicalOptimizationFlashcards } from "./layer1/mathematical-optimization/flashcards";

import { optimizationToolsMeta } from "./layer1/optimization-tools/meta";
import { optimizationToolsLessons } from "./layer1/optimization-tools/lessons";
import { optimizationToolsQuiz } from "./layer1/optimization-tools/quiz";
import { optimizationToolsFlashcards } from "./layer1/optimization-tools/flashcards";

import { classicalAiHybridMeta } from "./layer1/classical-ai-hybrid/meta";
import { classicalAiHybridLessons } from "./layer1/classical-ai-hybrid/lessons";
import { classicalAiHybridQuiz } from "./layer1/classical-ai-hybrid/quiz";
import { classicalAiHybridFlashcards } from "./layer1/classical-ai-hybrid/flashcards";

// Layer 2
import { currentCryptographyTopic as currentCryptographyMeta } from "./layer2/current-cryptography/meta";
import { currentCryptographyLessons } from "./layer2/current-cryptography/lessons";
import { currentCryptographyQuiz } from "./layer2/current-cryptography/quiz";
import { currentCryptographyFlashcards } from "./layer2/current-cryptography/flashcards";

import { quantumThreatTopic as quantumThreatMeta } from "./layer2/quantum-threat/meta";
import { quantumThreatLessons } from "./layer2/quantum-threat/lessons";
import { quantumThreatQuiz } from "./layer2/quantum-threat/quiz";
import { quantumThreatFlashcards } from "./layer2/quantum-threat/flashcards";

import { quantumAlgorithmsTopic as quantumAlgorithmsMeta } from "./layer2/quantum-algorithms/meta";
import { quantumAlgorithmsLessons } from "./layer2/quantum-algorithms/lessons";
import { quantumAlgorithmsQuiz } from "./layer2/quantum-algorithms/quiz";
import { quantumAlgorithmsFlashcards } from "./layer2/quantum-algorithms/flashcards";

import { pqcStandardsTopic as pqcStandardsMeta } from "./layer2/pqc-standards/meta";
import { pqcStandardsLessons } from "./layer2/pqc-standards/lessons";
import { pqcStandardsQuiz } from "./layer2/pqc-standards/quiz";
import { pqcStandardsFlashcards } from "./layer2/pqc-standards/flashcards";

import { hybridDesignTopic as hybridDesignMeta } from "./layer2/hybrid-design/meta";
import { hybridDesignLessons } from "./layer2/hybrid-design/lessons";
import { hybridDesignQuiz } from "./layer2/hybrid-design/quiz";
import { hybridDesignFlashcards } from "./layer2/hybrid-design/flashcards";

// Layer 3
import { pqcMigrationMeta } from "./layer3/pqc-migration/meta";
import { pqcMigrationLessons } from "./layer3/pqc-migration/lessons";
import { pqcMigrationQuiz } from "./layer3/pqc-migration/quiz";
import { pqcMigrationFlashcards } from "./layer3/pqc-migration/flashcards";

import { computationalAssessmentMeta } from "./layer3/computational-assessment/meta";
import { computationalAssessmentLessons } from "./layer3/computational-assessment/lessons";
import { computationalAssessmentQuiz } from "./layer3/computational-assessment/quiz";
import { computationalAssessmentFlashcards } from "./layer3/computational-assessment/flashcards";

import { quantumInspiredOptimizationMeta } from "./layer3/quantum-inspired-optimization/meta";
import { quantumInspiredOptimizationLessons } from "./layer3/quantum-inspired-optimization/lessons";
import { quantumInspiredOptimizationQuiz } from "./layer3/quantum-inspired-optimization/quiz";
import { quantumInspiredOptimizationFlashcards } from "./layer3/quantum-inspired-optimization/flashcards";

import { quantumLiteracyTrainingMeta } from "./layer3/quantum-literacy-training/meta";
import { quantumLiteracyTrainingLessons } from "./layer3/quantum-literacy-training/lessons";
import { quantumLiteracyTrainingQuiz } from "./layer3/quantum-literacy-training/quiz";
import { quantumLiteracyTrainingFlashcards } from "./layer3/quantum-literacy-training/flashcards";

// Topic registry
const topicMap: Record<string, Topic> = {
  "computational-complexity": computationalComplexityMeta,
  "mathematical-optimization": mathematicalOptimizationMeta,
  "optimization-tools": optimizationToolsMeta,
  "classical-ai-hybrid": classicalAiHybridMeta,
  "current-cryptography": currentCryptographyMeta,
  "quantum-threat": quantumThreatMeta,
  "quantum-algorithms": quantumAlgorithmsMeta,
  "pqc-standards": pqcStandardsMeta,
  "hybrid-design": hybridDesignMeta,
  "pqc-migration": pqcMigrationMeta,
  "computational-assessment": computationalAssessmentMeta,
  "quantum-inspired-optimization": quantumInspiredOptimizationMeta,
  "quantum-literacy-training": quantumLiteracyTrainingMeta,
};

const lessonsMap: Record<string, readonly Lesson[]> = {
  "computational-complexity": computationalComplexityLessons,
  "mathematical-optimization": mathematicalOptimizationLessons,
  "optimization-tools": optimizationToolsLessons,
  "classical-ai-hybrid": classicalAiHybridLessons,
  "current-cryptography": currentCryptographyLessons,
  "quantum-threat": quantumThreatLessons,
  "quantum-algorithms": quantumAlgorithmsLessons,
  "pqc-standards": pqcStandardsLessons,
  "hybrid-design": hybridDesignLessons,
  "pqc-migration": pqcMigrationLessons,
  "computational-assessment": computationalAssessmentLessons,
  "quantum-inspired-optimization": quantumInspiredOptimizationLessons,
  "quantum-literacy-training": quantumLiteracyTrainingLessons,
};

const quizMap: Record<string, readonly QuizQuestion[]> = {
  "computational-complexity": computationalComplexityQuiz,
  "mathematical-optimization": mathematicalOptimizationQuiz,
  "optimization-tools": optimizationToolsQuiz,
  "classical-ai-hybrid": classicalAiHybridQuiz,
  "current-cryptography": currentCryptographyQuiz,
  "quantum-threat": quantumThreatQuiz,
  "quantum-algorithms": quantumAlgorithmsQuiz,
  "pqc-standards": pqcStandardsQuiz,
  "hybrid-design": hybridDesignQuiz,
  "pqc-migration": pqcMigrationQuiz,
  "computational-assessment": computationalAssessmentQuiz,
  "quantum-inspired-optimization": quantumInspiredOptimizationQuiz,
  "quantum-literacy-training": quantumLiteracyTrainingQuiz,
};

const flashcardsMap: Record<string, readonly FlashcardDefinition[]> = {
  "computational-complexity": computationalComplexityFlashcards,
  "mathematical-optimization": mathematicalOptimizationFlashcards,
  "optimization-tools": optimizationToolsFlashcards,
  "classical-ai-hybrid": classicalAiHybridFlashcards,
  "current-cryptography": currentCryptographyFlashcards,
  "quantum-threat": quantumThreatFlashcards,
  "quantum-algorithms": quantumAlgorithmsFlashcards,
  "pqc-standards": pqcStandardsFlashcards,
  "hybrid-design": hybridDesignFlashcards,
  "pqc-migration": pqcMigrationFlashcards,
  "computational-assessment": computationalAssessmentFlashcards,
  "quantum-inspired-optimization": quantumInspiredOptimizationFlashcards,
  "quantum-literacy-training": quantumLiteracyTrainingFlashcards,
};

// Public API
export function getAllTopics(): Topic[] {
  return Object.values(topicMap);
}

export function getTopic(topicId: string): Topic {
  const topic = topicMap[topicId];
  if (!topic) throw new Error(`Topic not found: ${topicId}`);
  return topic;
}

export function getTopicLessons(topicId: string): readonly Lesson[] {
  return lessonsMap[topicId] ?? [];
}

export function getLesson(topicId: string, lessonId: string): Lesson | undefined {
  return getTopicLessons(topicId).find((l) => l.id === lessonId);
}

export function getTopicQuiz(topicId: string): readonly QuizQuestion[] {
  return quizMap[topicId] ?? [];
}

export function getTopicFlashcards(topicId: string): readonly FlashcardDefinition[] {
  return flashcardsMap[topicId] ?? [];
}

export function getAllFlashcards(): FlashcardDefinition[] {
  return Object.values(flashcardsMap).flat();
}
