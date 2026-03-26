import React from 'react'
import { ScrollView, View, Text } from 'react-native'
import VotingReceiptCard, { Candidate } from '@/components/ui/ProfileVotes'

import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'

const VOTER_PHONE = '+254700000000'

export default function VotingReceiptDemo() {
  const votes = useQuery(api.votes.getUserVotes, { voterPhone: VOTER_PHONE })

  const candidates: Candidate[] = (votes || []).map((vote) => {
    // Format raceId to something nice (e.g. "president" -> "President")
    let roleName = vote.raceId.charAt(0).toUpperCase() + vote.raceId.slice(1)
    if (vote.raceId === 'mp') roleName = 'Member of Parliament'
    if (vote.raceId === 'mca') roleName = 'Member of County Assembly'
    if (vote.raceId === 'womenrep') roleName = 'Woman Representative'

    return {
      role: roleName,
      name: vote.aspirant?.name || 'Unknown Candidate',
      status: 'confirmed',
    }
  })

  // Format date loosely to make it look like dummy data
  const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })

  return (
    <ScrollView className="flex-1" contentContainerClassName=" mt-2 px-5 gap-6">
      <Text className="text-lg text-center font-bold uppercase tracking-widest text-gray-600 dark:text-white mb-2">
        Your Votes
      </Text>
      {candidates.length > 0 ? (
        <VotingReceiptCard
          transactionHash="0x7d2...f9a4"
          dateTime={dateStr}
          candidates={candidates}
        />
      ) : (
        <Text className="text-center text-gray-500 py-10">No votes submitted yet.</Text>
      )}
    </ScrollView>
  )
}
