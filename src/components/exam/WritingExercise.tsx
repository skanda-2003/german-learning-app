// WritingExercise.tsx — Exam Prep: Writing sub-section
//
// Flow:
//   1. A writing prompt is shown (e.g. "Describe your daily routine")
//   2. User types a response in German in the text box
//   3. Tap Submit → Gemini reviews it and gives feedback
//   4. Feedback shown with a "Try Another Prompt" button to start over

import React, { useState } from 'react';
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
import { getWritingFeedback } from '../../lib/gemini';
import useLevelStore from '../../store/useLevelStore';
import { saveCompletion } from '../../lib/scoresService';
import { colors, font, fontSize, spacing, radius } from '../../styles/theme';

// ─── Writing prompts ──────────────────────────────────────────────────────────
// A1-appropriate prompts — simple, personal topics the student can write about
const PROMPTS = [
  'Describe yourself in a few sentences. Include your name, age, job or studies, and where you live.',
  'Write about your daily routine. What do you do in the morning, afternoon, and evening?',
  'Describe your family. How many people are in your family and what are they like?',
  'Write a short message to a friend inviting them to your birthday party.',
  'Describe your hometown or the city where you live.',
  'Write about your favourite food. What is it, and why do you like it?',
  'Describe what you like to do in your free time.',
  'Write about your best friend. Who are they and what do you do together?',
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function WritingExercise() {
  const level = useLevelStore((state) => state.level);

  // The current prompt — picked randomly on mount and on "Try Another"
  const [prompt, setPrompt] = useState<string>(randomPrompt());

  // What the user has typed
  const [userText, setUserText] = useState('');

  // Gemini's feedback — null until submitted
  const [feedback, setFeedback] = useState<string | null>(null);

  // True while waiting for Gemini
  const [isLoading, setIsLoading] = useState(false);

  // Error shown if Gemini fails
  const [error, setError] = useState<string | null>(null);

  // ── Submit ──
  async function handleSubmit() {
    if (!userText.trim()) return;
    setIsLoading(true);
    setError(null);
    setFeedback(null);

    const result = await getWritingFeedback(prompt, userText.trim(), level);

    // getWritingFeedback returns a fallback string on error — check for it
    if (result.startsWith('Sorry,')) {
      setError(result);
    } else {
      setFeedback(result);
      saveCompletion('exam_writing'); // fire and forget
    }
    setIsLoading(false);
  }

  // ── Try another prompt ──
  function handleNewPrompt() {
    setPrompt(randomPrompt());
    setUserText('');
    setFeedback(null);
    setError(null);
  }

  // ─── Feedback screen (after submitting) ───────────────────────────────────
  if (feedback) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {/* What the user wrote */}
        <View style={styles.submittedCard}>
          <Text style={styles.submittedLabel}>YOUR RESPONSE</Text>
          <Text style={styles.submittedText}>{userText}</Text>
        </View>

        {/* Gemini's feedback */}
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackLabel}>✨ AI FEEDBACK</Text>
          <Text style={styles.feedbackText}>{feedback}</Text>
        </View>

        <TouchableOpacity style={styles.primaryButton} onPress={handleNewPrompt}>
          <Text style={styles.primaryButtonText}>Try Another Prompt</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // ─── Writing screen ───────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Prompt card */}
        <View style={styles.promptCard}>
          <Text style={styles.promptLabel}>WRITE ABOUT</Text>
          <Text style={styles.promptText}>{prompt}</Text>
        </View>

        <Text style={styles.inputLabel}>Your response in German:</Text>

        {/* Text input */}
        <TextInput
          style={styles.textInput}
          value={userText}
          onChangeText={setUserText}
          placeholder="Schreibe hier auf Deutsch..."
          placeholderTextColor="#bbbbbb"
          multiline
          textAlignVertical="top"
          autoCorrect={false}
          autoCapitalize="sentences"
        />

        <Text style={styles.charCount}>{userText.length} characters</Text>

        {/* Error */}
        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Submit button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!userText.trim() || isLoading) && styles.submitDisabled,
          ]}
          onPress={handleSubmit}
          disabled={!userText.trim() || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit for Feedback</Text>
          )}
        </TouchableOpacity>

        {isLoading && (
          <Text style={styles.loadingText}>Gemini is reviewing your writing...</Text>
        )}

        {/* Change prompt link */}
        <TouchableOpacity style={styles.changePromptButton} onPress={handleNewPrompt}>
          <Text style={styles.changePromptText}>Try a different prompt</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Helper ───────────────────────────────────────────────────────────────────
function randomPrompt(): string {
  return PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
}

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { padding: spacing.xxl, paddingBottom: 40, backgroundColor: colors.background },

  promptCard: {
    backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border,
    borderRadius: radius.md, padding: spacing.xl, marginBottom: spacing.xxl,
  },
  promptLabel: {
    fontFamily: font.semiBold, fontSize: fontSize.xxs, color: colors.textMuted,
    letterSpacing: 0.9, textTransform: 'uppercase', marginBottom: spacing.md,
  },
  promptText: { fontFamily: font.regular, fontSize: fontSize.md, color: colors.textPrimary, lineHeight: 26 },

  inputLabel: { fontFamily: font.regular, fontSize: fontSize.sm, color: colors.textSecondary, marginBottom: spacing.sm },
  textInput: {
    backgroundColor: colors.background, borderRadius: radius.md, borderWidth: 1,
    borderColor: colors.border, padding: spacing.lg, fontFamily: font.regular,
    fontSize: fontSize.md, color: colors.textPrimary, minHeight: 160, lineHeight: 24,
  },
  charCount: {
    fontFamily: font.regular, fontSize: fontSize.xxs, color: colors.textMuted,
    textAlign: 'right', marginTop: spacing.xs, marginBottom: spacing.xl,
  },

  submitButton: {
    backgroundColor: colors.textPrimary, paddingVertical: spacing.lg,
    borderRadius: radius.md, alignItems: 'center', marginBottom: spacing.sm,
  },
  submitDisabled: { backgroundColor: colors.border },
  submitButtonText: { fontFamily: font.semiBold, color: colors.background, fontSize: fontSize.md },
  loadingText: { fontFamily: font.regular, fontSize: fontSize.sm, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.sm },
  changePromptButton: { alignItems: 'center', paddingVertical: spacing.md },
  changePromptText: { fontFamily: font.semiBold, fontSize: fontSize.sm, color: colors.accent },
  errorText: { fontFamily: font.regular, fontSize: fontSize.sm, color: colors.error, marginBottom: spacing.md, textAlign: 'center' },

  submittedCard: {
    backgroundColor: colors.surfaceAlt, borderRadius: radius.md, padding: spacing.lg,
    marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border,
  },
  submittedLabel: {
    fontFamily: font.semiBold, fontSize: fontSize.xxs, color: colors.textMuted,
    letterSpacing: 0.9, textTransform: 'uppercase', marginBottom: spacing.sm,
  },
  submittedText: { fontFamily: font.regular, fontSize: fontSize.md, color: colors.textSecondary, lineHeight: 22 },

  feedbackCard: {
    backgroundColor: colors.background, borderRadius: radius.md, padding: spacing.xl,
    marginBottom: spacing.xxl, borderWidth: 1, borderColor: colors.border,
  },
  feedbackLabel: {
    fontFamily: font.semiBold, fontSize: fontSize.xxs, color: colors.textMuted,
    letterSpacing: 0.9, textTransform: 'uppercase', marginBottom: spacing.md,
  },
  feedbackText: { fontFamily: font.regular, fontSize: fontSize.md, color: colors.textPrimary, lineHeight: 24 },

  primaryButton: {
    backgroundColor: colors.textPrimary, paddingVertical: spacing.lg,
    borderRadius: radius.md, alignItems: 'center',
  },
  primaryButtonText: { fontFamily: font.semiBold, color: colors.background, fontSize: fontSize.md },
});
