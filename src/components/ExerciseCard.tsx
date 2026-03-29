// ExerciseCard.tsx — Displays a single grammar exercise.
// Handles both exercise types:
//   fill-blank      — sentence with ___, a text input, and a Submit button
//   multiple-choice — question with 4 tappable option buttons
//
// After the user answers:
//   - Shows ✓ (correct) or ✗ (incorrect) with the right answer
//   - Shows the explanation
//   - Shows a Next button to move on

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { GrammarExercise } from '../data/grammar';
import { colors, font, fontSize, spacing, radius } from '../styles/theme';

// ─── Props ─────────────────────────────────────────────────────────────────────
type Props = {
  exercise: GrammarExercise;
  onNext: (wasCorrect: boolean) => void; // called when user taps Next
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ExerciseCard({ exercise, onNext }: Props) {
  // What the user has typed (fill-blank only)
  const [inputValue, setInputValue] = useState('');

  // null = not yet answered | true = correct | false = incorrect
  const [result, setResult] = useState<boolean | null>(null);

  // Which option the user tapped (multiple-choice only)
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Index of the keyboard-highlighted option (multiple-choice only, starts at 0 = option A)
  const [focusedIndex, setFocusedIndex] = useState(0);

  const isAnswered = result !== null;

  // ── Check answer ──
  // Compares user input/selection against the correct answer (case-insensitive, trimmed)
  function checkAnswer(userAnswer: string) {
    const correct =
      userAnswer.trim().toLowerCase() === exercise.answer.trim().toLowerCase();
    setResult(correct);
    setSelectedOption(userAnswer);
  }

  // ── Handle Next ──
  function handleNext() {
    onNext(result === true);
    // Reset local state for the next exercise
    setInputValue('');
    setResult(null);
    setSelectedOption(null);
    setFocusedIndex(0);
  }

  // ── Keyboard navigation (web only) ──
  // Multiple-choice (not yet answered): ArrowUp/Down move the highlight, Enter selects.
  // After answering (both types): Enter advances to the next exercise.
  useEffect(() => {
    const options = exercise.options ?? [];

    function onKeyDown(e: KeyboardEvent) {
      if (isAnswered) {
        if (e.key === 'Enter') handleNext();
        return;
      }

      if (exercise.type === 'multiple-choice') {
        if (e.key === 'ArrowDown') {
          e.preventDefault(); // stop the page from scrolling
          setFocusedIndex((prev) => (prev + 1) % options.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setFocusedIndex((prev) => (prev - 1 + options.length) % options.length);
        } else if (e.key === 'Enter' && options[focusedIndex]) {
          checkAnswer(options[focusedIndex]);
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isAnswered, result, focusedIndex, exercise]);

  // ─── Render fill-blank ───────────────────────────────────────────────────
  if (exercise.type === 'fill-blank') {
    // Split the question on ___ so we can render the blank as an input
    const parts = exercise.question.split('___');

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.card}
      >
        <Text style={styles.topicLabel}>{exercise.topic}</Text>

        {/* Sentence with inline blank */}
        <View style={styles.sentenceRow}>
          <Text style={styles.sentenceText}>{parts[0]}</Text>
          {!isAnswered ? (
            <TextInput
              style={[styles.blankInput, { outline: 'none' } as any]}
              value={inputValue}
              onChangeText={setInputValue}
              placeholder="___"
              placeholderTextColor="#bbbbbb"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus
              returnKeyType="done"
              onSubmitEditing={() => { if (inputValue.trim()) checkAnswer(inputValue); }}
            />
          ) : (
            // After answering, replace input with the correct answer coloured
            <Text
              style={[
                styles.blankAnswer,
                result ? styles.correctText : styles.incorrectText,
              ]}
            >
              {exercise.answer}
            </Text>
          )}
          <Text style={styles.sentenceText}>{parts[1]}</Text>
        </View>

        {/* Submit button — only shown before answering */}
        {!isAnswered && (
          <TouchableOpacity
            style={[styles.submitButton, !inputValue.trim() && styles.submitDisabled]}
            onPress={() => checkAnswer(inputValue)}
            disabled={!inputValue.trim()}
          >
            <Text style={styles.submitButtonText}>Check</Text>
          </TouchableOpacity>
        )}

        {/* Result + explanation — shown after answering */}
        {isAnswered && (
          <ResultBlock
            correct={result!}
            correctAnswer={exercise.answer}
            explanation={exercise.explanation}
            onNext={handleNext}
          />
        )}
      </KeyboardAvoidingView>
    );
  }

  // ─── Render multiple-choice ──────────────────────────────────────────────
  return (
    <View style={styles.card}>
      <Text style={styles.topicLabel}>{exercise.topic}</Text>
      <Text style={styles.questionText}>{exercise.question}</Text>

      {/* Option buttons */}
      <View style={styles.optionsContainer}>
        {exercise.options?.map((option, index) => {
          return (
            <TouchableOpacity
              key={option}
              style={[
                styles.optionButton,
                isAnswered && option === exercise.answer && styles.optionCorrect,
                isAnswered && option === selectedOption && option !== exercise.answer && styles.optionIncorrect,
                !isAnswered && index === focusedIndex && styles.optionFocused,
              ]}
              onPress={() => !isAnswered && checkAnswer(option)}
              disabled={isAnswered}
            >
              <Text
                style={[
                  styles.optionText,
                  !isAnswered && index === focusedIndex && styles.focusedText,
                  isAnswered && option === exercise.answer && styles.correctText,
                  isAnswered && option === selectedOption && option !== exercise.answer && styles.incorrectText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Result + explanation */}
      {isAnswered && (
        <ResultBlock
          correct={result!}
          correctAnswer={exercise.answer}
          explanation={exercise.explanation}
          onNext={handleNext}
        />
      )}
    </View>
  );
}

// ─── ResultBlock ───────────────────────────────────────────────────────────────
// Shared between both exercise types — shown after the user answers.
type ResultBlockProps = {
  correct: boolean;
  correctAnswer: string;
  explanation: string;
  onNext: () => void;
};

function ResultBlock({ correct, correctAnswer, explanation, onNext }: ResultBlockProps) {
  return (
    <View style={[styles.resultBlock, correct ? styles.resultCorrect : styles.resultIncorrect]}>
      {/* ✓ or ✗ verdict */}
      <Text style={[styles.resultVerdict, correct ? styles.correctText : styles.incorrectText]}>
        {correct ? '✓ Correct!' : `✗ The answer is: ${correctAnswer}`}
      </Text>

      {/* Grammar explanation */}
      <Text style={styles.explanationText}>{explanation}</Text>

      {/* Next button */}
      <TouchableOpacity style={styles.nextButton} onPress={onNext}>
        <Text style={styles.nextButtonText}>Next →</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.xxl,
    width: '100%',
    maxWidth: 480,
  },

  topicLabel: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xxs,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.9,
    marginBottom: spacing.lg,
  },

  // ── Fill-blank ──
  sentenceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: spacing.xl,
    gap: 4,
  },
  sentenceText: {
    fontFamily: font.regular,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  blankInput: {
    borderBottomWidth: 1,
    borderBottomColor: colors.accent,
    minWidth: 80,
    fontFamily: font.regular,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    paddingHorizontal: 4,
    paddingBottom: 2,
    textAlign: 'center',
  },
  blankAnswer: {
    fontFamily: font.bold,
    fontSize: fontSize.lg,
    paddingHorizontal: 4,
  },

  // ── Submit button ──
  submitButton: {
    backgroundColor: colors.textPrimary,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: 4,
  },
  submitDisabled: {
    backgroundColor: colors.border,
  },
  submitButtonText: {
    fontFamily: font.semiBold,
    color: colors.background,
    fontSize: fontSize.md,
  },

  // ── Multiple choice ──
  questionText: {
    fontFamily: font.regular,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    marginBottom: spacing.xl,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: spacing.sm,
    marginBottom: 4,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.background,
  },
  optionFocused: {
    borderColor: colors.accent,
    backgroundColor: colors.accentLight,
  },
  optionCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.successLight,
  },
  optionIncorrect: {
    borderColor: colors.error,
    backgroundColor: colors.errorLight,
  },
  optionText: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  focusedText: {
    fontFamily: font.semiBold,
    color: colors.accent,
  },

  // ── Result block ──
  resultBlock: {
    marginTop: spacing.lg,
    padding: spacing.lg,
    borderRadius: radius.md,
    borderWidth: 1,
    gap: spacing.sm,
  },
  resultCorrect: {
    backgroundColor: colors.successLight,
    borderColor: colors.success,
  },
  resultIncorrect: {
    backgroundColor: colors.errorLight,
    borderColor: colors.error,
  },
  resultVerdict: {
    fontFamily: font.bold,
    fontSize: fontSize.md,
  },
  explanationText: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 19,
  },
  nextButton: {
    alignSelf: 'flex-end',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.textPrimary,
    borderRadius: radius.md,
    marginTop: 4,
  },
  nextButtonText: {
    fontFamily: font.semiBold,
    color: colors.background,
    fontSize: fontSize.sm,
  },

  // ── Shared ──
  correctText: {
    color: colors.success,
  },
  incorrectText: {
    color: colors.error,
  },
});
