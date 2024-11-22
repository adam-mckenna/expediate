import { Button, StyleSheet, Text, TextInput, View } from 'react-native'

import {
  useFonts,
  Inter_400Regular,
  Inter_900Black,
} from '@expo-google-fonts/inter'
import { BasicText } from '@/components/BasicText'

export default function Index() {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_900Black,
  })

  return !fontsLoaded ? (
    <View>Loading...</View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>What did you eat today?</Text>
      <BasicText>
        Write out everything you ate, and we'll sort it into meals and servings
        automatically.
      </BasicText>
      <TextInput
        multiline={true}
        numberOfLines={10}
        style={styles.textarea}
        placeholder="Breakfast: 2 apples, 14 bananas, 1 serving oats..."
      />
      <Button title="That's everything" />
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
    marginBottom: 5,
    letterSpacing: -0.6,
  },
  textarea: {
    height: 200,
    textAlignVertical: 'top',
    padding: 16,
    backgroundColor: '#F7F7F7',
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
    marginTop: 12,
  },
})
