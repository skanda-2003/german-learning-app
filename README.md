# Lerne Deutsch

A German language learning web app for CEFR levels A1 through B2, built with Expo and TypeScript.

---

## What it does

- **Flashcards** — spaced repetition with three mastery states: Known, Shaky, Unknown
- **Grammar Exercises** — level-specific drills with multiple choice and fill-in-the-blank
- **Mini Games** — Word Match, Gender Battle, Listening Quiz
- **Daily Challenge** — 5 grammar exercises per day with streak tracking
- **Exam Prep** — Reading, Listening, Writing, Speaking sections
- **Progress Dashboard** — scores and vocabulary mastery across all sections
- **AI Feedback** — writing and speaking feedback via Google Gemini

---

## Tech stack

| Tool | Purpose |
|---|---|
| Expo (web) | Cross-platform framework |
| TypeScript | Language |
| Zustand | Global state (selected level) |
| Supabase | Database — mastery, scores, streaks |
| Google Gemini API | AI feedback and exercise generation |

---

## Running locally

```bash
npm install
npx expo start --web
```

Requires a `.env` file with:
```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

---

## Vocabulary

665 A1 words sourced from the official Goethe Institut A1 word list, covering the full range from A1 through B2 (A2/B1/B2 content coming in later phases).

---

## Cost

Entirely free to run — Supabase free tier, Gemini free tier, Expo local builds only.

---

## Project status

Active development. See `CLAUDE.md` for the full build phase plan and progress log.
