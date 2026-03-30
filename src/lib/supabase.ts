// supabase.ts — Creates and exports a single Supabase client for the whole app.
// Import this wherever you need to read/write from the database.
// Usage example: import { supabase } from '../lib/supabase';

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// These values come from the .env.local file.
// EXPO_PUBLIC_ prefix makes them available in the app bundle (Expo requirement).
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

// createClient sets up the connection to your Supabase project.
// We pass AsyncStorage so that login sessions are saved on the device
// and the user stays logged in between app restarts.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,         // persist sessions using device storage
    autoRefreshToken: true,        // automatically refresh the auth token before it expires
    persistSession: true,          // keep the user logged in after closing the app
    detectSessionInUrl: true,      // required on web — picks up the session token from the URL after email confirmation
  },
});
