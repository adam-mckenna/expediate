import { Stack } from 'expo-router'

const RootLayout = () => (
  <Stack
    screenOptions={{
      headerBackVisible: false,
      headerShadowVisible: false,
      headerBackButtonMenuEnabled: false,
    }}
  />
)

export default RootLayout
