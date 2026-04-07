// types.ts — Lesson data types
//
// A Lesson corresponds 1:1 with a grammar topic.
// The `topic` field must match GrammarExercise.topic exactly
// so the "Practice This Topic" deep-link can auto-start the right exercises.

import type { Level } from '../../store/useLevelStore';

export type LessonExample = {
  german:  string;
  english: string;
  note?:   string; // optional grammar note shown in blue below the example
};

export type Lesson = {
  topic:          string;           // must match GrammarExercise.topic exactly
  level:          Level;
  title:          string;
  explanation:    string;           // 2-3 paragraphs separated by \n\n
  keyPoints:      string[];         // 3-5 bullet points
  examples:       LessonExample[];  // 4-6 worked examples
  commonMistake:  string;           // plain text, includes wrong + correct form
  buildingOn?:    string;           // only used for A2 "Reflexive verbs"
};
