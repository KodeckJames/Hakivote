import { CountdownTimer } from '@/components/CountDown'
import { useFonts } from 'expo-font'
import { StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

export default function CountDownUI() {
  const [fontLoaded] = useFonts({
    SfProRounded: require('@/assets/fonts/sf-pro-rounded.ttf'),
    HelveticaNowDisplay: require('@/assets/fonts/HelveticaNowDisplayMedium.ttf'),
    Coolvetica: require('@/assets/fonts/Coolvetica-Rg.otf'),
  })

  const launchDate = new Date('2026-03-28T00:21:00')

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.content}>
        <Text
          className=" dark:text-white text-xl font-bold"
          //   style={[{ fontFamily: "SfProRounded" }]}
        >
          Poll Closes in
        </Text>

        <CountdownTimer
          targetDate={launchDate}
          customization={{
            numberColor: '#fff',
            labelColor: 'green',
            separatorColor: 'green',
            showLabels: true,
            showSeparators: true,
            showDays: true,
            numberSize: 30,
            // fontFamily: fontLoaded ? "SfProRounded" : undefined,
          }}
        />
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#0a0a0a",
  },
  content: {
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  iconBox: {
    width: 64,
    // height: 64,
    borderRadius: 20,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#555',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  date: {
    fontSize: 15,
    color: '#333',
    // marginTop: 8,
  },
})
