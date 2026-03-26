import React from 'react';
import { ScrollView } from 'react-native';
import RaceResults, { RaceCandidate } from '@/components/ui/AspirantsResults';

// ─── Candidates ───────────────────────────────────────────────────────────────

const womenRepCandidates: RaceCandidate[] = [
  {
    id: 'wr1',
    name: 'Hanifa Adan',
    party: 'UDA',
    avatar: require('@/assets/images/WomenReps/HanifaImage.png'),
    votes: 14_520,
  },
  {
    id: 'wr2',
    name: 'Esther Passaris',
    party: 'ODM',
    avatar: require('@/assets/images/WomenReps/PassarisImage.jpg'),
    votes: 21_340,
  },
  {
    id: 'wr3',
    name: 'Gloria Orwoba',
    party: 'Independent',
    avatar: require('@/assets/images/WomenReps/OrwobaImage.png'),
    votes: 9_870,
  },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function WomenRepsResults() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingVertical: 16 }}
      showsVerticalScrollIndicator={false}
    >
      <RaceResults
        candidates={womenRepCandidates}
        isLive={true}
        leadingLabel="Leading Projection"
      />
    </ScrollView>
  );
}
