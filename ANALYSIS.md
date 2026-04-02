# Lerne Deutsch — Codebase Analysis & Improvement Recommendations

Generated: 2026-04-02

---

## What the App Does

A personal German A1 learning web app (Expo + TypeScript + Supabase + Gemini AI) with 10 fully working sections:

| Section | Core Feature |
|---|---|
| **Flashcards** | 665 A1 words, 3-state spaced repetition (Known/Shaky/Unknown), category filters, session summary |
| **Grammar** | 111 exercises across 16 topics, Gemini "Generate More" button, per-topic score tracking |
| **Daily Challenge** | 5 date-seeded exercises, streak tracking, activity logging |
| **Mini Games** | Word Match, Gender Battle, Listening Quiz, Sentence Builder, Fill-in-Blank (AI-generated) |
| **Exam Prep** | Reading/Listening (scored), Writing/Speaking (Gemini feedback, completions tracked) |
| **Reading Mode** | 15 static passages, per-word translation popup |
| **Pronunciation** | 28 sound entries with Web Speech API playback |
| **Progress** | Stats dashboard — streak, vocab mastery, section scores, grammar topic bars |
| **Insights** | Weak vocab, mistake log, weak topics, 91-day activity calendar |
| **Tips Bar** | 25 A1 tips + Focus Tip mode (surfaces tip for weakest grammar topic based on mistake log) |

**Only A1 has full content.** A2/B1/B2 vocabulary, grammar, and tips are empty stubs.

---

## Architectural Strengths

Things that are well-designed — don't change these patterns.

- **Single AI file (`src/lib/gemini.ts`)** — all 5 Gemini calls in one place; easy to swap models or add caching. Proved its value when `gemini-2.0-flash` was deprecated — one line changed and everything worked.
- **Service layer pattern** — each Supabase table has a dedicated service file (`masteryService`, `scoresService`, etc.). Screens never write raw SQL. You can read `daily.tsx` and understand the logic without knowing the database schema.
- **`useSpacedRepetition` hook** — pure React hook with no Supabase dependency. In-memory queue logic is separated from persistence. Clean and independently testable.
- **`useFocusEffect` for data freshness** — screens reload on focus, so navigating back to Progress after a grammar session always shows updated scores. Simple and always accurate.
- **Fail-safe defaults everywhere** — every service returns empty results on error (empty Map, zero count, empty array). The app never crashes on a network failure — it degrades gracefully.
- **Design system in `src/styles/theme.ts`** — all colors, fonts, and spacing in one place. Visual consistency is strong throughout.
- **RLS on all Supabase tables** — security at the database layer. Even if someone extracted the API key, they could only read their own rows.

---

## Architectural Issues to Fix

### 1. Topic string mismatch between `a1.ts` and `topicTipMap.ts`
**Problem:** Grammar exercises in `src/data/grammar/a1.ts` use `'Accusative case'` as the topic string. But `src/data/topicTipMap.ts` has the key `'Akkusativ case'`. These don't match, so `getContextualTip()` returns null for Akkusativ mistakes — the most common A1 error type. The Focus Tip feature silently fails for it.

**Fix:** Audit all 21 topic keys in `topicTipMap.ts` against the exact topic strings in `a1.ts`. Fix every mismatch. Zero code changes needed — this is purely a data fix.

**Files:** `src/data/grammar/a1.ts`, `src/data/topicTipMap.ts`

**Effort:** 15 minutes

---

### 2. `getUserId()` called on every Supabase write
**Problem:** `masteryService.ts`, `scoresService.ts`, `streakService.ts`, and others each call `await supabase.auth.getUser()` independently on every save. On a grammar session end, that's 3 separate auth round-trips (`saveScore`, `saveTopicScore`, `saveMistake`).

**Fix:** When the session is established in `app/_layout.tsx` via `onAuthStateChange`, store `session.user.id` in `useAuthStore`. Make `getUserId()` read from the store synchronously. The user ID never changes during a session — fetching it once at login is enough.

**Files:** `src/lib/userId.ts`, `src/store/useAuthStore.ts`, `app/_layout.tsx`

**Effort:** 30 minutes

---

### 3. Mistake log has no LIMIT — fetches entire history
**Problem:** `loadMistakes()` in `mistakeService.ts` fetches ALL mistakes for the user with no row limit. As months of study accumulate, every call to the Insights screen or `contextualTipService` transfers the full history over the network. The Insights screen only shows 10 mistakes; the contextual tip service only looks at 20.

**Fix:** Add `.limit(100)` to the Supabase query in `loadMistakes()`. 100 recent mistakes is more than enough for both consumers.

**File:** `src/lib/mistakeService.ts`

**Effort:** 5 minutes

---

### 4. Streak "yesterday" calculation breaks at DST transitions
**Problem:** `getYesterdayString()` in `streakService.ts` subtracts exactly `86,400,000ms` from the current timestamp. On the night of a DST spring-forward (when a day is only 23 hours long), this calculates the wrong date. Germany observes DST. A user completing the challenge at 1am on a DST transition night could have their streak broken despite studying the previous day.

**Fix:** Use JavaScript date arithmetic instead of raw milliseconds:
```ts
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
```

**File:** `src/lib/streakService.ts`

**Effort:** 5 minutes

---

### 5. Daily challenge seed is global — same exercises for all users
**Problem:** `getDailyExercises()` seeds by `parseInt(dateStr, 10) % allExercises.length`. Two users on the same day get identical exercises. It also picks 5 *consecutive* exercises from the array, so exercises near the start (sein, haben, basic articles) are heavily over-represented in the rotation.

**Fix:** XOR the date integer with a simple hash of the user ID:
```ts
const userHash = userId.split('').reduce((acc, c) => acc ^ c.charCodeAt(0), 0);
const seed = (dateInt ^ userHash) % allExercises.length;
```

**File:** `app/daily.tsx`

**Effort:** 10 minutes

---

### 6. Duplicated date utilities across files
**Problem:** `daily.tsx`, `streakService.ts`, and `insights.tsx` each define their own date helper functions (`formatDate`, `getTodayString`, `toDateString`) with slightly different output formats. A mismatch here causes subtle streak or heatmap bugs.

**Fix:** Create `src/lib/dateUtils.ts` with shared `getTodayString()`, `getYesterdayString()`, `formatDisplayDate()` functions. Import from this file everywhere.

**Effort:** 10 minutes

---

## Missing Features Worth Adding

### Low Effort (< 1 hour each)

**A. "Review Due" count on Home screen**

The spaced repetition infrastructure is fully built — `next_review_date` is stored in `vocabulary_mastery`, and the home screen already loads mastery data via `loadMastery()`. The missing piece is visibility. Users have no way to know how many words are due for review.

Add this calculation to `app/index.tsx`:
```ts
const dueCount = vocab.filter(w => {
  const m = masteryMap.get(w.id);
  return !m || !m.nextReviewDate || m.nextReviewDate <= today;
}).length;
```
Display it in the Flashcards section card as "42 due for review."

**Why it matters:** The spaced repetition system is the most sophisticated feature in the app but currently invisible. Without seeing a due count, users don't know when to open Flashcards — they either study every day randomly or not at all.

---

**B. `1` / `2` / `3` keyboard shortcuts for flashcard rating**

Space-to-flip is already implemented in `FlashCard.tsx` via a `keydown` event listener. Extend the same pattern: after the card is flipped, `1` = Unknown, `2` = Shaky, `3` = Known.

**Why it matters:** Desktop users can study an entire deck without touching the mouse. Speeds up sessions significantly.

**File:** `app/flashcards.tsx` or the deck component

---

**C. Streak grace period**

If the user misses one day then completes the challenge the next day, continue their streak (with a small indicator that a grace day was used). Logic change only in `completeChallenge()`.

**Why it matters:** Missing a single day causing a full streak reset is the most common reason people quit language learning apps. A one-day buffer removes the punishment without undermining the streak's meaning.

**File:** `src/lib/streakService.ts`

---

**D. Log activity for all study sessions, not just daily challenge**

`activityService.logActivity()` is called only in `daily.tsx`. A user who studied grammar and flashcards every day shows a completely blank activity heatmap if they skip the daily challenge. The heatmap in Insights is supposed to show study activity — right now it shows daily challenge activity only.

**Fix:** Call `logActivity()` in `app/grammar.tsx`, `app/flashcards.tsx`, and `app/games.tsx` after sessions complete.

**Files:** `app/grammar.tsx`, `app/flashcards.tsx`, `app/games.tsx`

---

### Medium Effort (2–4 hours)

**E. Conjugated form lookup in Reading Mode**

`lookupWord` only matches exact vocabulary entries (infinitives/base forms). Tapping "fährt" in a passage finds nothing because the vocabulary has "fahren". The app shows nothing — no popup, no error message.

**Fix:** Strip common verb endings (`-t`, `-st`, `-en`, `-e`, `-et`) to find the root, then look up. Show a fallback message ("Word not found — search in Flashcards") for truly unrecognized forms.

**Why it matters:** In a real German passage, the majority of verbs appear in conjugated form. The current behavior makes Reading Mode feel broken.

**File:** `app/reading.tsx`

---

**F. Grammar score history (trend data)**

Only `best_score` per topic is stored. A user can't tell if they're improving or stagnating on Nominative/Akkusativ. A session history (last 10 scores per topic) would enable a sparkline in Progress or Insights.

**Requires:** New column or table in Supabase + service update + display component.

---

**G. Sentence Builder difficulty tagging**

The 80 sentence templates have no difficulty level. A session randomly mixes complex subordinate-clause sentences with simple subject-verb-object ones. Tagging templates as `simple`/`medium`/`complex` in `src/data/sentenceBuilder.ts` would enable graduated sessions and better progression.

---

### High Effort (already in the pipeline)

- **Phase 25:** Audio on flashcards, personalized home greeting
- **Phase 26:** Grammar expansion (Akkusativ, prepositions to 15–20 exercises each)
- **Phase 27:** Verb sub-categories (Regular/Irregular/Modal/Separable) — needs `verbType` field added to `Word` type in `src/data/vocabulary/types.ts` first; tag all 151 verbs in `a1.ts`
- **Phase 29:** Real Goethe-Zertifikat A1 exam simulation — needs distinct sub-formats per skill, 50-point rubric, Gemini prompts calibrated to actual exam difficulty level

---

## Edge Cases Not Handled

| Issue | File | Impact |
|---|---|---|
| Gemini grammar responses have no per-item schema validation | `src/lib/gemini.ts` | A malformed element (missing `answer`, wrong `options` type) silently crashes `ExerciseCard` |
| Reading Mode shows nothing (no error) for conjugated verb forms | `app/reading.tsx` | Every conjugated verb fails lookup silently |
| Word Match only tracks session completions, not accuracy | `src/components/games/WordMatchGame.tsx` | Games section shows `3×` instead of a meaningful score |
| Fill-in-Blank exact match only — plural form of a noun always fails | `src/components/games/FillInBlankGame.tsx` | Frustrating; "Bücher" is wrong even though the student knows the word |
| Supabase project pause after 7 days inactivity times out silently | All service files | User sees blank screen with no explanation; looks like a bug |
| `'fallback-user'` in `userId.ts` silently orphans data | `src/lib/userId.ts` | Data is stored but inaccessible; hard to diagnose |
| Daily challenge modulo-wrap can repeat exercises in small exercise pools | `app/daily.tsx` | Minor now (111 exercises), but breaks if challenge is ever filtered by topic |

---

## Content Gaps

### Grammar exercises with too few entries for meaningful drilling

| Topic | Current Count | Notes |
|---|---|---|
| Word order: verb in 2nd position | 3 | Most common beginner mistake |
| Indefinite articles: ein/eine | 3 | Fundamental, undertested |
| Prepositions | 3 | Extremely common in real speech |
| Negation: nicht / kein | 5 | Persistent confusion point; should be 15+ |

### Missing A1 grammar topics
- **Time expressions** — `um X Uhr`, `halb`, `Viertel` (clocks appear in every real A1 exam)
- **Reflexive verbs** — `sich vorstellen`, `sich fühlen` (extremely common at A1, zero coverage)
- **Days/months/seasons in grammar context** (vocabulary cards exist, grammar drills don't)

### Reading passage formats
All 15 passages are first-person narratives. Real A1 exam formats include signs, short notices, SMS messages, short emails, and advertisements. Add 5 passages in these formats before Phase 29's exam simulation is realistic.

### A2/B1/B2 tips are generic placeholders
A1 has 25 rule-specific tips with concrete examples (`"Sein (to be): ich bin, du bist..."`). A2/B1/B2 have 5 generic chapter-heading tips each. When Phase 21 content is written, match the A1 format: one specific rule per tip with an example sentence.

---

## Prioritized Quick Wins

Do these first — highest impact, lowest effort:

1. **Fix `topicTipMap.ts` topic key mismatches** *(15 min)* — the contextual tips feature is fully built but silently broken for A1's most common mistakes
2. **Show "Review Due" count on Home screen** *(30 min)* — makes the spaced repetition system visible and actionable
3. **Add `1/2/3` keyboard shortcuts for flashcard rating** *(20 min)* — biggest study speed improvement for desktop
4. **Log activity for all sessions** *(1 hr)* — fixes misleading blank heatmap on Insights
5. **Streak grace period** *(1 hr)* — removes the most common reason people abandon streaks

---

## Files Touched Most Often (High Leverage)

| File | Why it matters |
|---|---|
| `src/data/grammar/a1.ts` | Topic string ground truth — everything must match these exactly |
| `src/data/topicTipMap.ts` | Must match topic strings in `a1.ts` |
| `src/lib/streakService.ts` | Streak logic, DST bug, yesterday calculation |
| `src/lib/mistakeService.ts` | Needs LIMIT added |
| `src/lib/gemini.ts` | All AI calls — add validation here |
| `app/index.tsx` | Home screen — add review-due count |
| `app/flashcards.tsx` | Keyboard shortcuts |
| `app/insights.tsx` | Activity heatmap |
| `app/reading.tsx` | Conjugated verb lookup |
| `app/daily.tsx` | Seed user-specificity fix |