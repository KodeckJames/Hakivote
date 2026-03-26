import React from 'react';
import { ScrollView } from 'react-native';
import RaceResults, { RaceCandidate } from '@/components/ui/AspirantsResults';

// ─── Candidates ───────────────────────────────────────────────────────────────

const governorCandidates: RaceCandidate[] = [
  {
    id: 'g1',
    name: 'Babu Owino',
    party: 'ODM',
    avatar: require('@/assets/images/Governors/BabuImage.jpg'),
    votes: 41_200,
  },
  {
    id: 'g2',
    name: 'Millicent Omanga',
    party: 'Jubilee',
    avatar: require('@/assets/images/Governors/OmangaImage.jpg'),
    votes: 38_750,
  },
  {
    id: 'g3',
    name: 'Johnson Sakaja',
    party: 'UDA',
    avatar: require('@/assets/images/Governors/SakajaImage.jpg'),
    votes: 55_630,
  },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function GovernorResults() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingVertical: 16 }}
      showsVerticalScrollIndicator={false}
    >
      <RaceResults
        candidates={governorCandidates}
        isLive={true}
        leadingLabel="Leading Projection"
      />
    </ScrollView>
  );
}
