import { Stack } from 'expo-router';

const ConceptsStackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name='index' />
    </Stack>
  );
};

export default ConceptsStackLayout;
