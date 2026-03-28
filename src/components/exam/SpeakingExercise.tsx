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
    borderColor: '#fce4ec',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  promptLabel: {
    fontSize: 11,
    color: '#f48fb1',
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

  // ── Record button ──
  recordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  recordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#1a1a2e',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  recordButtonActive: {
    backgroundColor: '#d32f2f',
  },
  recordIcon: {
    fontSize: 18,
  },
  recordButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  recordingStatus: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: '600',
  },
  recordError: {
    fontSize: 13,
    color: '#e65100',
    marginBottom: 12,
    lineHeight: 18,
  },

  // ── Input ──
  orLabel: {
    fontSize: 12,
    color: '#aaaaaa',
    textAlign: 'center',
    marginBottom: 12,
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
  errorText: {
    fontSize: 13,
    color: '#d32f2f',
    marginBottom: 12,
    textAlign: 'center',
  },

  // ── Submit ──
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
    backgroundColor: '#fce4ec',
    borderRadius: 16,
    padding: 20,
    marginBottom: 28,
    borderWidth: 1.5,
    borderColor: '#f48fb1',
  },
  feedbackLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#c2185b',
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
