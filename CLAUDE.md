# Lerne Deutsch — German Learning App

## Overview
German language learning web app for CEFR A1–B2. Personal use, potential multi-user later.
**TypeScript Expo React Native** app with **Supabase** (auth + db) and **Gemini API** (AI).

---

## Tech Stack
- **Expo** — cross-platform (web now, mobile later)
- **TypeScript** — throughout
- **Zustand** — global state (level, auth session)
- **Supabase** — auth + database (free tier)
- **Gemini API** — AI feedback + dynamic content (free tier, model: `gemini-2.5-flash`)
- **Vercel** — deployment (free, auto-deploys on push to main)

**Repo:** german-learning-app · **App name:** Lerne Deutsch · **Prod:** https://german-learning-app-neon.vercel.app

---

## Design System
- **Background:** `#fafafa` page, `#ffffff` cards
- **Font:** IBM Plex Mono for content/data — Inter for sidebar/topbar. Exception: Cheat Sheet uses Inter for headers/descriptions/table headers; German examples stay IBM Plex Mono.
- **Cards:** 1px `#e0e0e0` border, 4px radius, no shadows/gradients
- **Colors:** `#111111` primary, `#888888` secondary, `#2563eb` blue, `#16a34a` green, `#dc2626` red, `#f59e0b` amber
- **Labels:** ALL CAPS, 11px, letter-spacing 0.08em, `#888888`
- **Sidebar:** Dark navy `#1a1a2e`, Inter, Feather icons, active = left 2px blue bar
- **Topbar:** Same dark navy, level toggle top right
- **Buttons:** Outlined (secondary) / solid black (primary CTA)
- **Score display:** "X / Y" (Y is grey). **NO emojis anywhere in UI.**

---

## Level System
Toggle: **A1 → A2 → B1 → B2** — affects all content globally.

---

## Navigation (Sidebar — Feather icons)
Home (home) · Flashcards (layers) · Dictionary (book-open) · Mini Games (zap) · Grammar (edit-3) · Cheat Sheet (list) · Daily Challenge (calendar) · Exam Prep (book-open) · Progress (bar-chart-2) · Insights (trending-up) · Reading Mode (book)

---

## Sections & Features

**Home** — Greeting + streak, TODAY'S FOCUS (weakest area), CONTINUE WHERE YOU LEFT OFF, quick stats, section launch cards. No scrolling.

**Flashcards** — German/English flip; Known/Shaky/Unknown (green/amber/red); spaced repetition; category pills (All/Nouns/Verbs/Adjectives/Prepositions/Other) with runtime sub-categories; word search; "Study Weak"; session summary. Mastery saves to Supabase. Space=flip, 1/2/3=rate.

**Dictionary** — Searchable reference covering all ~3,000+ words across A1–B2 regardless of current level. Three search indexes: German base-word, conjugation reverse (maps "isst" → "essen"), English reverse. Filter pills (All/Nouns/Verbs/Adjectives/Other). Alphabetical SectionList with sticky headers when idle; FlatList with GERMAN MATCHES / ENGLISH MATCHES sections when searching. Bottom sheet detail for nouns (plural card), adjectives (comparative), prepositions (case info), and other types. Full-screen verb detail (`dictionary-verb.tsx`) with present-tense conjugation table and separable verb banner. Recently viewed (last 10) stored in AsyncStorage key `dictionary_recent`. Web Speech API speaker button on all detail views.

**Mini Games** — Word Match, Gender Battle (der/die/das), Listening Quiz (Web Speech API), Fill in the Blank (Gemini). 2-column card grid selector.

**Grammar Exercises** — Level drills, topic cards with best score. A1: 223 exercises/19 topics · A2: 168/12 · B1: 136/12 · B2: 120/10. Mix of pre-written + Gemini.

**Daily Challenge** — 5 exercises seeded by date×user, topic-weighted by scores. Streak tracking + grace period.

**Exam Prep** — Reading, Listening, Writing, Speaking, Comprehension. Gemini feedback on Writing/Speaking.

**Lessons** — Per-topic explanation, key rules, examples, common mistake, deep-link to grammar practice. A1: 19 · A2: 12 · B1: 12 · B2: 10 lessons.

**Progress** — Streak, Vocabulary (seen + mastered %), Grammar best, Daily Challenge. Per-section scores, category/topic charts. No scrolling.

**Insights** — Weak vocab, mistake log, weak grammar topics (sparklines + trend arrows), activity heatmap, gender error breakdown.

**Reading Mode** — Level-appropriate passages; tap word for translation popup; "Next Passage" button.

**Cheat Sheet** — Static grammar reference A1–B2. Data: `src/data/cheatsheets/`. Web: CSS masonry (3/2/1 columns at >1200/768–1200/<768px); `column-span: all` for sein/haben and regular verbs. Native: single-column scroll.

**Tips Bar** — Always visible, shuffles on navigation. Focus Tip mode after grammar/daily sessions (targets weakest topic, blue "FOCUS TIP" label).

---

## Database (Supabase)
Tables: `user_progress` · `vocabulary_mastery` · `section_scores` · `mistake_log` · `grammar_topic_scores` · `grammar_topic_history`

- RLS on all tables: `user_id = auth.uid()::text`
- Auth: email + password, **Implicit (legacy)** flow, email confirmation enabled
- Client: `storage: undefined` on web (avoids navigator.locks), AsyncStorage on native
- Free tier: 500MB, read-only after grace period, pauses after 7 days inactivity

---

## AI (Gemini)
- Model: `gemini-2.5-flash` · single integration point: `src/lib/gemini.ts`
- Uses: Writing/Speaking feedback, Fill in the Blank, grammar generation, reading passages
- All responses: **plain text only** (no markdown, asterisks, bullets)
- Tone adjusts by level (A1 = simple/encouraging → B2 = detailed/precise)

---

## Cost Policy
**Everything must remain free.** Supabase free tier · Gemini free tier · Expo local builds · Vercel Hobby. Flag any paid requirement before proceeding.

---

## Important Notes for Claude Code
- Keep code simple, well structured, and well commented — I am a beginner
- Explain what you are doing as you go; be ready to explain line by line if asked
- Ask before making large changes or refactors
- Remind me to clear chat context after every feature
- **When I paste text/feedback, do NOT autonomously edit files.** Ask what I want done first
- **When I say "implement Phase X", confirm phase number and scope before starting any work**

---

## GitHub Workflow Rules

**IMPORTANT: Never execute git commands. Always print them for the user to run. Do not use the Bash tool for any git operation.**

Always work on feature branches — never commit directly to main.

Before any new phase:
```bash
git checkout main
git pull
git checkout -b branch-name
```

Branch naming: `feat/name` · `fix/bug-name` · `ui/change-name` — one branch per phase.

After completing:
```bash
git add .
git commit -m "short message — main features only, not files"
git push origin branch-name
```
Then open a PR. Always generate a copy-paste PR description with **Summary**, **Changes** (grouped by file with bullets), and **Verification** sections.

---

## Build Phases

All phases complete — all A1–B2 content live.

✅ Phase 0 — Planning
✅ Phase 1 — Project Setup
✅ Phase 2 — Content Foundation A1
✅ Phase 3 — Flashcards
✅ Phase 4 / 4b — Grammar Exercises + Fixes
✅ Phase 5 — Exam Prep
✅ Phase 6 — Mini Games
✅ Phase 7 — Flashcard Categories
✅ Phase 8 — Daily Challenge + Streak
✅ Phase 9 — Progress Dashboard
✅ Phase 10a/b/c — UI Redesign + Fixes + Flashcard Enhancements
✅ Phase 12 — Progress Page Fixes
✅ Phase 13 — Vocabulary Extra Info
✅ Phase 14 — Insights / Analytics
✅ Phase 15 — Supabase Authentication
✅ Phase 16 — Reading Mode
✅ Phase 17 — Pronunciation Guide
✅ Phase 18 — Sentence Builder
✅ Phase 19 — Keyboard Shortcuts
✅ Phase 20 — AI / Gemini Features (Fill in the Blank)
✅ Phase 21 — Expand to A2, B1
✅ Phase 22 — Deep Progress Insights
✅ Phase 24 — Smart Interruption Tips
✅ Phase 25 — Quick Fixes & Small Improvements
✅ Phase 26 — Grammar Exercises Expansion
✅ Phase 27 — Flashcard Sub-categories
✅ Phase 28 — Reading Mode Improvements
✅ Phase 30 — Comprehension Exercise
✅ Phase 32 — Progress & Analytics Enhancements
✅ Phase 33 — Spaced Repetition for Daily Challenge
✅ Phase 34 — Bug Fixes & Code Quality
✅ Phase 35 — Sentence Builder Improvements
✅ Phase 36 — A2 Content Completion
✅ Phase 37 — Cheat Sheet / Reference Section
✅ Phase 38 — B2 Content
✅ Phase 39 — B1 Content Gaps
✅ Phase 31a/b/c/d — Lessons: A1 + A2 + B1 + B2
✅ Phase 40 — Dictionary (all-level searchable reference)

---

## ACTIVE PIPELINE

*No active phase. All A1–B2 content is complete.*

---

## LATER

### Phase 29 — Real A1 Exam Simulation (Effort: High)
**Goal:** Realistic Goethe-Zertifikat A1 simulation as a separate "Exam Simulation" mode (4 sections, 100pts, pass=60).

| Section | Time | Marks | Tasks |
|---|---|---|---|
| Hören | 15 min | 25 pts | TTS announcements, dialogues, phone messages — true/false + MC |
| Lesen | 25 min | 25 pts | Signs, email, ads, form-filling — true/false + MC + text input |
| Schreiben | 20 min | 15 pts | Form fill (5pts) + 30-40 word message (10pts, Gemini scored) |
| Sprechen | 15 min | 35 pts | Intro (10pts) + Q&A (15pts) + requests (10pts) — Gemini scored |

**Files:**
- `src/data/examListening.ts` — listening scripts + questions
- `src/data/examReading.ts` — reading texts + questions
- `app/examSimulation.tsx` — full simulation flow
- `app/exam.tsx` — add Exam Simulation card
- `src/lib/scoresService.ts` — add `exam_simulation` SectionKey
- `src/lib/gemini.ts` — add `getExamSimulationSpeakingFeedback()`

### Phase 23 — Multi-user (Effort: High)
**Goal:** Display names, streak leaderboard (top 20), progress comparison (grammar/vocab rank).

| File | Change |
|---|---|
| Supabase dashboard | Create `user_profiles` table + RLS; relax `user_progress` SELECT policy |
| `src/lib/profileService.ts` | New — `getProfile()`, `saveDisplayName()` |
| `src/lib/leaderboardService.ts` | New — `loadLeaderboard()`, `loadGrammarRankings()`, `loadVocabRankings()` |
| `components/DisplayNameModal.tsx` | New — first-login display name prompt |
| `app/leaderboard.tsx` | New — ranked leaderboard screen |
| `app/home.tsx` | Show DisplayNameModal if no profile |
| `app/progress.tsx` | Add HOW YOU COMPARE section |
| `app/(drawer)/_layout.tsx` | Add Leaderboard sidebar entry (icon: award); render display name |

---
*Single source of truth. Update whenever decisions change.*
