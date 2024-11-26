import { StyleSheet, Text, View } from 'react-native'
import { BasicText } from '@/components/BasicText'

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter'
import { List } from 'react-native-paper'

const DummyData = [
  {
    id: '1',
    title: 'Instant oats',
    description: '1 serving',
    score: 2,
    occasion: 'breakfast',
  },
  {
    id: '2',
    title: 'Mango',
    description: '1 serving',
    score: 2,
    occasion: 'breakfast',
  },
  {
    id: '3',
    title: 'Table sugar',
    description: '1 serving',
    score: -1,
    occasion: 'breakfast',
  },
]

const Journal = () => {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  })

  const getTotalBreakfast = () =>
    DummyData.filter((item) => item.occasion == 'breakfast').reduce(
      (accumulator, current) => accumulator + current.score,
      0,
    )

  const getBreakfastTotalString = () => {
    const score = getTotalBreakfast()
    const isPositive = score > 1

    // todo: add chevron
    return (
      <Text style={{ color: isPositive ? '#00CA2C' : '#F02835' }}>
        {isPositive ? '+' : '-'}
        {score}
      </Text>
    )
  }

  return (
    <View style={styles.container}>
      {fontsLoaded ? (
        <>
          <Text style={styles.title}>
            Nice! Your DQS score is{' '}
            <Text style={{ color: '#00CA2C' }}>+31</Text>
          </Text>
          <BasicText style={styles.subtext}>
            Keep up the good work! If you want to improve more, try cutting back
            on{' '}
            <Text style={{ fontWeight: 600, fontFamily: 'Inter_600SemiBold' }}>
              table sugar
            </Text>
            .
          </BasicText>

          <Text style={styles.h2}>Let's break it down</Text>

          <Text style={styles.h3}>Breakfast {getBreakfastTotalString()} </Text>

          <View>
            {DummyData.map((item) => (
              <List.Item
                key={item.id}
                title={
                  <Text style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <Text>{item.title}</Text>
                    {
                      <Text
                        style={{
                          color: item.score > 0 ? '#00CA2C' : '#F02835',
                          fontSize: 10,
                          marginLeft: 2,
                          // todo: fix this
                          lineHeight: 'normal' as any,
                        }}
                      >
                        {item.score > 1 ? '+' : ''}
                        {item.score}
                      </Text>
                    }
                  </Text>
                }
                contentStyle={{
                  paddingLeft: 8,
                }}
                description={item.description}
                titleStyle={{
                  fontSize: 14,
                  lineHeight: 16,
                  fontWeight: 500,
                  fontFamily: 'Inter_500Medium',
                  letterSpacing: -0.6,
                }}
                descriptionStyle={{
                  color: '#767676',
                  fontSize: 10,
                  lineHeight: 12,
                  marginTop: 3,
                  letterSpacing: -0.6,
                }}
                left={() => (
                  <View
                    style={{
                      backgroundColor: item.score > 0 ? '#CFFFD9' : '#FFCAD2',
                      width: 32,
                      height: 32,
                      borderRadius: 6,
                    }}
                  >
                    {/* todo: add SVG icons */}
                  </View>
                )}
              />
            ))}
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
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
  h3: {
    fontFamily: 'Inter_600SemiBold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 6,
    letterSpacing: -0.6,
    marginTop: 12,
  },
})

export default Journal
