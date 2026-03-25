import React from 'react';
import { View, Text, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Host, LinearProgressIndicator } from '@expo/ui/jetpack-compose';

// ─── Constants ────────────────────────────────────────────────────────────────

const ACCENT_LIGHT = '#2D6A4F';
const ACCENT_DARK = '#4ADE80';
const LEADING_STAR = '#F59E0B'; // amber-400

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RaceCandidate {
  id: string;
  name: string;
  party: string;
  /** Local require() or remote URI string */
  avatar: number | string;
  votes: number;
}

export interface RaceResultsProps {
  candidates: RaceCandidate[];
  /** Total votes cast — if omitted, derived from sum of candidate votes */
  totalVotes?: number;
  /** Label shown under the leading candidate's bar e.g. "LEADING PROJECTION" */
  leadingLabel?: string;
  /** Whether results are still live / incoming */
  isLive?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatVotes(n: number): string {
  return n.toLocaleString();
}

function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

// ─── CandidateRow ─────────────────────────────────────────────────────────────

interface CandidateRowProps {
  candidate: RaceCandidate;
  totalVotes: number;
  isLeader: boolean;
  leadingLabel: string;
  isDark: boolean;
  accentColor: string;
}

function CandidateRow({
  candidate,
  totalVotes,
  isLeader,
  leadingLabel,
  isDark,
  accentColor,
}: CandidateRowProps) {
  const pct = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
  const progress = totalVotes > 0 ? candidate.votes / totalVotes : 0;

  const progressColor = isLeader ? accentColor : isDark ? '#6B7280' : '#9CA3AF';
  const trackColor = isDark ? '#374151' : '#E5E7EB';

  return (
    <View className="mb-1">
      {/* Main row */}
      <View className="flex-row items-center gap-3 py-3">
        {/* Avatar */}
        <Image
          source={
            typeof candidate.avatar === 'string'
              ? { uri: candidate.avatar }
              : candidate.avatar
          }
          style={{ width: 52, height: 52, borderRadius: 26 }}
          contentFit="cover"
          placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
          transition={200}
        />

        {/* Name + Party */}
        <View className="flex-1">
          <Text className="text-[16px] font-bold text-gray-900 dark:text-gray-50 leading-snug">
            {candidate.name}
          </Text>
          <Text
            className="text-[12px] font-semibold tracking-wide uppercase mt-0.5"
            style={{ color: isLeader ? accentColor : isDark ? '#9CA3AF' : '#6B7280' }}
          >
            {candidate.party}
          </Text>
        </View>

        {/* Percent + vote count */}
        <View className="items-end">
          <Text
            className="text-[22px] font-extrabold leading-tight"
            style={{ color: isLeader ? accentColor : isDark ? '#D1D5DB' : '#374151' }}
          >
            {formatPercent(pct)}
          </Text>
          <Text className="text-[11px] font-semibold tracking-widest uppercase text-gray-400 dark:text-gray-500 mt-0.5">
            {formatVotes(candidate.votes)} votes
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <Host matchContents>
        <LinearProgressIndicator
          progress={progress}
          color={progressColor}
          trackColor={trackColor}
        />
      </Host>

      {/* Leading projection badge */}
      {isLeader && (
        <View className="flex-row items-center gap-1 mt-2">
          <Ionicons name="star" size={11} color={LEADING_STAR} />
          <Text
            className="text-[10px] font-bold tracking-widest uppercase"
            style={{ color: LEADING_STAR }}
          >
            {leadingLabel}
          </Text>
        </View>
      )}
    </View>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────

function Divider() {
  return <View className="h-px bg-gray-100 dark:bg-gray-800 my-1" />;
}

// ─── RaceResults ──────────────────────────────────────────────────────────────

export default function RaceResults({
  candidates,
  totalVotes,
  leadingLabel = 'Leading Projection',
  isLive = true,
}: RaceResultsProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const accentColor = isDark ? ACCENT_DARK : ACCENT_LIGHT;

  // Sort descending by votes
  const sorted = [...candidates].sort((a, b) => b.votes - a.votes);
  const total = totalVotes ?? sorted.reduce((sum, c) => sum + c.votes, 0);
  const leaderId = sorted[0]?.id;

  return (
    <View
      className="
        bg-white dark:bg-gray-900
        rounded-3xl border border-gray-100 dark:border-gray-800
        px-4 pt-4 pb-3 mx-4 my-2
      "
      style={{
        shadowColor: isDark ? '#000' : '#1a1a1a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isDark ? 0.4 : 0.07,
        shadowRadius: 12,
        elevation: 4,
      }}
    >
      {/* Live badge */}
      {isLive && (
        <View className="flex-row items-center gap-1.5 mb-3">
          <View
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: '#EF4444' }} // red-500
          />
          <Text className="text-[11px] font-bold tracking-widest uppercase text-red-500">
            Live Results
          </Text>
          <Text className="text-[11px] text-gray-400 dark:text-gray-600 ml-1">
            · {formatVotes(total)} total votes
          </Text>
        </View>
      )}

      {/* Candidate rows */}
      {sorted.map((candidate, index) => (
        <React.Fragment key={candidate.id}>
          <CandidateRow
            candidate={candidate}
            totalVotes={total}
            isLeader={candidate.id === leaderId}
            leadingLabel={leadingLabel}
            isDark={isDark}
            accentColor={accentColor}
          />
          {index < sorted.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </View>
  );
}