# Lerne Deutsch — German Learning App

## Overview
A German language learning web application for CEFR levels A1 through B2.
Built for personal use initially, with potential to expand to other users later.
The app is called **Lerne Deutsch** (means "Learn German" in German).

This is a **TypeScript Expo React Native app**. The backend uses **Supabase** (auth + database). AI features use the **Gemini API**.

---

## Tech Stack
- **Expo** — cross platform framework (web now, mobile later if needed)
- **TypeScript** — language used throughout the project
- **Zustand** — global state management (e.g. selected level, auth session)
- **Supabase** — backend database + authentication (free tier, minimal storage)
- **Google Gemini API** — AI feedback on writing/speaking + dynamic exercise generation (free tier)
- **Pre-written content** — CEFR / Goethe Institut / Deutsche Welle word lists as foundation
- **Vercel** — deployment (free Hobby plan, auto-deploys on push to main)

---

## Project Identity
- **Repo name:** german-learning-app
- **Local folder:** german-learning-app
- **App display name:** Lerne Deutsch
- **Expo config:** name = "Lerne Deutsch", slug = "german-learning-app"
- **Production URL:** https://german-learning-app-neon.vercel.app

---

## Design System
- **Style:** Data-Forward Minimalism (inspired by developer dashboards like Linear, Vercel, Railway)
- **Background:** `#fafafa` page background, `#ffffff` white cards on top
- **Font:** IBM Plex Mono for all content, data, headings — Inter for sidebar/topbar navigation only. Exception: Cheat Sheet screen uses Inter for card headers, body descriptions, and table column headers; German examples and table body cells stay IBM Plex Mono.
- **Cards:** 1px `#e0e0e0` border, 4px border-radius, no shadows, no gradients
- **Colors:** `#111111` primary text, `#888888` secondary/labels, `#2563eb` blue accent, `#16a34a` green, `#dc2626` red, `#f59e0b` amber (shaky state)
- **Labels:** ALL CAPS, 11px, letter-spacing 0.08em, `#888888`
- **Numbers/scores:** Bold, large (28-36px), `#111111`, IBM Plex Mono
- **Sidebar:** Dark navy `#1a1a2e`, Inter font, clean Feather line icons (no emojis), active state = left 2px accent bar in blue
- **Topbar:** Same dark navy, Inter font, level toggle top right
- **Buttons:** Outlined (1px border, white bg, black text) for secondary; solid black bg white text for primary CTA
- **Score display:** "X / Y" format where Y is grey

---

## Level System
Toggle between: **A1 → A2 → B1 → B2**
Switching level affects all content globally — flashcards, exercises, games, exam prep, tips.

---

## Navigation (Sidebar)
Uses clean Feather line icons — NO emojis anywhere in the UI
- Home (icon: home)
- Flashcards (icon: layers)
- Mini Games (icon: zap)
- Grammar (icon: edit-3)
- Cheat Sheet (icon: list)
- Daily Challenge (icon: calendar)
- Exam Prep (icon: book-open)
- Progress (icon: bar-chart-2)
- Insights (icon: trending-up)
- Reading Mode (icon: book)

---

## Sections & Features

### 🏠 Home / Dashboard
**Purpose: Forward-looking — tells the user what to do next**
- App name + greeting with streak message (e.g. "You're on a 3 day streak")
- TODAY'S FOCUS card — recommended section based on weakest area (lowest score)
- CONTINUE WHERE YOU LEFT OFF — last section used
- Quick stats strip: words known, best grammar score, daily challenge status
- Quick-launch cards for all sections (icon + name + one stat line)
- NO scrolling — everything fits in one view

### 🃏 Flashcards
- German word on one side, English + example sentence on the other
- On card back: verb conjugation table for verbs; plural form for nouns; comparative for adjectives
- Flip animation
- THREE states: Known (green) / Shaky (amber) / Unknown (red)
  - Known: confident, show rarely in spaced repetition
  - Shaky: know it but want to revisit, show occasionally
  - Unknown: don't know, show frequently
- Spaced repetition uses all three states
- Session summary screen after finishing deck
- Word search bar above category pills
- Category filter pills: All / Nouns / Verbs / Adjectives / Prepositions / Other
- "Study Weak" button on done screen — restarts with shaky + unknown only
- Vocabulary mastery saves to Supabase (3 states)

### 🎮 Mini Games
**Selector screen: 2-column card grid with 1px borders**
- Word Match — 6 random pairs per round, click-to-match
- Gender Battle — 10 rounds, der/die/das; show plural below noun in grey
- Listening Quiz — 10 rounds, Web Speech API; show conjugations below verbs in grey
- Fill in the Blank — Gemini generated (planned — Phase 20)

### 📝 Grammar Exercises
**Selector screen: 2-column card grid with 1px borders**
- Each topic card shows: name, exercise count, best score if attempted
- Level specific drills — A1: 111 exercises across 16 topics
- Mix of pre-written templates and Gemini generated variations

### 📅 Daily Challenge
- 5 grammar exercises seeded by today's date
- Streak tracking
- Score-aware completion messaging

### 🎓 Exam Prep
**Selector screen: 2x2 card grid**
- Reading, Listening, Writing, Speaking
- Each card shows last score if attempted

### 📊 Progress
**Purpose: Backward-looking — how have I done overall. NO scrolling.**
- Top row: 4 stat cards (Streak + last active date, Vocabulary, Grammar best, Daily Challenge)
- Middle: per-section scores in compact 2-column layout
- Bottom: two small visual charts
  - Vocabulary mastery by category (bar per category with percentage label on right)
  - Grammar topic breakdown (bar per topic)

### 📈 Insights
**Purpose: Analytics — where am I weak, what do I keep getting wrong**
- Weak Vocabulary: words most frequently marked Unknown or Shaky
- Mistake Log: incorrect grammar answers (question / your answer / correct answer)
- Weak Grammar Topics: sorted by lowest score with bar visualization
- Activity Calendar: streak heatmap — last 3 months, coloured squares per day

### 📖 Reading Mode
- Short German text at current level
- Tap any word to see translation + part of speech popup
- No questions — pure reading with on-demand word lookup

### 📋 Cheat Sheet (Reference)
- Static grammar reference per level (A1–B2) — no scoring, no Gemini, no Supabase
- Data: `src/data/cheatsheets/` (`CheatSheetSection` + block types rendered in `app/cheatsheet.tsx`)
- **Web:** CSS multi-column masonry (`column-count` + `column-gap`); 3 / 2 / 1 columns at viewport `>1200px` / `768–1200px` / `<768px`; cards use `break-inside: avoid`; wide cards (`column-span: all`) for **sein and haben (present)** (two conjugation tables side-by-side with vertical divider) and **Present tense — regular verbs**
- **Native:** single-column vertical scroll (no CSS columns)
- Level tabs at top: Inter styling; selected = `#111` on white text; sticky tab bar on web; `useEffect` syncs sheet level when global header level changes
- Card chrome: white surface, 1px border, 4px radius; Inter for section labels, descriptions, and table headers; IBM Plex Mono for German examples and table body cells; compact tables with heuristic first-column widths

### 💡 Tips / Hints Bar
- Always visible at the bottom of every screen
- Left and right arrows to browse the full tip list
- 25 tips for A1 across 8 categories, level-aware
- Shuffles on every screen navigation — a different random tip is shown each time
- **Focus Tip mode** — after completing a grammar or daily challenge session, the bar surfaces a targeted tip for the user's weakest grammar topic, labelled "FOCUS TIP" in blue. Right arrow dismisses it; left arrow from tip 0 restores it.

---

## Database (Supabase) — Minimal Storage
- Username, email, password (hashed by Supabase auth)
- Current level (A1 / A2 / B1 / B2)
- Streak count + last active date
- Progress / score per section
- Vocabulary mastery per word (known / shaky / unknown)
- Daily challenge completion status (resets daily)
- section_scores table (user_id, section, best_score, best_total, sessions_completed)
- mistake_log table (user_id, section, question, user_answer, correct_answer, timestamp)
- grammar_topic_scores table (user_id, level, topic, best_score, best_total, sessions_completed)

### Important Supabase Notes
- Free tier limit is 500MB — more than enough for a single user
- If limit is exceeded, Supabase sends an email warning first
- Database goes read-only after grace period — no surprise charges ever
- Free projects pause after 7 days of inactivity — resumes instantly on access
- Auth is live — email + password via Supabase Auth (email confirmation enabled)
- Auth flow type set to **Implicit (legacy)** — required for the Expo web SPA to handle confirmation redirects
- Email confirmation template is customised to match the app (Lerne Deutsch branding)
- Supabase redirect URL is set to the production Vercel domain
- Users are stored in Supabase's built-in `auth.users` table (Authentication → Users in dashboard) — not a custom table
- RLS (Row Level Security) is enabled on all 6 custom tables with `user_id = auth.uid()::text` policies
- Supabase client uses `storage: undefined` on web (native browser localStorage, no navigator.locks) and AsyncStorage on native — avoids "lock stolen" errors from lock contention

---

## AI Usage (Google Gemini API — Free Tier)
- **Model:** `gemini-2.5-flash` (updated from gemini-2.0-flash which was deprecated 2026-03-31)
- **Single integration point:** `src/lib/gemini.ts` — all AI calls go through this file
- Feedback on Writing exercises — grammar, vocabulary, suggestions
- Feedback on Speaking exercises — accuracy, pronunciation notes
- Dynamic sentence generation for Fill in the Blank
- Dynamic generation of grammar exercises ("Generate More" button)
- Fresh reading passages on demand
- Feedback tone adjusts by level (A1 = very simple + encouraging, B2 = detailed + precise)
- All feedback responses use plain text only — no markdown, no asterisks, no bullet points
- Use Gemini free tier — do not exceed free tier limits

---

## Content Sources
- **CEFR word lists** — vocabulary per level (A1/A2/B1/B2)
- **Goethe Institut** — official curriculum material and sample exam structures
- **Deutsche Welle (DW)** — level tagged texts and audio (openly licensed)
- **Gemini generated** — exercise variations, feedback, dynamic content

---

## Cost Policy
This project must remain completely free to run.
- Supabase — free tier only
- Gemini API — free tier only
- Expo — free (local builds only, no EAS paid builds)
- If any tool requires payment, flag it and find a free alternative before proceeding

---

## Important Notes for Claude Code
- I am a beginner — keep code simple, well structured, and well commented
- Explain what you are doing as you go, do not just write code silently
- After writing something, be ready to explain it line by line if asked
- Prefer simple and readable code over clever compact code
- Ask before making large changes or refactors
- Commit friendly — keep changes small and logical so each commit is meaningful
- Remind me to clear the chat context or start a new chat after every feature
- **When I paste text or feedback, do NOT autonomously start editing files or updating docs.** Ask me what I want done with it first
- **When I say "implement Phase X", check CLAUDE.md for the phase description first.** Do not guess what a phase contains — confirm the phase number and scope with me before starting any work

---

## GitHub Workflow Rules

**IMPORTANT: Never execute git commands. Always print the commands for the user to run themselves. Do not use the Bash tool for any git operation.**

**Always work on feature branches — never commit directly to main. Before giving any git commit command, confirm which branch we are on.**

Before starting any new phase, give the user these commands:
```bash
git checkout main
git pull
git checkout -b branch-name
```

Branch naming:
- New phase/feature: feat/descriptive-name
- Don't use phase names in the 'descriptive-name' for features.
- Bug fix: fix/bug-name
- UI change: ui/change-name

**One branch per phase.**

Once the phase is complete:
```bash
git add .
git commit -m "short message — main features only, not files"
git push origin branch-name
```
Then open a Pull Request on GitHub to merge into main.

### Pull Request Descriptions
After giving push commands, always generate a PR description ready to copy-paste.

**Summary**
One sentence explaining what this PR does and why.

**Changes**
List changes grouped by file. For each file, bullet the specific things that changed:

`path/to/file.ts`:
- Added X to Y
- Updated Z to handle new case
- Removed deprecated W

**Verification**
- ✅ Thing tested and confirmed working

---

## Build Phases

### ✅ Phase 0 — Planning (Complete)
### ✅ Phase 1 — Project Setup (Complete)
### ✅ Phase 2 — Content Foundation A1 (Complete)
### ✅ Phase 3 — Flashcards (Complete)
### ✅ Phase 4 — Grammar Exercises (Complete)
### ✅ Phase 4b — Grammar Testing & Fixes (Complete)
### ✅ Phase 5 — Exam Prep (Complete)
### ✅ Phase 6 — Mini Games (Complete)
### ✅ Phase 7 — Flashcard Categories (Complete)
### ✅ Phase 8 — Daily Challenge + Streak (Complete)
### ✅ Phase 9 — Progress Dashboard (Complete)
### ✅ Phase 10a — UI Redesign (Complete)
### ✅ Phase 10b — UI Fixes Round 2 (Complete)
### ✅ Phase 10c — Flashcard Enhancements (Complete)
### ✅ Phase 12 — Progress Page Fixes (Complete)
### ✅ Phase 17 — Pronunciation Guide (Complete)
### ✅ Phase 19 — Keyboard Shortcuts (Complete)
### ✅ Phase 14 — Insights / Analytics (Complete)
### ✅ Phase 16 — Reading Mode (Complete)
### ✅ Phase 18 — Sentence Builder (Complete)
### ✅ Phase 13 — Vocabulary Extra Info (Complete)
### ✅ Phase 15 — Supabase Authentication (Complete)
### ✅ Phase 22 — Deep Progress Insights (Complete)
### ✅ Phase 24 — Smart Interruption Tips (Complete)
### ✅ Phase 20 — AI / Gemini Features (Complete)
### ✅ Phase 25 — Quick Fixes & Small Improvements (Complete)
### ✅ Phase 34 — Bug Fixes & Code Quality (Complete)
### ✅ Phase 36 — A2 Content Completion (Complete)
### ✅ Phase 28 — Reading Mode Improvements (Complete)
### ✅ Phase 26 — Grammar Exercises Expansion (Complete)
### ✅ Phase 35 — Sentence Builder Improvements (Complete)
### ✅ Phase 30 — Newspaper / Comprehension Exercise (Complete)
### ✅ Phase 37 — Cheat Sheet / Reference Section (Complete)
### ✅ Phase 21 — Expand to A2, B1 (Complete)
### ✅ Phase 32 — Progress & Analytics Enhancements (Complete)
### ✅ Phase 33 — Spaced Repetition for Grammar (Complete)

---
## ACTIVE PIPELINE

### ⏳ Phase 27 — Flashcard Verb Sub-categories · Effort: Medium

**Goal:** When the user taps the "Verbs" pill in flashcard categories, show a second row of sub-category pills underneath. Each sub-category filters to that verb type.

#### Verb sub-categories (consistent across all levels)
| Sub-category | Detection method | A1 count | A2 count | B1 count |
|---|---|---|---|---|
| Modal Verbs | `german` is in fixed list: können, müssen, wollen, möchten, dürfen, sollen | 6 | 0 | 0 |
| Separable Verbs | `conjugations?.ich` contains a space (e.g. "fahre ab") | ~40 | ~35 | ~80 |
| Reflexive Verbs | `german` starts with "sich " | 1 | ~3 | ~5 |
| Irregular Verbs | `du` conjugation has a vowel change vs infinitive stem (fahren→fährst, sehen→siehst) — detected by comparing `conjugations.er` to stem; OR manually tagged | ~35 | ~30 | ~60 |
| Regular Verbs | all verbs that match none of the above | ~65 | ~60 | ~200 |

> Note: A2 and B1 vocabulary lists contain only **new** words not in A1. So modals (all in A1) show 0 at A2 and B1. Show count 0 if empty — don't hide, so users understand why.
> Actually: hide sub-categories with count 0 to keep UI clean. If no sub-categories have words, don't expand.

#### Detection logic — runtime, no file tagging needed
Add a helper function `getVerbType(word: Word): VerbSubCategory` to `app/flashcards.tsx` (or a new `src/lib/verbUtils.ts`):

```ts
const MODAL_VERBS = ['können', 'müssen', 'wollen', 'möchten', 'dürfen', 'sollen'];

function getVerbType(word: Word): VerbSubCategory {
  if (MODAL_VERBS.includes(word.german)) return 'Modal';
  if (word.german.startsWith('sich ')) return 'Reflexive';
  // Separable: ich conjugation has a space (e.g. "hole ab")
  if (word.conjugations?.ich?.includes(' ')) return 'Separable';
  // Irregular: er form differs significantly from infinitive (has umlaut / vowel swap)
  // Simple heuristic: er form is NOT just stem + 't'
  if (word.conjugations && isIrregular(word)) return 'Irregular';
  return 'Regular';
}
```

For `isIrregular()`: strip infinitive ending (-en / -n), derive stem, check if `conjugations.er` equals `stem + 't'` or `stem + 'et'`. If not → irregular. This covers vowel-change verbs (fahren→fährt, sehen→sieht, lesen→liest, geben→gibt, nehmen→nimmt, etc.).

#### Type changes
Add to `src/data/vocabulary/types.ts` (optional — only if we decide to pre-tag rather than detect at runtime):
```ts
export type VerbSubCategory = 'Regular' | 'Irregular' | 'Modal' | 'Separable' | 'Reflexive';
```
This type is used in `flashcards.tsx` for the filter logic regardless.

#### UI changes — `app/flashcards.tsx`
- State: add `verbSubCategory: VerbSubCategory | null` (null = no sub-filter active).
- When "Verbs" pill is selected, render a second row of sub-category pills below the main category row.
- Each sub-category pill shows: `Modal Verbs · 6` format (label + count).
- Selecting a sub-category pill filters words further: `words.filter(w => w.partOfSpeech === 'verb' && getVerbType(w) === subCategory)`.
- Selecting "Verbs" again (already selected) collapses the sub-row and clears sub-category. Or pressing a different main category also collapses.
- Sub-category pills use the same pill style as main categories (same border/bg/text style, just smaller font or same).

#### CategoryId type update
```ts
type CategoryId = 'All' | 'Nouns' | 'Verbs' | 'Adjectives' | 'Prepositions' | 'Other';
type VerbSubCategory = 'Regular' | 'Irregular' | 'Modal' | 'Separable' | 'Reflexive';
```

#### Files to touch
- `app/flashcards.tsx` — add sub-category state, detection helper, second pill row, filter logic.
- `src/data/vocabulary/types.ts` — add `VerbSubCategory` type (if needed as shared type).

#### Notes on counts per level
- A2 modals = 0 (all modals were introduced at A1 — A2 word list has none). Sub-pill hidden.
- B1 modals = 0 for same reason. Sub-pill hidden.
- Reflexive: A1 = 1 (sich kümmern), A2 = ~3 (sich umziehen, sich verabschieden, sich ärgern, sich beeilen), B1 = ~5.
- The word count on each sub-pill updates automatically because it's computed at runtime from the level's word list.

---
## LATER
*Planned but not immediate.*

### ⏳ Phase 29 — Real A1 Exam Simulation · Effort: High

**Goal:** Replace the current loose Exam Prep practice with a realistic simulation of the actual Goethe-Zertifikat A1 exam — same format, same difficulty, same scoring structure. This is a separate "Exam Simulation" mode, not a replacement for the existing practice sections.

#### Official Goethe-Zertifikat A1 Exam Format
The real exam has 4 sections. Total time: 75 minutes. Total marks: 100 (pass = 60).

| Section | Time | Marks | Current app equivalent |
|---|---|---|---|
| Hören (Listening) | 15 min | 25 pts | exam_listening (too easy) |
| Lesen (Reading) | 25 min | 25 pts | exam_reading (too easy) |
| Schreiben (Writing) | 20 min | 15 pts | exam_writing (close) |
| Sprechen (Speaking) | 15 min | 35 pts | exam_speaking (close) |

---

#### Part 1 — Hören (Listening, 25 pts)

The real Goethe A1 Hören has 4 sub-tasks:
- **Task 1** (5 items, 5 pts): Short announcements (train station PA, radio, phone message). True/false per item.
- **Task 2** (5 items, 5 pts): 5 short dialogues at a shop/street/café. Multiple choice (A/B/C) for what was said.
- **Task 3** (5 items, 5 pts): Answering machine messages. Match each message to a picture/category.
- **Task 4** (5 items, 5 pts): One longer conversation. Tick the correct answers (multiple choice).
- **Task 5** (5 items, 5 pts): Short sentences/instructions. True/false.

**App implementation plan:**
- Use Web Speech API synthesis (already used in Listening Quiz) to read out pre-written A1-level short texts as audio.
- Each task plays audio once (simulate real exam — no repeat button in strict mode, or allow 1 replay for practice mode).
- Pre-write the listening scripts in a new `src/data/examListening.ts` file.
  - Task 1: 5 short announcements (e.g. "Achtung auf Gleis 3...", "Das Café ist von 8 bis 20 Uhr geöffnet...")
  - Task 2: 5 short dialogues as two-speaker scripts (alternate between voice 1 and voice 2 — use TTS language setting for de-DE)
  - Task 3: 5 short phone messages
  - Task 4: 1 longer 6-exchange dialogue about a simple topic (shopping, making an appointment)
  - Task 5: 5 short instructions/announcements
- Score: 1 pt per correct answer. Show 0 / 25 after completion.

---

#### Part 2 — Lesen (Reading, 25 pts)

The real exam has 4 sub-tasks:
- **Task 1** (5 items, 5 pts): 5 short texts (signs, notices, labels). True/false (ist das richtig oder falsch?).
- **Task 2** (5 items, 5 pts): 1 personal email/message (100–130 words). 5 comprehension questions, each true/false.
- **Task 3** (5 items, 5 pts): 5 short ads or job listings. Match each to a person's need (multiple choice A/B/C).
- **Task 4** (5 items, 5 pts): A form with gaps. Read a text and fill in 5 pieces of information into a short form.

**App implementation plan:**
- Pre-write all reading texts in `src/data/examReading.ts`. Separate from the current exam_reading (which uses passages.ts).
- Task 4 (form-filling) — use `TextInput` fields for the 5 form slots. Check user input against expected values (case-insensitive, allow minor spelling variations for nouns). Since auto-checking short-form answers is tricky, consider using Gemini to validate: send (expected_answer, user_answer) → true/false. Or use simple string-match with trim+lowercase.
- Score: 1 pt per correct item. Show 0 / 25 after.

---

#### Part 3 — Schreiben (Writing, 15 pts)

The real exam has 2 sub-tasks:
- **Task 1** (5 pts): Fill in a form (name, address, phone, nationality, etc.) from information given in a short paragraph.
- **Task 2** (10 pts): Write a short message (30–40 words) responding to a prompt (e.g. "Reply to your friend's invitation — say yes, tell them what time you can come, and ask about food").

**App implementation plan:**
- Task 1: Show a paragraph of personal info + a form with 5 blank fields to complete. String-match checking (similar to Reading Task 4). Or Gemini validation for flexibility.
- Task 2: Current `exam_writing` screen already does this well. Adapt the prompt to match actual Goethe A1 writing tasks (shorter, more specific, mentions the 30-word target).
- Gemini feedback for Task 2: extend the current `getWritingFeedback()` prompt to also produce a score estimate (0–10 scale, since 10 pts available). Display score alongside feedback.
- Total: 15 pts.

---

#### Part 4 — Sprechen (Speaking, 35 pts)

The real exam has 3 sub-tasks (done in pairs — simulated solo here):
- **Task 1** (10 pts): Introduce yourself. Prompted by 6 keyword cards: Name / Land / Wohnort / Sprachen / Beruf / Hobby.
- **Task 2** (15 pts): Question and answer exchange. User gets 6 question-word cards (Wie heißen Sie? / Woher kommen Sie? / etc.) — ask the questions to an imaginary partner (say them aloud), then answer 6 questions shown on screen.
- **Task 3** (10 pts): Make requests. Given 3 picture cards (e.g. a phone, a pen, a glass of water), ask for each one politely (Könnte ich bitte...? / Haben Sie...?).

**App implementation plan:**
- Task 1: Show the 6 keyword cards as a grid. User taps "Start Recording", speaks their intro, taps "Done". Gemini assesses: does the response cover all 6 points? Score 0–10.
- Task 2: Show question-word cards. User reads each aloud (no assessment), then 6 questions shown in text — user records answers. Gemini scores content + grammar (0–15).
- Task 3: Show 3 picture descriptions (can't do images, so write what the picture shows). User records a request for each. Gemini assesses politeness + correctness (0–10).
- Use Web Speech API `SpeechRecognition` (de-DE) to capture spoken text, same as current Listening Quiz and Speaking exam.

---

#### Exam Simulation Mode — UI

- New entry point: a card on the existing Exam Prep selector labelled "EXAM SIMULATION" with a different visual treatment (e.g. solid black border, prominent CTA).
- Shows a pre-exam briefing screen: "This simulation follows the real Goethe-Zertifikat A1 exam format. 4 sections, 75 minutes, 100 points. Pass mark: 60."
- Each section shown in sequence with a progress bar (Section 1 of 4).
- Final results screen: score breakdown per section, total / 100, pass/fail verdict, "Your strongest section" + "Your weakest section".
- Save score to Supabase as a new `SectionKey`: `exam_simulation`. Store best score + most recent score.
- No time limit enforced in practice version — just show elapsed time.

---

#### Files to create / modify
- `src/data/examListening.ts` — new: all listening scripts + questions
- `src/data/examReading.ts` — new: all reading texts + questions (replace current thin exam data)
- `app/examSimulation.tsx` — new: the full simulation flow component (reuse ExerciseCard, ExerciseResult patterns)
- `app/exam.tsx` — add Exam Simulation card to selector
- `src/lib/scoresService.ts` — add `exam_simulation` SectionKey
- `src/lib/gemini.ts` — add `getExamSimulationSpeakingFeedback()` that returns score + feedback

### Phase 23 — Multi-user · Effort: High

**Goal:** Add social features on top of the existing Supabase auth — user display names, a streak leaderboard visible to all users, and a lightweight progress comparison on the Progress screen.

#### 1. User display name profile

- **Supabase:** New table `user_profiles`:
  - `user_id` TEXT PRIMARY KEY
  - `display_name` TEXT NOT NULL (max 20 chars, letters/numbers/spaces only)
  - `created_at` TIMESTAMPTZ DEFAULT now()
  - RLS: SELECT open to any authenticated user; INSERT/UPDATE restricted to `auth.uid()::text = user_id`
- **First-login prompt:** After sign-in, check if a `user_profiles` row exists for the current user. If not, show a one-time `DisplayNameModal` overlay on the home screen asking them to pick a name. Block dismissal until a valid name is submitted.
- **Display:** Show the display name in the sidebar below the level toggle and above the Sign Out button.
- **Files to touch:** Supabase dashboard (create table + RLS), `src/lib/profileService.ts` (new: `getProfile()`, `saveDisplayName(name)`), `components/DisplayNameModal.tsx` (new), `app/home.tsx` (show modal if no profile), `app/(drawer)/_layout.tsx` (render name in sidebar).

#### 2. Streak Leaderboard

- **New screen:** `app/leaderboard.tsx`
- **Data:** Query `user_progress` for ALL users' `streak_count` and `last_active_date`, joined with `user_profiles` for display names.
  - Requires relaxing the `user_progress` SELECT RLS policy from `user_id = auth.uid()::text` to `true` (any authenticated user can read all rows). INSERT/UPDATE policy stays restricted to own user_id.
  - Do NOT relax vocabulary_mastery, section_scores, or mistake_log — those remain private.
- **Display:** Top 20 users ranked by streak count. Each row: rank number, display name, streak count, days-since-active if > 1 day (e.g. "inactive 3d"). Highlight current user's row with a 2px left border in blue `#2563eb`.
- **Empty state:** "No other users yet — share the app!" if fewer than 2 users exist.
- **Sidebar:** Add Leaderboard entry between Insights and Progress (icon: `award`, Feather).
- **Files to touch:** Supabase dashboard (relax user_progress SELECT policy), `src/lib/leaderboardService.ts` (new: `loadLeaderboard()` → `{ userId, displayName, streak, lastActive }[]` sorted by streak desc), `app/leaderboard.tsx` (new), `app/(drawer)/_layout.tsx` (add sidebar entry and Drawer.Screen).

#### 3. Progress comparison ("HOW YOU COMPARE")

- **Where:** New section at the bottom of `app/progress.tsx`, below the existing charts.
- **What to show:** Two stat lines:
  - Grammar rank: "You rank #2 in Grammar out of N users" — derived by comparing your best grammar score % against all users' `grammar_topic_scores` averages.
  - Vocabulary rank: "You know more words than X% of users" — compare your known word count against all users' known counts from `vocabulary_mastery`.
- **How:** `leaderboardService.ts` adds two helpers: `loadGrammarRankings()` and `loadVocabRankings()` — each fetches the relevant table for all users and returns the current user's percentile.
- **Fallback:** If only 1 user exists, show "Invite a friend to compare scores!".
- **Files to touch:** `src/lib/leaderboardService.ts` (add 2 ranking helpers), `app/progress.tsx` (add HOW YOU COMPARE section).

#### Edge cases
- Display name uniqueness is not enforced — two users can share a name. That's fine for a small-scale app.
- If a user has no `user_profiles` row (existing users before this phase), they appear on the leaderboard as "Anonymous".
- Leaderboard only shows users who have logged in after this phase deploys (because `user_profiles` won't exist for old sessions that never triggered the modal). Acceptable for a small user base.

#### Summary of files to touch
| File | Change |
|---|---|
| Supabase dashboard | Create `user_profiles` table + RLS; relax `user_progress` SELECT policy |
| `src/lib/profileService.ts` | New — `getProfile()`, `saveDisplayName()` |
| `src/lib/leaderboardService.ts` | New — `loadLeaderboard()`, `loadGrammarRankings()`, `loadVocabRankings()` |
| `components/DisplayNameModal.tsx` | New — first-login display name prompt |
| `app/leaderboard.tsx` | New — ranked leaderboard screen |
| `app/home.tsx` | Show DisplayNameModal if no profile exists |
| `app/progress.tsx` | Add HOW YOU COMPARE section |
| `app/(drawer)/_layout.tsx` | Add Leaderboard sidebar entry + Drawer.Screen; render display name in sidebar |

---

### Phase 31 — Lessons · Effort: High

**Goal:** Add a Lessons section where each grammar topic has a structured explanation screen — plain English, worked examples, key rules, common mistakes — with a "Practice Now" button that jumps directly into Grammar exercises for that topic.

#### Data structure — `src/data/lessons/types.ts`

```ts
export type LessonExample = {
  german: string;   // German sentence in IBM Plex Mono
  english: string;  // English translation
  note?: string;    // optional annotation, e.g. "verb in second position"
};

export type Lesson = {
  topic: string;          // must match GrammarExercise.topic exactly — used for deep-link
  level: Level;
  title: string;          // display title (same as topic, formatted for headings)
  explanation: string;    // 2–3 paragraph plain English explanation
  keyPoints: string[];    // 3–5 bullet points of the key rules
  examples: LessonExample[]; // 4–6 worked examples
  commonMistake: string;  // one common error described (wrong → right)
};
```

#### Data files

- `src/data/lessons/a1.ts` — 19 lessons (one per A1 grammar topic, matching topics in `a1.ts` exactly)
- `src/data/lessons/a2.ts` — 12 lessons (matching A2 grammar topics)
- `src/data/lessons/b1.ts` — 12 lessons (matching B1 grammar topics)
- `src/data/lessons/index.ts` — `LESSONS: Record<Level, Lesson[]>`

**A1 topic list (must match `GrammarExercise.topic` strings exactly):**
Verb conjugation: sein, Verb conjugation: haben, Definite articles: der/die/das, Negation: nicht / kein, Basic word order, Indefinite articles: ein/eine, Personal pronouns, Regular verb conjugation, Modal verbs, Accusative case, Possessive articles, Questions, Separable verbs, Plural nouns, Imperative, Prepositions, Time expressions, Reflexive verbs, Days/months/seasons.

#### Lesson selector screen — `app/lessons.tsx`

- 2-column card grid (same style as Grammar and Mini Games selectors).
- Each card shows: topic title, "~3 min read", and a small dot (green if viewed, grey if not).
- Lesson viewed state is tracked locally via AsyncStorage (`lessons_viewed_A1`, etc.) — a `Set<string>` of topic strings. No Supabase needed; lessons are reference material, not scored.
- "X / Y lessons read" count shown at top in the LABEL style (`#888`, 11px, caps).
- B2 lessons show a "coming soon" empty state (same pattern as grammar for B2).

#### Lesson detail screen — `app/lesson.tsx`

- Accessed via `router.push('/lesson?topic=Verb+conjugation+sein&level=A1')`.
- Scrollable single-column layout.
- **Header:** Topic title (IBM Plex Mono 18px bold, `#111`), level badge (small pill).
- **EXPLANATION section:** Plain Inter 14px `#333` text, line-height 1.6, paragraph breaks.
- **KEY RULES section:** Bulleted list. Rule text in Inter 13px; any German words in rules rendered in IBM Plex Mono inline.
- **EXAMPLES section:** One card per example. German sentence: IBM Plex Mono 14px semibold `#111`. English: Inter 12px `#888`. Optional note: Inter 11px `#2563eb`.
- **COMMON MISTAKE section:** A `#dc2626` 1px left-bordered box. Shows ✗ wrong form + ✓ correct form, both in IBM Plex Mono.
- **Bottom CTA:** "PRACTICE THIS TOPIC" — primary solid black button. Navigates to `app/grammar.tsx` passing `?topic=<topicString>` as a query param.
- On mount: mark topic as viewed in AsyncStorage.

#### Grammar screen update — `app/grammar.tsx`

- Read `topic` from `useLocalSearchParams()` at mount.
- If `topic` param is present: skip the topic selector, pre-filter exercises to that topic, and start the session immediately.
- If topic param is absent: existing behaviour (show topic selector as normal).
- This is a small addition — just an early-return branch at the top of the component before the selector renders.

#### Sidebar addition

- Icon: `file-text` (Feather)
- Label: Lessons
- Position: between Grammar and Cheat Sheet in the sidebar order.
- Add `Drawer.Screen` for both `lessons` and `lesson` routes in `_layout.tsx` (lesson detail does not appear in the sidebar itself — only the lessons selector does).

#### No Supabase changes needed

Lesson progress (viewed/not viewed) is local-only via AsyncStorage. Lessons are reference material, not a scored section — no `section_scores` entry, no progress page entry.

#### Summary of files to touch
| File | Change |
|---|---|
| `src/data/lessons/types.ts` | New — `Lesson`, `LessonExample` types |
| `src/data/lessons/a1.ts` | New — 19 A1 lessons |
| `src/data/lessons/a2.ts` | New — 12 A2 lessons |
| `src/data/lessons/b1.ts` | New — 12 B1 lessons |
| `src/data/lessons/index.ts` | New — `LESSONS` record export |
| `app/lessons.tsx` | New — lesson selector screen |
| `app/lesson.tsx` | New — lesson detail screen |
| `app/grammar.tsx` | Read `topic` query param; pre-filter and auto-start if present |
| `app/(drawer)/_layout.tsx` | Add Lessons + lesson Drawer.Screen entries; add sidebar item |

### ⏳ Phase 38 — B2 Content · Effort: Very High

**Goal:** Complete the B2 level so it is fully playable — flashcards, grammar exercises, tips, reading passages, sentence builder, and cheat sheet.

#### Current state of B2
| Asset | Status |
|---|---|
| `src/data/vocabulary/b2.ts` | 232 words — **WRONG SOURCE, must be replaced** (was built from DTZ list; correct source is Aspekte Neu B2) |
| `src/data/vocabulary/index.ts` | B2 set to `[]` — not wired in yet |
| `src/data/grammar/b2.ts` | Does not exist |
| `src/data/grammar/index.ts` | B2 set to `[]` (shows "coming soon") |
| `src/data/cheatsheets/b2.ts` | ✅ Exists with 6 sections (participial phrases, Konjunktiv I, modal particles, connectors, Nominalisierung, genitiv prepositions) |
| `src/data/tips.ts` | B2 has placeholder tips — needs real B2 tips |
| `src/data/topicTipMap.ts` | No B2 entries |
| `src/data/passages.ts` | No B2 passages |
| `src/data/sentenceBuilder.ts` | No B2 sentences |

---

#### Step 1 — Replace b2.ts with Aspekte Neu B2 vocabulary

**Source:** `b2_aspekte.txt` — the Aspekte Neu B2 Kapitelwortschatz (Hueber Verlag). This is the standard B2 reference since Goethe Institut does not publish an official B2 Wortliste.

**Cross-reference results** (run against A1+A2+B1 combined, 2,635 known words):
| | Count |
|---|---|
| Total unique entries parsed from Aspekte Neu B2 | ~2,426 |
| Already covered in A1+A2+B1 | ~303 |
| **Genuinely new at B2** | **~2,123** |

> Compare: B1 introduced 1,406 new words. B2 introduces ~2,123 new words. B2 is actually a larger vocabulary jump than B1 because Aspekte is a comprehensive academic/professional B2 resource with extensive topical vocabulary (workplace, culture, society, science, media).

**Aspekte file format** (`b2_aspekte.txt`, 2,970 lines):
```
die Vorstellung, -en (Meine Vorstellung von Heimat ist …)   ← noun + plural + example
auflösen (eine Wohnung auflösen)                             ← verb + example
leichtfallen, fiel leicht, ist leichtgefallen               ← verb + conjugation info
der/die Grafiker/in, -/-nen                                  ← gendered noun pair
mittlerweile                                                  ← adverb (plain)
```

**Parsing rules for building new b2.ts entries:**
1. Strip all content in `(...)` parentheses — those are example sentences/notes
2. Stop at first comma — everything after is plural suffix or conjugation info
3. For `der/die X/in` gendered pairs: create ONE entry as `der/die X/Xin` in the german field, mark gender as `'der'` (masculine default), note in English "(male/female: Grafiker/Grafikerin)" — OR just use the masculine base form with a note. Prefer: `german: 'der Grafiker'`, `english: 'graphic designer (m/f: Grafiker/Grafikerin)'`.
4. Preserve `sich` for reflexive verbs: `sich einleben` → `german: 'sich einleben'`
5. Fix typos from PDF extraction (e.g. `Arbeitsvertag` → `Arbeitsvertrag`)
6. Skip chapter/module headers: "Kapitelwortschatz", "Aspekte neu B2", "Seite N", "Kapitel N", "Modul N", "Auftakt", "Wiederholung"
7. Strip leading lesson markers: "1b ", "2a ", "4c " etc.

**Build process** — do in chunks of 100 words, alphabetically ordered in final file:
- Chunk 1: A words (abenteuerlich → aufzeigen) — ~100 entries
- Chunk 2: B–D words — ~100 entries
- Chunk 3: E–F words — ~100 entries
- ... (~21 chunks total for ~2,123 words)
- Wait for "continue" after each chunk before writing the next

**Final file must be sorted A→Z** (same as a1.ts convention) with IDs `b2_0001` → `b2_N`.

**IDs:** Start fresh from `b2_0001`. The existing 232 entries will be replaced entirely — the DTZ-sourced entries that are also in Aspekte will reappear with correct content; DTZ-only entries that aren't in Aspekte will be dropped.

**Each entry must include** (same structure as a1.ts/a2.ts/b1.ts):
- `id` — b2_XXXX
- `german` — full form including article for nouns, `sich X` for reflexives
- `english` — translation
- `gender` — `'der'` / `'die'` / `'das'` / `null`
- `partOfSpeech` — noun / verb / adjective / adverb / preposition / conjunction / phrase
- `exampleDe` — example sentence in German
- `exampleEn` — English translation of example
- `plural?` — for nouns (can derive from Aspekte plural suffix e.g. `-en` → add to base)
- `conjugations?` — for verbs (ich/du/er/wir/ihr/sie present tense)
- `comparative?` — for adjectives where applicable

---

#### Step 2 — Wire vocabulary into index.ts

In `src/data/vocabulary/index.ts`, after b2.ts is complete:
```ts
import { B2_WORDS } from './b2';
export const VOCABULARY: Record<Level, Word[]> = {
  A1: A1_WORDS,
  A2: A2_WORDS,
  B1: B1_WORDS,
  B2: B2_WORDS,  // was [] — wire in once b2.ts is written
};
```

---

#### Step 3 — Grammar exercises (`src/data/grammar/b2.ts`)

Create `src/data/grammar/b2.ts`. Target: **~120 exercises across 10 topics** (12 per topic). Topics aligned with `src/data/cheatsheets/b2.ts` sections already written:

1. **Extended participial phrases** — convert relative clauses to participial attributes
2. **Konjunktiv I** — reported speech forms (er sei, sie habe, er werde, etc.)
3. **Modal particles** — doch / ja / mal / eigentlich / wohl / halt usage
4. **Passive with modal verbs** — Das muss gemacht werden / Das kann nicht geändert werden
5. **N-Deklination** — der Herr/Herrn, der Mensch/Menschen, der Kunde/Kunden, der Kollege/Kollegen
6. **Nominalisierung** — verb/adjective → noun (das Lernen, die Müdigkeit, die Schnelligkeit)
7. **Genitiv prepositions** — wegen, trotz, während, innerhalb, außerhalb, anstatt, aufgrund, mithilfe
8. **Complex connectors** — obwohl vs trotzdem, weil vs denn, als vs wenn vs wann
9. **Indirect questions** — Ob-clauses and embedded W-questions
10. **Relative clauses with was / wo** — Das, was er sagt... / dort, wo ich wohne...

Wire into `src/data/grammar/index.ts` (replace `B2: []`).

---

#### Step 4 — Tips (`src/data/tips.ts`)

Replace B2 placeholder tips with 20 real B2 tips (same rule+example format as A1/A2/B1). One tip per grammar topic above plus 10 general B2 vocabulary/register tips.

---

#### Step 5 — topicTipMap (`src/data/topicTipMap.ts`)

Add B2 section with 10 entries — one focus tip per grammar topic from Step 3.

---

#### Step 6 — Reading passages (`src/data/passages.ts`)

Add 10 B2 reading passages (10–14 sentences each). Use complex subordinate clauses, passive constructions, participial phrases, abstract Aspekte-sourced vocabulary. Topics: news article, opinion piece, formal letter, workplace situation, environmental issue, cultural event, scientific explanation, social media debate, job application, travel guide excerpt.

---

#### Step 7 — Sentence Builder (`src/data/sentenceBuilder.ts`)

Add 50 B2 sentences (`B2_SENTENCES`). Grammar complexity: participial phrases, Konjunktiv I, passive with modals, N-Deklination, complex subordinate clauses. Difficulty split: 10 simple / 20 medium / 20 complex. Wire into game (currently falls back to A1 for B1/B2).

---

#### Summary of files to touch
| File | Change |
|---|---|
| `src/data/vocabulary/b2.ts` | **Replace entirely** — ~2,123 Aspekte Neu B2 words, alphabetical, IDs b2_0001 onwards |
| `src/data/vocabulary/index.ts` | Wire B2_WORDS in (replace `[]`) — 1 line |
| `src/data/grammar/b2.ts` | New — 120 exercises across 10 topics |
| `src/data/grammar/index.ts` | Wire B2_GRAMMAR in (replace `[]`) |
| `src/data/tips.ts` | Replace B2 placeholder tips with 20 real tips |
| `src/data/topicTipMap.ts` | Add B2 section (10 entries) |
| `src/data/passages.ts` | Add 10 B2 reading passages |
| `src/data/sentenceBuilder.ts` | Add 50 B2 sentences + wire into game |

---

## Progress Log

- [2026-03-26] Project planning completed. CLAUDE.md created.
- [2026-03-27] Phase 1 complete — Expo setup, sidebar, Zustand, Supabase, WSL move.
- [2026-03-28] Phase 2 complete — 665 A1 words, 111 grammar exercises, 25 tips, Gemini integration.
- [2026-03-28] Phase 4 complete — Grammar Exercises UI with fill-blank and multiple-choice.
- [2026-03-28] Phase 5 complete — Exam Prep all 4 sub-sections live.
- [2026-03-29] Phase 4b complete — Grammar UX fixes, keyboard nav, Gemini model updated.
- [2026-03-29] Phase 6 complete — Word Match, Gender Battle, Listening Quiz.
- [2026-03-29] Phase 7 complete — Flashcard category pills.
- [2026-03-29] Phase 8 complete — Daily Challenge + streak tracking.
- [2026-03-29] Phase 9 complete — Progress Dashboard with Supabase score tracking.
- [2026-03-29] Phase 3 complete — Flashcards with flip animation and spaced repetition.
- [2026-03-29] Phase 10a complete — Full UI redesign. IBM Plex Mono, theme.ts, all screens restyled.
- [2026-03-29] Phase 10b complete — Sidebar Feather icons, #fafafa backgrounds, card grid selectors, home page redesign.
- [2026-03-29] Phase 10c complete — Shaky state, 3-button rating, Study Weak, search bar, session summary.
- [2026-03-29] Phase 12 complete — Progress page: last active date on streak card, percentage labels on vocabulary category bars.
- [2026-03-29] Phase 14 complete — Insights screen with weak vocabulary, mistake log, weak grammar topics, activity calendar.
- [2026-03-29] Phase 16 complete — Reading Mode with 15 shuffled A1 passages, per-word vocabulary lookup popup.
- [2026-03-29] Phase 17 complete — Pronunciation Guide with 28 entries across 4 groups, Web Speech API play buttons.
- [2026-03-29] Phase 19 complete — Space key to flip flashcard.
- [2026-03-30] Phase 18 complete — Sentence Builder mini game, 80 A1 sentences, tap-to-place tile UI, grammar notes, Supabase score saving, Progress tab entry.
- [2026-03-30] Phase 13 complete — 318/330 nouns have plurals (12 uncountable skipped), 151/151 verbs have conjugations, 53/71 adjectives have comparatives (18 absolute states skipped). Always-visible info panel in flashcards. Gender Battle shows plural, Listening Quiz reveals word + conjugations after answering. Scripts in scripts/ are reusable for A2/B1/B2 — just uncomment the paths in extract-plurals.js, extract-conjugations.js, and apply-comparatives.js.
- [2026-03-30] Phase 15 complete — Supabase Auth live (email + password, confirmation enabled). Login/signup screen built to match app design system. All screens gated behind auth. Device UUID replaced with real auth user ID. Level persists to Supabase on change and loads on login. Spaced repetition dates added to vocabulary_mastery (Known→7d, Shaky→2d, Unknown→1d). Sign Out button in sidebar. App deployed to Vercel at https://german-learning-app-neon.vercel.app — auto-deploys on push to main.
- [2026-03-30] Phase 15 post-fixes — Enter key navigation across all auth form fields. Fixed signup success message being wiped by mode switch. Fixed email confirmation black page: detectSessionInUrl set to true, Supabase switched to Implicit auth flow. RLS enabled on all 5 Supabase tables (user_id = auth.uid()::text policies). Custom branded confirmation email live in Supabase.
- [2026-03-30] Phase 22 complete — New grammar_topic_scores Supabase table (with RLS). grammar.tsx saves per-topic score on session end (specific topic only, not All Topics). Progress page Grammar Topics card upgraded: score bars coloured by performance, weakest topics surface first, unattempted show —. Insights Weak Grammar Topics now uses real scores sorted lowest-first with green/amber/red bars instead of mistake counts. Fixed MasteryMap type references in progress.tsx and insights.tsx (.state accessor).
- [2026-03-30] Bug fix — Supabase navigator.locks contention on web ("lock stolen" errors on mastery/mistake loads). Fixed by passing storage: undefined on web so Supabase uses native browser localStorage without the navigator.locks layer. AsyncStorage still used on native for future mobile support.
- [2026-03-30] Custom favicon — Created assets/favicon.svg (32x32 "LD" monogram, #1a1a2e bg) and assets/icon.svg (192x192). Converted to PNG with sharp-cli. app.json web.favicon set to ./assets/favicon.svg. public/favicon.ico added for browser fallback. Favicon display not fully confirmed in dev — needs verification on Vercel deploy.
- [2026-03-30] Bug partial fix — streakService .single() changed to .maybeSingle() to stop 406 errors when user_progress row doesn't exist yet. Needs verification.
- [2026-03-30] Bug fix complete — Favicon: root cause found (assets/favicon.png was old default Expo logo, sharp-cli conversion never replaced it). Regenerated correct "LD" monogram PNG from scratch in pure Node.js. Added app/+html.tsx (Expo Router HTML shell) with explicit SVG + PNG favicon link tags. Copied favicon.svg to public/ so it serves from web root. Confirmed working on Vercel. Supabase 406: scoresService .single() → .maybeSingle() in saveScore and saveCompletion — all services now consistent.
- [2026-03-30] Gemini model updated — gemini-2.0-flash deprecated and shut down, replaced with gemini-2.5-flash in src/lib/gemini.ts.
- [2026-03-30] Phase 11 complete — All Exam Prep sections tested and working. Fixed Gemini markdown formatting in Writing and Speaking feedback (responses now output plain text paragraphs, no asterisks or bullet points).
- [2026-03-30] Phase 25 (first pass, investigation only) — Suspected logging gaps confirmed to already be handled. Original analysis was incorrect.
- [2026-03-31] Phase 24 complete — Smart Interruption Tips. After completing grammar or daily challenge sessions, app loads recent mistakes, identifies most-repeated weak topic, and surfaces a targeted tip in TipsBar with a blue "FOCUS TIP" label. New: useTipStore.ts, topicTipMap.ts (20 A1 entries), contextualTipService.ts. TipsBar updated to show/dismiss focus tips via arrow navigation.
- [2026-03-31] Phase 20 complete — Fill in the Blank mini game built (FillInBlankGame.tsx). Gemini generates a sentence per round with the target word blanked out; user types the missing word. Article stripped from nouns so blank is just the noun. 10 rounds, score saved to Supabase (game_fill_in_blank). Error + retry/skip UI if Gemini fails. Quota error message improved in callGemini() to detect 429/quota errors. All existing Gemini loading states and feedback tone were already solid — confirmed and left as-is.
- [2026-04-03] Phase 21 scaffolds complete — B1: 1406 words total (319 complete, 1087 placeholders). B2: 232 words in b2.ts so far — but the full B2 word list has more than 300 genuinely new words not in A1/A2/B1, so b2.ts is incomplete. Phase 21 on hold — will resume later.
- [2026-04-04] Phase 21 A2 complete — 96 grammar exercises across 12 topics (a2.ts), wired into grammar/index.ts. A2 tips expanded to 20 (rule+example format). topicTipMap.ts updated with all 12 A2 topic entries. B1/B2 show "coming soon" via existing empty-array check in grammar.tsx.
- [2026-04-04] Phase 25 complete — Tips now use Fisher-Yates shuffle at session start (sequential traversal, no repeats). German time-of-day greeting replaces LERNE DEUTSCH wordmark on home screen. Speaker icon on flashcard front/back reads German word via Web Speech API (de-DE). Home Flashcards card shows "X due · Y known" from mastery data. 1/2/3 keyboard shortcuts rate Unknown/Shaky/Known at any point. logActivity() added to grammar, flashcard, and game session ends. Streak grace period: missing one day continues streak; "Grace day used" shown on daily done screen.
- [2026-04-04] Phase 28 complete — A1 passages extended from ~5 sentences to 8-9 sentences each. 5 A1 non-narrative passages added (bakery sign, SMS exchange, email to school, building notice, flat-to-let ad). 5 A2 non-narrative passages added (WhatsApp group, formal email, job ad, office notice, hotel review). Conjugated verb lookup fixed in reading.tsx: buildInfinitiveAttempts() strips -est/-st/-et/-t/-e endings and reconstructs the infinitive, plus umlaut reversal (fährt→fahren); "not found" message updated to "Word not found — search in Flashcards". "Next Passage →" button added at the bottom of each passage (more discoverable than the header arrows).
- [2026-04-04] Phase 36 complete — A2 content complete. 12 A2 reading passages added to passages.ts (travel, shopping, work, social plans — 6-8 sentences each, Perfekt + subordinate clauses). 50 A2 Sentence Builder sentences added to sentenceBuilder.ts across 7 categories (Perfekt haben/sein, weil/dass/obwohl/wenn subordinate clauses, comparatives, adjective endings, two-way prepositions, modal Präteritum, reflexive verbs, werden future). sentenceBuilder.ts restructured to Record<Level, SentenceEntry[]> (A1_SENTENCES + A2_SENTENCES). SentenceBuilderGame.tsx updated to read level from useLevelStore and pick from the correct pool; falls back to A1 if B1/B2 selected.
- [2026-04-04] Phase 26 complete — A1 grammar expanded from 111 to 223 exercises (19 topics). 9 thin/priority topics brought to 15 each. 3 new topics added: Time expressions (12 exercises — um/halb/Viertel/am Abend), Reflexive verbs (10 — sich vorstellen/fühlen/freuen/setzen), Days/months/seasons (10 — am Montag/im Januar/im Sommer). A2 grammar expanded from 96 to 168 exercises (12 topics). Adjective endings (both) → 18 each; Perfekt irregular, haben vs sein, Two-way prepositions, Subordinate clauses → 15 each (adds obwohl/ob/wenn/als/denn vs weil); all remaining 6 topics → 12 each.
- [2026-04-04] Phase 35 complete — Difficulty tagging added to all 130 sentences (80 A1 + 50 A2). simple/medium/complex tags based on grammar complexity. Pre-game difficulty picker in SentenceBuilderGame.tsx (All / Simple / Medium / Complex); filters pool, adjusts round count, shows badge during play.
- [2026-04-04] Phase 30 complete — Comprehension sub-section added to Exam Prep. New ComprehensionExercise.tsx component: 5 A1 texts + 5 A2 texts (NOTICE, AD, SHORT MESSAGE, JOB AD, EVENT, etc.), user writes German answers, Gemini returns structured feedback (content/tasks, language, suggestions). New getComprehensionFeedback() in gemini.ts (JSON output, 3 fields). New examComprehension.ts data file with ComprehensionItem type and COMPREHENSION_BY_LEVEL lookup. exam_comprehension SectionKey added to scoresService. Comprehension card added to Exam Prep selector and progress.tsx. B1/B2 show "coming soon" empty state.
- [2026-04-04] Phase 34 complete — 6 silent correctness bugs fixed. topicTipMap.ts keys audited and corrected to match a1.ts exactly ('Accusative case', 'Modal verbs', 'Questions') — Focus Tips now fire for A1's most common mistakes. DST streak bug fixed in streakService.ts and insights.tsx: setDate() replaces ms subtraction so spring-forward nights don't corrupt streak or heatmap. loadMistakes() now has .limit(100). getUserId() reads synchronously from useAuthStore (userId field added), eliminating 3 Supabase round-trips per grammar session end. Daily challenge seed XORs date with a hash of the user ID so each user gets different exercises. Shared date utilities extracted to src/lib/dateUtils.ts (toDateString, getTodayString, getTomorrowString, formatDate); all three callers updated.
- [2026-04-07] Phase 33 complete — Spaced repetition for Daily Challenge. getDailyExercises() now groups exercises by topic, weights each topic (weak/unattempted → 3, mid → 2, strong → 1), allocates 5 slots proportionally, and picks per slot using the date×user seed. useFocusEffect loads loadTopicScores() + loadProgress() in parallel before computing exercises. First-time users (no scores) get uniform selection — same as before. No new Supabase tables.
- [2026-04-07] Phase 32 complete — Progress & Analytics Enhancements. 5 features shipped: (1) loadActivity(days) in activityService.ts — Progress STREAK card now shows "X / 7 this week". (2) seenCount added to progress.tsx — VOCABULARY card shows "N seen · X% mastered". (3) grammar_topic_history Supabase table + saveTopicScoreHistory/loadTopicScoreHistory in grammarTopicService.ts — grammar.tsx saves history per session; Insights renders mini sparklines (blue bars) and ↑/↓/→ trend arrows per topic. (4) Trend computed by comparing this-week avg vs last-week avg (>5pt = trend). (5) GenderBattleGame now calls saveMistake() on wrong answers; Insights shows GENDER ERRORS section with der/die/das bar breakdown when data exists.
- [2026-04-06] Phase 21 B1 complete — B1 grammar fully playable. b1.ts: 136 exercises across 12 topics (Konjunktiv II würde, Konjunktiv II sein/haben/modals, Passive Präsens, Passive Präteritum, Relative clauses Nom/Akk, Relative clauses Dat, Genitiv, Temporal als/wenn/während, Temporal bevor/nachdem/seitdem, Infinitive constructions, Two-part conjunctions, Verb+preposition). Wired into grammar/index.ts. tips.ts: 20 proper B1 tips (replaced 5 placeholders). topicTipMap.ts: B1 section added with one focus tip per topic.
- [2026-04-04] Phase 37 complete — Cheat Sheet / Reference. **Data:** `src/data/cheatsheets/` — `a1.ts`–`b2.ts` (`CheatSheetSection[]`), `types.ts` (`CheatSheetBlock` union: text, table, example, subheading), `index.ts` (`CHEATSHEETS: Record<Level, …>`). **Routing:** `app/cheatsheet.tsx`, sidebar label "Cheat Sheet" (Feather `list`), `Drawer.Screen` in `_layout.tsx`. **UI (final):** Masonry-style card grid on web via CSS `column-count` + `column-gap` (12px), responsive 1 / 2 / 3 columns at `<768` / `768–1200` / `>1200px`; cards `break-inside: avoid`, `margin-bottom: 12px`; `column-span: all` wide cards for **sein and haben (present)** (sein | haben tables side-by-side, 1px vertical divider; stacks on narrow width) and **Present tense — regular verbs**. Native: single-column `ScrollView`. Level pills use Inter (12px / 500); selected pill `#111` bg + white text, unselected white + `#888` + 1px `#e0e0e0` border; tab bar `border-bottom` + `margin-bottom` 16px; sticky tabs on web; `useEffect` syncs sheet level to global header level. Cards: white `#fff`, 1px `#e0e0e0`, 4px radius, padding 12×14; section title Inter 600, 10px caps, `#888`, left 2px `#2563eb` accent; body copy Inter 12px `#555`; tables — web `display: table` + `border-collapse`, th Inter 10px, td IBM Plex Mono 12px, explicit first-column widths by header shape (pronoun / question-word / article / conjugation / modal). German examples: IBM Plex Mono 13px semibold; English: Inter 11px `#888`. No Gemini, no Supabase.

---
*This file is the single source of truth for the project.
Update it whenever decisions change or progress is made.*