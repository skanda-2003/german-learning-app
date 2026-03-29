# Lerne Deutsch — German Learning App

## Overview
A German language learning web application for CEFR levels A1 through B2.
Built for personal use initially, with potential to expand to other users later.
The app is called **Lerne Deutsch** (means "Learn German" in German).

---

## Tech Stack
- **Expo** — cross platform framework (web now, mobile later if needed)
- **TypeScript** — language used throughout the project
- **Zustand** — global state management (e.g. selected level)
- **Supabase** — backend database (free tier, minimal storage)
- **Google Gemini API** — AI feedback on writing/speaking + dynamic exercise generation (free tier)
- **Pre-written content** — CEFR / Goethe Institut / Deutsche Welle word lists as foundation

---

## Project Identity
- **Repo name:** german-learning-app
- **Local folder:** german-learning-app
- **App display name:** Lerne Deutsch
- **Expo config:** name = "Lerne Deutsch", slug = "german-learning-app"

---

## Design
- Clean and minimal UI
- Sidebar navigation (always accessible)
- Level toggle always visible at the top (affects all content globally)
- Tips/Hints bar at the bottom of every screen with left/right arrows to browse

---

## Level System
Toggle between: **A1 → A2 → B1 → B2**
Switching level affects all content globally — flashcards, exercises, games, exam prep, tips.

---

## Navigation (Sidebar)
- 🏠 Home / Dashboard
- 🃏 Flashcards
- 🎮 Mini Games
- 📝 Grammar Exercises
- 📅 Daily Challenge
- 🎓 Exam Prep
- 📊 Progress

---

## Sections & Features

### 🏠 Home / Dashboard
- Overview of streak, level, and progress across sections

### 🃏 Flashcards
- German word on one side, English + example sentence on the other
- Flip animation
- Mark as known / unknown
- Spaced repetition — unknown words appear more frequently
- Vocabulary sourced from CEFR / Goethe word lists per level
- **[Future]** Category filter — let the user practise by part of speech (e.g. Nouns only,
  Verbs only, Prepositions, Articles) so they can focus on what they don't know.
  Categories map directly to the `partOfSpeech` field already on every word.

### 🎮 Mini Games
- **Word Match** — drag German words to their English meanings
- **Fill in the Blank** — complete a sentence with the correct word (Gemini generates varied sentences)
- **Gender Battle** — quickly pick der / die / das for a noun
- **Listening Quiz** — hear a word via text-to-speech, pick the correct meaning

### 📝 Grammar Exercises
- Level specific drills
- A1: verb conjugation (sein, haben), basic sentence structure
- A2: past tense (Perfekt), adjective endings
- B1/B2: progressively more complex grammar
- Mix of pre-written templates and Gemini generated variations

### 📅 Daily Challenge
- Small mixed set of exercises, resets every day
- Completing it increments the streak counter

### 🎓 Exam Prep
Four sub-sections, each with multiple exercises per level:
- **Reading** — level appropriate passage with comprehension questions
- **Listening** — audio clip via text-to-speech with comprehension questions
- **Writing** — prompt shown, user types response, Gemini API gives feedback
- **Speaking** — voice recording via mic + text input option, pronunciation checked, Gemini API evaluates

### 📊 Progress
- Scores per section
- Vocabulary mastery visualization (known vs unknown words)
- Streak display
- Overall level coverage percentage

### 💡 Tips / Hints Bar
- Always visible at the bottom of every screen
- Left and right arrows to browse through tips
- 20-30 pre-written tips per level
- Tips are level-aware
- Example A1 tip: "All nouns in German are always capitalized!"
- Example A1 tip: "There are 3 genders in German: der (masculine), die (feminine), das (neuter)"

---

## Database (Supabase) — Minimal Storage
Only store what is necessary:
- Username, email, password (hashed by Supabase auth)
- Current level (A1 / A2 / B1 / B2)
- Streak count + last active date
- Progress / score per section
- Vocabulary mastery per word (known / unknown)
- Daily challenge completion status (resets daily)

### Important Supabase Notes
- Free tier limit is 500MB — more than enough for a single user
- If limit is exceeded, Supabase sends an email warning first
- Database goes read-only after grace period — no surprise charges ever
- Free projects pause after 7 days of inactivity — resumes instantly on access

---

## AI Usage (Google Gemini API — Free Tier)
- Feedback on Writing exercises — grammar, vocabulary, suggestions
- Feedback on Speaking exercises — accuracy, pronunciation notes
- Dynamic sentence generation for Fill in the Blank (varied, never repetitive)
- Fresh reading passages on demand
- Feedback tone adjusts by level — simple and encouraging at A1, more nuanced at B2
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

---

## GitHub Workflow Rules
At the start of every new phase, create one branch for the entire phase:
```bash
git checkout -b branch-name
```

Use this naming format for branches:
- New phase/feature: feat/descriptive-name (e.g. feat/flashcards, feat/mini-games, feat/grammar-exercises)
- Bug fix: fix/bug-name (e.g. fix/level-toggle-bug)
- UI change: ui/change-name (e.g. ui/sidebar-styling)

**One branch per phase. All work for that phase — regardless of how many features it contains — goes on the same branch.**
- ✅ Good: `feat/flashcards` (covers all of Phase 3), `feat/mini-games` (covers all of Phase 4)
- ❌ Bad: `feat/phase3`, `feat/phase3-flashcards`, `feat/spaced-repetition` (too granular)

Once the phase is complete, give me these commands:
```bash
git add .
git commit -m "describe what was done"
git push origin branch-name
```

Then remind me to open a Pull Request on GitHub to merge the branch into main.

### Pull Request Descriptions
After giving push commands, always generate a pull request description
ready to copy-paste directly into the GitHub Pull Request box.

Use this exact format:

**Summary**
One sentence explaining what this PR does and why.

**Changes**
List every file that was created or modified:
- New: `file/path.ts` — what it does, key functions/exports, data structures
- Updated: `file/path.ts` — what changed inside it and why

**Verification**
- ✅ Thing that was tested and confirmed working
- ✅ Thing that was tested and confirmed working

Rules for the PR description:
- Be specific — mention actual file paths, function names, variable names
- Not vague summaries — mention real details like "111 exercises across 16 topics"
- Every file touched gets its own line in Changes
- Verification items should reflect what was actually tested, not generic claims

---

## Build Phases

### ✅ Phase 0 — Planning (Complete)
- Full app plan discussed and finalised
- Tech stack decided (Expo, TypeScript, Zustand, Supabase, Gemini API)
- CLAUDE.md created

### ✅ Phase 1 — Project Setup (Complete)
- [x] Initialize Expo project with TypeScript
- [x] Set up folder structure
- [x] Set up sidebar navigation
- [x] Add level toggle (Zustand global state)
- [x] Add tips bar component at the bottom (static content for now)
- [x] Connect to GitHub repo (german-learning-app)
- [x] Connect to Supabase project

### ✅ Phase 2 — Content Foundation for A1 (Complete)
- [x] A1 vocabulary list — 665 words, full Goethe Institut A1 list (in src/data/vocabulary/a1.ts)
- [x] A1 grammar exercise templates — 111 exercises across 16 topics (in src/data/grammar/a1.ts)
- [x] A2/B1/B2 vocabulary and grammar scaffolded as empty arrays (to be filled in Phase 11)
- [x] Write 20-30 tips for A1 — 25 tips written across 8 categories (in src/data/tips.ts)
- [x] Set up Gemini API integration (reusable function in src/lib/gemini.ts)

### ✅ Phase 3 — Flashcards (A1) (Complete)
- [x] Flashcard UI with flip animation
- [x] Known / unknown marking
- [x] Spaced repetition logic
- [x] Connect vocabulary mastery to Supabase

### ✅ Phase 4 — Grammar Exercises (A1) (Complete)
- [x] Exercise UI (fill-blank and multiple-choice screens)
- [x] Gemini generated variations

### ✅ Phase 4b — Test & Fix Grammar Exercises (Complete)
- [x] Test fill-blank exercises: type answer, check correct/incorrect feedback
- [x] Test multiple-choice exercises: tap option, check colour feedback
- [x] Test topic selector: pick a specific topic, verify only that topic's exercises show
- [x] Test "All Topics": verify all 111 exercises cycle through
- [x] Test done screen: score circle shows correct percentage
- Bugs fixed during testing:
  - Enter key now submits fill-blank answer (onSubmitEditing on TextInput)
  - Enter key now advances to next exercise after answering (keydown listener)
  - Multiple-choice: arrow key navigation + Enter to select (focusedIndex state + keydown listener)
  - Multiple-choice: option A highlighted by default (autoFocus equivalent via focusedIndex=0)
  - Fill-blank: auto-focuses on load (autoFocus prop)
  - Fill-blank: removed browser focus outline box (outline: 'none')
  - Gemini model updated: gemini-1.5-flash → gemini-2.0-flash (fixes 404 error)
- ⚠️ "✨ Generate More Exercises" not yet verified — hit Gemini free tier daily quota during testing

### ✅ Phase 5 — Exam Prep (A1) (Complete)
- [x] Reading (Gemini passage + multiple-choice comprehension questions)
- [x] Listening (text-to-speech + comprehension questions, passage revealed on done screen)
- [x] Writing (prompt shown, user types in German, Gemini gives feedback)
- [x] Speaking (🎤 record via browser mic OR type, Gemini evaluates response)

### ⏳ Phase 5b — Test Exam Prep (Deferred — Gemini quota)
- Deferred to Phase 10 — all sub-sections require Gemini and free tier quota is exhausted
- [ ] Test Reading: generate passage → answer all 3 questions → verify score and review screen
- [ ] Test Listening: generate passage → play audio (German voice) → answer questions → verify passage revealed on done screen
- [ ] Test Writing: type a German response → submit → verify Gemini feedback appears in purple card
- [ ] Test Speaking (mic): tap Record → speak German → stop → verify transcript appears in text box → submit → verify feedback
- [ ] Test Speaking (type): type a response directly → submit → verify Gemini feedback appears in pink card
- [ ] Test back button returns to Exam Prep selector from each sub-section

### ✅ Phase 6 — Mini Games (A1) (Complete)
- [x] Word Match — 6 random pairs per round, click-to-match, green/red feedback
- [x] Gender Battle — 10 rounds, strip article, der/die/das buttons, auto-advance
- [x] Listening Quiz — 10 rounds, Web Speech API (de-DE), 4 options
- ⏳ Fill in the Blank — deferred to Phase 10 (requires Gemini)

### ✅ Phase 7 — Flashcard Categories (Complete)
- [x] Category picker (horizontal pill row) above the flashcard deck
- [x] Filter cards by part of speech: All, Nouns, Verbs, Adjectives, Prepositions, Other
- [x] Category count shown on each pill (from full vocabulary, not mastery-filtered)
- [x] Switching category resets queue cleanly (FlashcardDeck remounts via key=)
- Note: UI polish deferred to Phase 10
- Note: the `partOfSpeech` field is already on every word — this is purely a UI filter

### ✅ Phase 8 — Daily Challenge + Streak (Complete)
- [x] Daily challenge: 5 grammar exercises seeded by today's date (same exercises all day, different tomorrow)
- [x] Intro screen with current streak, done screen with score-aware messaging
- [x] Already-done screen shows streak + next challenge date (tomorrow)
- [x] useFocusEffect re-checks completion status on every tab visit
- [x] Streak logic: consecutive days = streak+1, gap = reset to 1
- [x] Supabase table: user_progress (user_id, streak_count, last_active_date, daily_challenge_completed_date)
- [x] streakService.ts: loadProgress() and completeChallenge()
- Note: UI polish deferred to Phase 10

### ✅ Phase 9 — Progress Dashboard (Complete)
- [x] Streak card with daily challenge status
- [x] Vocabulary mastery progress bar (known / total for current level)
- [x] Section scores: Grammar, Exam Reading, Exam Listening (best % + sessions)
- [x] Completion counts: Exam Writing, Exam Speaking, Word Match
- [x] Mini Games scores: Gender Battle, Listening Quiz (best % + sessions)
- [x] Score tracking wired into all sections (grammar.tsx, exam components, game components)
- [x] Supabase table: section_scores (user_id, section, best_score, best_total, sessions_completed)
- [x] scoresService.ts: saveScore(), saveCompletion(), loadAllScores()
- [x] useFocusEffect reloads on every tab visit
- Note: deeper insights deferred to Phase 9b and Phase 13 (see below)

### ⏳ Phase 9b — Vocabulary Insights (Progress enhancement)
- Add vocabulary mastery breakdown by part of speech to the Progress screen
- No new database work needed — computed from existing mastery data + vocabulary
- Show per-category bars: Nouns (210/265), Verbs (80/180), Adjectives (20/100), etc.
- Add to Phase 10 Polish pass

### ✅ Phase 10a — UI Polish / Redesign (Complete)
- [x] Created `src/styles/theme.ts` — central design system (colors, font, fontSize, spacing, radius)
- [x] IBM Plex Mono font loaded via `@expo-google-fonts/ibm-plex-mono` in `app/_layout.tsx`
- [x] All screens restyled: Home, Flashcards, Grammar, Daily Challenge, Games, Exam Prep, Progress
- [x] All shared components restyled: LevelToggle, TipsBar, FlashCard, ExerciseCard
- [x] All exam components restyled: ReadingExercise, ListeningExercise, WritingExercise, SpeakingExercise
- [x] All game components restyled: WordMatchGame, GenderBattleGame, ListeningQuizGame
- Design system: pure white background, 1px #e0e0e0 borders, 4px border-radius, no shadows, IBM Plex Mono throughout
- Branch: `ui/polish-redesign`

### ⏳ Phase 10b — Polish (remaining)
- [ ] Test level switching (A1 works, other levels show "coming soon")
- [ ] Test on web
- [ ] Performance check (loading states for AI calls)
- [ ] Test Grammar Exercises: finish a topic → tap "✨ Generate More Exercises" → verify 5 new exercises load correctly
- [ ] Complete Phase 5b — test all Exam Prep features (Reading, Listening, Writing, Speaking, back button) — deferred due to Gemini free tier quota
- [ ] Add vocabulary mastery by part of speech to Progress screen (Phase 9b)

### ⏳ Phase 11 — Expand to A2, B1, B2
- [ ] Expand A1 vocabulary to full ~600 word Goethe list
- [ ] Add A2 / B1 / B2 vocabulary lists
- [ ] Expand A1 grammar to cover all A1 topics
- [ ] Add A2 / B1 / B2 grammar exercise templates
- [ ] Write 20-30 tips for A2, B1, B2

### ⏳ Phase 12 — Multi-user (If Expanding)
- [ ] Auth screens (sign up / login)
- [ ] Tie all progress to user accounts
- [ ] Leaderboard for streaks

### ⏳ Phase 13 — Deep Progress Insights
- Replace single grammar score with per-topic breakdown (sein, haben, Akkusativ, Dativ, etc.)
- New Supabase table: grammar_topic_scores (user_id, level, topic, best_score, best_total, sessions_completed)
- Update grammar.tsx to save per-topic results when a specific topic is finished
- Progress screen: show mini bar chart per grammar topic so user can see exactly where they're weak
- Example: sein 80%, haben 60%, Akkusativ 40%, Dativ — not started

---

## Progress Log
*Update this section as phases are completed.*

- [2026-03-26] Project planning completed. Tech stack finalised. CLAUDE.md created.
  - Platform: Web first, mobile later
  - AI: Google Gemini API (free tier) — replaces Claude API
  - Cost policy: Entire project must remain free to run

- [2026-03-27] Phase 1 complete.
  - Expo project initialised with TypeScript (SDK 55)
  - app.json updated: name = "Lerne Deutsch", slug = "german-learning-app"
  - Folder structure created: src/components, src/screens, src/store, src/data, src/lib
  - Expo Router installed, all 7 screens created as placeholders
  - Sidebar navigation working on web (permanent drawer, dark navy theme)
  - Zustand level store (useLevelStore.ts) + LevelToggle component wired into header
  - TipsBar component at bottom of every screen, level-aware, left/right navigation
  - Supabase project created (free tier), client set up in src/lib/supabase.ts
  - Project moved from Windows F drive to WSL filesystem to fix hot reload issues

- [2026-03-28] Phase 2 complete — A1 content foundation.
  - Strategy change: build full app with A1 content first, add A2/B1/B2 in Phase 11
  - A1 vocabulary: expanded to full 665-word Goethe Institut A1 list in src/data/vocabulary/a1.ts
  - A1 grammar: expanded from 31 → 111 exercises across 16 topics in src/data/grammar/a1.ts
    - Topics: sein, haben, definite articles, negation, word order, indefinite articles,
      personal pronouns, regular verbs, modal verbs, Akkusativ, possessive articles,
      questions, separable verbs, plural nouns, imperative, prepositions
  - A2/B1/B2 vocabulary and grammar: scaffolded as empty arrays, to be filled in Phase 11
  - Tips: expanded A1 tips from 5 → 25 across 8 categories in src/data/tips.ts
  - Gemini API integration complete: src/lib/gemini.ts with 4 exported functions
  - Phase 2 complete.

- [2026-03-28] Phase 4 complete — Grammar Exercises.
  - ExerciseCard component: fill-blank (inline TextInput) + multiple-choice (4 tappable options)
  - Grammar screen: topic selector (16 topics + All Topics), progress bar, score tracker, done screen
  - Gemini integration: "Generate More Exercises" button on done screen fetches 5 fresh exercises
  - Phases reordered: Mini Games moved to Phase 6, Flashcard Categories to Phase 7

- [2026-03-29] Phase 4b complete — Grammar Exercises testing and UX fixes.
  - Gemini model updated from gemini-1.5-flash → gemini-2.0-flash (fixes 404 error)
  - Fill-blank: Enter key submits answer, auto-focuses on load, browser outline box removed
  - Both types: Enter key advances to next exercise after answering
  - Multiple-choice: arrow key navigation (up/down), Enter to select, option A highlighted by default
  - Gemini quota hit during testing — "Generate More Exercises" deferred to Phase 10 for verification

- [2026-03-29] Phase 9 complete — Progress Dashboard.
  - New Supabase table: section_scores (one row per user per section)
  - scoresService.ts: saveScore() keeps best %, saveCompletion() counts sessions, loadAllScores() fetches all
  - Score tracking wired into: grammar, exam reading, exam listening, exam writing, exam speaking, gender battle, listening quiz, word match
  - Progress screen: streak card, vocabulary mastery bar, section scores across Grammar / Exam Prep / Mini Games
  - Deeper insights (per-topic grammar breakdown, vocab by category) deferred to Phase 9b / Phase 13

- [2026-03-29] Phase 8 complete — Daily Challenge + Streak.
  - New Supabase table: user_progress (single row per device)
  - streakService.ts: loadProgress(), completeChallenge(), getTodayString()
  - Daily challenge: 5 grammar exercises, date-seeded for consistency
  - useFocusEffect reloads on every tab visit so already-done state is always correct
  - Score-aware done screen messaging (0/5 vs 3/5 vs 5/5 feel different)

- [2026-03-29] Phase 6 complete — Mini Games.
  - Word Match, Gender Battle, Listening Quiz all working
  - games.tsx: 4-card selector, Fill in the Blank disabled with "Soon" badge
  - Fill in the Blank deferred to Phase 10 (Gemini quota)

- [2026-03-29] Phase 7 complete — Flashcard Categories.
  - 6 category pills (All / Nouns / Verbs / Adjectives / Prepositions / Other)
  - Counts shown from full vocabulary; queue resets cleanly on category change
  - FlashcardDeck extracted as sub-component; keyed by selectedCategory for clean remount
  - UI polish deferred to Phase 10

- [2026-03-28] Phase 5 complete — Exam Prep.
  - Exam screen: selector with 4 cards, each opening its own sub-section
  - Reading: Gemini generates a German passage + 3 multiple-choice comprehension questions, score + review on done screen
  - Listening: same as Reading but passage is hidden — read aloud via Web Speech API (de-DE, 0.85x speed), passage revealed after answering
  - Writing: rotating A1 prompts, multiline text input, Gemini reviews and gives structured feedback
  - Speaking: 🎤 browser mic (SpeechRecognition, de-DE) transcribes speech into text box, falls back to typing if mic unavailable, Gemini evaluates response
  - All 4 sub-sections live — no more "Coming Soon" badges

- [2026-03-29] Phase 10a complete — UI Polish / Redesign.
  - Created src/styles/theme.ts: colors, font (IBM Plex Mono), fontSize, spacing, radius, pre-built style objects
  - IBM Plex Mono loaded in app/_layout.tsx via @expo-google-fonts/ibm-plex-mono; app shows ActivityIndicator until fonts ready
  - All 7 screens rewritten with theme: app/index.tsx, flashcards.tsx, grammar.tsx, daily.tsx, games.tsx, exam.tsx, progress.tsx
  - Shared components restyled: LevelToggle, TipsBar, FlashCard, ExerciseCard
  - All exam sub-components restyled: ReadingExercise, ListeningExercise, WritingExercise, SpeakingExercise
  - All game sub-components restyled: WordMatchGame, GenderBattleGame, ListeningQuizGame
  - Design: pure white (#ffffff) content, 1px #e0e0e0 borders, 4px radius, no shadows, #1a1a2e sidebar/header
  - Key fix: StyleSheet array syntax [base, condition && variant] used throughout — avoids TypeScript literal type conflicts from object spread

---
*This file is the single source of truth for the project.
Update it whenever decisions change or progress is made.*
