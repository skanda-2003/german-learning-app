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
At the start of every new feature or fix, remind me to create a new branch with:
```bash
git checkout -b branch-name
```

Use this naming format for branches:
- New feature: feature/feature-name (e.g. feature/flashcards)
- Bug fix: fix/bug-name (e.g. fix/level-toggle-bug)
- UI change: ui/change-name (e.g. ui/sidebar-styling)

Once the code for that feature or fix is complete, give me these commands:
```bash
git add .
git commit -m "describe what was done"
git push origin branch-name
```

Then remind me to open a Pull Request on GitHub to merge the branch into main.

---

## Build Phases

### ✅ Phase 0 — Planning (Complete)
- Full app plan discussed and finalised
- Tech stack decided (Expo, TypeScript, Zustand, Supabase, Gemini API)
- CLAUDE.md created

### 🔄 Phase 1 — Project Setup (Current)
- [ ] Initialize Expo project with TypeScript
- [ ] Set up folder structure
- [ ] Set up sidebar navigation
- [ ] Add level toggle (Zustand global state)
- [ ] Add tips bar component at the bottom (static content for now)
- [ ] Connect to GitHub repo (german-learning-app)
- [ ] Connect to Supabase project

### ⏳ Phase 2 — Content Foundation
- [ ] Curate A1 vocabulary list (from CEFR/Goethe) into JSON
- [ ] Curate grammar rules and exercise templates per level
- [ ] Write 20-30 tips per level
- [ ] Set up Gemini API integration (reusable function)

### ⏳ Phase 3 — Flashcards
- [ ] Flashcard UI with flip animation
- [ ] Known / unknown marking
- [ ] Spaced repetition logic
- [ ] Connect vocabulary mastery to Supabase

### ⏳ Phase 4 — Mini Games
- [ ] Word Match
- [ ] Fill in the Blank (Gemini generated sentences)
- [ ] Gender Battle
- [ ] Listening Quiz (Web Speech API)

### ⏳ Phase 5 — Grammar Exercises
- [ ] Exercise templates per level
- [ ] Gemini generated variations

### ⏳ Phase 6 — Exam Prep
- [ ] Reading
- [ ] Listening
- [ ] Writing (Gemini feedback)
- [ ] Speaking (voice + text, Gemini feedback)

### ⏳ Phase 7 — Daily Challenge + Streak
- [ ] Daily challenge logic (mixed exercises)
- [ ] Streak counter (checks last active date on app open)
- [ ] Update Supabase on completion

### ⏳ Phase 8 — Progress Dashboard
- [ ] Scores per section
- [ ] Vocabulary mastery visualization
- [ ] Streak display

### ⏳ Phase 9 — Polish
- [ ] Consistent styling across all screens
- [ ] Test level switching thoroughly
- [ ] Test on web
- [ ] Performance check (loading states for AI calls)

### ⏳ Phase 10 — Multi-user (If Expanding)
- [ ] Auth screens (sign up / login)
- [ ] Tie all progress to user accounts
- [ ] Leaderboard for streaks

---

## Progress Log
*Update this section as phases are completed.*

- [2026-03-26] Project planning completed. Tech stack finalised. CLAUDE.md created.
  - Platform: Web first, mobile later
  - AI: Google Gemini API (free tier) — replaces Claude API
  - Cost policy: Entire project must remain free to run

---
*This file is the single source of truth for the project.
Update it whenever decisions change or progress is made.*