import { Stack } from 'expo-router';
import { colors } from '../../../../themes/colors';
import { DrawerToggleButton } from '@react-navigation/drawer';

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
