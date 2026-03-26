import OtpInput from '@/components/base/otp-input'
import { useFonts } from 'expo-font'
import { SymbolView } from 'expo-symbols'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { FadeInUp } from 'react-native-reanimated'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useAuthActions } from '@convex-dev/auth/react'

const wait = async <T extends number>(ms: T): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms))

export default function App() {
  const [fontLoaded] = useFonts({
    SfProRounded: require('@/assets/fonts/sf-pro-rounded.ttf'),
    HelveticaNowDisplay: require('@/assets/fonts/HelveticaNowDisplayMedium.ttf'),
  })

  const [code, setCode] = useState<string>('')
  const [error, setError] = useState<boolean>(false)

  const { phone } = useLocalSearchParams()
  const { signIn } = useAuthActions()
  const router = useRouter()

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            fontLoaded && { fontFamily: 'HelveticaNowDisplay' },
          ]}
        >
          Verification
        </Text>

        <Text
          style={[
            styles.subtitle,
            fontLoaded && { fontFamily: 'SfProRounded' },
          ]}
        >
          Enter the code sent to your phone
        </Text>

        <View style={styles.inputWrapper}>
          <OtpInput
            onInputChange={setCode}
            otpCount={4}
            animationVariant="fadeSlideDown"
            focusedBackgroundColor="#000000"
            enableAutoFocus={true}
            unfocusedBackgroundColor="#000000"
            focusedBorderColor="#b4adad"
            unfocusedBorderColor="#4f4f4f"
            errorBackgroundColor="#2d1f1f"
            errorBorderColor="#f44336"
            enteringAnimated={FadeInUp}
            inputBorderRadius={10}
            inputHeight={70}
            error={error}
            textStyle={{
              fontFamily: fontLoaded ? 'HelveticaNowDisplay' : undefined,
              fontSize: 24,
            }}
            onInputFinished={async (input: string) => {
              try {
                if (!phone) throw new Error('Phone number is missing')
                await signIn('phone', { phone: phone as string, code: input })
                router.replace('/(tabs)')
              } catch (err) {
                console.log(err)
                setError(true)
                wait<number>(2000).then<void, never>(() => {
                  setError(false)
                })
              }
            }}
            inputWidth={70}
          />
        </View>

        <Text
          style={[styles.resend, fontLoaded && { fontFamily: 'SfProRounded' }]}
        >
          Resend code
        </Text>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 32,
  },
  content: {
    alignItems: 'center',
    gap: 16,
    top: 10,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
  },
  inputWrapper: {
    marginVertical: 24,
  },
  resend: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'underline',
  },
})
