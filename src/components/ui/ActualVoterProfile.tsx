import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import VotingReceiptCard, { Candidate } from '@/components/ui/ProfileVotes'

const CANDIDATES: Candidate[] = [
  {
    role: 'President',
    name: 'Harambee J. Kenyatta',
    status: 'confirmed',
  },
  {
    role: 'Governor',
    name: 'Dr. Sarah Wambui',
    status: 'confirmed',
  },
  {
    role: 'Senator',
    name: 'Kevin Omondi',
    status: 'confirmed',
  },
  {
    role: 'Woman Representative',
    name: 'Amina Mohamed',
    status: 'confirmed',
  },
  {
    role: 'Member of Parliament',
    name: 'Hon. David Mutua',
    status: 'confirmed',
    // onPress: () => console.log('Cast MP vote tapped'),
  },
]

export default function VotingReceiptDemo() {
  return (
    <ScrollView className="flex-1" contentContainerClassName=" mt-2 px-5 gap-6">
      <Text className="text-lg text-center font-bold uppercase tracking-widest text-gray-600 dark:text-white mb-2">
        Your Votes
      </Text>
      <VotingReceiptCard
        transactionHash="0x7d2...f9a4"
        dateTime="Aug 12, 14:32"
        candidates={CANDIDATES}
      />
    </ScrollView>
  )
}
