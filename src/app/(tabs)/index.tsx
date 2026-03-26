import BallotSection, { Candidate } from '@/components/ui/BallotSelection'
import BallotFooter, { SubmitStatus } from '@/components/ui/BallotFooter'
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useState, useCallback } from 'react'
import { ScrollView, Text, View } from 'react-native'

// ─── Dummy data ───────────────────────────────────────────────────────────────

const presidentialCandidates: Candidate[] = [
  {
    id: 'c1',
    name: 'Edwin Sifuna',
    party: 'ODM',
    avatar: require('@/assets/images/Presidents/SifunaImage.png'),
  },
  {
    id: 'c2',
    name: 'David Maraga',
    party: 'Independent',
    avatar: require('@/assets/images/Presidents/MaragaImage.jpg'),

  },
  {
    id: 'c3',
    name: 'Fred Matiang\'i',
    party: 'Jubilee',
    avatar: require('@/assets/images/Presidents/MatiangiImage.jpg'),

  },
  {
    id: 'c4',
    name: 'Rigathi Gachagua',
    party: 'Independent',
    avatar: require('@/assets/images/Presidents/GachaguaImage.jpg'),
  },
  {
    id: 'c5',
    name: 'Kalonzo Musyoka',
    party: 'Independent',
    avatar: require('@/assets/images/Presidents/KalonzoImage.jpg'),
  },
  {
    id: 'c6',
    name: 'William Ruto',
    party: 'UDA',
    avatar: require('@/assets/images/Presidents/RutoImage.jpg'),
  },
]

const governorCandidates: Candidate[] = [
  {
    id: 'g1',
    name: 'Babu Owino',
    party: 'ODM',
    avatar: require('@/assets/images/Governors/BabuImage.jpg'),
  },
  {
    id: 'g2',
    name: 'Millicent Omanga',
    party: 'Jubilee',
    avatar: require('@/assets/images/Governors/OmangaImage.jpg'),
  },
  {
    id: 'g3',
    name: 'Johnson Sakaja',
    party: 'UDA',
    avatar: require('@/assets/images/Governors/SakajaImage.jpg'),
  },
]
const MPCandidates: Candidate[] = [
  {
    id: 'mp1',
    name: 'Ronald Karauri',
    party: 'Independent',
    avatar: require('@/assets/images/MPs/KarauriImage.jpeg'),
  },
  {
    id: 'mp2',
    name: 'Phelix Odiwuor',
    party: 'ODM',
    avatar: require('@/assets/images/MPs/JalangoImage.jpg'),
  },
  {
    id: 'mp3',
    name: 'Karen Nyamu',
    party: 'UDA',
    avatar: require('@/assets/images/MPs/NyamuImage.png'),
  },
]
const MCACandidates: Candidate[] = [
  {
    id: 'mca1',
    name: 'Mwaura Samora',
    party: 'UDA',
    avatar: require('@/assets/images/MCAs/SamoraImage.jpeg'),
  },
  {
    id: 'mca2',
    name: 'Kevin Gitonga',
    party: 'ODM',
    avatar: require('@/assets/images/MCAs/GitongaImage.jpg'),
  },
  {
    id: 'mca3',
    name: 'Brian Maina',
    party: 'Independent',
    avatar: require('@/assets/images/MCAs/MainaImage.jpg'),
  },
  {
    id: 'mca4',
    name: 'Hosea Wambugu',
    party: 'Jubilee',
    avatar: require('@/assets/images/MCAs/WambuguImage.jpg'),
  },
]

// Races with no candidates yet — footer still tracks them as incomplete
const senatorCandidates: Candidate[] = []

// ─── Race IDs — must stay in sync with totalRaces={3} in BallotFooter ─────────

const RACE_PRESIDENT = 'president'
const RACE_GOVERNOR  = 'governor'
const RACE_MP   = 'mp'
const RACE_MCA   = 'mca'

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
      <Text className="dark:text-white ml-4 font-bold text-4xl mt-4">
        Your Ballot
      </Text>

      <View className="flex-row items-center ml-4 gap-2">
        <Ionicons name="location" size={20} color="green" />
        <Text className="dark:text-white font-bold text-lg mt-4">
          Nairobi County
        </Text>
        <Ionicons name="ellipse" size={20} color="green" />
        <Text className="dark:text-white font-bold text-lg mt-4">
          Kasarani Constituency
        </Text>
      </View>

      <View className="flex-row items-center ml-4 gap-2">
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
          title="MP"
          description="Choose your preferred MP."
          candidates={MPCandidates}
          defaultExpanded={false}
          onSelectionChange={(id) => handleSelection(RACE_MP, id)}
        />
        <BallotSection
          category="County Legislature"
          title="MCA"
          description="Choose your preferred MCA."
          candidates={MCACandidates}
          defaultExpanded={false}
          onSelectionChange={(id) => handleSelection(RACE_MCA, id)}
        />
      </ScrollView>

      <BallotFooter
        totalRaces={4}
        completedRaceIds={completedRaceIds}
        onSubmit={handleSubmit}
        submitStatus={submitStatus}
      />
    </View>
  )
}