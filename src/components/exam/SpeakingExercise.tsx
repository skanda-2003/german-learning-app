// SpeakingExercise.tsx — Exam Prep: Speaking sub-section
//
// Flow:
//   1. A speaking prompt is shown (e.g. "Introduce yourself")
//   2. User either:
//      a) Taps "Record" — browser speech-to-text transcribes what they say (de-DE)
//      b) Types directly into the text box (fallback if mic not available)
//   3. Tap Submit → Gemini evaluates the response and gives feedback
//   4. Feedback shown with a "Try Another Prompt" button

import React, { useState, useRef } from 'react';
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
import { getSpeakingFeedback } from '../../lib/gemini';
import useLevelStore from '../../store/useLevelStore';
import { saveCompletion } from '../../lib/scoresService';
import { colors, font, fontSize, spacing, radius } from '../../styles/theme';

// ─── Speaking prompts ─────────────────────────────────────────────────────────
// A1-appropriate prompts — conversational, short answers expected
const PROMPTS = [
  'Introduce yourself. Say your name, where you are from, and what you do.',
  'Describe your home. How many rooms does it have and what do you like about it?',
  'Talk about your hobbies. What do you enjoy doing and how often?',
  'Describe a typical weekend for you.',
  'Talk about your favourite season and explain why you like it.',
  'Describe what you are wearing today.',
  'Tell me about a food you like and how to prepare it.',
  'Describe someone in your family.',
];

// ─── SpeechRecognition types ──────────────────────────────────────────────────
// The Web Speech API is not in the standard TypeScript DOM types,
// so we declare the shape we need here to avoid compiler errors.
type SpeechRecognitionEvent = {
  results: { [key: number]: { [key: number]: { transcript: string } } };
};

type SpeechRecognitionInstance = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: { error: string }) => void;
  onend: () => void;
};

// ─── Helper: create a SpeechRecognition instance ──────────────────────────────
function createRecognition(): SpeechRecognitionInstance | null {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return null;

  // Chrome uses webkitSpeechRecognition, others use SpeechRecognition
  const SR =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  if (!SR) return null;

  const recognition = new SR() as SpeechRecognitionInstance;
  recognition.lang = 'de-DE';       // listen for German
  recognition.continuous = false;   // stop after one sentence
  recognition.interimResults = false;
  return recognition;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function SpeakingExercise() {
  const level = useLevelStore((state) => state.level);

  const [prompt, setPrompt] = useState<string>(randomPrompt());
  const [userText, setUserText] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordError, setRecordError] = useState<string | null>(null);

  // Keep a ref to the recognition instance so we can stop it
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const micAvailable =
    Platform.OS === 'web' &&
    typeof window !== 'undefined' &&
    !!(
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition
    );

  // ── Start recording ──
  function handleRecord() {
    setRecordError(null);
    const recognition = createRecognition();
    if (!recognition) {
      setRecordError('Speech recognition is not supported in this browser. Please type your response.');
      return;
    }

    recognitionRef.current = recognition;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      // Append the transcript to whatever the user has already typed
      const transcript = event.results[0][0].transcript;
      setUserText((prev) => (prev ? prev + ' ' + transcript : transcript));
    };

    recognition.onerror = (event: { error: string }) => {
      setRecordError(`Microphone error: ${event.error}. Please type your response instead.`);
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    setIsRecording(true);
  }

  // ── Stop recording ──
  function handleStopRecording() {
    recognitionRef.current?.stop();
    setIsRecording(false);
  }

  // ── Submit ──
  async function handleSubmit() {
    if (!userText.trim()) return;
    setIsLoading(true);
    setError(null);
    setFeedback(null);

    const result = await getSpeakingFeedback(prompt, userText.trim(), level);

    if (result.startsWith('Sorry,')) {
      setError(result);
    } else {
      setFeedback(result);
      saveCompletion('exam_speaking'); // fire and forget
    }
    setIsLoading(false);
  }

  // ── New prompt ──
  function handleNewPrompt() {
    recognitionRef.current?.stop();
    setPrompt(randomPrompt());
    setUserText('');
    setFeedback(null);
    setError(null);
    setRecordError(null);
    setIsRecording(false);
  }

  // ─── Feedback screen ──────────────────────────────────────────────────────
  if (feedback) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.submittedCard}>
          <Text style={styles.submittedLabel}>WHAT YOU SAID</Text>
          <Text style={styles.submittedText}>{userText}</Text>
        </View>

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

  // ─── Speaking screen ──────────────────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* Prompt card */}
        <View style={styles.promptCard}>
          <Text style={styles.promptLabel}>SPEAK ABOUT</Text>
          <Text style={styles.promptText}>{prompt}</Text>
        </View>

        {/* Record button — only shown if browser supports it */}
        {micAvailable && (
          <View style={styles.recordRow}>
            <TouchableOpacity
              style={[styles.recordButton, isRecording && styles.recordButtonActive]}
              onPress={isRecording ? handleStopRecording : handleRecord}
            >
              <Text style={styles.recordIcon}>{isRecording ? '⏹' : '🎤'}</Text>
              <Text style={styles.recordButtonText}>
                {isRecording ? 'Stop Recording' : 'Record'}
              </Text>
            </TouchableOpacity>
            {isRecording && (
              <Text style={styles.recordingStatus}>Listening...</Text>
            )}
          </View>
        )}

        {/* Mic error */}
        {recordError && (
          <Text style={styles.recordError}>{recordError}</Text>
        )}

        {/* Divider between record and type */}
        <Text style={styles.orLabel}>
          {micAvailable ? '— or type your response —' : 'Type your response in German:'}
        </Text>

        {/* Text input */}
        <TextInput
          style={styles.textInput}
          value={userText}
          onChangeText={setUserText}
          placeholder="Schreibe oder diktiere hier auf Deutsch..."
          placeholderTextColor="#bbbbbb"
          multiline
          textAlignVertical="top"
          autoCorrect={false}
          autoCapitalize="sentences"
        />

        <Text style={styles.charCount}>{userText.length} characters</Text>

        {error && <Text style={styles.errorText}>{error}</Text>}

        {/* Submit */}
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
          <Text style={styles.loadingText}>Gemini is evaluating your response...</Text>
        )}

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

  recordRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.lg, marginBottom: spacing.lg },
  recordButton: {
    flexDirection: 'row', alignItems: 'center', gap: spacing.sm,
    backgroundColor: colors.textPrimary, paddingVertical: spacing.md,
    paddingHorizontal: spacing.xxl, borderRadius: radius.md,
  },
  recordButtonActive: { backgroundColor: colors.error },
  recordIcon: { fontSize: 16 },
  recordButtonText: { fontFamily: font.semiBold, color: colors.background, fontSize: fontSize.md },
  recordingStatus: { fontFamily: font.semiBold, fontSize: fontSize.sm, color: colors.error },
  recordError: { fontFamily: font.regular, fontSize: fontSize.sm, color: colors.error, marginBottom: spacing.md, lineHeight: 18 },

  orLabel: { fontFamily: font.regular, fontSize: fontSize.xs, color: colors.textMuted, textAlign: 'center', marginBottom: spacing.md },
  textInput: {
    backgroundColor: colors.background, borderRadius: radius.md, borderWidth: 1,
    borderColor: colors.border, padding: spacing.lg, fontFamily: font.regular,
    fontSize: fontSize.md, color: colors.textPrimary, minHeight: 160, lineHeight: 24,
  },
  charCount: {
    fontFamily: font.regular, fontSize: fontSize.xxs, color: colors.textMuted,
    textAlign: 'right', marginTop: spacing.xs, marginBottom: spacing.xl,
  },
  errorText: { fontFamily: font.regular, fontSize: fontSize.sm, color: colors.error, marginBottom: spacing.md, textAlign: 'center' },

  submitButton: {
    backgroundColor: colors.textPrimary, paddingVertical: spacing.lg,
    borderRadius: radius.md, alignItems: 'center', marginBottom: spacing.sm,
  },
  submitDisabled: { backgroundColor: colors.border },
  submitButtonText: { fontFamily: font.semiBold, color: colors.background, fontSize: fontSize.md },
  loadingText: { fontFamily: font.regular, fontSize: fontSize.sm, color: colors.textSecondary, textAlign: 'center', marginBottom: spacing.sm },
  changePromptButton: { alignItems: 'center', paddingVertical: spacing.md },
  changePromptText: { fontFamily: font.semiBold, fontSize: fontSize.sm, color: colors.accent },

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

  primaryButton: { backgroundColor: colors.textPrimary, paddingVertical: spacing.lg, borderRadius: radius.md, alignItems: 'center' },
  primaryButtonText: { fontFamily: font.semiBold, color: colors.background, fontSize: fontSize.md },
});
