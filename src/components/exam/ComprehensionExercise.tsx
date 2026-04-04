// ComprehensionExercise.tsx — Exam Prep: Comprehension
//
// Flow:
//   1. Show a static German text (notice, ad, message, etc.) for the current level
//   2. Show open tasks — user writes answers in German
//   3. Submit → Gemini returns structured feedback (understanding, language, suggestions)
//   4. "New text" picks another item from the pool

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { getComprehensionFeedback, type ComprehensionFeedback } from '../../lib/gemini';
import useLevelStore, { type Level } from '../../store/useLevelStore';
import { saveCompletion } from '../../lib/scoresService';
import { COMPREHENSION_BY_LEVEL, type ComprehensionItem } from '../../data/examComprehension';
import { colors, font, fontSize, spacing, radius } from '../../styles/theme';

function pickRandomItem(pool: ComprehensionItem[]): ComprehensionItem {
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function ComprehensionExercise() {
  const level = useLevelStore((state) => state.level);
  const pool = COMPREHENSION_BY_LEVEL[level];

  const [item, setItem] = useState<ComprehensionItem | null>(() =>
    pool.length > 0 ? pickRandomItem(pool) : null
  );

  const [userText, setUserText] = useState('');
  const [feedback, setFeedback] = useState<ComprehensionFeedback | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const prevLevelRef = useRef<Level | null>(null);
  useEffect(() => {
    if (prevLevelRef.current === null) {
      prevLevelRef.current = level;
      return;
    }
    if (prevLevelRef.current === level) return;
    prevLevelRef.current = level;

    const p = COMPREHENSION_BY_LEVEL[level];
    if (p.length > 0) {
      setItem(pickRandomItem(p));
    } else {
      setItem(null);
    }
    setUserText('');
    setFeedback(null);
    setError(null);
  }, [level]);

  async function handleSubmit() {
    if (!item || !userText.trim()) return;
    setIsLoading(true);
    setError(null);
    setFeedback(null);

    const result = await getComprehensionFeedback(
      item.title,
      item.textDe,
      item.tasks,
      userText.trim(),
      level
    );

    if (result.understanding.startsWith('Sorry,')) {
      setError(result.understanding);
    } else {
      setFeedback(result);
      saveCompletion('exam_comprehension');
    }
    setIsLoading(false);
  }

  function handleNewText() {
    if (pool.length === 0) return;
    setItem(pickRandomItem(pool));
    setUserText('');
    setFeedback(null);
    setError(null);
  }

  if (pool.length === 0) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyTitle}>Comprehension</Text>
        <Text style={styles.emptyBody}>
          Texts for {level} are not available yet. Switch to A1 or A2 to practise
          newspaper-style and real-world German texts.
        </Text>
      </View>
    );
  }

  if (!item) {
    return null;
  }

  if (feedback) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.submittedCard}>
          <Text style={styles.blockLabel}>YOUR RESPONSE</Text>
          <Text style={styles.submittedText}>{userText}</Text>
        </View>

        <View style={styles.feedbackBlock}>
          <Text style={styles.blockLabel}>CONTENT AND TASKS</Text>
          <Text style={styles.feedbackBody}>{feedback.understanding}</Text>
        </View>

        {feedback.language ? (
          <View style={styles.feedbackBlock}>
            <Text style={styles.blockLabel}>GERMAN LANGUAGE</Text>
            <Text style={styles.feedbackBody}>{feedback.language}</Text>
          </View>
        ) : null}

        {feedback.suggestions ? (
          <View style={styles.feedbackBlock}>
            <Text style={styles.blockLabel}>SUGGESTIONS</Text>
            <Text style={styles.feedbackBody}>{feedback.suggestions}</Text>
          </View>
        ) : null}

        <TouchableOpacity style={styles.primaryButton} onPress={handleNewText}>
          <Text style={styles.primaryButtonText}>New text</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.flexOne}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.metaRow}>
          <Text style={styles.formatPill}>{item.formatLabel}</Text>
        </View>

        <View style={styles.textCard}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.passageText}>{item.textDe}</Text>
        </View>

        <Text style={styles.tasksHeading}>Your tasks</Text>
        {item.tasks.map((t, i) => (
          <Text key={i} style={styles.taskLine}>
            {i + 1}. {t}
          </Text>
        ))}

        <Text style={styles.inputLabel}>Your answers in German:</Text>
        <TextInput
          style={styles.textInput}
          value={userText}
          onChangeText={setUserText}
          placeholder="Schreibe hier deine Antworten auf Deutsch..."
          placeholderTextColor={colors.textMuted}
          multiline
          textAlignVertical="top"
          autoCorrect={false}
          autoCapitalize="sentences"
        />

        <Text style={styles.charCount}>{userText.length} characters</Text>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={[styles.submitButton, (!userText.trim() || isLoading) && styles.submitDisabled]}
          onPress={handleSubmit}
          disabled={!userText.trim() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.background} />
          ) : (
            <Text style={styles.submitButtonText}>Submit for feedback</Text>
          )}
        </TouchableOpacity>

        {isLoading ? (
          <Text style={styles.loadingText}>Gemini is reviewing your answers...</Text>
        ) : null}

        <TouchableOpacity style={styles.secondaryLink} onPress={handleNewText}>
          <Text style={styles.secondaryLinkText}>Different text</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flexOne: { flex: 1 },
  container: {
    padding: spacing.xxl,
    paddingBottom: 40,
    backgroundColor: colors.background,
  },

  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xxxl,
    backgroundColor: colors.background,
  },
  emptyTitle: {
    fontFamily: font.bold,
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  emptyBody: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    lineHeight: 22,
  },

  metaRow: { marginBottom: spacing.sm },
  formatPill: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xxs,
    color: colors.textSecondary,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },

  textCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.xl,
    marginBottom: spacing.xxl,
  },
  titleText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  passageText: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    lineHeight: 26,
  },

  tasksHeading: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xs,
    color: colors.textMuted,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  taskLine: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textPrimary,
    lineHeight: 22,
    marginBottom: spacing.sm,
  },

  inputLabel: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  textInput: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    minHeight: 180,
    lineHeight: 24,
  },
  charCount: {
    fontFamily: font.regular,
    fontSize: fontSize.xxs,
    color: colors.textMuted,
    textAlign: 'right',
    marginTop: spacing.xs,
    marginBottom: spacing.xl,
  },

  submitButton: {
    backgroundColor: colors.textPrimary,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  submitDisabled: { backgroundColor: colors.border },
  submitButtonText: {
    fontFamily: font.semiBold,
    color: colors.background,
    fontSize: fontSize.md,
  },
  loadingText: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  secondaryLink: { alignItems: 'center', paddingVertical: spacing.md },
  secondaryLinkText: {
    fontFamily: font.semiBold,
    fontSize: fontSize.sm,
    color: colors.accent,
  },
  errorText: {
    fontFamily: font.regular,
    fontSize: fontSize.sm,
    color: colors.error,
    marginBottom: spacing.md,
    textAlign: 'center',
  },

  submittedCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  blockLabel: {
    fontFamily: font.semiBold,
    fontSize: fontSize.xxs,
    color: colors.textMuted,
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    marginBottom: spacing.sm,
  },
  submittedText: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },

  feedbackBlock: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.xl,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  feedbackBody: {
    fontFamily: font.regular,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    lineHeight: 24,
  },

  primaryButton: {
    backgroundColor: colors.textPrimary,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontFamily: font.semiBold,
    color: colors.background,
    fontSize: fontSize.md,
  },
});
