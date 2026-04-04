// _layout.tsx — Root layout for the entire app
//
// Phase 15 additions:
//   - Auth gate: if no Supabase session, renders AuthScreen instead of the Drawer
//   - Subscribes to onAuthStateChange so login/logout updates instantly everywhere
//   - Loads saved level from Supabase after login and sets it in useLevelStore
//   - Sign Out button pinned at the bottom of the sidebar

import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import { Platform, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {
  useFonts,
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold,
  IBMPlexMono_700Bold,
} from '@expo-google-fonts/ibm-plex-mono';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import LevelToggle from '../src/components/LevelToggle';
import TipsBar from '../src/components/TipsBar';
import AuthScreen from '../src/components/AuthScreen';
import useAuthStore from '../src/store/useAuthStore';
import useLevelStore from '../src/store/useLevelStore';
import { supabase } from '../src/lib/supabase';
import { signOut } from '../src/lib/authService';
import { loadLevel } from '../src/lib/levelService';

// ─── Nav items ─────────────────────────────────────────────────────────────────

type NavItem = {
  route: string;
  label: string;
  icon: string;
};

const NAV_ITEMS: NavItem[] = [
  { route: 'index',         label: 'Home',            icon: 'home'        },
  { route: 'flashcards',    label: 'Flashcards',      icon: 'layers'      },
  { route: 'games',         label: 'Mini Games',      icon: 'zap'         },
  { route: 'grammar',       label: 'Grammar',         icon: 'edit-3'      },
  { route: 'cheatsheet',    label: 'Cheat Sheet',     icon: 'list'        },
  { route: 'daily',         label: 'Daily Challenge', icon: 'calendar'    },
  { route: 'reading',       label: 'Reading Mode',    icon: 'book'        },
  { route: 'pronunciation', label: 'Pronunciation',   icon: 'volume-2'    },
  { route: 'exam',          label: 'Exam Prep',       icon: 'book-open'   },
  { route: 'progress',      label: 'Progress',        icon: 'bar-chart-2' },
  { route: 'insights',      label: 'Insights',        icon: 'trending-up' },
];

// ─── Custom drawer content ────────────────────────────────────────────────────

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const pathname = usePathname();
  const router   = useRouter();
  const { setSession } = useAuthStore();

  // Sign out: clears the Supabase session, which triggers onAuthStateChange
  // in RootLayout → setSession(null) → AuthScreen renders instead of Drawer.
  async function handleSignOut() {
    await signOut();
    setSession(null);
  }

  return (
    // Wrap in a View so we can pin Sign Out at the bottom outside the ScrollView
    <View style={{ flex: 1, backgroundColor: '#1a1a2e' }}>

      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={drawerStyles.scrollContent}
      >
        {/* App wordmark */}
        <View style={drawerStyles.wordmark}>
          <Text style={drawerStyles.wordmarkText}>LERNE DEUTSCH</Text>
        </View>

        {/* Nav items */}
        {NAV_ITEMS.map((item) => {
          const href     = item.route === 'index' ? '/' : `/${item.route}`;
          const isActive = pathname === href;

          return (
            <TouchableOpacity
              key={item.route}
              style={[drawerStyles.item, isActive && drawerStyles.itemActive]}
              onPress={() => router.push(href as any)}
              activeOpacity={0.7}
            >
              <Feather
                name={item.icon as any}
                size={16}
                color={isActive ? '#ffffff' : '#666666'}
                style={drawerStyles.icon}
              />
              <Text style={[drawerStyles.label, isActive && drawerStyles.labelActive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </DrawerContentScrollView>

      {/* Sign Out — pinned at bottom of sidebar */}
      <View style={drawerStyles.signOutSection}>
        <TouchableOpacity
          style={drawerStyles.item}
          onPress={handleSignOut}
          activeOpacity={0.7}
        >
          <Feather name="log-out" size={16} color="#666666" style={drawerStyles.icon} />
          <Text style={drawerStyles.label}>Sign Out</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

// ─── Drawer item styles ───────────────────────────────────────────────────────

const drawerStyles = StyleSheet.create({
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 8,
  },

  wordmark: {
    paddingHorizontal: 20,
    paddingVertical:   14,
    marginBottom:      8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',
  },
  wordmarkText: {
    fontFamily:    'Inter_600SemiBold',
    fontSize:      10,
    color:         'rgba(255,255,255,0.35)',
    letterSpacing: 1.8,
  },

  item: {
    flexDirection:   'row',
    alignItems:      'center',
    paddingVertical: 11,
    paddingRight:    16,
    marginBottom:    1,
    borderLeftWidth: 2,
    borderLeftColor: 'transparent',
  },
  itemActive: {
    borderLeftColor:  '#2563eb',
    backgroundColor:  'rgba(255,255,255,0.05)',
  },

  icon: {
    marginLeft:  16,
    marginRight: 12,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize:   13,
    color:      '#666666',
    flex:       1,
    lineHeight: 18,
  },
  labelActive: {
    color:      '#ffffff',
    fontFamily: 'Inter_600SemiBold',
  },

  // Sign out section — separator + button
  signOutSection: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.07)',
    paddingBottom:  16,
    paddingTop:     4,
  },
});

// ─── Root layout ──────────────────────────────────────────────────────────────

export default function RootLayout() {
  const [fontsLoaded]     = useFonts({
    IBMPlexMono_400Regular,
    IBMPlexMono_500Medium,
    IBMPlexMono_600SemiBold,
    IBMPlexMono_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  // True while we're waiting for Supabase to return the initial session.
  // We show a spinner during this time so the auth screen doesn't flash
  // briefly before the session is confirmed.
  const [sessionLoading, setSessionLoading] = useState(true);

  const { session, setSession } = useAuthStore();
  const setLevel = useLevelStore((state) => state.setLevel);

  useEffect(() => {
    // 1. Load the existing session from storage on startup
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setSessionLoading(false);
    });

    // 2. Subscribe to auth changes (sign in, sign out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  // After the user logs in, load their saved level from Supabase and apply it.
  useEffect(() => {
    if (session?.user?.id) {
      loadLevel().then((savedLevel) => {
        if (savedLevel) setLevel(savedLevel);
      });
    }
  }, [session?.user?.id]);

  // ── Loading: fonts + initial session check ──
  if (!fontsLoaded || sessionLoading) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  // ── Not logged in: show auth screen ──
  if (!session) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthScreen />
      </GestureHandlerRootView>
    );
  }

  // ── Logged in: show main app ──
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerType:  Platform.OS === 'web' ? 'permanent' : 'front',
            drawerStyle: {
              backgroundColor: '#1a1a2e',
              width:           240,
              borderRightWidth: 0,
            },
            headerStyle: {
              backgroundColor: '#1a1a2e',
              borderBottomWidth: 0,
              elevation:    0,
              shadowOpacity: 0,
            },
            headerTitleStyle: {
              fontFamily:    'IBMPlexMono_600SemiBold',
              fontSize:      14,
              color:         '#ffffff',
              letterSpacing: 0.5,
            },
            headerTintColor: '#ffffff',
            headerRight: () => <LevelToggle />,
          }}
        >
          <Drawer.Screen name="index"         options={{ title: 'Home' }}             />
          <Drawer.Screen name="flashcards"    options={{ title: 'Flashcards' }}       />
          <Drawer.Screen name="games"         options={{ title: 'Mini Games' }}       />
          <Drawer.Screen name="grammar"       options={{ title: 'Grammar' }}          />
          <Drawer.Screen name="cheatsheet"    options={{ title: 'Cheat Sheet' }}      />
          <Drawer.Screen name="daily"         options={{ title: 'Daily Challenge' }}  />
          <Drawer.Screen name="exam"          options={{ title: 'Exam Prep' }}        />
          <Drawer.Screen name="progress"      options={{ title: 'Progress' }}         />
          <Drawer.Screen name="insights"      options={{ title: 'Insights' }}         />
          <Drawer.Screen name="reading"       options={{ title: 'Reading Mode' }}     />
          <Drawer.Screen name="pronunciation" options={{ title: 'Pronunciation' }}    />
        </Drawer>

        {/* TipsBar sits below the Drawer — appears on every screen */}
        <TipsBar />
      </View>
    </GestureHandlerRootView>
  );
}