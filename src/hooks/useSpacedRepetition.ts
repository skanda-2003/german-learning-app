// useSpacedRepetition.ts — Custom hook that manages the flashcard study queue.
//
// How it works:
//   - The queue starts as a shuffled copy of the word list.
//   - The current word is always the first item in the queue.
//   - markKnown()   → removes the word from the queue. You won't see it again this session.
//   - markUnknown() → removes the word from the front and re-inserts it 3–5 cards ahead.
//                     You'll see it again soon, and keep seeing it until you mark it known.
//   - The session ends when the queue is empty (every word marked known at least once).
//
// This is session-only for now. Supabase persistence comes in the next phase.

import { useState } from 'react';
import { Word } from '../data/vocabulary';

// ─── Types ─────────────────────────────────────────────────────────────────────

type SpacedRepetitionState = {
  currentWord: Word | null;   // the word currently on screen (null if queue is empty)
  remaining: number;           // how many cards are left in the queue
  knownCount: number;          // how many words marked known this session
  unknownCount: number;        // how many times a word was marked unknown (can exceed word count)
  isDone: boolean;             // true when the queue is empty
  markKnown: () => void;       // call when the user taps "Known"
  markUnknown: () => void;     // call when the user taps "Unknown"
  restart: () => void;         // reset the session with a fresh shuffled queue
};

// ─── Helper: shuffle an array ──────────────────────────────────────────────────
// Creates a new shuffled copy — does not mutate the original array.
// Uses the Fisher-Yates algorithm, which gives a truly random shuffle.
function shuffle<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// ─── Helper: re-insert a word into the queue ───────────────────────────────────
// Places the word at a random position between 3 and 5 slots ahead.
// If the queue is shorter than that, it goes at the very end.
function reinsert(queue: Word[], word: Word): Word[] {
  const position = Math.min(
    Math.floor(Math.random() * 3) + 3, // random number: 3, 4, or 5
    queue.length                         // don't go past the end of the queue
  );
  const newQueue = [...queue];
  newQueue.splice(position, 0, word);
  return newQueue;
}

// ─── The hook ─────────────────────────────────────────────────────────────────

export function useSpacedRepetition(words: Word[]): SpacedRepetitionState {
  // The study queue — starts as a shuffled copy of the word list.
  // We shuffle so you don't always start at "ab" and work through alphabetically.
  const [queue, setQueue] = useState<Word[]>(() => shuffle(words));

  // Session counters
  const [knownCount, setKnownCount] = useState(0);
  const [unknownCount, setUnknownCount] = useState(0);

  // ── markKnown ──
  // The user knows this word. Remove it from the front of the queue.
  function markKnown() {
    setKnownCount((prev) => prev + 1);
    setQueue((prev) => prev.slice(1)); // remove the first element
  }

  // ── markUnknown ──
  // The user doesn't know this word yet. Remove from front, re-insert 3–5 slots ahead.
  function markUnknown() {
    setUnknownCount((prev) => prev + 1);
    setQueue((prev) => {
      const [current, ...rest] = prev; // pull the current word off the front
      return reinsert(rest, current);  // put it back 3–5 positions ahead
    });
  }

  // ── restart ──
  // Start fresh with a new shuffled queue.
  function restart() {
    setQueue(shuffle(words));
    setKnownCount(0);
    setUnknownCount(0);
  }

  return {
    currentWord: queue[0] ?? null,
    remaining: queue.length,
    knownCount,
    unknownCount,
    isDone: queue.length === 0,
    markKnown,
    markUnknown,
    restart,
  };
}