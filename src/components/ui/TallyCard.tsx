import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface NationalTallyCardProps {
  totalVotes?: number;
  verifiedStations?: number;
}

export default function TallyCard({
  totalVotes = 142847,
  verifiedStations = 68,
}: NationalTallyCardProps) {
  const formattedVotes = totalVotes.toLocaleString();

  return (
    <View className="bg-[#1a4a2e] rounded-3xl p-7 overflow-hidden mx-4 my-2">
      {/* Watermark diamond icon — absolutely positioned */}
      <View className="absolute right-3 top-3 opacity-10">
        <Ionicons name="checkmark-done" size={90} color="white" />
      </View>

      {/* Label */}
      <Text className="text-white/70 text-[10px] font-semibold tracking-widest uppercase mb-1">
        National Tally
      </Text>

      {/* Vote count */}
      <Text className="text-white text-4xl font-bold tracking-tight">
        {formattedVotes}
      </Text>

      {/* Subtitle */}
      <Text className="text-white/60 text-xs mt-0.5 mb-4">votes counted</Text>

      {/* Footer row */}
      <View className="flex-row items-center gap-2">
        {/* Three stacked circle icons */}
        <View className="flex-row items-center">
          <View className="w-6 h-6 rounded-full bg-white/20 items-center justify-center -mr-1 z-30">
            <Ionicons name="ellipse" size={8} color="rgba(255,255,255,0.5)" />
          </View>
          <View className="w-6 h-6 rounded-full bg-white/20 items-center justify-center -mr-1 z-20">
            <Ionicons name="ellipse" size={8} color="rgba(255,255,255,0.5)" />
          </View>
          <View className="w-6 h-6 rounded-full bg-white/20 items-center justify-center z-10">
            <Ionicons name="ellipse" size={8} color="rgba(255,255,255,0.5)" />
          </View>
        </View>

        {/* Verified stations label */}
        <Text className="text-white/60 text-[10px] font-semibold tracking-wider uppercase ml-1">
          Verified Stations: {verifiedStations}%
        </Text>
      </View>
    </View>
  );
}