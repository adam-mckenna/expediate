import { Stack } from 'expo-router'
import { DefaultTheme, PaperProvider } from 'react-native-paper'

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FD7121',
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
