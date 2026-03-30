# Lerne Deutsch — German Learning App

## Overview
A German language learning web application for CEFR levels A1 through B2.
Built for personal use initially, with potential to expand to other users later.
The app is called **Lerne Deutsch** (means "Learn German" in German).

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
- Fill in the Blank — Gemini generated (Phase 17 — Later)

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

### 💡 Tips / Hints Bar
- Always visible at the bottom of every screen
- Left and right arrows to browse
- 25 tips for A1 across 8 categories, level-aware
- Auto-shuffle on navigation — tip rotates every time user navigates to a new screen

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
- Feedback on Writing exercises — grammar, vocabulary, suggestions
- Feedback on Speaking exercises — accuracy, pronunciation notes
- Dynamic sentence generation for Fill in the Blank
- Fresh reading passages on demand
- Feedback tone adjusts by level
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

**IMPORTANT: Never execute git commands. Always print the commands for the user to run themselves. Do not use the Bash tool for any git operation.**

Before starting any new phase, give the user these commands:
```bash
git checkout main
git pull
git checkout -b branch-name
```

Branch naming:
- New phase/feature: feat/descriptive-name
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

---
## ACTIVE PIPELINE

### ⏳ Phase 11 — Test Exam Prep · Effort: Low

- [ ] Test Reading: generate passage → answer questions → verify score and review screen
- [ ] Test Listening: generate passage → play audio → answer questions → verify passage revealed
- [ ] Test Writing: type a German response → submit → verify Gemini feedback appears
- [ ] Test Speaking (mic): record → verify transcript → submit → verify feedback
- [ ] Test Speaking (type): type response → submit → verify feedback
- [ ] Test back button from each sub-section
- [ ] Test Grammar "Generate More Exercises" button


---
## LATER
*Planned but not immediate — picked up after active pipeline is complete.*

### Phase 20 — AI / Gemini Features · Effort: Medium
- [ ] Test and verify "Generate More Exercises" in Grammar fully works
- [ ] Build Fill in the Blank mini game (Gemini generated sentences)
- [ ] Performance check — loading states for all Gemini API calls
- [ ] Error handling — friendly messages when Gemini quota is hit
- [ ] Gemini feedback tone polish across Writing and Speaking

### Phase 21 — Expand to A2, B1, B2 · Effort: High
- [ ] Add A2 / B1 / B2 vocabulary lists
- [ ] Add A2 / B1 / B2 grammar exercise templates
- [ ] Write 20-30 tips for A2, B1, B2
- [ ] Test level switching (A1 works, others show "coming soon" until content added)
- [ ] Run scripts/extract-plurals.js, extract-conjugations.js, apply-comparatives.js for each new level (uncomment paths at top of each script)

### ✅ Phase 22 — Deep Progress Insights (Complete)

### Phase 23 — Multi-user · Effort: High
- [ ] Auth already handled in Phase 14 — this phase adds multi-user features on top
- [ ] Leaderboard for streaks
- [ ] User profiles
- [ ] Shared progress comparisons

### Phase 24 — Smart Interruption Tips · Effort: Medium
- [ ] Wire tips to mistake log data — show contextual tips based on recent wrong answers
- [ ] Replace auto-shuffle with targeted tips after completing exercises
- [ ] Example: user keeps getting der/die/das wrong → tip about noun genders appears
- [ ] Requires Phase 15 (Insights/mistake log) to be complete first
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

---
*This file is the single source of truth for the project.
Update it whenever decisions change or progress is made.*