import { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List, Button, Portal, Dialog, TextInput } from 'react-native-paper'
import { PaperSelect } from 'react-native-paper-select'

import { Data } from '@/app/journal'
import { Food, FoodCategory, Occasion } from '@/types/Types'

import DotsIcon from './icons/Dots'
import PlusIcon from './icons/Plus'
import SweetIcon from './icons/Sweet'
import FruitIcon from './icons/Fruit'
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
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingData, setEditingData] = useState<Food | undefined>()

  const [servingInput, setServingInput] = useState<number | undefined>()

  // todo: fix type
  const [categoryInput, setCategoryInput] = useState<any>({
    value: '',
    list: [
      { _id: 'fruit', value: 'Fruit' },
      { _id: 'vegetables', value: 'Vegetables' },
      { _id: 'whole-grains', value: 'Whole Grains' },
      { _id: 'lean-meat-or-fish', value: 'Lean Meat Or Fish' },
      { _id: 'nuts-and-seeds', value: 'Nuts And Seeds' },
      { _id: 'dairy', value: 'Dairy' },
      { _id: 'refined-grains', value: 'Refined Grains' },
      { _id: 'sweets', value: 'Sweets' },
      { _id: 'fried-foods', value: 'Fried Foods' },
      { _id: 'fatty-proteins', value: 'Fatty Proteins' },
      { _id: 'other', value: 'Other' },
    ],
    selectedList: [],
    error: '',
  })

  const singleSelectRef = useRef(null)

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
          ...styles.dqsScore,
          ...(isPositive ? styles.positive : styles.negative),
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
      case 'Fruit':
        icon = <FruitIcon />
        break
      case 'Sweets':
        icon = <SweetIcon />
        break
      case 'Whole Grains':
        icon = <WholeGrainIcon />
        break
    }
    return icon
  }

  const handleOnItemButtonPress = (item: Food) => {
    setIsEditDialogOpen(true)
    setEditingData(item)
    setServingInput(item.servings)
    setCategoryInput({
      ...categoryInput,
      value: item.category,
      selectedList: [
        // todo: fix type
        categoryInput.list.find(
          (listItem: any) => listItem.value === item.category,
        ),
      ],
    })
  }

  const dismissDialog = () => {
    setIsEditDialogOpen(false)
  }

  const updateData = () => {
    const update = async (updatedData: Data) => {
      try {
        const response = await fetch(
          `http://localhost:3000/journal/${data?.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
          },
        )
        if (!response.ok) {
          throw new Error('Failed to fetch')
        }
        dismissDialog()
      } catch (err) {
        // todo: handle error
      }
    }

    if (editingData) {
      const index = data[occasion].indexOf(editingData)

      let newData = data
      newData[occasion][index] = {
        ...newData[occasion][index],
        category: categoryInput.value,
        servings: servingInput || 1,
      }

      update(newData)
    }
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
              right={() => (
                <View style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button
                    mode="text"
                    onPress={() => handleOnItemButtonPress(item)}
                  >
                    <DotsIcon />
                  </Button>
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

      <Portal>
        <Dialog
          visible={isEditDialogOpen}
          onDismiss={dismissDialog}
          style={{
            backgroundColor: 'white',
          }}
        >
          <Dialog.Title style={{ textTransform: 'capitalize' }}>
            Edit <strong>{editingData?.title}</strong>
          </Dialog.Title>
          <Dialog.Content>
            <Text>Servings</Text>
            <TextInput
              value={`${servingInput}`}
              onChangeText={(e) => {
                setServingInput(Number(e))
              }}
              error={Number(servingInput) < 1}
              placeholder="Number of servings."
            />

            <PaperSelect
              inputRef={singleSelectRef}
              label="Select Gender"
              value={categoryInput.value || ''}
              // todo: fix type
              onSelection={(value: any) => {
                setCategoryInput({
                  ...categoryInput,
                  value: value.text,
                  selectedList: value.selectedList,
                  error: '',
                })
              }}
              arrayList={[...categoryInput.list]}
              selectedArrayList={[...categoryInput.selectedList]}
              multiEnable={false}
              hideSearchBox={true}
              textInputMode="outlined"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={dismissDialog}>Cancel</Button>
            <Button
              disabled={!servingInput && !categoryInput}
              onPress={updateData}
              mode="contained"
              style={{ paddingLeft: 8, paddingRight: 8, borderRadius: 6 }}
            >
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    paddingRight: 16,
    width: '100%',
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
  dqsScore: {
    fontSize: 10,
    lineHeight: 10,
  },
  positive: {
    color: '#00CA2C',
  },
  negative: {
    color: '#F02835',
  },
})

export default JournalOccasion
