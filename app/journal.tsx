import { StyleSheet, Text, View } from 'react-native'
import { BasicText } from '@/components/BasicText'

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter'

const Journal = () => {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Nice! Your DQS score is <Text style={{ color: '#00CA2C' }}>+31</Text>
      </Text>
      <BasicText style={styles.subtext}>
        Keep up the good work! If you want to improve more, try cutting back on{' '}
        <Text style={{ fontWeight: 600, fontFamily: 'Inter_600SemiBold' }}>
          table sugar
        </Text>
        .
      </BasicText>
      <Text style={styles.h2}>Let's break it down</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 24,
    backgroundColor: 'white',
  },
  title: {
    fontFamily: 'Inter_900Black',
    fontSize: 24,
    lineHeight: 29,
    marginBottom: 6,
    letterSpacing: -0.6,
  },
  subtext: {
    opacity: 0.6,
    marginBottom: 4,
    fontWeight: 300,
    fontFamily: 'Inter_300Light',
  },
  h2: {
    fontFamily: 'Inter_900Black',
    fontSize: 18,
    lineHeight: 22,
    marginBottom: 6,
    letterSpacing: -0.6,
    marginTop: 26,
  },
})

export default Journal
