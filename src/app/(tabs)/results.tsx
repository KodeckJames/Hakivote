import React from 'react'
import { Text, View } from 'react-native'
import Ioicons from '@expo/vector-icons/Ionicons'
import Ionicons from '@expo/vector-icons/Ionicons'
import TallyCard from '@/components/ui/TallyCard'
import CountDownUI from '@/components/ui/CountDownUI'
import TabsComponent from '@/components/ui/TabsComponent'

export default function ResultsPage() {
  return (
    <View className=" flex-1">
      <Text className=" dark:text-white ml-4 font-bold text-4xl mt-4">
        Live Results
      </Text>
      {/* <View className=" flex flex-row items-center gap-2">
        <Text className=" dark:text-white ml-4 font-bold text-xl mt-4">
          Last updated:
        </Text>
        <Text className=" dark:text-white font-bold text-xl mt-4">
          Just now
        </Text>
        <Ioicons name="ellipse" size={20} color="green" className=" mt-4" />
      </View> */}
      <Ionicons name='map-outline' size={40} color="green" className=' absolute top-3 right-10'/>
      <CountDownUI/>
      <TallyCard/>
      <TabsComponent/>
    </View>
  )
}
