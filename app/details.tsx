import { Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text } from 'react-native';

export default function Details() {
  const { name } = useLocalSearchParams();
  console.log('You pressed on', name);

  return (
    <>
      <Stack.Screen options={{ title: name as string }} />
      <ScrollView>
        <Text>Details about {name}</Text>
      </ScrollView>
    </>
  );
}
