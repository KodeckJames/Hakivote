import { NativeTabs } from 'expo-router/unstable-native-tabs'
import React from 'react'
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
} from '@react-navigation/native'
import { useColorScheme } from 'react-native'

export default function TabsRootLayout() {
  const colorScheme = useColorScheme()
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <NativeTabs>
        <NativeTabs.Trigger name="index">
          <NativeTabs.Trigger.Label>Ballot</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="checkmark.square.fill" md="how_to_vote" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="results">
          <NativeTabs.Trigger.Label>Results</NativeTabs.Trigger.Label>
          <NativeTabs.Trigger.Icon sf="chart.bar.fill" md="poll" />
        </NativeTabs.Trigger>
        <NativeTabs.Trigger name="profile">
          <NativeTabs.Trigger.Icon sf="person.fill" md="person" />
          <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </ThemeProvider>
  )
}
