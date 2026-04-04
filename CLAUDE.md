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

---
## ACTIVE PIPELINE

### ⏳ Phase 36 — A2 Content Completion · Effort: Medium
*Completes A2 so all screens work at that level. Everything else already works for A2 — only these two areas are missing.*

- [ ] **Reading passages for A2** — `src/data/passages.ts` has `A2: []`. Add 10–15 A2-level passages (slightly longer than A1, covering everyday topics like travel, shopping, work, social plans). Same format as A1 passages. A2 reading mode currently shows "no passages" when level is A2.
- [ ] **Sentence Builder A2 sentences** — `src/data/sentenceBuilder.ts` has 80 A1 sentences only, and the game ignores the current level. Add ~50 A2 sentences (Perfekt tense, subordinate clauses, adjective-heavy, comparatives) and make the game level-aware by exporting sentences per level (same `Record<Level, ...>` pattern as GRAMMAR and VOCABULARY). File to update: `src/data/sentenceBuilder.ts` + `src/components/SentenceBuilderGame.tsx`.

### ⏳ Phase 28 — Reading Mode Improvements · Effort: Low–Medium
- [ ] Increase passage length from ~4 sentences to 8-10 sentences
- [ ] Ensure passages use only A1 vocabulary from the word list
- [ ] Add option to generate a new passage without reloading the screen
- [ ] Fix conjugated verb lookup — tapping "fährt" currently finds nothing because lookup only matches base forms; strip common verb endings (-t, -st, -en, -e, -et) to find root, then look up; show "Word not found — search in Flashcards" for truly unrecognised forms; file: app/reading.tsx
- [ ] Add non-narrative passage formats — all 15 current passages are first-person narratives; add 5 passages in real A1 exam formats: signs, short notices, SMS messages, short emails, and advertisements (needed before Phase 29 exam simulation is realistic)

### Phase 34 — Bug Fixes & Code Quality · Effort: Low
*These are silent correctness bugs — the app works but behaves subtly wrong in edge cases.*
- [ ] Fix topicTipMap.ts topic key mismatches — grammar exercises in a1.ts use e.g. 'Accusative case' but topicTipMap.ts has 'Akkusativ case'; audit all 21 topic keys against a1.ts exact strings and fix every mismatch; Focus Tip is fully built but silently returns null for A1's most common mistakes; files: src/data/grammar/a1.ts, src/data/topicTipMap.ts
- [ ] Fix DST streak bug — getYesterdayString() in streakService.ts subtracts 86,400,000ms (can give wrong date on DST spring-forward night in Germany); replace with: yesterday.setDate(yesterday.getDate() - 1); file: src/lib/streakService.ts
- [ ] Add LIMIT to mistake log fetch — loadMistakes() fetches ALL rows with no limit; add .limit(100) to the Supabase query; Insights only shows 10, contextual tip only needs 20; file: src/lib/mistakeService.ts
- [ ] Make getUserId() synchronous — masteryService, scoresService, streakService each call await supabase.auth.getUser() independently on every write (3 round-trips on grammar session end); store session.user.id in useAuthStore when onAuthStateChange fires in _layout.tsx, then read it synchronously from the store; files: src/lib/userId.ts, src/store/useAuthStore.ts, app/_layout.tsx
- [ ] User-specific daily challenge seed — current seed is date-only, so all users get identical exercises; XOR date integer with a hash of the user ID so each user gets a different set; file: app/daily.tsx
- [ ] Shared date utilities — daily.tsx, streakService.ts, and insights.tsx each define their own formatDate/getTodayString helpers with slightly different formats; extract to src/lib/dateUtils.ts and import everywhere to prevent subtle streak/heatmap mismatches

### Phase 35 — Sentence Builder Improvements · Effort: Low
- [ ] Add difficulty tagging to sentence templates — 80 sentences in src/data/sentenceBuilder.ts currently have no difficulty level; sessions randomly mix complex subordinate-clause sentences with simple SVO ones; tag each template as simple / medium / complex
- [ ] Use difficulty tags to graduate sessions — start with simple sentences, progress to complex as score improves; or let user choose difficulty level before session starts

### ⏳ Phase 26 — Grammar Exercises Expansion · Effort: Medium
- [ ] Expand hard grammar topics from ~7 exercises to 15-20 each
- [ ] Priority topics to expand: Akkusativ, prepositions (in/auf/mit/zu/bei/nach/aus/von/für), separable verbs, modal verbs, word order
- [ ] Keep same format as existing exercises (fill-blank and multiple-choice mix)
- [ ] Write in chunks of 1 topic at a time to avoid cutoff issues
- [ ] Add missing A1 grammar topics currently at zero coverage:
  - Time expressions — um X Uhr, halb, Viertel (appear in every real A1 exam)
  - Reflexive verbs — sich vorstellen, sich fühlen (extremely common at A1)
  - Days/months/seasons in grammar context (vocabulary cards exist, grammar drills don't)
- [ ] Undertested topics to expand to 15+ exercises: word order: verb in 2nd position (3 → 15+), indefinite articles ein/eine (3 → 15+), negation nicht/kein (5 → 15+)

### ⏳ Phase 27 — Flashcard Verb Sub-categories · Effort: Medium
- [ ] Add verb type sub-categories under the Verbs pill in flashcard category filter
- [ ] Sub-categories: Regular Verbs, Irregular Verbs, Modal Verbs (können/müssen/wollen/möchten/dürfen/sollen), Separable Verbs
- [ ] Each sub-category shows count e.g. "Modal Verbs 6"
- [ ] Requires tagging each verb in a1.ts with its verb type (verbType field)
- [ ] UI: tapping Verbs pill expands to show sub-category pills below

### ⏳ Phase 30 — Newspaper / Comprehension Exercise · Effort: Medium
- [ ] Add new sub-section to Exam Prep called "Comprehension"
- [ ] Show a real-format German text — newspaper excerpt, advertisement, or notice
- [ ] User reads and writes a summary or answers open questions in German
- [ ] Gemini evaluates the response and gives structured feedback
- [ ] Texts sourced from Deutsche Welle (openly licensed) or Gemini generated at correct level

---
## LATER
*Planned but not immediate.*

### ⏳ Phase 21 — Expand to A2, B1, B2 · Effort: Very High
- [x] Add A2 vocabulary list — 585 words (src/data/vocabulary/a2.ts), wired into index.ts. Plurals, conjugations, comparatives already filled.
- [x] Add A2 grammar exercises — 96 exercises across 12 topics (src/data/grammar/a2.ts), wired into grammar/index.ts.
- [x] Write A2 tips — 20 tips with rule+example format (src/data/tips.ts). topicTipMap.ts updated with all 12 A2 topic entries.
- [x] B1/B2 grammar shows "coming soon" automatically (grammar.tsx returns early when GRAMMAR[level] is empty).
- [ ] Add B1 vocabulary list — **SCAFFOLD DONE: b1.ts has all 1406 words in alphabetical order (b1_0001–b1_1406). 319 entries have complete data (english, examples, conjugations/plurals). 1087 entries are placeholders with empty english/exampleDe/exampleEn — these need content filled in chunks of 100. Fill placeholders by reading the file, finding the next empty-english entry, and generating content for the next 100. Do NOT rebuild the file — just fill in the empty fields.**
- [ ] Add B2 vocabulary list — **INCOMPLETE: b2.ts currently has 232 words (b2_0001–b2_0232), but the full B2 word list has more than 300 genuinely new words not in A1/A2/B1. More entries need to be added and filled with english/examples/conjugations/plurals before wiring into index.ts.**
- [ ] Add B1 / B2 grammar exercises and tips (when vocabulary is complete)
- [ ] Run scripts/extract-plurals.js, extract-conjugations.js, apply-comparatives.js for B1 and B2 (A2 already done — paths were pre-filled)

### ⏳ Phase 29 — Real A1 Exam Simulation · Effort: High
- [ ] Research and replicate actual Goethe-Zertifikat A1 exam format and difficulty
- [ ] Reading section: real-world text formats — signs, notices, short messages, form-filling tasks (not just passage + questions)
- [ ] Listening section: real dialogue between two people (not single sentences), multiple choice on what was discussed
- [ ] Writing section: short formal message or form completion (e.g. fill in a registration form, write a short reply to an email)
- [ ] Speaking section: introduce yourself prompt, respond to questions about daily life
- [ ] Difficulty calibrated to actual A1 exam — currently too easy
- [ ] Add a separate "Exam Simulation" mode distinct from practice mode
- [ ] Score and feedback aligned with real exam marking criteria

### Phase 23 — Multi-user · Effort: High
- [ ] Auth already handled — this phase adds multi-user features on top
- [ ] Leaderboard for streaks
- [ ] User profiles
- [ ] Shared progress comparisons

### Phase 31 — Lessons · Effort: High
- [ ] Lesson screen per grammar topic — explanation in plain English, examples, "Practice this now" button
- [ ] Curriculum sourced from Goethe Institut A1 syllabus
- [ ] Each lesson links directly to the relevant grammar exercise topic
- [ ] Lessons section added to sidebar

### Phase 32 — Progress & Analytics Enhancements · Effort: Medium
- [ ] Consistency score — "studied X out of last 7 days" (not just streak)
- [ ] Accuracy trend — grammar score going up or down week over week
- [ ] Words seen vs words mastered (currently only mastered shown)
- [ ] Error pattern detection — "You've gotten feminine noun genders wrong 15 times this week"
- [ ] Spaced repetition for grammar — topics you got wrong surface more in Daily Challenge
- [ ] Grammar score history per topic — only best_score is stored today; add a session history (last 10 scores per topic) so users can see if they are improving or stagnating; requires new column or table in Supabase + service update + sparkline display in Progress or Insights

### Phase 33 — Spaced Repetition for Grammar · Effort: Medium
- [ ] Track which grammar topics are answered wrong
- [ ] Weight Daily Challenge to show more questions from weak topics
- [ ] Persist weakness data to Supabase per user

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

---
*This file is the single source of truth for the project.
Update it whenever decisions change or progress is made.*