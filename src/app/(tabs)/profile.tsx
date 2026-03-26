import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import React from 'react'
import { Pressable, Text, useColorScheme, View } from 'react-native'
import ActualVoterProfile from '@/components/ui/ActualVoterProfile'

export default function ProfilePage() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  return (
    <View className=" flex min-h-screen">
      <View className=" flex items-center mt-4">
        <View
          className={` ${colorScheme === 'dark' ? ' bg-gray-800' : ' bg-gray-300'} rounded-full p-2`}
        >
          <Ionicons
            name="checkmark-circle"
            size={90}
            color={colorScheme === 'dark' ? '#4ADE80' : '#14532D'}
          />
        </View>
      </View>
      <Text className=" text-center text-green-900 dark:text-green-400 font-bold mt-4 text-4xl">
        Your Votes Have Been {'\n'} Cast 🎉
      </Text>
      <Text className=" text-center mt-4 tracking-wider text-lg dark:text-white">
        {' '}
        You will receive a confirmation SMS shortly{'\n'} at{' '}
        <Text className=" text-green-900 dark:text-green-400 font-bold">
          +254700000000
        </Text>
      </Text>
      <ActualVoterProfile />
      <Pressable
        onPress={() => router.push('/OtpInput')}
        className=" bg-green-900 p-2 rounded-full absolute bottom-32 left-40 "
      >
        <Text className=" dark:text-white text-center font-bold text-lg">
          Onboarding
        </Text>
      </Pressable>
    </View>
  )
}
