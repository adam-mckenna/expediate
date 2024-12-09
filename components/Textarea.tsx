import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'

import {
  Inter_200ExtraLight,
  Inter_400Regular,
  useFonts,
} from '@expo-google-fonts/inter'

import { useAppTheme } from '@/app/_layout'

type Props = {
  value?: string
  placeholder: string
  handleOnChange: (value: string) => void
}

export const Textarea = ({ value, placeholder, handleOnChange }: Props) => {
  const theme = useAppTheme()

  const [fontsLoaded] = useFonts({
    Inter_200ExtraLight,
    Inter_400Regular,
  })

  const styles = StyleSheet.create({
    container: {
      marginTop: 12,
      marginBottom: 8,
      borderRadius: 6,
      overflow: 'hidden',
    },
    textarea: {
      fontFamily: 'Inter_400Regular',
      backgroundColor: theme.colors.background,
      borderColor: theme.colors.outline,
      textAlignVertical: 'top',
      borderRadius: 6,
      borderWidth: 0.5,
      padding: 12,
      fontSize: 12,
      letterSpacing: -0.6,
      minHeight: 125,
      fontWeight: 400,
    },
    placeholder: {
      fontFamily: 'Inter_200ExtraLight',
      color: theme.colors.backdrop,
      fontWeight: 200,
    },
  })

  return (
    <TextInput
      value={value}
      onChangeText={handleOnChange}
      multiline={true}
      numberOfLines={8}
      style={styles.container}
      mode="outlined"
      contentStyle={{
        ...styles.textarea,
        ...(value ? {} : styles.placeholder),
      }}
      placeholder={placeholder}
    />
  )
}
