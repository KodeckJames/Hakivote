import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import React from 'react'
import { useColorScheme } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { KeyboardProvider } from 'react-native-keyboard-controller'
import { AnimatedSplashOverlay } from '@/components/animated-icon'
import AppTabs from '@/components/app-tabs'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'
import '../../global.css'

export default function TabLayout() {
  const colorScheme = useColorScheme()
  return (
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
              <Stack.Screen name="BallotLocation" />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </ThemeProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </KeyboardProvider>
  )
}
