import React from 'react';
import { ScrollView } from 'react-native';
import RaceResults, { RaceCandidate } from '@/components/ui/AspirantsResults';

// ─── Candidates ───────────────────────────────────────────────────────────────

const mcaCandidates: RaceCandidate[] = [
  {
    id: 'mca1',
    name: 'Mwaura Samora',
    party: 'UDA',
    avatar: require('@/assets/images/MCAs/SamoraImage.jpeg'),
    votes: 8_430,
  },
  {
    id: 'mca2',
    name: 'Kevin Gitonga',
    party: 'ODM',
    avatar: require('@/assets/images/MCAs/GitongaImage.jpg'),
    votes: 11_270,
  },
  {
    id: 'mca3',
    name: 'Brian Maina',
    party: 'Independent',
    avatar: require('@/assets/images/MCAs/MainaImage.jpg'),
    votes: 6_890,
  },
  {
    id: 'mca4',
    name: 'Hosea Wambugu',
    party: 'Jubilee',
    avatar: require('@/assets/images/MCAs/WambuguImage.jpg'),
    votes: 9_120,
  },
];

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function MCAResults() {
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ paddingVertical: 16 }}
      showsVerticalScrollIndicator={false}
    >
      <RaceResults
        candidates={mcaCandidates}
        isLive={true}
        leadingLabel="Leading Projection"
      />
    </ScrollView>
  );
}
