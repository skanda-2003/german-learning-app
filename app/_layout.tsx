// _layout.tsx — Root layout for the entire app
// This file sets up the sidebar (drawer) navigation.
// Every screen inside the app/ folder will appear inside this layout.

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { Platform, View } from 'react-native';
import LevelToggle from '../src/components/LevelToggle';
import TipsBar from '../src/components/TipsBar';

export default function RootLayout() {
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
            backgroundColor: '#1a1a2e', // dark navy sidebar background
            width: 220,
          },
          drawerLabelStyle: {
            color: '#ffffff', // white text in sidebar
            fontSize: 15,
          },
          drawerActiveTintColor: '#4fc3f7',   // light blue when selected
          drawerInactiveTintColor: '#aaaaaa', // grey when not selected
          headerStyle: {
            backgroundColor: '#1a1a2e', // match header to sidebar
          },
          headerTintColor: '#ffffff', // white header text
          // LevelToggle placed on the right side of the header bar
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