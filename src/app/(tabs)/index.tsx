import BallotSection, { Candidate } from '@/components/ui/BallotSelection'
import BallotFooter, { SubmitStatus } from '@/components/ui/BallotFooter'
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useState, useCallback, useEffect } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { useQuery, useMutation } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Id } from '../../../convex/_generated/dataModel'

// ─── Dummy Avatars & Init Data ───────────────────────────────────────────────────────────────

const AVATARS_MAP: Record<string, any> = {
  'SifunaImage.png': require('@/assets/images/Presidents/SifunaImage.png'),
  'MaragaImage.jpg': require('@/assets/images/Presidents/MaragaImage.jpg'),
  'MatiangiImage.jpg': require('@/assets/images/Presidents/MatiangiImage.jpg'),
  'GachaguaImage.jpg': require('@/assets/images/Presidents/GachaguaImage.jpg'),
  'KalonzoImage.jpg': require('@/assets/images/Presidents/KalonzoImage.jpg'),
  'RutoImage.jpg': require('@/assets/images/Presidents/RutoImage.jpg'),
  'BabuImage.jpg': require('@/assets/images/Governors/BabuImage.jpg'),
  'OmangaImage.jpg': require('@/assets/images/Governors/OmangaImage.jpg'),
  'SakajaImage.jpg': require('@/assets/images/Governors/SakajaImage.jpg'),
  'KarauriImage.jpeg': require('@/assets/images/MPs/KarauriImage.jpeg'),
  'JalangoImage.jpg': require('@/assets/images/MPs/JalangoImage.jpg'),
  'NyamuImage.png': require('@/assets/images/MPs/NyamuImage.png'),
  'SamoraImage.jpeg': require('@/assets/images/MCAs/SamoraImage.jpeg'),
  'GitongaImage.jpg': require('@/assets/images/MCAs/GitongaImage.jpg'),
  'MainaImage.jpg': require('@/assets/images/MCAs/MainaImage.jpg'),
  'WambuguImage.jpg': require('@/assets/images/MCAs/WambuguImage.jpg'),
  'HanifaImage.png': require('@/assets/images/WomenReps/HanifaImage.png'),
  'PassarisImage.jpg': require('@/assets/images/WomenReps/PassarisImage.jpg'),
  'OrwobaImage.png': require('@/assets/images/WomenReps/OrwobaImage.png'),
}

const INITIAL_ASPIRANTS = [
  ...[
    { name: 'Edwin Sifuna', party: 'ODM', avatarId: 'SifunaImage.png' },
    { name: 'David Maraga', party: 'Independent', avatarId: 'MaragaImage.jpg' },
    { name: "Fred Matiang'i", party: 'Jubilee', avatarId: 'MatiangiImage.jpg' },
    { name: 'Rigathi Gachagua', party: 'Independent', avatarId: 'GachaguaImage.jpg' },
    { name: 'Kalonzo Musyoka', party: 'Independent', avatarId: 'KalonzoImage.jpg' },
    { name: 'William Ruto', party: 'UDA', avatarId: 'RutoImage.jpg' }
  ].map(a => ({ ...a, raceId: 'president' })),
  ...[
    { name: 'Babu Owino', party: 'ODM', avatarId: 'BabuImage.jpg' },
    { name: 'Millicent Omanga', party: 'Jubilee', avatarId: 'OmangaImage.jpg' },
    { name: 'Johnson Sakaja', party: 'UDA', avatarId: 'SakajaImage.jpg' },
  ].map(a => ({ ...a, raceId: 'governor' })),
  ...[
    { name: 'Ronald Karauri', party: 'Independent', avatarId: 'KarauriImage.jpeg' },
    { name: 'Phelix Odiwuor', party: 'ODM', avatarId: 'JalangoImage.jpg' },
    { name: 'Karen Nyamu', party: 'UDA', avatarId: 'NyamuImage.png' },
  ].map(a => ({ ...a, raceId: 'mp' })),
  ...[
    { name: 'Mwaura Samora', party: 'UDA', avatarId: 'SamoraImage.jpeg' },
    { name: 'Kevin Gitonga', party: 'ODM', avatarId: 'GitongaImage.jpg' },
    { name: 'Brian Maina', party: 'Independent', avatarId: 'MainaImage.jpg' },
    { name: 'Hosea Wambugu', party: 'Jubilee', avatarId: 'WambuguImage.jpg' },
  ].map(a => ({ ...a, raceId: 'mca' })),
  ...[
    { name: 'Hanifa Adan', party: 'UDA', avatarId: 'HanifaImage.png' },
    { name: 'Esther Passaris', party: 'ODM', avatarId: 'PassarisImage.jpg' },
    { name: 'Gloria Orwoba', party: 'Independent', avatarId: 'OrwobaImage.png' },
  ].map(a => ({ ...a, raceId: 'womenrep' })),
]

// ─── Race IDs — must stay in sync with totalRaces={3} in BallotFooter ─────────

const RACE_PRESIDENT = 'president'
const RACE_GOVERNOR = 'governor'
const RACE_MP = 'mp'
const RACE_MCA = 'mca'
const RACE_WOMENREP = 'womenrep'

const VOTER_PHONE = '+254700000000'

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [selections, setSelections] = useState<Record<string, string | null>>({})
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle')

  // Convex hooks
  const aspirantsData = useQuery(api.aspirants.getAll)
  const initAspirantsMutation = useMutation(api.aspirants.initAspirants)
  const castVotesMutation = useMutation(api.votes.cast)

  const [voterData, setVoterData] = useState({ phone: VOTER_PHONE, county: 'Nairobi', constituency: 'Kasarani', ward: 'Clay City' })

  useEffect(() => {
    import('expo-secure-store').then(SecureStore => {
      SecureStore.getItemAsync('voterData').then((data) => {
        if (data) {
          try {
            setVoterData(JSON.parse(data))
          } catch(e) {}
        }
      })
    })
  }, [])

  // Seed data if DB is empty
  useEffect(() => {
    if (aspirantsData !== undefined && aspirantsData.length === 0) {
      initAspirantsMutation({ aspirants: INITIAL_ASPIRANTS })
    }
  }, [aspirantsData, initAspirantsMutation])

  const handleSelection = useCallback(
    (raceId: string, candidateId: string | null) => {
      setSelections((prev) => ({ ...prev, [raceId]: candidateId }))
    },
    []
  )

  const completedRaceIds = Object.entries(selections)
    .filter(([, candidateId]) => candidateId !== null)
    .map(([raceId]) => raceId)

  const handleSubmit = async () => {
    if (submitStatus === 'loading') return
    setSubmitStatus('loading')

    try {
      const votesToCast = Object.entries(selections)
        .filter(([, cId]) => cId !== null)
        .map(([rId, cId]) => ({
          raceId: rId,
          aspirantId: cId as Id<'aspirants'>,
        }))
        
      await castVotesMutation({ voterPhone: voterData.phone, selections: votesToCast })
      setSubmitStatus('success')
    } catch {
      setSubmitStatus('error')
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }
  }

  function getCandidates(raceId: string): Candidate[] {
    if (!aspirantsData) return []
    return aspirantsData
      .filter(a => a.raceId === raceId)
      .map(a => ({
        id: a._id.toString(),
        name: a.name,
        party: a.party,
        avatar: AVATARS_MAP[a.avatarId] || ''
      }))
  }

  return (
    <View className="min-h-screen">
      <Text className="dark:text-white ml-4 font-bold text-4xl mt-4">
        Your Ballot
      </Text>

      <View className="flex-row items-center ml-4 gap-2">
        <Ionicons name="location" size={20} color="green" />
        <Text className="dark:text-white font-bold text-lg mt-4">
          {voterData.county} County
        </Text>
        <Ionicons name="ellipse" size={20} color="green" />
        <Text className="dark:text-white font-bold text-lg mt-4">
          {voterData.constituency} Constituency
        </Text>
      </View>

      <View className="flex-row items-center ml-4 gap-2">
        <Ionicons name="ellipse-outline" size={20} color="green" />
        <Text className="dark:text-white font-bold text-lg mt-4">
          {voterData.ward} Ward
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
          candidates={getCandidates(RACE_PRESIDENT)}
          defaultExpanded={true}
          onSelectionChange={(id) => handleSelection(RACE_PRESIDENT, id)}
        />

        <BallotSection
          category="County Executive"
          title="Governor"
          description="Choose one candidate to lead your county for the next 5-year term."
          candidates={getCandidates(RACE_GOVERNOR)}
          defaultExpanded={false}
          onSelectionChange={(id) => handleSelection(RACE_GOVERNOR, id)}
        />
        <BallotSection
          category="County Legislature"
          title="MP"
          description="Choose your preferred MP."
          candidates={getCandidates(RACE_MP)}
          defaultExpanded={false}
          onSelectionChange={(id) => handleSelection(RACE_MP, id)}
        />
        <BallotSection
          category="County Legislature"
          title="MCA"
          description="Choose your preferred MCA."
          candidates={getCandidates(RACE_MCA)}
          defaultExpanded={false}
          onSelectionChange={(id) => handleSelection(RACE_MCA, id)}
        />
        <BallotSection
          category="County Legislature"
          title="WomenRep"
          description="Choose your preferred WomenRep."
          candidates={getCandidates(RACE_WOMENREP)}
          defaultExpanded={false}
          onSelectionChange={(id) => handleSelection(RACE_WOMENREP, id)}
        />
      </ScrollView> 

      <BallotFooter
        totalRaces={5}
        completedRaceIds={completedRaceIds}
        onSubmit={handleSubmit}
        submitStatus={submitStatus}
      />
    </View>
  )
}
