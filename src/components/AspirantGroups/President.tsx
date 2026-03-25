import React from 'react';
import { ScrollView } from 'react-native';
import RaceResults, { RaceCandidate } from '@/components/ui/AspirantsResults';

// ─── Dummy data ───────────────────────────────────────────────────────────────

const presidentCandidates: RaceCandidate[] = [
  {
    id: 'p1',
    name: 'David Kamau',
    party: 'United Front (UF)',
    avatar: 'https://i.pravatar.cc/150?img=11',
    votes: 74_852,
  },
  {
    id: 'p2',
    name: 'Sarah Otieno',
    party: 'Reform Party',
    avatar: 'https://i.pravatar.cc/150?img=45',
    votes: 58_853,
  },
  {
    id: 'p3',
    name: 'John Musyoka',
    party: 'Independent',
    avatar: 'https://i.pravatar.cc/150?img=52',
    votes: 9_142,
  },
];

const governorCandidates: RaceCandidate[] = [
  {
    id: 'g1',
    name: 'Alice Njeri',
    party: 'United Front (UF)',
    avatar: 'https://i.pravatar.cc/150?img=32',
    votes: 41_200,
  },
  {
    id: 'g2',
    name: 'Peter Mwangi',
    party: 'Progressive Alliance',
    avatar: 'https://i.pravatar.cc/150?img=60',
    votes: 38_750,
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
      {/* Presidential race — live, auto-derives total */}
      <RaceResults
        candidates={presidentCandidates}
        isLive={true}
        leadingLabel="Leading Projection"
      />

      {/* Governor race — supply total explicitly */}
      <RaceResults
        candidates={governorCandidates}
        totalVotes={100_000}
        isLive={true}
        leadingLabel="Leading Projection"
      />
    </ScrollView>
  );
}