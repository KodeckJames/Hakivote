import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Pressable, useColorScheme } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { Host, Checkbox } from '@expo/ui/jetpack-compose';

// ─── Constants ────────────────────────────────────────────────────────────────

/** Brand green on white backgrounds */
const ACCENT_LIGHT = '#2D6A4F';
/** Brighter green for legibility on dark backgrounds */
const ACCENT_DARK = '#4ADE80';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Candidate {
  id: string;
  name: string;
  party: string;
  /** Local require() or remote URI string */
  avatar: number | string;
}

export interface BallotSectionProps {
  /** Small uppercase label above the title e.g. "NATIONAL EXECUTIVE" */
  category: string;
  /** Bold heading e.g. "President" */
  title: string;
  /** Instructional subtitle shown when expanded */
  description?: string;
  /** List of candidates to choose from */
  candidates?: Candidate[];
  /** Start expanded or collapsed */
  defaultExpanded?: boolean;
  /** Called when the user changes their selection */
  onSelectionChange?: (candidateId: string | null) => void;
}

// ─── CandidateRow ─────────────────────────────────────────────────────────────

interface CandidateRowProps {
  candidate: Candidate;
  selected: boolean;
  onPress: () => void;
  isDark: boolean;
}

function CandidateRow({ candidate, selected, onPress, isDark }: CandidateRowProps) {
  const accentColor = isDark ? ACCENT_DARK : ACCENT_LIGHT;

  return (
    <Pressable
      onPress={onPress}
      className={[
        'flex-row items-center gap-3 px-4 py-3 rounded-2xl border',
        // Light
        selected ? 'bg-white border-[#2D6A4F]' : 'bg-white border-gray-100',
        // Dark
        selected
          ? 'dark:bg-gray-800 dark:border-[#4ADE80]'
          : 'dark:bg-gray-800 dark:border-gray-700',
      ].join(' ')}
      style={{ elevation: selected ? 2 : 0 }}
    >
      {/* Avatar */}
      <Image
        source={
          typeof candidate.avatar === 'string'
            ? { uri: candidate.avatar }
            : candidate.avatar
        }
        style={{ width: 44, height: 44, borderRadius: 22 }}
        contentFit="cover"
        placeholder={{ blurhash: 'L6PZfSi_.AyE_3t7t7R**0o#DgR4' }}
        transition={200}
      />

      {/* Name + Party */}
      <View className="flex-1">
        <Text className="text-[15px] font-semibold leading-snug text-gray-900 dark:text-gray-100">
          {candidate.name}
        </Text>
        <Text className="text-[13px] mt-0.5 text-gray-500 dark:text-gray-400">
          {candidate.party}
        </Text>
      </View>

      {/* Checkbox — color driven imperatively since it's a native prop */}
      <Host matchContents>
        <Checkbox
          value={selected}
          onCheckedChange={onPress}
        //   color={selected ? accentColor : undefined}
        />
      </Host>
    </Pressable>
  );
}

// ─── BallotSection ────────────────────────────────────────────────────────────

export default function BallotSection({
  category,
  title,
  description,
  candidates = [],
  defaultExpanded = true,
  onSelectionChange,
}: BallotSectionProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [expanded, setExpanded] = useState(defaultExpanded);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    const next = selectedId === id ? null : id;
    setSelectedId(next);
    onSelectionChange?.(next);
  };

  // Values that must be set imperatively (native props / Ionicons color)
  const accentColor = isDark ? ACCENT_DARK : ACCENT_LIGHT;
  const chevronColor = isDark ? '#D1D5DB' : '#374151'; // gray-300 : gray-700

  return (
    <View
      className="
        rounded-3xl overflow-hidden border mx-4 my-2
        bg-white       border-gray-100 shadow-sm
        dark:bg-gray-900 dark:border-gray-700 dark:shadow-none
      "
    >
      {/* Left accent bar */}
      <View
        className="absolute left-0 top-0 bottom-0 w-1 rounded-l-3xl"
        style={{ backgroundColor: accentColor }}
      />

      {/* ── Header ── */}
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={() => setExpanded(prev => !prev)}
        className="flex-row items-center justify-between px-5 pt-5 pb-4"
      >
        <View className="flex-1 pr-3">
          {/* Category label — accent colour adapts via imperative style */}
          <Text
            className="text-[11px] font-bold tracking-widest uppercase mb-1"
            style={{ color: accentColor }}
          >
            {category}
          </Text>

          {/* Title */}
          <Text className="text-[22px] font-bold leading-tight text-gray-900 dark:text-gray-50">
            {title}
          </Text>
        </View>

        {/* Chevron button */}
        <View
          className="
            w-8 h-8 rounded-full items-center justify-center
            bg-gray-50 dark:bg-gray-800
          "
        >
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={chevronColor}
          />
        </View>
      </TouchableOpacity>

      {/* ── Body (collapsible) ── */}
      {expanded && (
        <View className="px-5 pb-5">
          {description && (
            <Text
              className="text-[13px] leading-relaxed mb-4 text-gray-500 dark:text-gray-400"
            >
              {description}
            </Text>
          )}

          <View className="gap-3">
            {candidates.map(candidate => (
              <CandidateRow
                key={candidate.id}
                candidate={candidate}
                selected={selectedId === candidate.id}
                onPress={() => handleSelect(candidate.id)}
                isDark={isDark}
              />
            ))}

            {candidates.length === 0 && (
              <Text className="text-sm text-center py-4 text-gray-400 dark:text-gray-600">
                No candidates available.
              </Text>
            )}
          </View>
        </View>
      )}
    </View>
  );
}