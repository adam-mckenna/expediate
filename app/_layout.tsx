import { Stack } from 'expo-router'
import { DefaultTheme, PaperProvider, useTheme } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FD7121',
    background: '#F7F7F7',
    outline: '#D9D9D9',
    grey: '#767676',
    white: '#FFF',
    surface: 'rgba(255, 255, 255, 1)',
    positive: '#00CA2C',
    negative: '#F02835',
    positiveBackground: '#CFFFD9',
    negativeBackground: '#FFCAD2',
  },
}

export type AppTheme = typeof theme

export const useAppTheme = () => useTheme<AppTheme>()

const RootLayout = () => (
  <PaperProvider theme={theme}>
    <Stack
      screenOptions={{
        headerBackVisible: false,
        headerShadowVisible: false,
        headerBackButtonMenuEnabled: false,
      }}
    />
  </PaperProvider>
)

export default RootLayout
