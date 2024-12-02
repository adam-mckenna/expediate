import { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import { Portal, Dialog, Button, Snackbar } from 'react-native-paper'

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

import { Food, Journal, Occasion } from '@/types/Journal'

import { BasicText } from '@/components/BasicText'
import JournalOccasion from '@/components/JournalOccasion'

const JournalPage = () => {
  let [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_900Black,
  })

  const [data, setData] = useState<Journal | null>()
  const [error, setError] = useState(null)

  const today = '29112024'
  // const today = format(new Date(), 'dMyyyy')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await (await getJournal(today)).json()
        setData(response)
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
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false)
  const [activeOccasion, setActiveOccasion] = useState<Occasion | undefined>()

  const [input, setInput] = useState<string>()

  const handleOnButtonClick = (occasion: Occasion) => {
    setActiveOccasion(occasion)
    setIsDialogVisible(true)
  }

  const dismissDialog = () => {
    setIsDialogVisible(false)
    setActiveOccasion(undefined)
  }

  const updateInput = (value: string) => {
    if (input !== value) {
      setInput(value)
    }
  }

  // Dummy placeholder method:
  // the API will handle this by taking the string, parsing it, assigning DQS, etc.
  const processFoodData = (food: string): Array<Food> =>
    food.split(',').map((title) => ({
      title: title.trim(),
      category: 'Whole Grains',
      servings: 1,
      score: -1,
    }))

  const updateData = () => {
    const output = processFoodData(input || '')

    const update = async (updatedData: Journal) => {
      try {
        await updateJournal(data?.id || '', updatedData)
      } catch (error) {
        // todo: handle error
      } finally {
        // todo: handle loading
      }
    }

    setInput('')

    if (data) {
      const revisedData = data
      output.forEach((item) => {
        revisedData[activeOccasion || 'breakfast'].push(item)
      })
      update(revisedData)
    }
  }

  const dismissSnackbar = () => setIsSnackbarVisible(false)

  return (
    <ScrollView style={styles.container}>
      {!error ? (
        fontsLoaded && data ? (
          <>
            <Text style={styles.title}>
              {/* todo: actually calculate DQS. Will this be done on the BE? */}
              Nice! Your DQS score is{' '}
              <Text style={{ color: '#00CA2C' }}>+31</Text>
            </Text>

            <BasicText style={styles.subtext}>
              Keep up the good work! If you want to improve more, try cutting
              back on{' '}
              <Text
                style={{ fontWeight: 600, fontFamily: 'Inter_600SemiBold' }}
              >
                table sugar
              </Text>
              .
            </BasicText>

            <Text style={styles.h2}>Let's break it down</Text>

            <JournalOccasion
              data={data}
              handleOnButtonClick={handleOnButtonClick}
              occasion="breakfast"
            />
            <JournalOccasion
              data={data}
              handleOnButtonClick={handleOnButtonClick}
              occasion="lunch"
            />
            <JournalOccasion
              data={data}
              handleOnButtonClick={handleOnButtonClick}
              occasion="dinner"
            />
            <JournalOccasion
              data={data}
              handleOnButtonClick={handleOnButtonClick}
              isLast={true}
              occasion="snacks"
            />
          </>
        ) : (
          // todo: better loading
          <Text>Loading...</Text>
        )
      ) : (
        // todo: better error handling
        <>Error</>
      )}

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={dismissDialog}
          style={{
            backgroundColor: 'white',
          }}
        >
          <Dialog.Title>Add new item</Dialog.Title>
          <Dialog.Content>
            <TextInput
              value={input}
              onChangeText={updateInput}
              multiline={true}
              numberOfLines={8}
              style={input ? styles.textarea : styles.placeholder}
              placeholder="Breakfast: 2 apples, 14 bananas, 1 serving oats..."
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={dismissDialog}>Cancel</Button>
            <Button
              disabled={!input}
              onPress={() => {
                // todo: add logic to add item
                setIsDialogVisible(false)
                setIsSnackbarVisible(true)
                updateData()
              }}
              mode="contained"
              style={{ paddingLeft: 8, paddingRight: 8, borderRadius: 6 }}
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
          {/* todo: populate with real data */}
          "Instant oats" added
        </Snackbar>
      </Portal>
    </ScrollView>
  )
}

const baseStyles = StyleSheet.create({
  textarea: {
    textAlignVertical: 'top',
    padding: 16,
    backgroundColor: '#F7F7F7',
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
    fontSize: 12,
    letterSpacing: -0.6,
    minHeight: 125,
    fontFamily: 'Inter_400Regular',
    fontWeight: 400,
  },
})

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
  textarea: baseStyles.textarea,
  placeholder: {
    ...baseStyles.textarea,
    color: 'rgba(118, 118, 118, 0.5)',
    fontWeight: 200,
    fontFamily: 'Inter_200ExtraLight',
  },
})

export default JournalPage
