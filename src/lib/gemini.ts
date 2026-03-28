// gemini.ts — Reusable Gemini API integration for Lerne Deutsch.
// This is the ONLY file in the app that talks to Gemini.
// All AI features (Fill in the Blank, Writing feedback, Speaking feedback, Reading passages,
// Grammar exercise generation) import their functions from here.
//
// Model: gemini-1.5-flash (free tier — 15 requests/min, 1500 requests/day)
// SDK: @google/generative-ai

import { GoogleGenerativeAI } from '@google/generative-ai';

// ─── Setup ────────────────────────────────────────────────────────────────────

// Read the API key from the environment variable set in .env.local
// EXPO_PUBLIC_ prefix is required by Expo to make the variable accessible in app code
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

if (!API_KEY) {
  // This will only appear during development if you forgot to add the key to .env.local
  console.warn('Gemini API key is missing. Add EXPO_PUBLIC_GEMINI_API_KEY to your .env.local file.');
}

// Create the Gemini client — we reuse this single instance for all requests
const genAI = new GoogleGenerativeAI(API_KEY ?? '');

// Get the specific model we want to use
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// ─── Helper: level-aware tone instruction ─────────────────────────────────────

// This small helper returns a tone instruction based on the CEFR level.
// It gets added to every prompt so Gemini adjusts its language accordingly.
function getToneInstruction(level: string): string {
  switch (level) {
    case 'A1':
      return 'Use very simple English. Be encouraging and friendly. Keep explanations short and easy to understand for a complete beginner.';
    case 'A2':
      return 'Use simple English. Be positive and supportive. Explanations can be slightly more detailed than A1.';
    case 'B1':
      return 'Use clear English. You can reference grammar terms the student likely knows. Be constructive.';
    case 'B2':
      return 'Use natural English. Be detailed and precise in your feedback. Treat the student as an intermediate learner.';
    default:
      return 'Be clear and encouraging.';
  }
}

// ─── Base function ─────────────────────────────────────────────────────────────

// All functions below call this one. It sends a prompt to Gemini and returns the text response.
// If anything goes wrong (network error, rate limit, etc.) it returns a fallback message
// instead of crashing the app.
async function callGemini(prompt: string): Promise<string> {
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    return text.trim();
  } catch (error) {
    // Log the error for debugging but return a safe message to the user
    console.error('Gemini API error:', error);
    return 'Sorry, the AI feature is unavailable right now. Please try again.';
  }
}

// ─── Feature functions ─────────────────────────────────────────────────────────

// --- 1. Fill in the Blank sentence generator ---
// Used by: Mini Games → Fill in the Blank
// Generates a natural German sentence with one word replaced by a blank (___).
// The correct answer is the given German word.
export async function generateFillInBlankSentence(
  germanWord: string,
  englishTranslation: string,
  level: string
): Promise<string> {
  const prompt = `
You are a German language teacher creating a fill-in-the-blank exercise for a ${level} student.

Write ONE simple German sentence that uses the word "${germanWord}" (which means "${englishTranslation}").
Then replace "${germanWord}" in the sentence with ___.

Rules:
- The sentence must be appropriate for ${level} level.
- The sentence must make it obvious what the missing word is from context.
- Only output the sentence with the blank. Nothing else. No translation, no explanation.

Example output format:
Ich fahre ___ dem Bus zur Arbeit.
  `.trim();

  return callGemini(prompt);
}

// --- 2. Writing exercise feedback ---
// Used by: Exam Prep → Writing
// The user is given a writing prompt and types a response. Gemini reviews it.
export async function getWritingFeedback(
  writingPrompt: string,
  userText: string,
  level: string
): Promise<string> {
  const tone = getToneInstruction(level);

  const prompt = `
You are a German language teacher giving feedback on a ${level} student's writing exercise.

Writing prompt the student was given:
"${writingPrompt}"

The student wrote:
"${userText}"

Your task:
1. Say whether the response is on topic.
2. Point out any grammar or vocabulary mistakes. Be specific but gentle.
3. Give one or two suggestions for improvement.
4. End with an encouraging sentence.

${tone}
Keep your response concise — no more than 150 words.
  `.trim();

  return callGemini(prompt);
}

// --- 3. Speaking exercise feedback ---
// Used by: Exam Prep → Speaking
// The user speaks or types a response to a prompt. Gemini evaluates it.
export async function getSpeakingFeedback(
  speakingPrompt: string,
  userText: string,
  level: string
): Promise<string> {
  const tone = getToneInstruction(level);

  const prompt = `
You are a German language teacher giving feedback on a ${level} student's spoken response (transcribed to text).

Speaking prompt the student was given:
"${speakingPrompt}"

The student said (transcribed):
"${userText}"

Your task:
1. Comment on whether the response answers the prompt.
2. Note any grammar mistakes in the spoken response.
3. Suggest one or two ways to sound more natural.
4. End with an encouraging sentence.

${tone}
Keep your response concise — no more than 150 words.
  `.trim();

  return callGemini(prompt);
}

// --- 4. Grammar exercise generator ---
// Used by: Grammar Exercises → "Generate More" button on the done screen
// Generates 5 fresh exercises for a given topic and level.
// Returns an array ready to be appended to the existing exercise list.
export async function generateGrammarExercises(
  topic: string,
  level: string
): Promise<Array<{
  type: 'fill-blank' | 'multiple-choice';
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
}>> {
  const prompt = `
You are a German grammar teacher creating exercises for a ${level} student.
Topic: "${topic}"

Generate exactly 5 grammar exercises. Use a mix of fill-blank and multiple-choice types.

Rules:
- fill-blank: a German sentence where one word is replaced with ___. The answer is the missing word.
- multiple-choice: a question with exactly 4 options (strings array), one correct answer.
- Keep it appropriate for ${level} level.
- The explanation should be one short sentence explaining the grammar rule.
- Output ONLY valid JSON. No markdown, no code fences, no extra text.

Output format — a JSON array of 5 objects:
[
  {
    "type": "fill-blank",
    "question": "Ich ___ Student.",
    "answer": "bin",
    "explanation": "Sein with ich → bin."
  },
  {
    "type": "multiple-choice",
    "question": "Das Kind ___ krank.",
    "options": ["bin", "bist", "ist", "sind"],
    "answer": "ist",
    "explanation": "Third person singular → ist."
  }
]
  `.trim();

  const raw = await callGemini(prompt);

  try {
    // Strip markdown code fences if Gemini adds them despite instructions
    const cleaned = raw.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const parsed = JSON.parse(cleaned);

    // Validate it's an array before returning
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    console.error('Failed to parse Gemini grammar response:', raw);
    return [];
  }
}

// --- 5. Reading passage generator ---
// Used by: Exam Prep → Reading
// Generates a short, level-appropriate German reading passage on a given topic.
// Returns an object with the passage and comprehension questions.
export async function generateReadingPassage(
  topic: string,
  level: string
): Promise<{ passage: string; questions: string[] }> {
  const prompt = `
You are a German language teacher creating a reading exercise for a ${level} student.

Write a short German reading passage about: "${topic}"

Then write 3 comprehension questions in German about the passage.

Rules:
- The passage must be appropriate for ${level} level vocabulary and grammar.
- A1: 4-6 sentences. Very simple grammar and vocabulary.
- A2: 6-8 sentences. Simple past tense allowed.
- B1/B2: 8-12 sentences. More complex grammar allowed.
- Questions should be answerable from the passage.

Output format (use exactly this structure):
PASSAGE:
[the German passage here]

QUESTIONS:
1. [question 1]
2. [question 2]
3. [question 3]
  `.trim();

  const raw = await callGemini(prompt);

  // Parse the response into passage and questions
  // If parsing fails we return the raw text as the passage with empty questions
  try {
    const passageMatch = raw.match(/PASSAGE:\s*([\s\S]*?)\s*QUESTIONS:/);
    const questionsMatch = raw.match(/QUESTIONS:\s*([\s\S]*)/);

    const passage = passageMatch ? passageMatch[1].trim() : raw;
    const questionsRaw = questionsMatch ? questionsMatch[1].trim() : '';
    const questions = questionsRaw
      .split('\n')
      .map(q => q.replace(/^\d+\.\s*/, '').trim())
      .filter(q => q.length > 0);

    return { passage, questions };
  } catch {
    return { passage: raw, questions: [] };
  }
}