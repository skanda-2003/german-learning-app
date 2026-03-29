// _layout.tsx — Root layout for the entire app
//
// Sets up the sidebar (drawer) navigation with:
//   - Custom drawer content: Feather line icons + blue left-border active state
//   - IBM Plex Mono for all content/headers
//   - Inter for sidebar nav labels (cleaner at small sizes in nav context)

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';
import { Platform, View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';
import LevelToggle from '../src/components/LevelToggle';
import TipsBar from '../src/components/TipsBar';
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

// ─── Nav items ─────────────────────────────────────────────────────────────────
// Each entry maps to a file in app/ — route matches the Drawer.Screen name

type NavItem = {
  route: string;  // filename without extension
  label: string;  // text shown in sidebar
  icon: string;   // Feather icon name
};

const NAV_ITEMS: NavItem[] = [
  { route: 'index',      label: 'Home',           icon: 'home'        },
  { route: 'flashcards', label: 'Flashcards',      icon: 'layers'      },
  { route: 'games',      label: 'Mini Games',      icon: 'zap'         },
  { route: 'grammar',    label: 'Grammar',         icon: 'edit-3'      },
  { route: 'daily',      label: 'Daily Challenge', icon: 'calendar'    },
  { route: 'exam',       label: 'Exam Prep',       icon: 'book-open'   },
  { route: 'progress',   label: 'Progress',        icon: 'bar-chart-2' },
  { route: 'insights',   label: 'Insights',        icon: 'trending-up' },
  { route: 'reading',    label: 'Reading Mode',    icon: 'book'        },
];

// ─── Custom drawer content ────────────────────────────────────────────────────
// Renders nav items manually so we can apply the 2px left-border active
// indicator and use our own fonts instead of the default drawer styles.

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled={false}
      contentContainerStyle={drawerStyles.scrollContent}
    >
      {/* App wordmark at top of sidebar */}
      <View style={drawerStyles.wordmark}>
        <Text style={drawerStyles.wordmarkText}>LERNE DEUTSCH</Text>
      </View>

      {/* Nav items */}
      {NAV_ITEMS.map((item) => {
        // expo-router resolves "index" → "/" and all others → "/routeName"
        const href = item.route === 'index' ? '/' : `/${item.route}`;
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
  );
}

// ─── Drawer item styles ───────────────────────────────────────────────────────

const drawerStyles = StyleSheet.create({
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 24,
  },

  // App wordmark — ALL CAPS, very subtle, sits above the nav list
  wordmark: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.07)',
  },
  wordmarkText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 1.8,
  },

  // Each nav row
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 11,
    paddingRight: 16,
    marginBottom: 1,
    // The 2px left border acts as the active indicator.
    // Set transparent by default so layout doesn't shift between states.
    borderLeftWidth: 2,
    borderLeftColor: 'transparent',
  },
  // Active item: blue left border, slightly lighter background
  itemActive: {
    borderLeftColor: '#2563eb',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },

  icon: {
    marginLeft: 16,
    marginRight: 12,
  },
  label: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: '#666666',
    flex: 1,           // allows long labels like "Daily Challenge" to wrap if needed
    lineHeight: 18,
  },
  labelActive: {
    color: '#ffffff',
    fontFamily: 'Inter_600SemiBold',
  },
});

// ─── Root layout ──────────────────────────────────────────────────────────────

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    // Content font — IBM Plex Mono, used throughout all screens
    IBMPlexMono_400Regular,
    IBMPlexMono_500Medium,
    IBMPlexMono_600SemiBold,
    IBMPlexMono_700Bold,
    // Navigation font — Inter, used in sidebar labels and wordmark
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  // Don't render until fonts are ready — avoids a flash of the wrong font
  if (!fontsLoaded) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Drawer
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          screenOptions={{
            drawerType: Platform.OS === 'web' ? 'permanent' : 'front',
            drawerStyle: {
              backgroundColor: '#1a1a2e',
              width: 240,          // increased from 220 — fits "Daily Challenge" without cutoff
              borderRightWidth: 0,
            },
            headerStyle: {
              backgroundColor: '#1a1a2e',
              borderBottomWidth: 0,
              elevation: 0,
              shadowOpacity: 0,
            },
            headerTitleStyle: {
              fontFamily: 'IBMPlexMono_600SemiBold',
              fontSize: 14,
              color: '#ffffff',
              letterSpacing: 0.5,
            },
            headerTintColor: '#ffffff',
            headerRight: () => <LevelToggle />,
          }}
        >
          {/* Drawer.Screen registers each route — icons/labels handled by CustomDrawerContent */}
          <Drawer.Screen name="index"      options={{ title: 'Home' }} />
          <Drawer.Screen name="flashcards" options={{ title: 'Flashcards' }} />
          <Drawer.Screen name="games"      options={{ title: 'Mini Games' }} />
          <Drawer.Screen name="grammar"    options={{ title: 'Grammar' }} />
          <Drawer.Screen name="daily"      options={{ title: 'Daily Challenge' }} />
          <Drawer.Screen name="exam"       options={{ title: 'Exam Prep' }} />
          <Drawer.Screen name="progress"   options={{ title: 'Progress' }} />
          <Drawer.Screen name="insights"   options={{ title: 'Insights' }} />
          <Drawer.Screen name="reading"    options={{ title: 'Reading Mode' }} />
        </Drawer>

        {/* TipsBar sits below the Drawer — appears on every screen */}
        <TipsBar />
      </View>
    </GestureHandlerRootView>
  );
}