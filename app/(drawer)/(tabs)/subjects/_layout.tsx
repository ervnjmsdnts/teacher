import { Stack } from 'expo-router';

const SubjectsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name='index' />
      <Stack.Screen name='general-education/index' />
      <Stack.Screen name='general-education/[subject]/index' />
      <Stack.Screen name='general-education/[subject]/[id]' />
      <Stack.Screen name='professional-education/index' />
      <Stack.Screen name='professional-education/[id]' />
    </Stack>
  );
};

export default SubjectsLayout;
