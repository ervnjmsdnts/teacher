import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';
import { colors } from '../../../themes/colors';
import { DrawerToggleButton } from '@react-navigation/drawer';

type TabsProps = {
  name: keyof typeof Ionicons.glyphMap;
  focused: boolean;
};

const Tab = ({ name, focused }: TabsProps) => {
  return (
    <View
      style={{
        alignItems: 'center',
        position: 'relative',
      }}>
      <Ionicons
        name={name}
        size={28}
        style={{ color: focused ? colors.primary : colors.grey }}
      />
      {focused && (
        <View
          style={{
            position: 'absolute',
            padding: 2,
            backgroundColor: colors.primary,
            bottom: -8,
            width: 20,
            borderRadius: 100,
          }}
        />
      )}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        headerLeft: () => <DrawerToggleButton tintColor='white' />,
        headerStyle: { backgroundColor: colors.primary },
        headerTitleStyle: {
          color: 'white',
          fontSize: 24,
          fontWeight: 'bold',
        },
        headerStatusBarHeight: 48,
      }}>
      <Tabs.Screen
        name='home'
        options={{
          tabBarIcon: ({ focused }) => <Tab name='home' focused={focused} />,
          headerTitle: 'TEACHER',
        }}
      />
      <Tabs.Screen
        name='subjects'
        options={{
          tabBarIcon: ({ focused }) => <Tab name='book' focused={focused} />,
          headerTitle: 'REVIEWERS',
        }}
      />
      <Tabs.Screen
        name='analytics'
        options={{
          tabBarIcon: ({ focused }) => (
            <Tab name='analytics-sharp' focused={focused} />
          ),
          headerTitle: 'ANALYTICS',
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
