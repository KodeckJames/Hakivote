import React from 'react';
import { ScrollView } from 'react-native';
import RaceResults, { RaceCandidate } from '@/components/ui/AspirantsResults';

// ─── Candidates ───────────────────────────────────────────────────────────────

const mpCandidates: RaceCandidate[] = [
  {
    id: 'mp1',
    name: 'Ronald Karauri',
    party: 'Independent',
    avatar: require('@/assets/images/MPs/KarauriImage.jpeg'),
    votes: 22_410,
  },
  {
    id: 'mp2',
    name: 'Phelix Odiwuor',
    party: 'ODM',
    avatar: require('@/assets/images/MPs/JalangoImage.jpg'),
    votes: 31_850,
  },
  {
    id: 'mp3',
    name: 'Karen Nyamu',
    party: 'UDA',
    avatar: require('@/assets/images/MPs/NyamuImage.png'),
    votes: 18_760,
  },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function MPResults() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingVertical: 16 }}
      showsVerticalScrollIndicator={false}
    >
      <RaceResults
        candidates={mpCandidates}
        isLive={true}
        leadingLabel="Leading Projection"
      />
    </ScrollView>
  );
}
