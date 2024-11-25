import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter'

import { StyleProp, Text, TextStyle } from 'react-native'

export const BasicText = ({
  children,
  style,
}: {
  children: React.ReactNode
  style?: Object
}) => {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
  })

  const baseStyle = {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.6,
    color: '#767676',
  }

  return fontsLoaded ? (
    <Text style={{ ...baseStyle, ...style }}>{children}</Text>
  ) : (
    <></>
  )
}
