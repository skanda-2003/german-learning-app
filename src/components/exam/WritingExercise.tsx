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
  container: {
    padding: 24,
    paddingBottom: 40,
  },

  // ── Prompt ──
  promptCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: '#e3f2fd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  promptLabel: {
    fontSize: 11,
    color: '#4fc3f7',
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 10,
  },
  promptText: {
    fontSize: 17,
    color: '#1a1a2e',
    lineHeight: 26,
    fontWeight: '500',
  },

  // ── Input ──
  inputLabel: {
    fontSize: 13,
    color: '#888888',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#dddddd',
    padding: 16,
    fontSize: 16,
    color: '#1a1a2e',
    minHeight: 160,
    lineHeight: 24,
  },
  charCount: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'right',
    marginTop: 6,
    marginBottom: 20,
  },

  // ── Buttons ──
  submitButton: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  submitDisabled: {
    backgroundColor: '#cccccc',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    fontSize: 13,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 8,
  },
  changePromptButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  changePromptText: {
    fontSize: 14,
    color: '#4fc3f7',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 13,
    color: '#d32f2f',
    marginBottom: 12,
    textAlign: 'center',
  },

  // ── Feedback screen ──
  submittedCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  submittedLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#aaaaaa',
    letterSpacing: 1,
    marginBottom: 8,
  },
  submittedText: {
    fontSize: 15,
    color: '#444444',
    lineHeight: 22,
  },
  feedbackCard: {
    backgroundColor: '#f3e5f5',
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1.5,
    borderColor: '#ce93d8',
  },
  feedbackLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8e24aa',
    letterSpacing: 1,
    marginBottom: 10,
  },
  feedbackText: {
    fontSize: 15,
    color: '#1a1a2e',
    lineHeight: 24,
  },
  primaryButton: {
    backgroundColor: '#1a1a2e',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
