import { Stack } from 'expo-router';

const SubjectsLayout = () => {
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

export default SubjectsLayout;
