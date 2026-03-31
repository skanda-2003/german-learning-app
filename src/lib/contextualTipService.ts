// contextualTipService.ts — Picks the most relevant tip based on recent mistake data.
//
// How it works:
//   1. Takes the most recent mistakes from the mistake_log
//   2. Filters to grammar mistakes only (section starts with "grammar:")
//   3. Counts how many mistakes per topic
//   4. Finds the most-repeated weak topic
//   5. Returns the matching tip from TOPIC_TIP_MAP, or null if no match

import type { MistakeEntry } from './mistakeService';
import type { Level } from '../store/useLevelStore';
import { TOPIC_TIP_MAP } from '../data/topicTipMap';

// How many recent mistakes to analyse
const LOOK_BACK = 20;

// Returns a targeted tip string, or null if there's nothing relevant to surface.
export function getContextualTip(
  mistakes: MistakeEntry[],
  level: Level
): string | null {
  // Only look at grammar section mistakes, most recent first
  const grammarMistakes = mistakes
    .filter((m) => m.section.startsWith('grammar:'))
    .slice(0, LOOK_BACK);

  if (grammarMistakes.length === 0) return null;

  // Count mistakes per topic (section format is "grammar:Topic Name")
  const topicCounts: Record<string, number> = {};
  for (const m of grammarMistakes) {
    const topic = m.section.replace(/^grammar:/, '');
    topicCounts[topic] = (topicCounts[topic] ?? 0) + 1;
  }

  // Find the topic with the most mistakes
  let weakestTopic = '';
  let maxCount = 0;
  for (const [topic, count] of Object.entries(topicCounts)) {
    if (count > maxCount) {
      maxCount = count;
      weakestTopic = topic;
    }
  }

  if (!weakestTopic) return null;

  // Look up the tip for this level + topic
  const tipMap = TOPIC_TIP_MAP[level];
  if (!tipMap) return null;

  return tipMap[weakestTopic] ?? null;
}