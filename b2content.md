# Phase 38 — B2 Content Plan

## Context
B2 is the last level to complete. The vocabulary file (b2.ts) exists with 232 placeholder words but is **not wired into** vocabulary/index.ts. Grammar, passages, sentence builder, real tips, and topicTipMap are all empty/missing for B2. Do vocabulary replacement first (across multiple sessions), then content (grammar + tips + passages + sentences) in a follow-up session.

---

## Part A — Vocabulary Replacement

### Current state
- `src/data/vocabulary/b2.ts` — 232 words, exists but **not wired in**
- `src/data/vocabulary/index.ts` — `B2: []`, comment says "TODO: add B2 vocabulary"
- `b2_aspekte.txt` — 2,970 lines (Aspekte Neu B2 Kapitelwortschatz)
  - Format: raw German only (no English), examples in parentheses, plural/conjugation after comma
  - Headers to skip: `Kapitelwortschatz`, `Kapitel N`, `Modul N`, `Seite N`, `Auftakt`, `Wiederholung`
  - Lesson markers to strip: `1b `, `2a `, `4c ` etc.
  - Gendered noun pairs: `der/die Grafiker/in` → one entry per base form, note (m/f) in English

### Word type structure (from `src/data/vocabulary/types.ts`)
```ts
{ id, german, english, gender, partOfSpeech, exampleDe, exampleEn,
  plural?, conjugations?, comparative? }
```

### Chunk approach
- **~21 chunks of ~100 words each**, alphabetically ordered
- After each chunk: user types "continue" to trigger next chunk
- Final b2.ts: sorted A→Z, IDs `b2_0001` → `b2_N` (fresh from 1, replaces current 232)
- After all chunks done: update `src/data/vocabulary/index.ts` to import and wire `B2_WORDS`

### Files to change (Part A)
| File | Change |
|---|---|
| `src/data/vocabulary/b2.ts` | **Replace entirely** — ~2,123 Aspekte words, IDs b2_0001 onwards |
| `src/data/vocabulary/index.ts` | Import B2_WORDS, replace `B2: []` with `B2: B2_WORDS` |

---

## Part B — Content (follow-up session after vocab done)

### 1. Grammar exercises — `src/data/grammar/b2.ts` (NEW FILE)
10 topics, 12 exercises each = **120 exercises total**
Topics (aligned to cheatsheets/b2.ts):
1. Extended participial phrases — convert relative clauses to participial attributes
2. Konjunktiv I — reported speech (sei, habe, werde etc.)
3. Modal particles — doch / ja / mal / eigentlich / wohl / halt
4. Passive with modal verbs — Das muss gemacht werden / kann nicht geändert werden
5. N-Deklination — Herr/Herrn, Mensch/Menschen, Kunde/Kunden, Kollege/Kollegen
6. Nominalisierung — verb/adj → noun (das Lernen, die Müdigkeit, die Schnelligkeit)
7. Genitiv prepositions — wegen, trotz, während, innerhalb, außerhalb, anstatt, aufgrund, mithilfe
8. Complex connectors — obwohl vs trotzdem, weil vs denn, als vs wenn vs wann
9. Indirect questions — ob-clauses + embedded W-questions
10. Relative clauses with was/wo — Das, was er sagt… / dort, wo ich wohne…

Mix: ~8 fill-blank + ~4 multiple-choice per topic (same pattern as b1.ts)
IDs: `b2_gr_001` → `b2_gr_120`

Wire into `src/data/grammar/index.ts`: import B2_GRAMMAR, replace `B2: []`

### 2. Tips — `src/data/tips.ts`
Replace 5 placeholder B2 tips with **20 real B2 tips** (same rule + example format as B1).
One per grammar topic above + 10 general B2 register/vocabulary tips.

### 3. topicTipMap — `src/data/topicTipMap.ts`
Add `B2` section with **10 entries** — one focus tip per grammar topic.
Key format must match topic strings in b2.ts grammar file exactly.

### 4. Reading passages — `src/data/passages.ts`
Add **10 B2 passages** to the B2 array (currently `[]`).
Each: 10-14 sentences, complex grammar (passive, participial phrases, Konjunktiv I, abstract B2 vocab).
Topics: news article, opinion piece, formal letter, workplace situation, environmental issue,
cultural event, scientific explanation, social media debate, job application, travel guide excerpt.
Format: same as existing A1/A2 passages (id, title, level, text, words array).

### 5. Sentence Builder — `src/data/sentenceBuilder.ts`
Add **50 B2 sentences** (`B2_SENTENCES`).
Grammar complexity: participial phrases, Konjunktiv I, passive with modals, N-Deklination, complex subordinate clauses.
Difficulty split: 10 simple / 20 medium / 20 complex (same tagging as A1/A2).
Note: `SentenceBuilderGame.tsx` currently falls back to A1 for B2 — update that fallback when wiring in.

### Files to change (Part B)
| File | Change |
|---|---|
| `src/data/grammar/b2.ts` | NEW — 120 exercises, 10 topics |
| `src/data/grammar/index.ts` | Import B2_GRAMMAR, replace `B2: []` |
| `src/data/tips.ts` | Replace 5 B2 placeholders with 20 real tips |
| `src/data/topicTipMap.ts` | Add B2 section (10 entries) |
| `src/data/passages.ts` | Add 10 B2 passages to B2 array |
| `src/data/sentenceBuilder.ts` | Add B2_SENTENCES (50), wire into game |

---

## Session order
1. **Session 1:** Vocabulary chunk 1 — A words (~100 entries), write first block of b2.ts
2. **Sessions 2–21:** Chunks on "continue" — each session adds ~100 words
3. **After last chunk:** Wire index.ts, commit vocab with git commands
4. **Follow-up session:** Part B — grammar, tips, topicTipMap, passages, sentences, commit content

## Verification
- Flashcards at B2 level show real Aspekte words with gender + examples
- Grammar section at B2 shows exercises (not "coming soon")
- Sentence Builder at B2 plays with B2 sentences
- Reading Mode at B2 shows passages
- Tips at B2 are real grammar rules (not placeholder)
- Focus Tips fire for B2 grammar mistakes (topicTipMap wired)
