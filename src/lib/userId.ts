// userId.ts — Generates and persists a local user ID.
//
// Since we don't have auth yet, we create a random UUID on first launch
// and save it to AsyncStorage. Every time the app opens, we read the same ID back.
// This means Supabase can identify "this device" across sessions.
//
// When real auth is added in Phase 11, this gets replaced by the Supabase auth user ID.

import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_ID_KEY = 'lerne_deutsch_user_id';

// Generates a simple UUID (version 4 — random)
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.floor(Math.random() * 16);
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Returns the existing user ID from storage, or creates a new one if this is the first launch.
export async function getUserId(): Promise<string> {
  try {
    const existing = await AsyncStorage.getItem(USER_ID_KEY);
    if (existing) return existing;

    // First launch — generate a new ID and save it
    const newId = generateUUID();
    await AsyncStorage.setItem(USER_ID_KEY, newId);
    return newId;
  } catch (error) {
    // If storage fails for any reason, return a fallback ID for this session only
    console.error('Failed to get/set user ID:', error);
    return 'fallback-user';
  }
}
