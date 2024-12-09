import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Portal, Snackbar, Button } from 'react-native-paper'
import { router } from 'expo-router'

import {
  useFonts,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_900Black,
} from '@expo-google-fonts/inter'

import { format } from 'date-fns'

import { useAppTheme } from './_layout'
import { BasicText } from '@/components/BasicText'
import { createJournal, listJournal } from '@/api/journalService'
import { Journal } from '@/types/Journal'
import { Textarea } from '@/components/Textarea'

const Index = () => {
  const theme = useAppTheme()

  const [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_900Black,
  })

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      paddingTop: 24,
      backgroundColor: theme.colors.surface,
    },
    title: {
      fontFamily: 'Inter_900Black',
      fontSize: 24,
      lineHeight: 29,
      marginBottom: 6,
      letterSpacing: -0.6,
    },
    subtext: {
      fontFamily: 'Inter_300Light',
      opacity: 0.6,
      marginBottom: 4,
      fontWeight: 300,
    },
    button: { borderRadius: 6, fontSize: 12 },
  })

  const today = format(new Date(), 'ddMyyyy')

  const [serverError, setServerError] = useState<string | undefined>()

  useEffect(() => {
    const redirectIfAlreadyAddedData = async () => {
      try {
        const journals = await (await listJournal()).json()
        const todayJournal = journals.find(({ id }: Journal) => id === today)
        if (todayJournal) {
          router.push(`/journal?date=${todayJournal.id}`)
        }
      } catch (error) {
        setServerError(
          error instanceof Error ? error.message : (error as string),
        )
      }
    }

    redirectIfAlreadyAddedData()
  }, [])

  const [userInput, setUserInput] = useState<string>()

  const updateInput = (input: string) => {
    if (userInput !== input) setUserInput(input)
  }

  const handleOnButtonPress = async () => {
    if (!userInput) return
    try {
      await createJournal(today, userInput)
    } catch (error) {
      setServerError(error instanceof Error ? error.message : (error as string))
    } finally {
      router.push(`/journal?date=${today}`)
    }
  }

  return (
    <View style={styles.container}>
      {fontsLoaded ? (
        <View>
          {/* todo: add help button */}
          <Text style={styles.title}>What did you eat today?</Text>

          <BasicText style={styles.subtext}>
            Write out everything you ate, and we'll sort it into meals and
            servings automatically.
          </BasicText>

          <Textarea
            value={userInput}
            handleOnChange={updateInput}
            placeholder="Breakfast: 2 apples, 14 bananas, 1 serving oats..."
          />

          <Button
            mode="contained"
            style={styles.button}
            disabled={!userInput}
            onPress={handleOnButtonPress}
          >
            That's everything. Let's go.
          </Button>
        </View>
      ) : (
        <BasicText>Loading...</BasicText>
      )}

      <Portal>
        <Snackbar visible={serverError !== undefined} onDismiss={() => {}}>
          <BasicText color="white">Server error: {serverError}</BasicText>
        </Snackbar>
      </Portal>
    </View>
  )
}

export default Index
