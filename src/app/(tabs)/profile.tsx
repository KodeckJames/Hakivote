import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Pressable, Text, useColorScheme, View } from 'react-native'
import ActualVoterProfile from '@/components/ui/ActualVoterProfile'
import { useAuthActions } from '@convex-dev/auth/react'
import * as SecureStore from 'expo-secure-store'

export default function ProfilePage() {
  const router = useRouter()
  const colorScheme = useColorScheme()
  const { signOut } = useAuthActions()
  const [phone, setPhone] = useState('+254700000000')

  useEffect(() => {
    SecureStore.getItemAsync('voterData').then((data) => {
      if (data) {
        try {
          const parsed = JSON.parse(data)
          if (parsed.phone) {
            setPhone(parsed.phone)
          }
        } catch (e) {}
      }
    })
  }, [])

  const handleLogout = async () => {
    await signOut()
    await SecureStore.deleteItemAsync('voterData')
    router.replace('/OnboardingPage')
  }

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
          {phone}
        </Text>
      </Text>
      <ActualVoterProfile />
      <Pressable
        onPress={handleLogout}
        className=" bg-green-900 p-2 rounded-full absolute bottom-32 self-center px-8"
      >
        <Text className=" dark:text-white text-center font-bold text-lg">
          Log Out
        </Text>
      </Pressable>
    </View>
  )
}
