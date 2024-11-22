import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter'

import { Text } from 'react-native'

export const BasicText = ({ children }: { children: React.ReactNode }) => {
  let [fontsLoaded] = useFonts({
    Inter_400Regular,
  })

  return fontsLoaded ? (
    <Text
      style={{
        fontFamily: 'Inter_400Regular',
        fontSize: 14,
        lineHeight: 20,
        opacity: 0.6,
        letterSpacing: -0.6,
      }}
    >
      {children}
    </Text>
  ) : (
    <></>
  )
}
