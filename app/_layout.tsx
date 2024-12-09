import { Stack } from 'expo-router'
import { DefaultTheme, PaperProvider } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FD7121',
    background: '#F7F7F7',
    outline: '#D9D9D9',
    surface: 'rgba(255, 255, 255, 1)',
  },
}

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
