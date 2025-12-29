import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Pokédex' }} />
      <Stack.Screen name='details' options={{ title: 'Details', headerBackButtonDisplayMode: 'minimal', presentation: "modal",sheetAllowedDetents:[0.3,0.5,0.7] }} />
    </Stack>
  );
}
