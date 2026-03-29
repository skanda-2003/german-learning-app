// useSpacedRepetition.ts — Custom hook that manages the flashcard study queue.
//
// How it works:
//   - The queue starts as a shuffled copy of the word list.
//   - The current word is always the first item in the queue.
//   - markKnown()   → removes the word permanently. You won't see it again this session.
//   - markShaky()   → re-inserts the word 8–12 cards ahead. You'll see it again eventually.
//   - markUnknown() → re-inserts the word 3–5 cards ahead. You'll see it again soon.
//   - The session ends when the queue is empty (every word marked known at least once).
//
// restartWords is the full word list for "Study Again" — it may differ from the
// initial studyWords if the parent filtered by mastery. Passing it separately means
// "Study Again" always shows all words in the category, not just the unstudied ones.

import { useState } from 'react';
import { Word } from '../data/vocabulary';

// ─── Types ─────────────────────────────────────────────────────────────────────

type SpacedRepetitionState = {
  currentWord: Word | null;   // the word currently on screen (null if queue is empty)
  remaining: number;           // how many unique cards are left to be marked known
  knownCount: number;          // words marked known this session
  shakyCount: number;          // words marked shaky this session
  unknownCount: number;        // times a word was marked unknown (can exceed word count)
  isDone: boolean;             // true when the queue is empty
  markKnown: () => void;       // call when the user taps "Known"
  markShaky: () => void;       // call when the user taps "Shaky"
  markUnknown: () => void;     // call when the user taps "Unknown"
  restart: () => void;         // reset the session using restartWords
};

// ─── Helper: shuffle an array ──────────────────────────────────────────────────
// Creates a new shuffled copy — does not mutate the original array.
// Uses the Fisher-Yates algorithm for a true random shuffle.
function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ─── Helper: re-insert a word at a given distance ──────────────────────────────
// Places the word at a random position within [minPos, maxPos] slots ahead.
// If the queue is shorter than minPos, it goes at the very end.
function reinsert(queue: Word[], word: Word, minPos: number, maxPos: number): Word[] {
  const range = maxPos - minPos + 1;
  const position = Math.min(
    Math.floor(Math.random() * range) + minPos,
    queue.length // don't go past the end of the queue
  );
  const newQueue = [...queue];
  newQueue.splice(position, 0, word);
  return newQueue;
}

// ─── The hook ─────────────────────────────────────────────────────────────────

// studyWords   — words to study in this session (may be mastery-filtered)
// restartWords — words to use when "Study Again" is pressed (full category list)
export function useSpacedRepetition(
  studyWords: Word[],
  restartWords: Word[]
): SpacedRepetitionState {
  // The study queue — starts as a shuffled copy of the word list.
  const [queue, setQueue] = useState<Word[]>(() => shuffle(studyWords));

  // Session counters
  const [knownCount, setKnownCount] = useState(0);
  const [shakyCount, setShakyCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);

  // ── markKnown ──
  // The user knows this word confidently. Remove it from the queue for good.
  function markKnown() {
    setKnownCount((prev) => prev + 1);
    setQueue((prev) => prev.slice(1)); // remove the first element
  }

  // ── markShaky ──
  // The user knows it but wants to see it again. Re-insert 8–12 slots ahead.
  function markShaky() {
    setShakyCount((prev) => prev + 1);
    setQueue((prev) => {
      const [current, ...rest] = prev;
      return reinsert(rest, current, 8, 12); // comes back after 8–12 other cards
    });
  }

  // ── markUnknown ──
  // The user doesn't know this word. Re-insert 3–5 slots ahead (comes back soon).
  function markUnknown() {
    setUnknownCount((prev) => prev + 1);
    setQueue((prev) => {
      const [current, ...rest] = prev;
      return reinsert(rest, current, 3, 5); // comes back after 3–5 other cards
    });
  }

  // ── restart ──
  // Start fresh with all words in the category (restartWords), freshly shuffled.
  function restart() {
    setQueue(shuffle(restartWords));
    setKnownCount(0);
    setShakyCount(0);
    setUnknownCount(0);
  }

  return {
    currentWord: queue[0] ?? null,
    remaining: queue.length,
    knownCount,
    shakyCount,
    unknownCount,
    isDone: queue.length === 0,
    markKnown,
    markShaky,
    markUnknown,
    restart,
  };
}
