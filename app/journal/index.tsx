import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import { Portal, Dialog, Button, Snackbar } from 'react-native-paper'
import HTML from 'react-native-render-html'
import { useLocalSearchParams } from 'expo-router'

import { format } from 'date-fns'

import {
  useFonts,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_900Black,
} from '@expo-google-fonts/inter'

import { getJournal, updateJournal } from '@/api/journalService'

import { Food, FoodCategory, Journal, Occasion } from '@/types/Journal'

import { useAppTheme } from '../_layout'
import { BasicText } from '@/components/BasicText'
import JournalOccasion from '@/app/journal/JournalOccasion'
import { Textarea } from '@/components/Textarea'

const Occasions: Array<Occasion> = ['breakfast', 'lunch', 'dinner', 'snacks']

// Dummy placeholder method:
// the API will handle this by taking the string, parsing it, assigning DQS, etc.
const processFoodData = (food: string): Array<Food> =>
  food.split(',').map((name) => ({
    name: name.trim(),
    category: 'Whole Grains',
    servings: 1,
    score: -1,
  }))

const JournalPage = () => {
  const theme = useAppTheme()

  const [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_900Black,
  })

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      paddingTop: 24,
      backgroundColor: 'white',
    },
    dialog: {
      backgroundColor: 'white',
    },
    dialogSubmit: { paddingLeft: 8, paddingRight: 8, borderRadius: 6 },
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
    positive: {
      color: theme.colors.positive,
    },
    negative: {
      color: theme.colors.negative,
    },
    snackbarText: {
      color: 'white',
    },
  })

  const searchParams = useLocalSearchParams()

  const getToday = () => {
    const date = searchParams.date as string
    const day = parseInt(date.slice(0, 2))
    const month = parseInt(date.slice(2, 4))
    const year = parseInt(date.slice(-4))
    return format(new Date(year, month - 1, day), 'ddMyyyy')
  }

  const [journal, setJournal] = useState<Journal | null>()

  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await (await getJournal(getToday())).json()
        setJournal(response)
      } catch (error) {
        // todo: fix type and handle
        setError((error as any).message)
      } finally {
        // todo: handle loading
      }
    }

    fetchData()
  }, [])

  const [isDialogVisible, setIsDialogVisible] = useState(false)

  const onDialogDismiss = () => {
    setIsDialogVisible(false)
  }

  const onDialogSubmit = () => {
    setIsDialogVisible(false)
    setIsSnackbarVisible(true)
    addNewEntriesToJournal()
  }

  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false)

  const dismissSnackbar = () => {
    setIsSnackbarVisible(false)
    setNewJournalEntries(undefined)
  }

  const [newJournalEntries, setNewJournalEntries] = useState<
    | {
        entry: string
        occasion: Occasion
      }
    | undefined
  >()

  const updateNewJournalEntry = (value: string) => {
    if (newJournalEntries?.entry !== value) {
      setNewJournalEntries({
        ...(newJournalEntries || { occasion: 'breakfast' }),
        entry: value,
      })
    }
  }

  const handleOnAddNewItemClick = (occasion: Occasion) => {
    setIsDialogVisible(true)
    setNewJournalEntries({ entry: '', occasion })
  }

  const addNewEntriesToJournal = () => {
    const output = processFoodData(newJournalEntries?.entry || '')

    const update = async (updatedData: Journal) => {
      try {
        await updateJournal(journal?.id || '', updatedData)
      } catch (error) {
        // todo: handle error
      } finally {
        // todo: handle loading
      }
    }

    if (journal) {
      const revisedData = journal
      output.forEach((item) => {
        revisedData[newJournalEntries?.occasion || 'breakfast'].push(item)
      })
      update(revisedData)
    }
  }

  const updateFoodEntry = async (
    occasion: Occasion,
    data: Food | undefined,
    category: FoodCategory,
    servings: number,
  ) => {
    const update = async (updatedData: Journal) => {
      try {
        await updateJournal(journal?.id || '', updatedData)
      } catch (error) {
        // todo: handle error
      } finally {
        // todo: handle loading
      }
    }

    if (data && journal) {
      const index = journal[occasion].indexOf(data) as number

      const newData = journal
      newData[occasion][index] = {
        ...newData[occasion][index],
        category: category,
        servings: servings || 1,
      }

      update(newData)
    }
  }

  const hasPositiveDQS = journal ? journal.dqs >= 0 : false

  return (
    <ScrollView style={styles.container}>
      {!error ? (
        fontsLoaded && journal ? (
          <>
            <Text style={styles.title}>
              {hasPositiveDQS ? 'Nice!' : 'Oh no!'} Your DQS score is&nbsp;
              <Text style={hasPositiveDQS ? styles.positive : styles.negative}>
                {hasPositiveDQS ? '+' : '-'}
                {journal.dqs}
              </Text>
              .
            </Text>

            <BasicText style={styles.subtext}>
              <HTML source={{ html: journal.message }} />
            </BasicText>

            <Text style={styles.h2}>Let's break it down</Text>

            {Occasions.map((occasion, i) => (
              <JournalOccasion
                key={i}
                foods={journal[occasion]}
                updateFoodEntry={updateFoodEntry}
                handleOnButtonClick={handleOnAddNewItemClick}
                occasion={occasion}
                isLast={i === Occasions.length - 1}
              />
            ))}
          </>
        ) : (
          // todo: better loading
          <Text>Loading...</Text>
        )
      ) : (
        // todo: better error handling
        <>{error}</>
      )}

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={onDialogDismiss}
          style={styles.dialog}
        >
          <Dialog.Title>Add new item</Dialog.Title>

          <Dialog.Content>
            <Textarea
              value={newJournalEntries?.entry}
              placeholder="Breakfast: 2 apples, 14 bananas, 1 serving oats..."
              handleOnChange={updateNewJournalEntry}
            />
          </Dialog.Content>

          <Dialog.Actions>
            <Button onPress={onDialogDismiss}>Cancel</Button>
            <Button
              disabled={!newJournalEntries}
              onPress={onDialogSubmit}
              mode="contained"
              style={styles.dialogSubmit}
            >
              Done
            </Button>
          </Dialog.Actions>
        </Dialog>

        <Snackbar
          visible={isSnackbarVisible}
          onDismiss={dismissSnackbar}
          action={{
            label: 'Great!',
            onPress: dismissSnackbar,
          }}
        >
          <Text style={styles.snackbarText}>
            "{newJournalEntries?.entry}" added
          </Text>
        </Snackbar>
      </Portal>
    </ScrollView>
  )
}

export default JournalPage
