// FillInBlankGame.tsx — Fill in the Blank mini game
//
// Flow:
//   1. 10 random words are picked from the vocabulary at the start of the session.
//   2. For each round, Gemini generates a German sentence with the target word blanked out (___).
//   3. The user types the missing word into a text input and submits.
//   4. The answer is checked case-insensitively. Correct / wrong is shown.
//   5. After 10 rounds → done screen with score. Best score is saved to Supabase.
//
// Note on nouns: German nouns include their article ("der Hund"). We strip the article
// before sending to Gemini so the blank is just the noun, e.g. "Der ___ bellt laut."
// The user types "Hund" (not "der Hund") — simpler and more natural.

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Word } from '../../data/vocabulary';
import { generateFillInBlankSentence } from '../../lib/gemini';
import { saveScore } from '../../lib/scoresService';
import { colors, font, fontSize, spacing, radius } from '../../styles/theme';

// ─── Props ─────────────────────────────────────────────────────────────────────

type Props = {
  words: Word[];    // vocabulary list for the current level
  level: string;   // current CEFR level (e.g. 'A1') — passed to Gemini for tone
  onExit: () => void;
};

// ─── Constants ─────────────────────────────────────────────────────────────────

const TOTAL_ROUNDS = 10;

// ─── Helpers ───────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Strip the leading article from a German noun so we get a clean word for the blank.
// "der Hund" → "Hund", "die Katze" → "Katze", "das Kind" → "Kind"
// For verbs, adjectives, etc. where there is no article, the word is returned unchanged.
function stripArticle(german: string): string {
  return german.replace(/^(der|die|das)\s+/i, '').trim();
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function FillInBlankGame({ words, level, onExit }: Props) {
  // Pick 10 random words once at the start. Re-shuffled on "Play Again".
  const [roundWords, setRoundWords] = useState<Word[]>(() =>
    shuffle(words).slice(0, TOTAL_ROUNDS)
  );

  // Which round we're on (0–9). When this reaches TOTAL_ROUNDS, we go to the done screen.
  const [currentIndex, setCurrentIndex] = useState(0);

  // How many the user has answered correctly so far
  const [correctCount, setCorrectCount] = useState(0);

  // Controls what is shown on screen:
  //   'loading'  — waiting for Gemini to generate the sentence
  //   'question' — user can read the sentence and type their answer
  //   'result'   — user submitted; showing correct / wrong feedback
  //   'done'     — all 10 rounds finished
  const [phase, setPhase] = useState<'loading' | 'question' | 'result' | 'done'>('loading');

  // The sentence Gemini returned (with ___ in place of the target word)
  const [sentence, setSentence] = useState('');

  // What the user typed in the input
  const [userInput, setUserInput] = useState('');

  // Whether the last answer was correct (null when not yet submitted)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Error message shown if Gemini fails to generate a sentence
  const [loadError, setLoadError] = useState<string | null>(null);

  // Ref to focus the text input automatically after the sentence loads
  const inputRef = useRef<TextInput>(null);

  // ── Load sentence whenever the round index changes ──
  useEffect(() => {
    if (currentIndex >= TOTAL_ROUNDS) {
      setPhase('done');
      return;
    }
    loadSentence();
  }, [currentIndex]);

  // Calls Gemini to get a sentence for the current word
  async function loadSentence() {
    setPhase('loading');
    setLoadError(null);
    setUserInput('');
    setIsCorrect(null);

    const word = roundWords[currentIndex];
    // Strip article from nouns so the blank is just the noun word
    const wordForGemini = stripArticle(word.german);

    const result = await generateFillInBlankSentence(wordForGemini, word.english, level);

    // The callGemini() function returns "Sorry, ..." if the API call fails
    if (result.startsWith('Sorry,')) {
      setLoadError('Could not generate a sentence right now.');
      setPhase('question'); // show the question frame so the user can retry or skip
      return;
    }

    setSentence(result);
    setPhase('question');

    // Auto-focus the text input a moment after the component renders the input
    setTimeout(() => inputRef.current?.focus(), 150);
  }

  // ── Check the user's answer ──
  function handleSubmit() {
    if (!userInput.trim() || phase !== 'question') return;

    const word = roundWords[currentIndex];
    // The correct answer is the word WITHOUT article (same as what we sent to Gemini)
    const correctAnswer = stripArticle(word.german);
    const correct = userInput.trim().toLowerCase() === correctAnswer.toLowerCase();

    setIsCorrect(correct);
    if (correct) {
      setCorrectCount(c => c + 1);
    }
    setPhase('result');
  }

  // ── Move to the next round ──
  function handleNext() {
    const nextIndex = currentIndex + 1;

    // If this was the last round, save the score before showing the done screen.
    // correctCount is already updated (React state settled before this click).
    if (nextIndex >= TOTAL_ROUNDS) {
      saveScore('game_fill_in_blank', correctCount, TOTAL_ROUNDS);
    }

    setIsCorrect(null);
    setCurrentIndex(nextIndex); // triggers useEffect → loads next sentence or sets done
  }

  // ── Skip the current round when Gemini fails (no score change) ──
  function handleSkip() {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= TOTAL_ROUNDS) {
      saveScore('game_fill_in_blank', correctCount, TOTAL_ROUNDS);
    }
    setCurrentIndex(nextIndex);
  }

  // ── Restart with a fresh set of random words ──
  function handlePlayAgain() {
    setRoundWords(shuffle(words).slice(0, TOTAL_ROUNDS));
    setCorrectCount(0);
    setCurrentIndex(0); // triggers useEffect to start loading the first sentence
    // phase will be set to 'loading' inside loadSentence()
  }

  // ─── Done Screen ─────────────────────────────────────────────────────────────

  if (phase === 'done') {
    const pct = Math.round((correctCount / TOTAL_ROUNDS) * 100);

    return (
      <View style={styles.doneContainer}>
        <Text style={styles.doneTitle}>SESSION COMPLETE</Text>

        {/* Big score circle */}
        <View style={styles.scoreCircle}>
          <Text style={styles.scorePercentage}>{pct}%</Text>
          <Text style={styles.scoreDetail}>{correctCount} / {TOTAL_ROUNDS}</Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={onExit}>
          <Text style={styles.primaryButtonText}>Back to Games</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handlePlayAgain}>
          <Text style={styles.secondaryButtonText}>Play Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ─── Round Screen ─────────────────────────────────────────────────────────────

  const word = roundWords[currentIndex];
  // The correct word (without article) shown in the result feedback
  const correctWord = word ? stripArticle(word.german) : '';
  // For nouns: extract just the article (e.g. "der") as an extra hint
  const articleHint = word?.partOfSpeech === 'noun'
    ? (word.german.match(/^(der|die|das)\s+/i)?.[1]?.toLowerCase() ?? null)
    : null;

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >

        {/* ── Header: back button + title + round counter ── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onExit}>
            <Text style={styles.backText}>← Games</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Fill in the Blank</Text>
          <Text style={styles.headerProgress}>{currentIndex + 1} / {TOTAL_ROUNDS}</Text>
        </View>

        {/* ── Progress bar ── */}
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${((currentIndex) / TOTAL_ROUNDS) * 100}%` as any },
            ]}
          />
        </View>

        {/* ── Live score counter ── */}
        <Text style={styles.scoreCounter}>{correctCount} correct</Text>

        {/* ── English hint card ── */}
        {word && (
          <View style={styles.hintCard}>
            <Text style={styles.hintLabel}>ENGLISH WORD</Text>
            <Text style={styles.hintWord}>{word.english}</Text>
            {/* For nouns: show the article as a gender hint. The user types just the noun. */}
            {articleHint && (
              <Text style={styles.hintArticle}>
                Article: {articleHint} — type just the noun
              </Text>
            )}
          </View>
        )}

        {/* ── Loading state ── */}
        {phase === 'loading' && (
          <View style={styles.loadingBox}>
            <ActivityIndicator color={colors.accent} size="small" />
            <Text style={styles.loadingText}>Generating sentence...</Text>
          </View>
        )}

        {/* ── Error state (Gemini failed) ── */}
        {phase === 'question' && loadError && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{loadError}</Text>
            <View style={styles.errorActions}>
              <TouchableOpacity style={styles.outlineButton} onPress={loadSentence}>
                <Text style={styles.outlineButtonText}>Try Again</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.outlineButton} onPress={handleSkip}>
                <Text style={styles.outlineButtonText}>Skip</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* ── Question: sentence + text input ── */}
        {phase === 'question' && !loadError && (
          <>
            {/* The German sentence with ___ */}
            <View style={styles.sentenceBox}>
              <Text style={styles.sentenceLabel}>COMPLETE THE SENTENCE</Text>
              <Text style={styles.sentenceText}>{sentence}</Text>
            </View>

            {/* Text input for the user's answer */}
            <Text style={styles.inputLabel}>TYPE THE MISSING WORD</Text>
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              value={userInput}
              onChangeText={setUserInput}
              placeholder="..."
              placeholderTextColor={colors.textMuted}
              autoCapitalize="none"
              autoCorrect={false}
              onSubmitEditing={handleSubmit}
              returnKeyType="done"
            />

            <TouchableOpacity
              style={[styles.primaryButton, !userInput.trim() && styles.buttonDisabled]}
              onPress={handleSubmit}
              disabled={!userInput.trim()}
            >
              <Text style={styles.primaryButtonText}>Submit</Text>
            </TouchableOpacity>
          </>
        )}

        {/* ── Result: correct or wrong feedback ── */}
        {phase === 'result' && (
          <>
            {/* Re-show the sentence for context */}
            <View style={styles.sentenceBox}>
              <Text style={styles.sentenceLabel}>COMPLETE THE SENTENCE</Text>
              <Text style={styles.sentenceText}>{sentence}</Text>
            </View>

            {/* Result banner */}
            <View style={[
              styles.resultBanner,
              isCorrect ? styles.resultBannerCorrect : styles.resultBannerWrong,
            ]}>
              {isCorrect ? (
                <Text style={[styles.resultText, styles.textCorrect]}>
                  Correct — {correctWord}
                </Text>
              ) : (
                <>
                  <Text style={[styles.resultText, styles.textWrong]}>
                    Incorrect
                  </Text>
                  <Text style={styles.resultAnswer}>
                    Correct answer: <Text style={styles.resultAnswerWord}>{correctWord}</Text>
                  </Text>
                  <Text style={styles.resultYours}>
                    You typed: "{userInput}"
                  </Text>
                </>
              )}
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
              <Text style={styles.primaryButtonText}>
                {currentIndex + 1 >= TOTAL_ROUNDS ? 'See Results' : 'Next →'}
              </Text>
            </TouchableOpacity>
          </>
        )}

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  flex: { flex: 1 },

  container: {
    padding: spacing.xxl,
    backgroundColor: colors.background,
    alignItems: 'center',
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 560,
    marginBottom: spacing.md,
  },
  backText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.accent,
  },
  headerTitle: {
    fontFamily: font.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  headerProgress: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.textMuted,
  },

  // ── Progress bar ──
  progressBarBackground: {
    width: '100%',
    maxWidth: 560,
    height: 3,
    backgroundColor: colors.border,
    borderRadius: radius.sm,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: radius.sm,
  },

  // ── Score counter ──
  scoreCounter: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.success,
    alignSelf: 'flex-end',
    width: '100%',
    maxWidth: 560,
    textAlign: 'right',
    marginBottom: spacing.xl,
  },

  // ── English hint card ──
  hintCard: {
    width: '100%',
    maxWidth: 560,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.xl,
    marginBottom: spacing.xxl,
  },
  hintLabel: {
    fontFamily: font.semiBold,
    fontSize: 11,
    letterSpacing: 0.08 * 11,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  hintWord: {
    fontFamily: font.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
  },
  hintArticle: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  // ── Loading ──
  loadingBox: {
    width: '100%',
    maxWidth: 560,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  loadingText: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },

  // ── Error ──
  errorBox: {
    width: '100%',
    maxWidth: 560,
    backgroundColor: colors.errorLight,
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: radius.md,
    padding: spacing.xl,
    marginBottom: spacing.xl,
  },
  errorText: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.error,
    marginBottom: spacing.md,
  },
  errorActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  outlineButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
  },

  // ── Sentence box ──
  sentenceBox: {
    width: '100%',
    maxWidth: 560,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.xl,
    marginBottom: spacing.xxl,
  },
  sentenceLabel: {
    fontFamily: font.semiBold,
    fontSize: 11,
    letterSpacing: 0.08 * 11,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  sentenceText: {
    fontFamily: font.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    lineHeight: 30,
  },

  // ── Text input ──
  inputLabel: {
    fontFamily: font.semiBold,
    fontSize: 11,
    letterSpacing: 0.08 * 11,
    color: colors.textSecondary,
    alignSelf: 'flex-start',
    width: '100%',
    maxWidth: 560,
    marginBottom: spacing.sm,
  },
  textInput: {
    width: '100%',
    maxWidth: 560,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.lg,
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },

  // ── Result banner ──
  resultBanner: {
    width: '100%',
    maxWidth: 560,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.xl,
    marginBottom: spacing.xxl,
  },
  resultBannerCorrect: {
    backgroundColor: colors.successLight,
    borderColor: colors.success,
  },
  resultBannerWrong: {
    backgroundColor: colors.errorLight,
    borderColor: colors.error,
  },
  resultText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    marginBottom: spacing.xs,
  },
  textCorrect: { color: colors.success },
  textWrong:   { color: colors.error },
  resultAnswer: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  resultAnswerWord: {
    fontFamily: font.semiBold,
    color: colors.textPrimary,
  },
  resultYours: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },

  // ── Buttons ──
  primaryButton: {
    backgroundColor: colors.textPrimary,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xxxl,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    minWidth: 160,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.35,
  },
  primaryButtonText: {
    fontFamily: font.semiBold,
    color: colors.surface,
    fontSize: fontSize.md,
  },
  secondaryButtonText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.accent,
  },

  // ── Done screen ──
  doneContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxxl,
    backgroundColor: colors.background,
  },
  doneTitle: {
    fontFamily: font.semiBold,
    fontSize: 11,
    letterSpacing: 0.08 * 11,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
  },
  scoreCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xxxl,
  },
  scorePercentage: {
    fontFamily: font.bold,
    fontSize: fontSize.xxl,
    color: colors.textPrimary,
  },
  scoreDetail: {
    fontFamily: font.regular,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});