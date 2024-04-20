import { Stack } from 'expo-router';

const QuizzesLayout = () => {
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

export default QuizzesLayout;
