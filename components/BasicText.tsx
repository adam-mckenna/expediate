import { Text } from 'react-native'

import { useFonts, Inter_400Regular } from '@expo-google-fonts/inter'

import { useAppTheme } from '@/app/_layout'

export const BasicText = ({
  color = 'grey',
  children,
  style,
}: {
  color?: 'grey' | 'white'
  children: React.ReactNode
  style?: Object
}) => {
  const theme = useAppTheme()

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
  })

  const baseStyle = {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: -0.6,
    color: theme.colors[color === 'grey' ? 'grey' : 'white'],
  }

  return fontsLoaded ? (
    <Text style={{ ...baseStyle, ...style }}>{children}</Text>
  ) : (
    <></>
  )
}
