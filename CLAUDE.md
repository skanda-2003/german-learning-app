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

## Design System
- **Style:** Data-Forward Minimalism (inspired by developer dashboards like Linear, Vercel, Railway)
- **Background:** `#fafafa` page background, `#ffffff` white cards on top
- **Font:** IBM Plex Mono for all content, data, headings — Inter for sidebar/topbar navigation only
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
- Daily Challenge (icon: calendar)
- Exam Prep (icon: book-open)
- Progress (icon: bar-chart-2)
- Insights (icon: trending-up) ← new section

---

## Sections & Features

### 🏠 Home / Dashboard
**Purpose: Forward-looking — tells the user what to do next (different from Progress which is backward-looking)**
- App name + greeting with streak message (e.g. "You're on a 3 day streak")
- TODAY'S FOCUS card — recommended section based on weakest area (lowest score)
- CONTINUE WHERE YOU LEFT OFF — last section used
- Quick stats strip: words known, best grammar score, daily challenge status
- Quick-launch cards for all sections (no detailed stats — just action)
- NO scrolling — everything fits in one view

### 🃏 Flashcards
- German word on one side, English + example sentence on the other
- On card back: verb conjugation table (ich/du/er/wir/ihr/sie) for verbs; plural form for nouns; comparative for adjectives
- Flip animation
- THREE states: Known (green) / Shaky (amber) / Unknown (red)
  - Known: confident, show rarely in spaced repetition
  - Shaky: know it but want to revisit, show occasionally
  - Unknown: don't know, show frequently
- Spaced repetition uses all three states
- Session summary screen after finishing deck: X cards reviewed, Y known, Z shaky, W unknown
- Word search bar to find any word directly
- Category filter pills: All / Nouns / Verbs / Adjectives / Prepositions / Other
  - Pills are compact, fixed height, horizontally scrollable — not elongated
  - Show count per category e.g. "Nouns 265"
- Fix "Study Again" button (currently broken)
- Vocabulary mastery saves to Supabase (3 states: known/shaky/unknown)

### 🎮 Mini Games
**Selector screen: cards with 1px borders in a grid — NOT a plain text list**
- Each game card shows: name, description, best score if played
- Word Match — 6 random pairs per round, click-to-match, green/red feedback
- Gender Battle — 10 rounds, der/die/das buttons; show plural form of noun below the word in small grey text
- Listening Quiz — 10 rounds, Web Speech API (de-DE), 4 options; show conjugations below verb words
- Fill in the Blank — Gemini generated (Phase 10b)

### 📝 Grammar Exercises
**Selector screen: cards with 1px borders in a grid — NOT a plain text list**
- Each topic shown as a card with: topic name, exercise count, best score if attempted
- Level specific drills
- Mix of pre-written templates and Gemini generated variations

### 📅 Daily Challenge
- 5 grammar exercises seeded by today's date
- Streak tracking
- Score-aware completion messaging

### 🎓 Exam Prep
**Selector screen: cards with 1px borders in a 2x2 grid — NOT a plain text list**
- Reading, Listening, Writing, Speaking
- Each card shows last score if attempted

### 📊 Progress
**Purpose: Backward-looking — how have I done overall**
**NO scrolling — everything fits in one view using compact grid layout**
- TOP SECTION: compact stat grid (Coach Phelps style)
  - Streak card, Vocabulary card, Grammar best score card, Daily challenge status
  - All in a 4-column row, tight and data-dense
- MIDDLE SECTION: per-section scores in compact rows
  - Grammar, Exam Prep (Reading/Listening/Writing/Speaking), Mini Games
  - Each shows best score + sessions completed
- BOTTOM SECTION: two small visual charts
  - Vocabulary mastery by category (bar per category: Nouns/Verbs/Adjectives etc.)
  - Grammar topic breakdown (bar per topic showing best score)

### 📈 Insights (NEW SECTION)
**Purpose: Analytics — where am I weak, what do I keep getting wrong**
- WEAK VOCABULARY: words most frequently marked Unknown or Shaky — shown as a list with their translations
- MISTAKE LOG: grammar questions answered incorrectly — shows the question, your answer, correct answer
- WEAK GRAMMAR TOPICS: topics sorted by lowest score with bar visualization
- ACTIVITY CALENDAR: streak history grid (like Coach Phelps training activity heatmap) — last 3 months, one square per day, coloured if completed daily challenge
- All data computed from existing Supabase tables — no new tables needed except mistake_log

### 💡 Tips / Hints Bar
- Always visible at the bottom of every screen
- Left and right arrows to browse through tips
- 25 tips for A1 across 8 categories
- Tips are level-aware

---

## Database (Supabase) — Minimal Storage
- Username, email, password (hashed by Supabase auth)
- Current level (A1 / A2 / B1 / B2)
- Streak count + last active date
- Progress / score per section
- Vocabulary mastery per word (known / shaky / unknown) ← 3 states now
- Daily challenge completion status (resets daily)
- section_scores table (user_id, section, best_score, best_total, sessions_completed)
- mistake_log table (user_id, section, question, user_answer, correct_answer, timestamp) ← new for Insights

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

**IMPORTANT FOR CLAUDE: Never execute git commands. Always just print the commands for the user to run themselves. Do not use the Bash tool for any git operation. Do not ask the user if they want to run git commands — just output them.**

**Before starting any new phase/branch, give the user these commands to run:**
```bash
git checkout main
git pull
git checkout -b branch-name
```

At the start of every new phase, create one branch for the entire phase.

Use this naming format for branches:
- New phase/feature: feat/descriptive-name
- Bug fix: fix/bug-name
- UI change: ui/change-name

**One branch per phase.**

Once the phase is complete, give the user these commands to run:
```bash
git add .
git commit -m "short message — main features only, not files"
git push origin branch-name
```
Then open a Pull Request on GitHub to merge into main.

### Pull Request Descriptions
After giving push commands, always generate a pull request description
ready to copy-paste directly into the GitHub Pull Request box.

**Summary**
One sentence explaining what this PR does and why.

**Changes**
- New: `file/path.ts` — what it does, key functions/exports
- Updated: `file/path.ts` — what changed and why

**Verification**
- ✅ Thing tested and confirmed working

Rules: specific file paths, function names, real details. Every file touched gets its own line.

---

## Build Phases

### ✅ Phase 0 — Planning (Complete)
### ✅ Phase 1 — Project Setup (Complete)
### ✅ Phase 2 — Content Foundation for A1 (Complete)
### ✅ Phase 3 — Flashcards (A1) (Complete)
### ✅ Phase 4 — Grammar Exercises (A1) (Complete)
### ✅ Phase 4b — Test & Fix Grammar Exercises (Complete)
### ✅ Phase 5 — Exam Prep (A1) (Complete)
### ✅ Phase 6 — Mini Games (A1) (Complete)
### ✅ Phase 7 — Flashcard Categories (Complete)
### ✅ Phase 8 — Daily Challenge + Streak (Complete)
### ✅ Phase 9 — Progress Dashboard (Complete)
### ✅ Phase 10a — UI Polish / Redesign (Complete)

### ✅ Phase 10b — UI Fixes Round 2 (Complete)
- [x] Sidebar: Feather icons, Inter font, 2px blue left-border active state, `CustomDrawerContent`, width 240, "LERNE DEUTSCH" wordmark
- [x] Page backgrounds: `colors.background` → `#fafafa`, surface stays `#ffffff`, amber colors added to theme
- [x] Mini Games / Grammar / Exam Prep selectors: 2-column bordered card grids with live score badges
- [x] Home page: "LERNE DEUTSCH" wordmark, TODAY'S FOCUS card (priority-based recommendation), 3-column stats strip, Feather icons replacing all emojis
- Branch: `ui/fixes-round-2`

### ⏳ Phase 10c — Flashcard Enhancements
- [ ] Add third state: Shaky (amber/yellow) between Known and Unknown
- [ ] Update spaced repetition: Known = rare, Shaky = occasional, Unknown = frequent
- [ ] Update Supabase mastery storage to support 3 states
- [ ] Show extra info on card back:
  - Verbs: conjugation table (ich/du/er/wir/ihr/sie forms)
  - Nouns: plural form
  - Adjectives: comparative form
- [ ] Session summary screen after finishing deck (cards reviewed, known/shaky/unknown counts)
- [ ] Word search bar above category pills
- [ ] Fix "Study Again" button (currently broken)
- [ ] Fix category pills: compact fixed-height, horizontally scrollable, show count e.g. "Nouns 265"

### ⏳ Phase 10d — Test Exam Prep (Phase 5b deferred)
- [ ] Test Reading, Listening, Writing, Speaking
- [ ] Test back button from each sub-section
- [ ] Test Grammar "Generate More Exercises"

### ⏳ Phase 11 — Insights / Analytics (New Section)
- [ ] Add Insights to sidebar navigation (icon: trending-up)
- [ ] Weak Vocabulary list: words most frequently marked Unknown or Shaky
- [ ] Mistake Log: incorrect grammar answers (question, your answer, correct answer)
  - New Supabase table: mistake_log (user_id, section, question, user_answer, correct_answer, timestamp)
  - Wire into grammar.tsx to save wrong answers
- [ ] Weak Grammar Topics: topics sorted by lowest score with bar chart
- [ ] Activity Calendar: streak heatmap grid — last 3 months, coloured squares per day
- [ ] Reading Mode: display a short German text, tap any word to see its translation popup

### ⏳ Phase 12 — Polish (A1 complete app)
- [ ] Test level switching (A1 works, other levels show "coming soon")
- [ ] Performance check (loading states for all AI calls)
- [ ] Fill in the Blank mini game (Gemini)
- [ ] Vocabulary mastery by part of speech on Progress screen
- [ ] Keyboard shortcuts (Space to flip card, 1/2/3 for Known/Shaky/Unknown, M/F/N for Gender Battle)
  - Add a small "?" help button on each screen that shows available shortcuts

### ⏳ Phase 13 — Expand to A2, B1, B2
- [ ] Add A2 / B1 / B2 vocabulary lists
- [ ] Add A2 / B1 / B2 grammar exercise templates
- [ ] Write 20-30 tips for A2, B1, B2

### ⏳ Phase 14 — Deep Progress Insights
- [ ] Per-topic grammar score breakdown in Progress screen
- [ ] New Supabase table: grammar_topic_scores

### ⏳ Phase 15 — Multi-user (If Expanding)
- [ ] Auth screens (sign up / login)
- [ ] Tie all progress to user accounts
- [ ] Leaderboard for streaks

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
- [2026-03-29] Phase 10a complete — Full UI redesign. IBM Plex Mono, theme.ts, all screens restyled.
- [2026-03-29] Phase 10b complete — Sidebar Feather icons + Inter font, #fafafa page backgrounds, card grid selectors (Games/Grammar/Exam), home page redesign with TODAY'S FOCUS + stats strip.
- [2026-03-29] Phase 3 complete — Flashcards with flip animation and spaced repetition.

---
*This file is the single source of truth for the project.
Update it whenever decisions change or progress is made.*
