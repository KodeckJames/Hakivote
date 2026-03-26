import { AnimatedSplashOverlay } from '@/components/animated-icon'
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import { ConvexReactClient } from 'convex/react'
import { ConvexAuthProvider } from '@convex-dev/auth/react'
import * as SecureStore from 'expo-secure-store'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { useColorScheme } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import '../../global.css'

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
})

const secureStorage = {
  getItem: SecureStore.getItemAsync,
  setItem: SecureStore.setItemAsync,
  removeItem: SecureStore.deleteItemAsync,
}

export default function TabLayout() {
  const colorScheme = useColorScheme()
  return (
    <ConvexAuthProvider client={convex} storage={secureStorage}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <KeyboardProvider>
          <SafeAreaProvider>
            <SafeAreaView
              style={{
                flex: 1,
                backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
              }}
            >
              <ThemeProvider
                value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
              >
                <AnimatedSplashOverlay />
                <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
                <Stack screenOptions={{}}>
                  <Stack.Screen
                    name="OnboardingPage"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="BallotLocation"
                    options={{ headerTitle: 'HakiVote' }}
                  />
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </ThemeProvider>
            </SafeAreaView>
          </SafeAreaProvider>
        </KeyboardProvider>
      </GestureHandlerRootView>
    </ConvexAuthProvider>
  )
}
