// theme.ts — Design system constants for Lerne Deutsch
//
// Aesthetic: sharp, technical, data-forward — inspired by Coach Phelps HQ
// Font: IBM Plex Mono (monospace throughout)
// Background: pure white, no gradients, no shadows
// Cards: 1px border, 4px radius, flat

import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

// ─── Colors ────────────────────────────────────────────────────────────────────

export const colors = {
  // Backgrounds
  background:     '#ffffff',  // page background — pure white
  surface:        '#ffffff',  // card background
  surfaceAlt:     '#f9f9f9',  // slightly off-white for nested surfaces

  // Borders
  border:         '#e0e0e0',  // standard card / input border
  borderStrong:   '#bbbbbb',  // stronger border for focused inputs

  // Text
  textPrimary:    '#111111',  // headings, body
  textSecondary:  '#888888',  // labels, hints, secondary info
  textMuted:      '#aaaaaa',  // placeholders, disabled

  // Accent
  accent:         '#2563eb',  // blue — interactive, selected state
  accentLight:    '#eff6ff',  // blue tint background

  // Status
  success:        '#16a34a',  // correct answer, streak
  successLight:   '#f0fdf4',  // green tint background
  error:          '#dc2626',  // wrong answer, error
  errorLight:     '#fef2f2',  // red tint background

  // Sidebar (keep as-is per brief)
  sidebar:        '#1a1a2e',
  sidebarText:    '#ffffff',
} as const;

// ─── Typography ────────────────────────────────────────────────────────────────

export const font = {
  // IBM Plex Mono weight names (as loaded by @expo-google-fonts/ibm-plex-mono)
  regular:        'IBMPlexMono_400Regular',
  medium:         'IBMPlexMono_500Medium',
  semiBold:       'IBMPlexMono_600SemiBold',
  bold:           'IBMPlexMono_700Bold',
} as const;

export const fontSize = {
  xxs:  10,   // micro labels
  xs:   11,   // ALL CAPS labels (letter-spacing 0.08em)
  sm:   13,   // secondary body, hints
  md:   15,   // primary body
  lg:   17,   // card titles, prompts
  xl:   20,   // section headings
  xxl:  28,   // big numbers, stats
  xxxl: 36,   // hero numbers
} as const;

// ─── Spacing ───────────────────────────────────────────────────────────────────

export const spacing = {
  xs:   4,
  sm:   8,
  md:   12,
  lg:   16,
  xl:   20,
  xxl:  24,
  xxxl: 32,
  hero: 48,
} as const;

// ─── Border radius ─────────────────────────────────────────────────────────────

export const radius = {
  sm:  2,
  md:  4,   // standard card radius
  lg:  8,
  xl:  12,
} as const;

// ─── Pre-built style objects ───────────────────────────────────────────────────
// Use these directly in component styles for consistency.

// Standard card: white bg, 1px border, 4px radius, 20-24px padding
export const cardStyle: ViewStyle = {
  backgroundColor:  colors.surface,
  borderWidth:      1,
  borderColor:      colors.border,
  borderRadius:     radius.md,
  padding:          spacing.xxl,  // 24px
};

// ALL CAPS label — 11px, letter-spacing, secondary color
export const labelStyle: TextStyle = {
  fontFamily:     font.semiBold,
  fontSize:       fontSize.xs,
  color:          colors.textSecondary,
  letterSpacing:  0.9,              // ~0.08em at 11px
  textTransform:  'uppercase',
};

// Primary button — dark fill, mono font
export const primaryButtonStyle: ViewStyle = {
  backgroundColor:  colors.sidebar,   // #1a1a2e
  borderRadius:     radius.md,
  paddingVertical:  spacing.lg,       // 16px
  paddingHorizontal: spacing.xxxl,    // 32px
  alignItems:       'center',
  justifyContent:   'center',
};

// Secondary button — outlined, no fill
export const secondaryButtonStyle: ViewStyle = {
  backgroundColor:  'transparent',
  borderWidth:      1,
  borderColor:      colors.border,
  borderRadius:     radius.md,
  paddingVertical:  spacing.lg,
  paddingHorizontal: spacing.xxxl,
  alignItems:       'center',
  justifyContent:   'center',
};

// Ghost button — no border, just text (used for back/skip links)
export const ghostButtonStyle: ViewStyle = {
  backgroundColor:  'transparent',
  paddingVertical:  spacing.sm,
  paddingHorizontal: spacing.sm,
};

// Input field — white, 1px border, 4px radius
export const inputStyle: TextStyle = {
  backgroundColor:  colors.surface,
  borderWidth:      1,
  borderColor:      colors.border,
  borderRadius:     radius.md,
  paddingVertical:  spacing.md,
  paddingHorizontal: spacing.lg,
  fontSize:         fontSize.md,
  color:            colors.textPrimary,
  fontFamily:       font.regular,
};

// Stat number — big bold mono number for dashboards
export const statNumberStyle: TextStyle = {
  fontFamily:  font.bold,
  fontSize:    fontSize.xxl,    // 28px
  color:       colors.textPrimary,
  lineHeight:  34,
};

// Progress bar track
export const progressTrackStyle: ViewStyle = {
  height:           3,
  backgroundColor:  colors.border,
  borderRadius:     2,
  overflow:         'hidden',
};
