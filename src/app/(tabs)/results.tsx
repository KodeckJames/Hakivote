import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

export default function ResultsPage() {
  const router = useRouter()
  return (
    <View className=" flex min-h-screen">
      <Pressable
        onPress={() => router.push('/OnboardingPage')}
        className=" bg-green-900 p-2 rounded-full absolute bottom-32 left-40 "
      >
        <Text className=" dark:text-white text-center font-bold text-lg">
          Onboarding
        </Text>
      </Pressable>
    </View>
  )
}
