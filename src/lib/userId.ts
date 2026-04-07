// userId.ts — Returns the authenticated Supabase user's ID.
//
// Reads synchronously from useAuthStore (no network call needed).
// All screens are behind the auth gate in _layout.tsx, so the store
// always has a userId by the time any service function is called.
//
// If userId is somehow null here, it means a service was called before
// the auth session loaded — that is a bug, so we throw clearly instead
// of silently returning a bogus 'fallback-user' ID that would corrupt data.

import useAuthStore from '../store/useAuthStore';

// Returns the current user's Supabase auth ID from the in-memory store.
// Throws if called before the session has loaded (should never happen behind the auth gate).
export async function getUserId(): Promise<string> {
  const userId = useAuthStore.getState().userId;
  if (!userId) {
    throw new Error(
      'getUserId() called before auth session loaded. ' +
      'All screens must be behind the auth gate in _layout.tsx.'
    );
  }
  return userId;
}