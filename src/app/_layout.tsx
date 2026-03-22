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

export default function TabLayout() {
  const colorScheme = useColorScheme()
  return (
    <KeyboardProvider>
      <SafeAreaProvider>
        <SafeAreaView>
          <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
          >
            <AnimatedSplashOverlay />
            <AppTabs />
          </ThemeProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </KeyboardProvider>
  )
}
