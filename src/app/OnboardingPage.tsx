import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'

export default function OnboardingPage() {
  const router = useRouter()
  return (
    <View className=" min-h-screen">
      <View className=" flex items-center justify-center">
        <Image
          source={require('@/assets/images/AppIcon.png')}
          style={{ width: 200, height: 200 }}
          className=""
        />
        <Text className=" text-3 font-bold text-4xl">HakiVote</Text>
      </View>
      <View className=" text-left pl-5 mt-5">
        <Text className=" text-4xl">One Person</Text>
        <Text className=" text-4xl">One Vote</Text>
        <Text className=" text-4xl text-green-800">Verified</Text>
        <View className=" bg-green-900 w-20 h-2 mt-8" />
        <Text className=" text-gray-600 text-xl mt-4 w-3/4" numberOfLines={3}>
          Secure, transparent, and modern democracy at your fingertips
        </Text>
      </View>

      <Pressable
        className=" absolute bottom-5 p-2 left-40 bg-blue-600 rounded-2xl"
        onPress={() => router.push('/(tabs)')}
      >
        <Text className=" text-xl">Home</Text>
      </Pressable>
    </View>
  )
}
