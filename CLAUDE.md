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
- grammar_topic_history table (user_id, level, topic, score, total, recorded_at) — per-session history for sparklines/trend arrows

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
### ✅ Phase 27 — Flashcard Sub-categories (Complete)
### ✅ Phase 38 — B2 Content (Complete)
### ✅ Phase 31a — Lessons: A1 + Full Infrastructure (Complete)
### ✅ Phase 31b — Lessons: A2 Content (Complete)
### ✅ Phase 31c — Lessons: B1 Content (Complete)
### ✅ Phase 31d — Lessons: B2 Content (Complete)
### ✅ Phase 38 — B2 Content (Complete)
### ✅ Phase 39 — B1 Content Gaps (Complete)

---
## ACTIVE PIPELINE

*No active phase. All A1–B2 content is complete. See LATER for planned future phases.*

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
- [2026-04-07] Phase 27 complete — Flashcard sub-categories. Verbs (Modal/Separable/Reflexive/Irregular/Regular), Nouns (der/die/das), Prepositions (Accusative/Dative/Two-way/Genitive), Other (Adverbs/Conjunctions/Pronouns/Phrases). All detection is runtime — no data changes. Sub-categories accessed via a floating dropdown anchored below the tapped pill (position: absolute, measureInWindow for positioning, transparent backdrop to close). Pills with ▾ indicate a dropdown is available; active sub-category shown in pill count area. New types added to types.ts: VerbSubCategory, NounSubCategory, PrepositionSubCategory, OtherSubCategory.
- [2026-04-07] Phase 33 complete — Spaced repetition for Daily Challenge. getDailyExercises() now groups exercises by topic, weights each topic (weak/unattempted → 3, mid → 2, strong → 1), allocates 5 slots proportionally, and picks per slot using the date×user seed. useFocusEffect loads loadTopicScores() + loadProgress() in parallel before computing exercises. First-time users (no scores) get uniform selection — same as before. No new Supabase tables.
- [2026-04-07] Phase 32 complete — Progress & Analytics Enhancements. 5 features shipped: (1) loadActivity(days) in activityService.ts — Progress STREAK card now shows "X / 7 this week". (2) seenCount added to progress.tsx — VOCABULARY card shows "N seen · X% mastered". (3) grammar_topic_history Supabase table + saveTopicScoreHistory/loadTopicScoreHistory in grammarTopicService.ts — grammar.tsx saves history per session; Insights renders mini sparklines (blue bars) and ↑/↓/→ trend arrows per topic. (4) Trend computed by comparing this-week avg vs last-week avg (>5pt = trend). (5) GenderBattleGame now calls saveMistake() on wrong answers; Insights shows GENDER ERRORS section with der/die/das bar breakdown when data exists.
- [2026-04-06] Phase 21 B1 complete — B1 grammar fully playable. b1.ts: 136 exercises across 12 topics (Konjunktiv II würde, Konjunktiv II sein/haben/modals, Passive Präsens, Passive Präteritum, Relative clauses Nom/Akk, Relative clauses Dat, Genitiv, Temporal als/wenn/während, Temporal bevor/nachdem/seitdem, Infinitive constructions, Two-part conjunctions, Verb+preposition). Wired into grammar/index.ts. tips.ts: 20 proper B1 tips (replaced 5 placeholders). topicTipMap.ts: B1 section added with one focus tip per topic.
- [2026-04-07] Phase 31a/b/c complete — Lessons feature shipped. Full infrastructure: `src/data/lessons/types.ts`, `app/lessons.tsx` (2-column selector with lesson numbers, checkmarks, last-studied timestamps), `app/lesson.tsx` (detail screen with explanation, key rules, examples, common mistake, "Practice This Topic" deep-link into grammar). `app/grammar.tsx` reads `?topic=` query param to auto-start a topic. A1: 19 lessons, A2: 12 lessons (Reflexive verbs uses `buildingOn` field), B1: 12 lessons. B2 shows "coming soon" empty state — blocked on Phase 38.
- [2026-04-04] Phase 37 complete — Cheat Sheet / Reference. **Data:** `src/data/cheatsheets/` — `a1.ts`–`b2.ts` (`CheatSheetSection[]`), `types.ts` (`CheatSheetBlock` union: text, table, example, subheading), `index.ts` (`CHEATSHEETS: Record<Level, …>`). **Routing:** `app/cheatsheet.tsx`, sidebar label "Cheat Sheet" (Feather `list`), `Drawer.Screen` in `_layout.tsx`. **UI (final):** Masonry-style card grid on web via CSS `column-count` + `column-gap` (12px), responsive 1 / 2 / 3 columns at `<768` / `768–1200` / `>1200px`; cards `break-inside: avoid`, `margin-bottom: 12px`; `column-span: all` wide cards for **sein and haben (present)** (sein | haben tables side-by-side, 1px vertical divider; stacks on narrow width) and **Present tense — regular verbs**. Native: single-column `ScrollView`. Level pills use Inter (12px / 500); selected pill `#111` bg + white text, unselected white + `#888` + 1px `#e0e0e0` border; tab bar `border-bottom` + `margin-bottom` 16px; sticky tabs on web; `useEffect` syncs sheet level to global header level. Cards: white `#fff`, 1px `#e0e0e0`, 4px radius, padding 12×14; section title Inter 600, 10px caps, `#888`, left 2px `#2563eb` accent; body copy Inter 12px `#555`; tables — web `display: table` + `border-collapse`, th Inter 10px, td IBM Plex Mono 12px, explicit first-column widths by header shape (pronoun / question-word / article / conjugation / modal). German examples: IBM Plex Mono 13px semibold; English: Inter 11px `#888`. No Gemini, no Supabase.

- [2026-04-07] Phase 38 Part A complete — B2 vocabulary done. `src/data/vocabulary/b2.ts` replaced with 2,123 Aspekte Neu B2 words (IDs b2_0001 → b2_2123), sourced from b2_aspekte.txt. Wired into `src/data/vocabulary/index.ts` (`B2: B2_WORDS`). B2 flashcards now show real vocabulary.
- [2026-04-07] Phase 38 Part B complete — B2 grammar (120 exercises, 10 topics), 20 B2 tips, topicTipMap B2 section, 15 B2 reading passages (10 standard + 5 exam-style: Wahlpflicht, Kündigung wegen Krankheit, Sparkommentar, Gendern, Fachkräftemangel), 50 B2 sentence builder sentences. Full B2 level now playable.
- [2026-04-07] Phase 31d complete — B2 lessons now populated in `src/data/lessons/b2.ts` for all 10 B2 grammar topics (Extended participial phrases, Konjunktiv I, Modal particles, Passive with modal verbs, N-Deklination, Nominalisierung, Genitiv prepositions, Complex connectors, Indirect questions, Relative clauses with was/wo). `src/data/lessons/index.ts` now maps `B2` to `B2_LESSONS`, so Lessons no longer shows the B2 "coming soon" empty state.
- [2026-04-07] Phase 39 complete — B1 content gaps filled. 15 reading passages added to `src/data/passages.ts` (B1_PASSAGES, IDs b1_p01–b1_p15) covering work, travel, environment, culture, relationships, media, health, city life — using Konjunktiv II, passive, relative clauses, temporal connectors. 50 sentence builder sentences added to `src/data/sentenceBuilder.ts` (B1_SENTENCES, IDs b1_sb_001–b1_sb_050) with difficulty tagging (simple/medium/complex). All four CEFR levels are now fully playable with complete content.

---
*This file is the single source of truth for the project.
Update it whenever decisions change or progress is made.*