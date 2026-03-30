# Lerne Deutsch

A German language learning web app for CEFR levels A1 through B2, built with Expo and TypeScript.

**Live:** https://german-learning-app-neon.vercel.app

---

## What it does

- **Flashcards** — spaced repetition with three mastery states: Known, Shaky, Unknown. Review dates calculated per state (Known→7d, Shaky→2d, Unknown→1d)
- **Grammar Exercises** — level-specific drills with multiple choice and fill-in-the-blank
- **Mini Games** — Word Match, Gender Battle, Listening Quiz
- **Sentence Builder** — tap-to-place word tiles to form correct German sentences
- **Daily Challenge** — 5 grammar exercises per day with streak tracking
- **Exam Prep** — Reading, Listening, Writing, Speaking sections
- **Progress Dashboard** — scores and vocabulary mastery across all sections
- **Insights** — weak vocabulary, mistake log, activity calendar
- **Reading Mode** — short German texts with tap-to-translate word lookup
- **Pronunciation Guide** — 28 phonetic entries with Web Speech API playback
- **AI Feedback** — writing and speaking feedback via Google Gemini

---

## Tech stack

| Tool | Purpose |
|---|---|
| Expo (web) | Cross-platform framework |
| TypeScript | Language |
| Zustand | Global state (level, auth session) |
| Supabase | Auth (email + password) + database |
| Google Gemini API | AI feedback and exercise generation |
| Vercel | Deployment — auto-deploys on push to main |

---

## Running locally

```bash
npm install
npx expo start --web
```

Requires a `.env.local` file with:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

---

## Deploying

The app auto-deploys to Vercel on every push to `main`.

To deploy manually:
```bash
npx expo export --platform web  # outputs to dist/
```
Output directory: `dist/`

---

## Vocabulary

665 A1 words sourced from the official Goethe Institut A1 word list. Every noun has a plural form, every verb has full present tense conjugations, and every adjective has comparative and superlative forms. A2/B1/B2 content planned for a later phase.

---

## Authentication

Sign up and log in with email and password via Supabase Auth. All progress (vocabulary mastery, scores, streaks, level selection) is tied to the account and persists across devices.

---

## Cost

Entirely free to run — Supabase free tier, Gemini free tier, Vercel Hobby plan, Expo local builds only.

---

## Project status

Active development. See `CLAUDE.md` for the full build phase plan and progress log.