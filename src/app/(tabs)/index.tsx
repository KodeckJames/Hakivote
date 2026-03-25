import BallotSection, { Candidate } from '@/components/ui/BallotSelection'
import BallotFooter, { SubmitStatus } from '@/components/ui/BallotFooter'
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useState, useCallback } from 'react'
import { ScrollView, Text, View } from 'react-native'

// ─── Dummy data ───────────────────────────────────────────────────────────────

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
]

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
]

// Races with no candidates yet — footer still tracks them as incomplete
const senatorCandidates: Candidate[] = []

// ─── Race IDs — must stay in sync with totalRaces={3} in BallotFooter ─────────

const RACE_PRESIDENT = 'president'
const RACE_GOVERNOR  = 'governor'
const RACE_SENATOR   = 'senator'

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  // Map of raceId → selected candidateId (null = unselected)
  const [selections, setSelections] = useState<Record<string, string | null>>({})
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  const handleSelection = useCallback((raceId: string, candidateId: string | null) => {
    setSelections(prev => ({ ...prev, [raceId]: candidateId }))
  }, [])

  // IDs of races where a candidate has been chosen
  const completedRaceIds = Object.entries(selections)
    .filter(([, candidateId]) => candidateId !== null)
    .map(([raceId]) => raceId)

  const handleSubmit = async () => {
    if (submitStatus === 'loading') return
    setSubmitStatus('loading')

    try {
      // Replace with your actual API call, e.g.:
      // await api.submitBallot(selections)
      await new Promise(resolve => setTimeout(resolve, 1800))
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }
  }

  return (
    <View className="min-h-screen">
      <Text className="dark:text-white font-bold text-4xl mt-4">
        Your Ballot
      </Text>

      <View className="flex-row items-center gap-2">
        <Ionicons name="location" size={20} color="green" />
        <Text className="dark:text-white font-bold text-lg mt-4">
          Nairobi County
        </Text>
        <Ionicons name="ellipse" size={20} color="green" />
        <Text className="dark:text-white font-bold text-lg mt-4">
          Westlands Constituency
        </Text>
      </View>

      <View className="flex-row items-center gap-2">
        <Ionicons name="ellipse-outline" size={20} color="green" />
        <Text className="dark:text-white font-bold text-lg mt-4">
          Clay City Ward
        </Text>
      </View>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 16, paddingBottom: 300 }}
      >
        <BallotSection
          category="National Executive"
          title="President"
          description="Choose one candidate to lead the Republic of Kenya for the next 5-year term."
          candidates={presidentialCandidates}
          defaultExpanded={true}
          onSelectionChange={(id) => handleSelection(RACE_PRESIDENT, id)}
        />

        <BallotSection
          category="County Executive"
          title="Governor"
          description="Choose one candidate to lead your county for the next 5-year term."
          candidates={governorCandidates}
          defaultExpanded={false}
          onSelectionChange={(id) => handleSelection(RACE_GOVERNOR, id)}
        />

        <BallotSection
          category="County Legislature"
          title="Senator"
          description="Choose your preferred senator."
          candidates={governorCandidates}
          defaultExpanded={false}
          onSelectionChange={(id) => handleSelection(RACE_SENATOR, id)}
        />
      </ScrollView>

      <BallotFooter
        totalRaces={3}
        completedRaceIds={completedRaceIds}
        onSubmit={handleSubmit}
        submitStatus={submitStatus}
      />
    </View>
  )
}