import { StyleSheet, Text, View } from 'react-native'
import { BasicText } from '@/components/BasicText'

import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_900Black,
} from '@expo-google-fonts/inter'
import { List } from 'react-native-paper'

interface Data {
  breakfast: Array<Food>
  lunch: Array<Food>
  dinner: Array<Food>
  snacks: Array<Food>
}

type Occasion = 'breakfast' | 'lunch' | 'dinner' | 'snacks'

type Food = {
  id: string
  title: string
  servings: number
  score: number
}

const data: Data = {
  breakfast: [
    {
      id: '1',
      title: 'Instant oats',
      servings: 1,
      score: 2,
    },
    {
      id: '2',
      title: 'Mango',
      servings: 1,
      score: 2,
    },
    {
      id: '3',
      title: 'Table sugar',
      servings: 1,
      score: -1,
    },
  ],
  lunch: [
    {
      id: '4',
      title: 'Table sugar',
      servings: 1,
      score: -1,
    },
  ],
  dinner: [],
  snacks: [],
}

const Journal = () => {
  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_900Black,
  })

  const getOccasionTotalDQS = (occasion: Occasion) =>
    data[occasion].reduce((accumulator, { score }) => accumulator + score, 0)

  const getOccasionTotalString = (occasion: Occasion) => {
    const score = getOccasionTotalDQS(occasion)
    const isPositive = score > 1

    // todo: add chevron
    return (
      <Text
        style={{
          color: isPositive ? '#00CA2C' : '#F02835',
          fontSize: 10,
          lineHeight: 10,
        }}
      >
        {isPositive ? '+' : ''}
        {score}
      </Text>
    )
  }

  return (
    <View style={styles.container}>
      {fontsLoaded ? (
        <>
          <Text style={styles.title}>
            {/* todo: actually calculate DQS */}
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

          <View style={styles.occasion}>
            <View style={styles.timeline}>
              <View style={styles.ball}></View>
              <View style={styles.line}></View>
            </View>

            <View style={styles.occasionData}>
              <Text style={styles.h3}>
                Breakfast {getOccasionTotalString('breakfast')}{' '}
              </Text>

              <View>
                {data.breakfast.map((item) => (
                  <List.Item
                    key={item.id}
                    title={
                      <Text
                        style={{ display: 'flex', alignItems: 'flex-start' }}
                      >
                        <Text>{item.title}</Text>
                        {
                          <Text
                            style={{
                              color: item.score > 0 ? '#00CA2C' : '#F02835',
                              fontSize: 7,
                              marginLeft: 3,
                              // todo: type fix
                              lineHeight: 'normal' as any,
                            }}
                          >
                            {/* todo: add chevron */}
                            {item.score > 1 ? '+' : ''}
                            {item.score}
                          </Text>
                        }
                      </Text>
                    }
                    contentStyle={{
                      paddingLeft: 8,
                    }}
                    style={{
                      padding: 0,
                    }}
                    description={`${item.servings} serving`}
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
                          backgroundColor:
                            item.score > 0 ? '#CFFFD9' : '#FFCAD2',
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
            </View>
          </View>

          <View style={styles.occasion}>
            <View style={styles.timeline}>
              <View style={styles.ball}></View>
              <View style={styles.line}></View>
            </View>

            <View>
              <Text style={styles.h3}>
                Lunch {getOccasionTotalString('lunch')}{' '}
              </Text>

              <View>
                {data.lunch.map((item) => (
                  <List.Item
                    key={item.id}
                    title={
                      <Text
                        style={{ display: 'flex', alignItems: 'flex-start' }}
                      >
                        <Text>{item.title}</Text>
                        {
                          <Text
                            style={{
                              color: item.score > 0 ? '#00CA2C' : '#F02835',
                              fontSize: 7,
                              marginLeft: 3,
                              // todo: type fix
                              lineHeight: 'normal' as any,
                            }}
                          >
                            {/* todo: add chevron */}
                            {item.score > 1 ? '+' : ''}
                            {item.score}
                          </Text>
                        }
                      </Text>
                    }
                    contentStyle={{
                      paddingLeft: 8,
                    }}
                    style={{
                      padding: 0,
                    }}
                    description={`${item.servings} serving`}
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
                          backgroundColor:
                            item.score > 0 ? '#CFFFD9' : '#FFCAD2',
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
            </View>
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
    marginBottom: 8,
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
    marginBottom: 12,
    letterSpacing: -0.6,
    marginTop: 26,
  },
  h3: {
    fontFamily: 'Inter_600SemiBold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 4,
    letterSpacing: -0.6,
    display: 'flex',
  },
  occasion: {
    display: 'flex',
    flexDirection: 'row',
  },
  occasionData: {
    paddingBottom: 16,
  },
  timeline: {
    marginRight: 12,
    marginTop: 4,
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
  },
  ball: {
    width: 9,
    height: 9,
    borderRadius: '100%',
    backgroundColor: '#FD7121',
  },
  line: {
    width: 1,
    height: '100%',
    backgroundColor: '#FD7121',
  },
})

export default Journal
