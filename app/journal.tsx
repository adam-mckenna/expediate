import { useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import { Portal, Dialog, Button, Snackbar } from 'react-native-paper'

import {
  useFonts,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_900Black,
} from '@expo-google-fonts/inter'

import { BasicText } from '@/components/BasicText'
import JournalOccasion from '@/components/JournalOccasion'
import { Food } from '@/types/Types'

export interface Data {
  breakfast: Array<Food>
  lunch: Array<Food>
  dinner: Array<Food>
  snacks: Array<Food>
}

// todo: replace with API data.
const data: Data = {
  breakfast: [
    {
      id: '1',
      title: 'Instant oats',
      category: 'whole-grains',
      servings: 1,
      score: 2,
    },
    {
      id: '2',
      title: 'Mango',
      category: 'fruit',
      servings: 1,
      score: 2,
    },
    {
      id: '3',
      title: 'Basil seeds',
      category: 'nuts-and-seeds',
      servings: 1,
      score: 2,
    },
    {
      id: '5',
      title: 'Soy milk (unsweetened)',
      category: 'dairy',
      servings: 1,
      score: 1,
    },
    {
      id: '6',
      title: 'Banana',
      category: 'fruit',
      servings: 1,
      score: 1,
    },
    {
      id: '7',
      title: 'Peanut butter',
      category: 'nuts-and-seeds',
      servings: 1,
      score: 1,
    },
  ],
  lunch: [
    {
      id: '4',
      title: 'Table sugar',
      category: 'sweets',
      servings: 1,
      score: -1,
    },
    {
      id: '5',
      title: 'Banana bread',
      category: 'sweets',
      servings: 1,
      score: -1,
    },
  ],
  dinner: [
    {
      id: '100',
      title: 'Sweet potato',
      category: 'vegetables',
      servings: 1,
      score: 2,
    },
  ],
  snacks: [
    {
      id: '4000',
      title: 'Cocoa powder',
      category: 'undefined',
      servings: 1,
      score: 0,
    },
  ],
}

const Journal = () => {
  let [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_900Black,
  })

  const [isDialogVisible, setIsDialogVisible] = useState(false)
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false)

  const [input, setInput] = useState<string>()

  const handleOnButtonClick = () => {
    setIsDialogVisible(true)
  }

  const updateInput = (value: string) => {
    if (input !== value) {
      setInput(value)
    }
  }

  return (
    <ScrollView style={styles.container}>
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
        <Text>Loading...</Text>
      )}

      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={handleOnButtonClick}
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
            <Button onPress={handleOnButtonClick}>Cancel</Button>
            <Button
              onPress={() => {
                // todo: add logic to add item
                setIsDialogVisible(false)
                setIsSnackbarVisible(true)
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
          onDismiss={() => {
            setIsSnackbarVisible(false)
          }}
          action={{
            label: 'Great!',
            onPress: () => {
              setIsSnackbarVisible(false)
            },
          }}
        >
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

export default Journal
