// supabase.ts — Creates and exports a single Supabase client for the whole app.
// Import this wherever you need to read/write from the database.
// Usage example: import { supabase } from '../lib/supabase';

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

const supabaseUrl    = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// On web we let Supabase use its built-in browser storage (localStorage).
// On native we use AsyncStorage so sessions persist between app restarts.
//
// Why: passing AsyncStorage on web causes Supabase to layer navigator.locks
// on top of the localStorage polyfill, which leads to "lock stolen" errors
// when multiple requests try to refresh the auth token simultaneously.
const storage = Platform.OS === 'web' ? undefined : AsyncStorage;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage,
    autoRefreshToken:  true,   // refresh token before it expires
    persistSession:    true,   // keep the user logged in after closing the app
    detectSessionInUrl: true,  // picks up the session token from the URL after email confirmation
  },
});