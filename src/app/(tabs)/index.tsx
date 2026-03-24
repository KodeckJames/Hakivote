import { View, Text, Pressable, ScrollView } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useRouter } from 'expo-router'
import BallotSection, { Candidate } from '@/components/ui/BallotSelection';

const presidentialCandidates: Candidate[] = [
  {
    id: 'c1',
    name: 'Dr. David Omondi',
    party: 'Progressive Alliance',
    avatar: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 'c2',
    name: 'Hon. Amina Juma',
    party: 'Unity Party of Kenya',
    avatar: 'https://i.pravatar.cc/150?img=45',
  },
  {
    id: 'c3',
    name: 'Prof. Samuel Mutua',
    party: 'Independent',
    avatar: 'https://i.pravatar.cc/150?img=52',
  },
];
 
const governorCandidates: Candidate[] = [
  {
    id: 'g1',
    name: 'Jane Wanjiku',
    party: 'Progressive Alliance',
    avatar: 'https://i.pravatar.cc/150?img=32',
  },
  {
    id: 'g2',
    name: 'Peter Kamau',
    party: 'Unity Party of Kenya',
    avatar: 'https://i.pravatar.cc/150?img=60',
  },
];

export default function HomePage() {
  const router = useRouter()
  return (
    <View className=' min-h-screen'>
      <Text className=" dark:text-white font-bold text-4xl mt-4">
        Your Ballot
      </Text>
      <View className=" flex-row items-center gap-2">
        <Ionicons name="location" size={20} color="green" />
        <Text className=" dark:text-white font-bold text-lg mt-4">
          Nairobi County
        </Text>
        <Ionicons name="ellipse" size={20} color="green" />
        <Text className=" dark:text-white font-bold text-lg mt-4">
          Westlands Constituency
        </Text>
      </View>
      <View className=" flex-row items-center gap-2">
        <Ionicons name="ellipse-outline" size={20} color="green" />
        <Text className=" dark:text-white font-bold text-lg mt-4">
          Clay City Ward
        </Text>
      </View>

      <ScrollView
      className="flex-1 min-h-full"
      contentContainerStyle={{ paddingVertical: 16 }}
    >
      {/* Presidential ballot – expanded by default */}
      <BallotSection
        category="National Executive"
        title="President"
        description="Choose one candidate to lead the Republic of Kenya for the next 5-year term."
        candidates={presidentialCandidates}
        defaultExpanded={true}
        onSelectionChange={(id) => console.log('President selection:', id)}
      />
 
      {/* Governor ballot – collapsed by default */}
      <BallotSection
        category="County Executive"
        title="Governor"
        description="Choose one candidate to lead your county for the next 5-year term."
        candidates={governorCandidates}
        defaultExpanded={false}
        onSelectionChange={(id) => console.log('Governor selection:', id)}
      />
 
      {/* Senator ballot – no candidates yet */}
      <BallotSection
        category="County Legislature"
        title="Senator"
        description="Choose your preferred senator."
        candidates={[]}
        defaultExpanded={false}
      />
    </ScrollView>

      <Pressable onPress={() => router.push('/OnboardingPage')} className=" bg-green-900 p-2 rounded-full absolute bottom-32 left-40 ">
        <Text className=" dark:text-white text-center font-bold text-lg">
         Onboarding
        </Text>
      </Pressable>
    </View>
  )
}
