import { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'
import { router } from 'expo-router'

import {
  useFonts,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_900Black,
} from '@expo-google-fonts/inter'

import { BasicText } from '@/components/BasicText'

const Index = () => {
  let [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_900Black,
  })

  const [input, setInput] = useState<string>()

  // const [isFinished, setIsFinished] = useState<boolean>(false)

  const updateInput = (value: string) => {
    if (input !== value) {
      setInput(value)
    }
  }

  const handleOnButtonPress = () => {
    if (input) {
      // todo: add logic to parse data and send to BE.

      router.push('/journal')
    }
  }

  return !fontsLoaded ? (
    <View>
      <Text>Loading...</Text>
    </View>
  ) : (
    <View style={styles.container}>
      {/* todo: add help button */}
      <Text style={styles.title}>What did you eat today?</Text>
      <BasicText style={styles.subtext}>
        Write out everything you ate, and we'll sort it into meals and servings
        automatically.
      </BasicText>
      {/* todo: add error if form empty */}
      <TextInput
        value={input}
        onChangeText={updateInput}
        multiline={true}
        numberOfLines={8}
        style={input ? styles.textarea : styles.placeholder}
        placeholder="Breakfast: 2 apples, 14 bananas, 1 serving oats..."
      />
      <View style={styles.buttonWrapper}>
        {/* todo: add arrow icon */}
        <Button
          onPress={handleOnButtonPress}
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title="That's everything. Let's go!"
        />
      </View>
    </View>
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
    marginTop: 12,
    marginBottom: 8,
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
    marginBottom: 6,
    letterSpacing: -0.6,
  },
  subtext: {
    opacity: 0.6,
    marginBottom: 4,
    fontWeight: 300,
    fontFamily: 'Inter_300Light',
  },
  textarea: baseStyles.textarea,
  placeholder: {
    ...baseStyles.textarea,
    color: 'rgba(118, 118, 118, 0.5)',
    fontWeight: 200,
    fontFamily: 'Inter_200ExtraLight',
  },
  buttonWrapper: { borderRadius: 6, overflow: 'hidden', fontSize: 4 },
  button: {
    backgroundColor: '#FD7121',
  },
  buttonTitle: { fontSize: 12 },
})

export default Index
