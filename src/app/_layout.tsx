import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native'
import React from 'react'
import { useColorScheme } from 'react-native'
import '@/global.css'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { KeyboardProvider } from 'react-native-keyboard-controller'

import { AnimatedSplashOverlay } from '@/components/animated-icon'
import AppTabs from '@/components/app-tabs'
import { StatusBar } from 'react-native'
import { Stack } from 'expo-router'
import '../../global.css'

export default function TabLayout() {
  const colorScheme = useColorScheme()
  return (
    <KeyboardProvider>
      <SafeAreaProvider>
        <SafeAreaView style={{flex:1}} >
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <AnimatedSplashOverlay />
            <StatusBar
              animated
              backgroundColor={colorScheme === 'dark' ? '#000' : '#fff'}
              barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
            />
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="OnboardingPage" />
              <Stack.Screen name="(tabs)" />
            </Stack>
          </ThemeProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </KeyboardProvider>
  )
}
