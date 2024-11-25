import { StyleSheet, Text, TextInput, View } from 'react-native'
import { Button } from 'react-native-elements'

import {
  useFonts,
  Inter_300Light,
  Inter_400Regular,
  Inter_900Black,
} from '@expo-google-fonts/inter'
import { BasicText } from '@/components/BasicText'

export default function Index() {
  let [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_400Regular,
    Inter_900Black,
  })

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
      <TextInput
        multiline={true}
        numberOfLines={10}
        style={styles.textarea}
        placeholderTextColor="rgba(118, 118, 118, 0.5)"
        placeholder="Breakfast: 2 apples, 14 bananas, 1 serving oats..."
      />
      <View style={styles.buttonWrapper}>
        {/* todo: add arrow icon */}
        <Button
          buttonStyle={styles.button}
          titleStyle={styles.buttonTitle}
          title="That's everything. Let's go!"
        />
      </View>
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
    marginBottom: 6,
    letterSpacing: -0.6,
  },
  subtext: {
    opacity: 0.6,
    marginBottom: 4,
    fontWeight: 300,
    fontFamily: 'Inter_300Light',
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
    marginBottom: 8,
    fontSize: 12,
  },
  buttonWrapper: { borderRadius: 6, overflow: 'hidden', fontSize: 4 },
  button: {
    backgroundColor: '#FD7121',
  },
  buttonTitle: { fontSize: 12 },
})
