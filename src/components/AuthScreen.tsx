// AuthScreen.tsx — Login and Sign Up screen (Phase 15)
//
// Shown by _layout.tsx whenever there is no active Supabase session.
// Design: Data-Forward Minimalism — same style as the rest of the app.
//   - #fafafa background, white card, 1px #e0e0e0 border, 4px radius
//   - IBM Plex Mono for form content, Inter for wordmark
//   - LOG IN / SIGN UP tab toggle at top of card
//   - ALL CAPS field labels, standard input style
//   - Solid dark primary button
//
// Note on email confirmation:
//   By default Supabase requires users to click a confirmation link before
//   they can log in. For personal use, disable this in the Supabase dashboard:
//   Authentication → Providers → Email → uncheck "Confirm email".

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { signIn, signUp } from '../lib/authService';
import { colors, font, fontSize, spacing, radius } from '../styles/theme';

// ─── Types ─────────────────────────────────────────────────────────────────────

type Mode = 'login' | 'signup';

// ─── Component ─────────────────────────────────────────────────────────────────

export default function AuthScreen() {
  const [mode, setMode]                       = useState<Mode>('login');
  const [email, setEmail]                     = useState('');
  const [password, setPassword]               = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading]                 = useState(false);

  // error is red; if it starts with the success prefix it renders green
  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

  // Switch mode and clear state
  function switchMode(next: Mode) {
    setMode(next);
    setMessage(null);
    setConfirmPassword('');
  }

  async function handleSubmit() {
    setMessage(null);

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setMessage({ text: 'Email and password are required.', isError: true });
      return;
    }
    if (mode === 'signup' && password !== confirmPassword) {
      setMessage({ text: 'Passwords do not match.', isError: true });
      return;
    }
    if (password.length < 6) {
      setMessage({ text: 'Password must be at least 6 characters.', isError: true });
      return;
    }

    setLoading(true);

    if (mode === 'login') {
      const { error } = await signIn(email.trim(), password);
      if (error) {
        setMessage({ text: error.message, isError: true });
      }
      // On success, _layout.tsx catches the session via onAuthStateChange
      // and automatically replaces this screen with the main app.
    } else {
      const { data, error } = await signUp(email.trim(), password);
      if (error) {
        setMessage({ text: error.message, isError: true });
      } else if (!data.session) {
        // Email confirmation is enabled — user must click the link first
        setMessage({
          text: 'Account created. Check your email to confirm, then log in.',
          isError: false,
        });
        switchMode('login');
      }
      // If data.session exists, email confirmation is disabled and the user is
      // already logged in — onAuthStateChange handles the rest.
    }

    setLoading(false);
  }

  // ─── Render ───────────────────────────────────────────────────────────────────

  return (
    <KeyboardAvoidingView
      style={styles.outer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >

        {/* ── Wordmark ── */}
        <Text style={styles.wordmark}>LERNE DEUTSCH</Text>
        <Text style={styles.tagline}>German language learning</Text>

        {/* ── Card ── */}
        <View style={styles.card}>

          {/* Tab toggle: LOG IN / SIGN UP */}
          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tab, mode === 'login' && styles.tabActive]}
              onPress={() => switchMode('login')}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, mode === 'login' && styles.tabTextActive]}>
                LOG IN
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, mode === 'signup' && styles.tabActive]}
              onPress={() => switchMode('signup')}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, mode === 'signup' && styles.tabTextActive]}>
                SIGN UP
              </Text>
            </TouchableOpacity>
          </View>

          {/* Separator below tabs */}
          <View style={styles.tabDivider} />

          {/* Form */}
          <View style={styles.form}>

            {/* Email */}
            <Text style={styles.fieldLabel}>EMAIL</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="none"
              keyboardType="email-address"
              autoCorrect={false}
              autoComplete="email"
            />

            {/* Password */}
            <Text style={styles.fieldLabel}>PASSWORD</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor={colors.textMuted}
              secureTextEntry
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />

            {/* Confirm password — only shown for sign up */}
            {mode === 'signup' && (
              <>
                <Text style={styles.fieldLabel}>CONFIRM PASSWORD</Text>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="••••••••"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry
                  autoComplete="new-password"
                />
              </>
            )}

            {/* Message (error or success) */}
            {message && (
              <Text style={[styles.messageText, !message.isError && styles.successText]}>
                {message.text}
              </Text>
            )}

            {/* Submit button */}
            <TouchableOpacity
              style={[styles.submitButton, loading && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.surface} />
              ) : (
                <Text style={styles.submitButtonText}>
                  {mode === 'login' ? 'Log In' : 'Create Account'}
                </Text>
              )}
            </TouchableOpacity>

          </View>
        </View>

        {/* ── Footer toggle ── */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {mode === 'login' ? 'No account? ' : 'Already have an account? '}
          </Text>
          <TouchableOpacity onPress={() => switchMode(mode === 'login' ? 'signup' : 'login')}>
            <Text style={styles.footerLink}>
              {mode === 'login' ? 'Sign up' : 'Log in'}
            </Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ─── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({

  outer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    paddingVertical: spacing.hero,
  },

  // ── Wordmark ──
  wordmark: {
    fontFamily:    'Inter_600SemiBold',
    fontSize:      11,
    letterSpacing: 2.4,
    color:         colors.textPrimary,
    marginBottom:  spacing.xs,
    textAlign:     'center',
  },
  tagline: {
    fontFamily:   font.regular,
    fontSize:     fontSize.sm,
    color:        colors.textSecondary,
    marginBottom: spacing.xxxl,
    textAlign:    'center',
  },

  // ── Card ──
  card: {
    backgroundColor: colors.surface,
    borderWidth:     1,
    borderColor:     colors.border,
    borderRadius:    radius.md,
    width:           '100%',
    maxWidth:        420,
    overflow:        'hidden',
  },

  // ── Tabs ──
  tabRow: {
    flexDirection: 'row',
  },
  tab: {
    flex:              1,
    paddingVertical:   spacing.lg,
    alignItems:        'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: colors.textPrimary,
  },
  tabText: {
    fontFamily:    font.semiBold,
    fontSize:      fontSize.xs,
    letterSpacing: 0.9,
    color:         colors.textMuted,
  },
  tabTextActive: {
    color: colors.textPrimary,
  },
  tabDivider: {
    height:          1,
    backgroundColor: colors.border,
  },

  // ── Form ──
  form: {
    padding:    spacing.xxl,
    paddingTop: spacing.xl,
  },
  fieldLabel: {
    fontFamily:    font.semiBold,
    fontSize:      fontSize.xs,
    letterSpacing: 0.9,
    color:         colors.textSecondary,
    marginBottom:  spacing.xs,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor:  colors.background,
    borderWidth:      1,
    borderColor:      colors.border,
    borderRadius:     radius.md,
    paddingVertical:  spacing.md,
    paddingHorizontal: spacing.lg,
    fontFamily:       font.regular,
    fontSize:         fontSize.md,
    color:            colors.textPrimary,
    marginBottom:     spacing.lg,
  },

  // ── Messages ──
  messageText: {
    fontFamily:   font.regular,
    fontSize:     fontSize.sm,
    color:        colors.error,
    marginBottom: spacing.lg,
    lineHeight:   20,
  },
  successText: {
    color: colors.success,
  },

  // ── Submit button ──
  submitButton: {
    backgroundColor: colors.textPrimary,
    borderRadius:    radius.md,
    paddingVertical: spacing.lg,
    alignItems:      'center',
    marginTop:       spacing.xs,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontFamily: font.semiBold,
    fontSize:   fontSize.md,
    color:      colors.surface,
  },

  // ── Footer toggle ──
  footer: {
    flexDirection: 'row',
    marginTop:     spacing.xl,
    alignItems:    'center',
  },
  footerText: {
    fontFamily: font.regular,
    fontSize:   fontSize.sm,
    color:      colors.textSecondary,
  },
  footerLink: {
    fontFamily: font.semiBold,
    fontSize:   fontSize.sm,
    color:      colors.accent,
  },

});