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
          // Determine button style based on state
          let optionStyle = styles.optionButton;
          if (isAnswered) {
            if (option === exercise.answer) {
              optionStyle = { ...styles.optionButton, ...styles.optionCorrect };
            } else if (option === selectedOption && option !== exercise.answer) {
              optionStyle = { ...styles.optionButton, ...styles.optionIncorrect };
            }
          } else if (index === focusedIndex) {
            // Keyboard highlight — blue outline when this option is focused
            optionStyle = { ...styles.optionButton, ...styles.optionFocused };
          }

          return (
            <TouchableOpacity
              key={option}
              style={optionStyle}
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
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 480,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  topicLabel: {
    fontSize: 11,
    color: '#4fc3f7',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 16,
  },

  // ── Fill-blank ──
  sentenceRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 20,
    gap: 4,
  },
  sentenceText: {
    fontSize: 18,
    color: '#1a1a2e',
  },
  blankInput: {
    borderBottomWidth: 2,
    borderBottomColor: '#4fc3f7',
    minWidth: 80,
    fontSize: 18,
    color: '#1a1a2e',
    paddingHorizontal: 4,
    paddingBottom: 2,
    textAlign: 'center',
  },
  blankAnswer: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },

  // ── Submit button ──
  submitButton: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 4,
  },
  submitDisabled: {
    backgroundColor: '#cccccc',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },

  // ── Multiple choice ──
  questionText: {
    fontSize: 18,
    color: '#1a1a2e',
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    gap: 10,
    marginBottom: 4,
  },
  optionButton: {
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fafafa',
  },
  optionFocused: {
    borderColor: '#4fc3f7',
    backgroundColor: '#e1f5fe',
  },
  optionCorrect: {
    borderColor: '#a5d6a7',
    backgroundColor: '#e8f5e9',
  },
  optionIncorrect: {
    borderColor: '#ef9a9a',
    backgroundColor: '#ffebee',
  },
  optionText: {
    fontSize: 15,
    color: '#1a1a2e',
  },
  focusedText: {
    color: '#0277bd',
    fontWeight: '600',
  },

  // ── Result block ──
  resultBlock: {
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  resultCorrect: {
    backgroundColor: '#e8f5e9',
  },
  resultIncorrect: {
    backgroundColor: '#ffebee',
  },
  resultVerdict: {
    fontSize: 15,
    fontWeight: '700',
  },
  explanationText: {
    fontSize: 13,
    color: '#555555',
    lineHeight: 19,
  },
  nextButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#1a1a2e',
    borderRadius: 8,
    marginTop: 4,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },

  // ── Shared ──
  correctText: {
    color: '#388e3c',
  },
  incorrectText: {
    color: '#d32f2f',
  },
});
