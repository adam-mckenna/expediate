import { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List, Button, Portal, Dialog, TextInput } from 'react-native-paper'
import { PaperSelect } from 'react-native-paper-select'
import { ListItem } from 'react-native-paper-select/lib/typescript/interface/paperSelect.interface'

import { Food, FoodCategory, Occasion } from '@/types/Journal'

import DotsIcon from '../../components/icons/Dots'
import PlusIcon from '../../components/icons/Plus'
import SweetIcon from '../../components/icons/Sweet'
import FruitIcon from '../../components/icons/Fruit'
import WholeGrainIcon from '../../components/icons/WholeGrain'
import { useAppTheme } from '../_layout'

interface Props {
  occasion: Occasion
  foods: Array<Food>
  handleOnButtonClick: (occasion: Occasion) => void
  isLast?: boolean
  updateFoodEntry: (
    Occasion: Occasion,
    data: Food | undefined,
    category: FoodCategory,
    servings: number,
  ) => void
}

type CategoryInput = {
  value: FoodCategory | ''
  list: Array<ListItem>
  selectedList: Array<ListItem>
  error: string
}

const JournalOccasion = ({
  foods,
  handleOnButtonClick,
  occasion,
  isLast,
  updateFoodEntry,
}: Props) => {
  const theme = useAppTheme()

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
      backgroundColor: theme.colors.primary,
    },
    line: {
      width: 1,
      height: '100%',
      backgroundColor: theme.colors.primary,
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
      color: theme.colors.positive,
    },
    negative: {
      color: theme.colors.negative,
    },
    listItem: {
      paddingRight: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    listItemTitleText: {
      fontSize: 14,
      lineHeight: 16,
      fontWeight: 500,
      fontFamily: 'Inter_500Medium',
      letterSpacing: -0.6,
    },
    listitemAddNewTitleText: {
      fontSize: 12,
      lineHeight: 14,
      fontWeight: 400,
      fontFamily: 'Inter_400Regular',
      letterSpacing: -0.6,
    },
    listItemAddNewIconWrapper: {
      width: 28,
      height: 28,
      marginLeft: 5,
      marginRight: 5,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.outline,
    },
    listItemDescription: {
      color: theme.colors.grey,
      fontSize: 10,
      lineHeight: 12,
      marginTop: 3,
      letterSpacing: -0.6,
    },
    listItemTitle: { display: 'flex', alignItems: 'flex-start' },
    listItemTitleTextInner: { textTransform: 'capitalize' },
    listItemTitleScore: {
      fontSize: 7,
      marginLeft: 3,
      // todo: fix type
      lineHeight: 'normal' as any,
    },
    listItemContent: {
      paddingLeft: 8,
      maxHeight: 38,
    },
    listItemIconWrapper: {
      width: 38,
      height: 38,
      borderRadius: 6,
      alignItems: 'center',
      justifyContent: 'center',
    },
    listItemViewMore: {
      display: 'flex',
      justifyContent: 'center',
      height: 38,
      width: 38,
    },
    listItemViewMoreButton: { minWidth: 38 },
    editDialog: {
      backgroundColor: 'white',
    },
    editDialogSubmitButton: {
      paddingLeft: 8,
      paddingRight: 8,
      borderRadius: 6,
    },
    positiveBackground: {
      backgroundColor: theme.colors.positiveBackground,
    },
    negativeBackground: {
      backgroundColor: theme.colors.negativeBackground,
    },
  })

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  const [editingData, setEditingData] = useState<Food | undefined>()

  const [servingInput, setServingInput] = useState<number | undefined>()

  const [categoryInput, setCategoryInput] = useState<CategoryInput>({
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

  const getOccasionTotalDQS = () =>
    foods.reduce((accumulator, { score }) => accumulator + score, 0)

  const getOccasionTotalString = () => {
    const score = getOccasionTotalDQS()
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
  const iconMap: Record<FoodCategory, JSX.Element> = {
    'Whole Grains': <WholeGrainIcon />,
    'Lean Meat Or Fish': <></>,
    'Nuts And Seeds': <></>,
    'Refined Grains': <></>,
    'Fried Foods': <></>,
    'Fatty Proteins': <></>,
    Fruit: <FruitIcon />,
    Sweets: <SweetIcon />,
    Vegetables: <></>,
    Dairy: <></>,
    Other: <></>,
  }

  // todo: implement generic 'food' icon as placeholder
  const getIcon = (category: FoodCategory) => iconMap[category] || <></>

  const handleOnItemButtonPress = (item: Food) => {
    setIsEditDialogOpen(true)
    setEditingData(item)
    setServingInput(item.servings)
    setCategoryInput({
      ...categoryInput,
      value: item.category,
      selectedList: [
        categoryInput.list.find(
          (listItem: ListItem) => listItem.value === item.category,
        ) || { _id: 'fruit', value: 'Fruit' },
      ],
    })
  }

  const dismissDialog = () => {
    setIsEditDialogOpen(false)
  }

  return (
    <View style={styles.occasion}>
      <View style={styles.timeline}>
        <View style={styles.ball}></View>
        <View style={isLast ? styles.lastLine : styles.line}></View>
      </View>

      <View style={styles.occasionData}>
        <Text style={styles.h3}>
          {occasion} {getOccasionTotalString()}
        </Text>

        <View>
          {foods.map((food, i) => (
            <List.Item
              key={i}
              title={
                <Text style={styles.listItemTitle}>
                  <Text style={styles.listItemTitleTextInner}>{food.name}</Text>

                  <Text
                    style={{
                      ...styles.listItemTitleScore,
                      ...(food.score >= 0 ? styles.positive : styles.negative),
                    }}
                  >
                    {/* todo: add chevron */}
                    {food.score > 0 ? '+' : ''}
                    {food.score}
                  </Text>
                </Text>
              }
              contentStyle={styles.listItemContent}
              style={styles.listItem}
              description={`${food.servings} serving`}
              titleStyle={styles.listItemTitleText}
              descriptionStyle={styles.listItemDescription}
              left={() => (
                <View
                  style={{
                    ...styles.listItemIconWrapper,
                    ...(food.score >= 0
                      ? styles.positiveBackground
                      : styles.negativeBackground),
                  }}
                >
                  {getIcon(food.category)}
                </View>
              )}
              right={() => (
                <View style={styles.listItemViewMore}>
                  <Button
                    style={styles.listItemViewMoreButton}
                    mode="text"
                    onPress={() => handleOnItemButtonPress(food)}
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
            contentStyle={styles.listItemContent}
            style={styles.listItem}
            titleStyle={styles.listitemAddNewTitleText}
            descriptionStyle={styles.listItemDescription}
            left={() => (
              <View style={styles.listItemAddNewIconWrapper}>
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
          style={styles.editDialog}
        >
          <Dialog.Title style={styles.listItemTitleTextInner}>
            Edit <strong>{editingData?.name}</strong>
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
              label="Select Category"
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
              selectedArrayList={categoryInput.selectedList}
              multiEnable={false}
              hideSearchBox={true}
              textInputMode="outlined"
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={dismissDialog}>Cancel</Button>
            <Button
              disabled={!servingInput && !categoryInput}
              onPress={() => {
                try {
                  updateFoodEntry(
                    occasion,
                    editingData,
                    categoryInput.value as FoodCategory,
                    servingInput || 1,
                  )
                } catch (e) {
                } finally {
                  dismissDialog()
                }
              }}
              mode="contained"
              style={styles.editDialogSubmitButton}
            >
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

export default JournalOccasion
