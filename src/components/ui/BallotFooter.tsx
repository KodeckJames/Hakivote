import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  useColorScheme,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ─── Constants ────────────────────────────────────────────────────────────────

const ACCENT_LIGHT = '#2D6A4F';
const ACCENT_DARK = '#4ADE80';

// ─── Types ────────────────────────────────────────────────────────────────────

export type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

export interface BallotFooterProps {
  /** Total number of races on the ballot */
  totalRaces: number;
  /** IDs of races that have a selection made */
  completedRaceIds: string[];
  /** Called when the user presses "Submit Votes" */
  onSubmit: () => void | Promise<void>;
  /** Controlled submission state — drive from parent for async feedback */
  submitStatus?: SubmitStatus;
  /** Override the default "Submit Votes" label */
  submitLabel?: string;
}

// ─── ProgressDot ─────────────────────────────────────────────────────────────

interface DotProps {
  filled: boolean;
  accentColor: string;
  isDark: boolean;
}

function ProgressDot({ filled, accentColor, isDark }: DotProps) {
  const scale = useRef(new Animated.Value(filled ? 1 : 0.85)).current;
  const opacity = useRef(new Animated.Value(filled ? 1 : 0.4)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: filled ? 1 : 0.85,
        useNativeDriver: true,
        damping: 12,
        stiffness: 180,
      }),
      Animated.timing(opacity, {
        toValue: filled ? 1 : 0.35,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [filled]);

  return (
    <Animated.View
      style={[
        {
          width: filled ? 20 : 8,
          height: 6,
          borderRadius: 3,
          backgroundColor: filled
            ? accentColor
            : isDark
            ? '#4B5563' // gray-600
            : '#D1D5DB', // gray-300
          marginHorizontal: 2,
          transform: [{ scaleY: scale }],
          opacity,
        },
      ]}
    />
  );
}

// ─── BallotFooter ─────────────────────────────────────────────────────────────

export default function BallotFooter({
  totalRaces,
  completedRaceIds,
  onSubmit,
  submitStatus = 'idle',
  submitLabel = 'Submit Votes',
}: BallotFooterProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const accentColor = isDark ? ACCENT_DARK : ACCENT_LIGHT;

  const completedCount = completedRaceIds.length;
  const allDone = completedCount === totalRaces && totalRaces > 0;
  const isLoading = submitStatus === 'loading';
  const isSuccess = submitStatus === 'success';
  const isError = submitStatus === 'error';
  const isDisabled = isLoading || isSuccess;

  // ── Slide-up entrance ──
  const translateY = useRef(new Animated.Value(80)).current;
  const footerOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        damping: 18,
        stiffness: 160,
      }),
      Animated.timing(footerOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // ── Button press scale ──
  const btnScale = useRef(new Animated.Value(1)).current;
  const onPressIn = () =>
    Animated.spring(btnScale, {
      toValue: 0.97,
      useNativeDriver: true,
      damping: 14,
    }).start();
  const onPressOut = () =>
    Animated.spring(btnScale, {
      toValue: 1,
      useNativeDriver: true,
      damping: 14,
    }).start();

  // ── Derive button appearance ──
  const buttonBg = (() => {
    if (isSuccess) return isDark ? '#14532D' : '#DCFCE7'; // green-950 / green-100
    if (isError) return isDark ? '#450A0A' : '#FEE2E2';   // red-950 / red-100
    if (allDone) return accentColor;
    return isDark ? '#1F2937' : '#F3F4F6';                // gray-800 / gray-100
  })();

  const buttonTextColor = (() => {
    if (isSuccess) return isDark ? '#4ADE80' : ACCENT_LIGHT;
    if (isError) return isDark ? '#FCA5A5' : '#B91C1C';
    if (allDone) return '#FFFFFF';
    return isDark ? '#6B7280' : '#9CA3AF'; // gray-500
  })();

  const buttonLabel = (() => {
    if (isSuccess) return 'Votes Submitted!';
    if (isError) return 'Submission Failed — Retry';
    return submitLabel;
  })();

  const buttonIcon = (() => {
    if (isSuccess) return 'checkmark-circle';
    if (isError) return 'alert-circle';
    return 'ballot-outline' as any; // use box-outline as a ballot fallback
  })();

  return (
    <Animated.View
      className="
        absolute bottom-24 left-4 right-4
        rounded-3xl border px-5 py-4
        bg-white border-gray-100 shadow-lg
        dark:bg-gray-900 dark:border-gray-700
      "
      // Elevation for Android shadow
      style={[
        {
          transform: [{ translateY }],
          opacity: footerOpacity,
          elevation: 12,
          shadowColor: isDark ? '#000' : '#1a1a1a',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: isDark ? 0.5 : 0.1,
          shadowRadius: 16,
        },
      ]}
    >
      {/* ── Progress row ── */}
      <View className="flex-row items-center justify-between mb-4">
        <View className="flex-1">
          {/* Label */}
          <Text className="text-[10px] font-bold tracking-widest uppercase mb-1 text-gray-400 dark:text-gray-500">
            Progress
          </Text>

          {/* Count */}
          <Text className="text-[17px] font-bold text-gray-900 dark:text-gray-50">
            <Text style={{ color: accentColor }}>{completedCount}</Text>
            {` of ${totalRaces} race${totalRaces !== 1 ? 's' : ''} selected`}
          </Text>
        </View>

        {/* Dot indicators */}
        <View className="flex-row items-center ml-3">
          {Array.from({ length: totalRaces }).map((_, i) => (
            <ProgressDot
              key={i}
              filled={i < completedCount}
              accentColor={accentColor}
              isDark={isDark}
            />
          ))}
        </View>
      </View>

      {/* ── Submit button ── */}
      <TouchableOpacity
        activeOpacity={0.85}
        disabled={isDisabled}
        onPress={onSubmit}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Animated.View
          style={[
            {
              backgroundColor: buttonBg,
              transform: [{ scale: btnScale }],
              borderRadius: 16,
              paddingVertical: 14,
              paddingHorizontal: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={isDark ? '#9CA3AF' : '#6B7280'}
            />
          ) : (
            <Ionicons
              name={isSuccess ? 'checkmark-circle' : isError ? 'alert-circle' : 'checkbox-outline'}
              size={20}
              color={buttonTextColor}
            />
          )}

          <Text
            style={{ color: buttonTextColor }}
            className="text-[15px] font-semibold tracking-wide"
          >
            {isLoading ? 'Submitting…' : buttonLabel}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
}