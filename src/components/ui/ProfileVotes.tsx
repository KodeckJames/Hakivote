import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useColorScheme } from 'nativewind'

export type VoteStatus = 'confirmed' | 'pending'

export interface Candidate {
  role: string
  name: string
  status?: VoteStatus
  onPress?: () => void
}

export interface VotingReceiptCardProps {
  transactionHash: string
  dateTime: string
  candidates: Candidate[]
  className?: string
}

const VotingReceiptCard: React.FC<VotingReceiptCardProps> = ({
  transactionHash,
  dateTime,
  candidates,
  className = '',
}) => {
  const { colorScheme } = useColorScheme()
  const isDark = colorScheme === 'dark'

  // Theme constants
  const accentColor = isDark ? '#4ADE80' : '#2D6A4F'
  const mutedText =
    'text-[9px] font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-1'

  return (
    <View
      className={`bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm ${className}`}
    >
      {/* Header */}
      <View className="flex-row justify-between px-4 pt-4 pb-3 border-b border-gray-100 dark:border-gray-700">
        <View className="flex-1">
          <Text className={mutedText}>Transaction Hash</Text>
          <Text
            className="text-sm font-semibold"
            style={{ color: accentColor }}
            numberOfLines={1}
          >
            {transactionHash}
          </Text>
        </View>

        <View className="items-end ml-4">
          <Text className={mutedText}>Date & Time</Text>
          <Text className="text-sm font-semibold text-gray-900 dark:text-gray-50">
            {dateTime}
          </Text>
        </View>
      </View>

      {/* Candidate List */}
      {candidates.map((item, index) => {
        const { role, name, status = 'confirmed', onPress } = item
        const RowWrapper = onPress ? TouchableOpacity : View
        const isLast = index === candidates.length - 1

        return (
          <View key={`${role}-${index}`}>
            <RowWrapper
              onPress={onPress}
              activeOpacity={0.7}
              className="bg-white dark:bg-gray-800 px-4 py-3 flex-row items-center justify-between"
            >
              <View className="flex-1 mr-3">
                <Text className="text-[10px] font-semibold tracking-widest uppercase text-gray-500 dark:text-gray-400 mb-0.5">
                  {role}
                </Text>
                <Text
                  className="text-[15px] font-semibold text-gray-900 dark:text-gray-50"
                  numberOfLines={1}
                >
                  {name}
                </Text>
              </View>

              {/* Status Badge */}
              <View
                className={`w-7 h-7 rounded-full items-center justify-center ${status === 'pending' ? 'border-2 border-gray-300 dark:border-gray-600' : ''}`}
                style={
                  status === 'confirmed'
                    ? { backgroundColor: accentColor }
                    : undefined
                }
              >
                <Feather
                  name={status === 'confirmed' ? 'check' : 'edit-2'}
                  size={status === 'confirmed' ? 14 : 13}
                  color={
                    status === 'confirmed'
                      ? isDark
                        ? '#14532D'
                        : '#fff'
                      : isDark
                        ? '#D1D5DB'
                        : '#374151'
                  }
                />
              </View>
            </RowWrapper>
            {!isLast && (
              <View className="h-px bg-gray-100 dark:bg-gray-700 mx-4" />
            )}
          </View>
        )
      })}

      {/* Bottom accent strip */}
      <View
        className="h-1 w-full"
        style={{ backgroundColor: accentColor, opacity: 0.15 }}
      />
    </View>
  )
}

export default VotingReceiptCard
