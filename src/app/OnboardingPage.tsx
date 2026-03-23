import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Image } from 'expo-image'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

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
        <Text className=" text-3 font-bold text-4xl dark:text-white">
          HakiVote
        </Text>
      </View>
      <View className=" text-left pl-5 mt-5">
        <Text className=" text-4xl dark:text-white">One Person.</Text>
        <Text className=" text-4xl dark:text-white">One Vote.</Text>
        <Text className=" text-4xl text-green-800">Verified.</Text>
        <View className=" bg-green-900 w-20 h-2 my-6" />
        <Text className=" text-gray-600 text-xl w-3/4" numberOfLines={3}>
          Secure, transparent, and modern democracy at your fingertips
        </Text>
      </View>
      <View className=" flex-1 mt-20 gap-8">
        <Pressable
          onPress={() => router.push('/(tabs)')}
          className=" flex p-6 rounded-full justify-center items-center flex-row gap-4 self-center bg-green-900"
        >
          <Text className=" text-white text-xl">
            Verify Identity & Register
          </Text>
          <View className=" bg-green-600 p-1 rounded-full">
            <MaterialCommunityIcons
              name="arrow-right"
              size={20}
              color="yellow"
            />
          </View>
        </Pressable>
        <Text className=" text-center text-lg dark:text-white">
          Already registered? <Text className=" underline">Login</Text>
        </Text>
        <View className=" flex-row justify-between px-4">
          <View className=" flex-row">
            <MaterialCommunityIcons name="lock" size={20} color="#6B7280" />
            <Text className=" text-gray-500">END-TO-END ENCRYPTED</Text>
          </View>
          <View className=" flex-row">
            <MaterialCommunityIcons name="hammer" size={20} color="#6B7280" />
            <Text className=" text-gray-500">IEBC COMPLIANT</Text>
          </View>
        </View>
      </View>
    </View>
  )
}
