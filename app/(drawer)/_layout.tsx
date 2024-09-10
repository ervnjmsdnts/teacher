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
import { getAuth, signOut } from 'firebase/auth';

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
            color={pathname.includes(path) ? 'white' : colors.grey}
          />
        ) : (
          <Ionicons
            name={ionIcon}
            color={pathname.includes(path) ? 'white' : colors.grey}
            size={24}
          />
        )
      }
      label={label}
      style={{
        backgroundColor: pathname.includes(path) ? colors.primary : 'white',
      }}
      labelStyle={[
        style.navItemLabel,
        { color: pathname.includes(path) ? 'white' : colors.grey },
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
        label='Reviewers'
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
        isMaterialIcon
        materialIcon='bookmark-box-multiple'
        label='Quizzes'
        path='/quizzes'
        redirectPath='/quizzes'
      />
      <CustomDrawerItem
        label='Analytics'
        ionIcon='analytics-sharp'
        path='/analytics'
        redirectPath='/analytics'
      />
      <CustomDrawerItem
        isMaterialIcon
        label='Learning Concepts'
        materialIcon='tag-text'
        path='/concepts'
        redirectPath='/(drawer)/(tabs)/concepts'
      />
      <CustomDrawerItem
        label='About'
        ionIcon='information-circle'
        path='/about'
        redirectPath='/about'
      />
      <DrawerItem
        onPress={() => signOut(getAuth())}
        icon={() => (
          <MaterialCommunityIcons name='logout' size={24} color={colors.grey} />
        )}
        label='Sign Out'
        style={{
          backgroundColor: 'white',
        }}
        labelStyle={[style.navItemLabel, { color: colors.grey }]}
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
          headerStatusBarHeight: 48,
          headerTintColor: 'white',
        })}>
        <Drawer.Screen
          name='flashcards'
          options={{ headerShown: true, title: 'FLASHCARDS' }}
        />
        <Drawer.Screen
          name='quizzes'
          options={{ headerShown: true, title: 'QUIZZES' }}
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
