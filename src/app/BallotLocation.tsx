import { View, Text, TextInput, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'

export default function BallotLocation() {
  return (
    <View>
      <Text className=" text-3xl font-bold my-2 pl-6 dark:text-white">
        Your Ballot Location
      </Text>
      <Text className=" text-base text-gray-600 pl-6">
        Identify your designated polling station to proceed
      </Text>
      <View className=" flex justify-around gap-4 mt-8">
        <View>
          <Text className=" dark:text-white pl-6">PHONE NUMBER</Text>
          <TextInput
            placeholder="+254 712 345 678"
            className=" border p-4 mx-6 rounded-full border-gray-300 bg-gray-200"
            keyboardType="number-pad"
          />
        </View>
        <View>
          <Text className=" dark:text-white pl-6">COUNTY</Text>
          <TextInput
            placeholder="Select County"
            className=" border p-4 mx-6 rounded-full border-gray-300 bg-gray-200"
            keyboardType="default"
          />
        </View>
        <View className=" flex flex-row justify-between">
          <View>
            <Text className=" dark:text-white pl-6">CONSTITUENCY</Text>
            <TextInput
              placeholder="e.g. Kasarani"
              className=" border p-4 mx-6 rounded-full border-gray-300 bg-gray-200"
              keyboardType="default"
            />
          </View>
          <View>
            <Text className=" dark:text-white">WARD</Text>
            <TextInput
              placeholder="e.g. Clay City"
              className=" border p-4 mr-6 rounded-full border-gray-300 bg-gray-200"
              keyboardType="default"
            />
          </View>
        </View>
      </View>
      <Pressable
        onPress={() => router.push('/BallotLocation')}
        className=" flex p-6 mt-44 rounded-3xl justify-center items-center flex-row gap-4 self-center bg-green-900"
      >
        <Text className=" text-white text-xl text-center">
          Continue to Identity {'\n'} Verification
        </Text>
        <View className=" bg-green-600 p-1 rounded-full">
          <MaterialCommunityIcons name="arrow-right" size={20} color="yellow" />
        </View>
      </Pressable>
    </View>
  )
}
