import { Stack } from 'expo-router';

const FlashcardsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='[id]' />
    </Stack>
  );
};

export default FlashcardsLayout;
