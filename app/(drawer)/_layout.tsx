import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '../../themes/colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { usePathname, useRouter } from 'expo-router';

const CustomDrawerItem = ({
  isMaterialIcon = false,
  materialIcon,
  ionIcon,
  label,
  path,
  redirectPath,
}: {
  isMaterialIcon?: boolean;
  ionIcon?: keyof typeof Ionicons.glyphMap;
  materialIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  path: string;
  redirectPath: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <DrawerItem
      icon={() =>
        isMaterialIcon ? (
          <MaterialCommunityIcons
            name={materialIcon}
            size={24}
            color={pathname === path ? 'white' : colors.grey}
          />
        ) : (
          <Ionicons
            name={ionIcon}
            color={pathname === path ? 'white' : colors.grey}
            size={24}
          />
        )
      }
      label={label}
      style={{
        backgroundColor: pathname === path ? colors.primary : 'white',
      }}
      labelStyle={[
        style.navItemLabel,
        { color: pathname === path ? 'white' : colors.grey },
      ]}
      onPress={() => router.push(redirectPath)}
    />
  );
};

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <CustomDrawerItem
        label='Home'
        ionIcon='home'
        path='/home'
        redirectPath='/(drawer)/(tabs)/home'
      />
      <CustomDrawerItem
        label='Subject'
        ionIcon='book'
        path='/subjects'
        redirectPath='/(drawer)/(tabs)/subjects'
      />
      <CustomDrawerItem
        isMaterialIcon
        materialIcon='card-multiple'
        label='Flashcards'
        path='/flashcards'
        redirectPath='/flashcards'
      />
      <CustomDrawerItem
        label='About'
        ionIcon='information-circle'
        path='/about'
        redirectPath='/about'
      />
    </DrawerContentScrollView>
  );
};

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={() => ({
          headerStyle: { backgroundColor: colors.primary },
          headerShown: false,
          headerTitleStyle: {
            color: 'white',
            fontSize: 24,
            fontWeight: 'bold',
          },
          headerStatusBarHeight: 16,
          headerTintColor: 'white',
        })}>
        <Drawer.Screen
          name='flashcards'
          options={{ headerShown: true, title: 'FLASHCARDS' }}
        />
        <Drawer.Screen
          name='about'
          options={{ headerShown: true, title: 'ABOUT' }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

const style = StyleSheet.create({
  navItemLabel: { marginLeft: -20, fontSize: 18 },
});

export default DrawerLayout;
