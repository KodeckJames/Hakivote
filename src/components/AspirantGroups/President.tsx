import React from 'react';
import { ScrollView } from 'react-native';
import RaceResults, { RaceCandidate } from '@/components/ui/AspirantsResults';

// ─── Candidates ───────────────────────────────────────────────────────────────

const presidentialCandidates: RaceCandidate[] = [
  {
    id: 'c1',
    name: 'Edwin Sifuna',
    party: 'ODM',
    avatar: require('@/assets/images/Presidents/SifunaImage.png'),
    votes: 48_320,
  },
  {
    id: 'c2',
    name: 'David Maraga',
    party: 'Independent',
    avatar: require('@/assets/images/Presidents/MaragaImage.jpg'),
    votes: 35_780,
  },
  {
    id: 'c3',
    name: "Fred Matiang'i",
    party: 'Jubilee',
    avatar: require('@/assets/images/Presidents/MatiangiImage.jpg'),
    votes: 62_410,
  },
  {
    id: 'c4',
    name: 'Rigathi Gachagua',
    party: 'Independent',
    avatar: require('@/assets/images/Presidents/GachaguaImage.jpg'),
    votes: 74_852,
  },
  {
    id: 'c5',
    name: 'Kalonzo Musyoka',
    party: 'Independent',
    avatar: require('@/assets/images/Presidents/KalonzoImage.jpg'),
    votes: 58_930,
  },
  {
    id: 'c6',
    name: 'William Ruto',
    party: 'UDA',
    avatar: require('@/assets/images/Presidents/RutoImage.jpg'),
    votes: 81_540,
  },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function PresidentResults() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingVertical: 16 }}
      showsVerticalScrollIndicator={false}
    >
      <RaceResults
        candidates={presidentialCandidates}
        isLive={true}
        leadingLabel="Leading Projection"
      />
    </ScrollView>
  );
}