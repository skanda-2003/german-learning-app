# Lerne Deutsch

A German language learning web app for CEFR levels A1 through B2, built with Expo and TypeScript.

**Live:** https://german-learning-app-neon.vercel.app

---

## What it does

- **Flashcards** — spaced repetition with three mastery states: Known, Shaky, Unknown. Review dates calculated per state (Known→7d, Shaky→2d, Unknown→1d). Category pills (Verbs, Nouns, Prepositions, Other) open a sub-category dropdown for fine-grained filtering (e.g. Modal verbs, der/die/das nouns, Accusative prepositions)
- **Dictionary** — searchable reference for all 3,000+ words across A1–B2, regardless of selected level. Search by German word, conjugated verb form (e.g. "isst" → essen), or English translation. Noun detail shows plural; verb detail shows full present-tense conjugation table with separable verb indicator; adjective detail shows comparative. Recently viewed history persisted locally
- **Grammar Exercises** — level-specific drills with multiple choice and fill-in-the-blank
- **Mini Games** — Word Match, Gender Battle, Listening Quiz, Fill in the Blank (AI-generated)
- **Sentence Builder** — tap-to-place word tiles to form correct German sentences
- **Daily Challenge** — 5 grammar exercises per day with streak tracking
- **Lessons** — structured grammar lessons per topic with explanations, key rules, examples, and a direct link into practice exercises
- **Exam Prep** — Reading, Listening, Writing, Speaking, and Comprehension sections
- **Progress Dashboard** — scores and vocabulary mastery across all sections
- **Insights** — weak vocabulary, mistake log, activity calendar
- **Reading Mode** — short German texts with tap-to-translate word lookup
- **Pronunciation Guide** — 28 phonetic entries with Web Speech API playback
- **Cheat Sheet** — static grammar reference per level (A1–B2), no login required
- **AI Feedback** — writing and speaking feedback via Google Gemini (`gemini-2.5-flash`), also used for generating grammar exercises and reading passages

---

## Tech stack

| Tool | Purpose |
|---|---|
| Expo (web) | Cross-platform framework |
| TypeScript | Language |
| Zustand | Global state (level, auth session) |
| Supabase | Auth (email + password) + database |
| Google Gemini API (`gemini-2.5-flash`) | AI feedback and exercise generation |
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

## Content coverage

| Level | Vocabulary | Grammar | Tips | Lessons | Reading | Sentence Builder |
|---|---|---|---|---|---|---|
| A1 | 665 words | 223 exercises / 19 topics | 25 | 19 | 20 passages | 80 sentences |
| A2 | 585 words | 168 exercises / 12 topics | 20 | 12 | 17 passages | 50 sentences |
| B1 | 1,406 words | 136 exercises / 12 topics | 20 | 12 | 15 passages | 50 sentences |
| B2 | 2,123 words | 120 exercises / 10 topics | 20 | 10 | 15 passages | 50 sentences |

Every noun has a plural form, every verb has full present tense conjugations, and every adjective has comparative and superlative forms. All four CEFR levels (A1–B2) are fully playable.

---

## Authentication

Sign up and log in with email and password via Supabase Auth. All progress (vocabulary mastery, scores, streaks, level selection) is tied to the account and persists across devices.

---

## Cost

Entirely free to run — Supabase free tier, Gemini free tier (`gemini-2.5-flash`), Vercel Hobby plan, Expo local builds only.

---

## Project status

Complete. All A1–B2 content and features are live. No further development planned.