// authService.ts — Supabase Auth helpers (Phase 15)
//
// Thin wrappers around the Supabase auth API.
// Components call these instead of using supabase.auth directly,
// so the auth logic stays in one place.

import { supabase } from './supabase';

// Sign in with email + password.
// Returns { data, error } — same shape as supabase.auth.signInWithPassword.
export async function signIn(email: string, password: string) {
  return supabase.auth.signInWithPassword({ email, password });
}

// Create a new account with email + password.
// If email confirmation is enabled in Supabase dashboard, data.session will be null
// until the user clicks the confirmation link.
// To skip email confirmation for personal use: Supabase dashboard → Authentication
// → Providers → Email → disable "Confirm email".
export async function signUp(email: string, password: string) {
  return supabase.auth.signUp({ email, password });
}

// Sign out the current user.
// This triggers onAuthStateChange in _layout.tsx which sets session to null.
export async function signOut() {
  return supabase.auth.signOut();
}