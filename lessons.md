# Phase 31 — Lessons Plan

## Design Decision: Level-Specific Lessons Only

Each level's lessons cover only the grammar topics introduced at that level.
A2 does not repeat A1 content. B1 does not repeat A1/A2 content.
B2 shows a "coming soon" empty state (no grammar data yet).

**One exception:** "Reflexive verbs" appears as a grammar topic at both A1 and A2.
The A2 lesson uses an optional `buildingOn` field to note it builds on A1,
then focuses only on what's new at A2: dative reflexive and meaning-changing reflexives.

**Topic counts:**
- A1: 19 lessons
- A2: 12 lessons
- B1: 12 lessons
- B2: empty state

---

## Files to Create

| File | Purpose |
|---|---|
| `src/data/lessons/types.ts` | `Lesson`, `LessonExample` types |
| `src/data/lessons/a1.ts` | 19 A1 lessons |
| `src/data/lessons/a2.ts` | 12 A2 lessons |
| `src/data/lessons/b1.ts` | 12 B1 lessons |
| `src/data/lessons/index.ts` | `LESSONS: Record<Level, Lesson[]>` export |
| `app/lessons.tsx` | Lesson selector screen |
| `app/lesson.tsx` | Lesson detail screen |

## Files to Modify

| File | Change |
|---|---|
| `app/(drawer)/_layout.tsx` | Add `lessons` sidebar item + two `Drawer.Screen` entries |
| `app/grammar.tsx` | Read `topic` query param; auto-start that topic on mount |
| `CLAUDE.md` | Update Phase 31 description + sidebar nav list + mark complete |

---

## Data Type (`src/data/lessons/types.ts`)

```ts
import type { Level } from '../../store/useLevelStore';

export type LessonExample = {
  german: string;
  english: string;
  note?: string;
};

export type Lesson = {
  topic: string;         // must match GrammarExercise.topic exactly
  level: Level;
  title: string;
  explanation: string;   // 2-3 paragraphs separated by \n\n
  keyPoints: string[];   // 3-5 bullets
  examples: LessonExample[];  // 4-6 worked examples
  commonMistake: string;
  buildingOn?: string;   // only used for A2 "Reflexive verbs"
};
```

The `topic` string must be copied exactly from the grammar data files:
- `src/data/grammar/a1.ts` — authoritative A1 topic strings
- `src/data/grammar/a2.ts` — authoritative A2 topic strings
- `src/data/grammar/b1.ts` — authoritative B1 topic strings

---

## A1 Topics (19 lessons)

From `src/data/grammar/a1.ts`:
1. Verb conjugation: sein
2. Verb conjugation: haben
3. Regular verb conjugation
4. Definite articles: der/die/das
5. Indefinite articles: ein/eine
6. Possessive articles
7. Personal pronouns
8. Questions
9. Negation: nicht / kein
10. Accusative case
11. Modal verbs
12. Prepositions
13. Word order: verb in 2nd position
14. Time expressions
15. Days, months and seasons
16. Plural nouns
17. Imperative
18. Separable verbs
19. Reflexive verbs

## A2 Topics (12 lessons)

From `src/data/grammar/a2.ts`:
1. Adjective endings: definite articles
2. Adjective endings: indefinite articles
3. Comparative and superlative
4. Future tense: werden
5. Infinitive with zu
6. Perfekt: haben vs sein
7. Perfekt: irregular verbs
8. Perfekt: regular verbs
9. Präteritum: sein / haben / modals
10. Reflexive verbs  ← uses `buildingOn` field
11. Subordinate clauses: weil / dass
12. Two-way prepositions

## B1 Topics (12 lessons)

From `src/data/grammar/b1.ts`:
1. Genitiv case
2. Infinitive constructions: um...zu / ohne...zu / statt...zu
3. Konjunktiv II: sein / haben / modals
4. Konjunktiv II: würden + infinitive
5. Passive voice: Präsens
6. Passive voice: Präteritum
7. Relative clauses: Dativ
8. Relative clauses: Nominativ / Akkusativ
9. Temporal clauses: als / wenn / während
10. Temporal clauses: bevor / nachdem / seitdem
11. Two-part conjunctions
12. Verb + preposition combinations

---

## Lesson Selector Screen (`app/lessons.tsx`)

**Layout (top to bottom):**
1. Page title "Lessons" + subtitle "Grammar explanations for [level]"
2. `X / Y LESSONS READ` — ALL CAPS label style (11px, `#888888`)
3. 2-column card grid

**Each card:**
- Title (IBM Plex Mono, 13px semiBold, `#111111`)
- `~3 min read` (Inter, 11px, `#888888`)
- Bottom row: viewed dot (left) + last studied timestamp (right)
  - Dot: 8×8px circle, `#16a34a` green if viewed, `#e0e0e0` grey if not
  - Timestamp: Inter 11px `#888888` — `"Last studied 3 days ago"` / `"Last studied today"` / hidden if never viewed

**Viewed state:**
- AsyncStorage key: `lessons_viewed_A1`, `lessons_viewed_A2`, etc.
- JSON object: `Record<topic, ISO timestamp string>` (replaces simple array — stores both viewed state and timestamp)
- Load with `useFocusEffect` (not `useEffect`) so dots and timestamps update on return from detail screen
- Level switch automatically changes `storageKey`, reloads the right viewed set

**Timestamp display logic:**
- Never viewed → dot grey, no timestamp shown
- Viewed today → dot green, `"Last studied today"`
- Viewed N days ago → dot green, `"Last studied N day(s) ago"`
- Use `getTodayString()` from `src/lib/dateUtils.ts` for consistent date comparisons (already exists in codebase)

**Navigation on card press:**
```ts
router.push(`/lesson?topic=${encodeURIComponent(lesson.topic)}&level=${level}`);
```
URL-encoding is required — topic strings contain colons, slashes, and spaces.

**B2 empty state:**
```tsx
<Text>B2 lessons coming soon.</Text>
<Text>Switch to A1, A2, or B1 to study.</Text>
```

---

## Lesson Detail Screen (`app/lesson.tsx`)

**Query params:** `topic` (URL-encoded), `level`

**Mark as viewed on mount:**
```ts
useEffect(() => {
  if (!lesson) return;
  const key = `lessons_viewed_${lesson.level}`;
  AsyncStorage.getItem(key).then((raw) => {
    const viewed: string[] = raw ? JSON.parse(raw) : [];
    if (!viewed.includes(lesson.topic)) {
      viewed.push(lesson.topic);
      AsyncStorage.setItem(key, JSON.stringify(viewed));
    }
  });
}, [lesson?.topic, lesson?.level]);
```

**Sections (top to bottom in a ScrollView):**

### 1. Header
- `← Lessons` back link — IBM Plex Mono 13px, `#2563eb` blue
- Title — IBM Plex Mono 18px bold, `#111111`
- Level badge pill — Inter 11px semiBold, blue tint

### 2. "Building On" banner (conditional)
Only renders if `lesson.buildingOn` exists (A2 Reflexive verbs only).
Blue-tinted box: `backgroundColor: #eff6ff`, 1px `#2563eb` border, 4px radius.
Inter 13px, `#2563eb`.

### 3. EXPLANATION
Label + paragraphs. Split `lesson.explanation` on `\n\n`.
Inter 14px, `#333333`, lineHeight 22.

### 4. KEY RULES
Label + em-dash (`—`) bullet list. Inter 13px, `#333333`.

### 5. EXAMPLES
Label + one card per example.
- German: IBM Plex Mono 14px semiBold, `#111111`
- English: Inter 12px, `#888888`
- Note (optional): Inter 11px, `#2563eb`

Card style: white, 1px `#e0e0e0` border, 4px radius, 16px padding.

### 6. COMMON MISTAKE
Label + red left-bordered box.
Style: `borderLeftWidth: 3, borderLeftColor: #dc2626, backgroundColor: #fef2f2`.
IBM Plex Mono 13px, `#111111`.

Write the `commonMistake` string as self-contained plain text, e.g.:
`"Wrong: 'Ich habe gegangen.' Correct: 'Ich bin gegangen.' — movement verbs use sein, not haben."`

### 7. "PRACTICE THIS TOPIC" Button
Solid black, full width, IBM Plex Mono 13px semiBold white text.
```ts
router.push(`/grammar?topic=${encodeURIComponent(lesson.topic)}`);
```

---

## Grammar Screen Change (`app/grammar.tsx`)

Two additions only — minimal change:

**Add import:**
```ts
import { useLocalSearchParams } from 'expo-router';
```

**Add auto-start block** (after existing useState/useMemo blocks):
```ts
const { topic: topicParam } = useLocalSearchParams<{ topic?: string }>();
const hasAutoStarted = useRef(false);

useEffect(() => {
  if (!topicParam || hasAutoStarted.current) return;
  const decoded = decodeURIComponent(topicParam);
  const topicExists = allExercises.some((ex) => ex.topic === decoded);
  if (topicExists) {
    hasAutoStarted.current = true;
    startTopic(decoded);
  }
}, [topicParam, allExercises]);
```

`useRef` guard prevents re-triggering on re-renders.
`topicExists` check prevents blank screen if level doesn't have that topic.

---

## Sidebar Change (`app/(drawer)/_layout.tsx`)

**Add to NAV_ITEMS** between Grammar and Cheat Sheet:
```ts
{ route: 'lessons', label: 'Lessons', icon: 'file-text' }
```

**Add two Drawer.Screen entries** adjacent to grammar:
```tsx
<Drawer.Screen name="lessons" options={{ title: 'Lessons' }} />
<Drawer.Screen name="lesson"  options={{ title: 'Lesson' }}  />
```

`lesson` (detail) needs its own Drawer.Screen so Expo Router renders it correctly.
It does not appear in the sidebar — only `lessons` (selector) does.

---

## CLAUDE.md Updates

1. **Navigation list** — add `- Lessons (icon: file-text)` between Grammar and Cheat Sheet
2. **Phase 31 description** — update to reflect level-specific design + `buildingOn` field
3. **Phase 31 status** — `⏳` → `✅` once complete
4. **Progress Log** — add entry

---

## Implementation Order

1. `src/data/lessons/types.ts`
2. `src/data/lessons/a1.ts` — 19 lessons (verify topics against a1.ts grammar data)
3. `src/data/lessons/a2.ts` — 12 lessons (`buildingOn` on Reflexive verbs)
4. `src/data/lessons/b1.ts` — 12 lessons
5. `src/data/lessons/index.ts`
6. `app/(drawer)/_layout.tsx` — sidebar + Drawer.Screen
7. `app/lessons.tsx` — selector
8. `app/lesson.tsx` — detail
9. `app/grammar.tsx` — query param
10. `CLAUDE.md` — docs

---

## Verification

- Lessons in sidebar, between Grammar and Cheat Sheet
- Correct lesson count for each level; switches when level toggle changes
- Card dot turns green immediately after returning from a lesson
- "Practice This Topic" lands in Grammar with that topic pre-selected, exercises running immediately
- B2 shows empty state, does not crash
