import { StyleSheet, Text, View } from 'react-native'
import { List } from 'react-native-paper'

import { Data } from '@/app/journal'
import { FoodCategory, Occasion } from '@/types/Types'

import PlusIcon from './icons/Plus'
import FruitIcon from './icons/Fruit'
import SweetIcon from './icons/Sweet'
import WholeGrainIcon from './icons/WholeGrain'

interface Props {
  data: Data
  handleOnButtonClick: (occasion: Occasion) => void
  occasion: Occasion
  isLast?: boolean
}

const JournalOccasion = ({
  data,
  handleOnButtonClick,
  occasion,
  isLast,
}: Props) => {
  const getOccasionTotalDQS = (occasion: Occasion) =>
    data[occasion].reduce((accumulator, { score }) => accumulator + score, 0)

  const getOccasionTotalString = (occasion: Occasion) => {
    const score = getOccasionTotalDQS(occasion)
    const isPositive = score >= 0
    const isZero = score === 0

    // todo: add chevron
    return (
      <Text
        style={{
          color: isPositive ? '#00CA2C' : '#F02835',
          fontSize: 10,
          lineHeight: 10,
        }}
      >
        {!isZero && isPositive ? '+' : ''}
        {score}
      </Text>
    )
  }

  // todo: create more icons for other categories.
  const getIcon = (category: FoodCategory) => {
    let icon = <></>
    switch (category) {
      case 'fruit':
        icon = <FruitIcon />
        break
      case 'sweets':
        icon = <SweetIcon />
        break
      case 'whole-grains':
        icon = <WholeGrainIcon />
        break
    }
    return icon
  }

  return (
    <View style={styles.occasion}>
      <View style={styles.timeline}>
        <View style={styles.ball}></View>
        <View style={isLast ? styles.lastLine : styles.line}></View>
      </View>

      <View style={!isLast ? styles.occasionData : null}>
        <Text style={styles.h3}>
          {occasion} {getOccasionTotalString(occasion)}
        </Text>

        <View>
          {data[occasion].map((item, i) => (
            <List.Item
              key={i}
              title={
                <Text style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Text>{item.title}</Text>
                  {
                    <Text
                      style={{
                        color: item.score >= 0 ? '#00CA2C' : '#F02835',
                        fontSize: 7,
                        marginLeft: 3,
                        // todo: type fix
                        lineHeight: 'normal' as any,
                      }}
                    >
                      {/* todo: add chevron */}
                      {item.score > 0 ? '+' : ''}
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
                    backgroundColor: item.score >= 0 ? '#CFFFD9' : '#FFCAD2',
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getIcon(item.category)}
                </View>
              )}
            />
          ))}

          <List.Item
            onPress={() => handleOnButtonClick(occasion)}
            key="add more"
            title="Add new item"
            contentStyle={{
              paddingLeft: 8,
            }}
            style={{
              padding: 0,
            }}
            titleStyle={{
              fontSize: 12,
              lineHeight: 14,
              fontWeight: 400,
              fontFamily: 'Inter_400Regular',
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
                  width: 24,
                  height: 24,
                  marginLeft: 4,
                  marginRight: 4,
                  borderRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#D9D9D9',
                }}
              >
                <PlusIcon />
              </View>
            )}
          />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  h3: {
    fontFamily: 'Inter_600SemiBold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 19,
    marginBottom: 4,
    letterSpacing: -0.6,
    display: 'flex',
    textTransform: 'capitalize',
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
  lastLine: {
    width: 1,
    height: '100%',
    backgroundImage:
      'linear-gradient(180deg, rgba(253,113,33,1) 0%, rgba(253,113,33,1) 42%, rgba(253,113,33,0.7035407913165266) 60%, rgba(255,255,255,0) 100%)',
  },
})

export default JournalOccasion
