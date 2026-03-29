// _layout.tsx — Root layout for the entire app
// This file sets up the sidebar (drawer) navigation.
// Every screen inside the app/ folder will appear inside this layout.

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Platform, View, ActivityIndicator } from 'react-native';
import LevelToggle from '../src/components/LevelToggle';
import TipsBar from '../src/components/TipsBar';
import {
  useFonts,
  IBMPlexMono_400Regular,
  IBMPlexMono_500Medium,
  IBMPlexMono_600SemiBold,
  IBMPlexMono_700Bold,
} from '@expo-google-fonts/ibm-plex-mono';

export default function RootLayout() {
  // Load IBM Plex Mono — all 4 weights used across the design system
  const [fontsLoaded] = useFonts({
    IBMPlexMono_400Regular,
    IBMPlexMono_500Medium,
    IBMPlexMono_600SemiBold,
    IBMPlexMono_700Bold,
  });

  // Don't render anything until fonts are ready (avoids flash of wrong font)
  if (!fontsLoaded) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    // GestureHandlerRootView is required for the drawer to work
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* This outer View stacks the Drawer and TipsBar vertically */}
      <View style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          // On web, make the sidebar always visible (permanent)
          // On mobile, it will slide in/out as a normal drawer
          drawerType: Platform.OS === 'web' ? 'permanent' : 'front',
          drawerStyle: {
            backgroundColor: '#1a1a2e',
            width: 220,
            borderRightWidth: 0,
          },
          drawerLabelStyle: {
            fontFamily: 'IBMPlexMono_500Medium',
            fontSize: 13,
            color: '#ffffff',
            letterSpacing: 0.3,
          },
          drawerActiveTintColor: '#ffffff',
          drawerInactiveTintColor: '#888888',
          drawerActiveBackgroundColor: 'rgba(255,255,255,0.08)',
          drawerItemStyle: {
            borderRadius: 4,
            marginHorizontal: 8,
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
        {/* Each Drawer.Screen maps to a file in the app/ folder */}
        <Drawer.Screen name="index"      options={{ title: '🏠  Home' }} />
        <Drawer.Screen name="flashcards" options={{ title: '🃏  Flashcards' }} />
        <Drawer.Screen name="games"      options={{ title: '🎮  Mini Games' }} />
        <Drawer.Screen name="grammar"    options={{ title: '📝  Grammar' }} />
        <Drawer.Screen name="daily"      options={{ title: '📅  Daily Challenge' }} />
        <Drawer.Screen name="exam"       options={{ title: '🎓  Exam Prep' }} />
        <Drawer.Screen name="progress"   options={{ title: '📊  Progress' }} />
      </Drawer>
      {/* TipsBar sits below the Drawer — appears on every screen */}
      <TipsBar />
      </View>
    </GestureHandlerRootView>
  );
}