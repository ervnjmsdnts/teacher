import { Stack, useRouter, useSegments } from 'expo-router';
import { User, UserInfo } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<UserInfo | null>(null);
  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChanged = (user: User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const sub = auth.onAuthStateChanged(onAuthStateChanged);

    return () => {
      sub;
    };
  }, []);

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === '(drawer)';

    if (user && !inAuthGroup) {
      router.replace('(drawer)/(tabs)/home');
    } else if (!user && inAuthGroup) {
      router.replace('/');
    }
  }, [user, initializing]);

  if (initializing) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name='(drawer)' options={{ headerShown: false }} />
      <Stack.Screen
        name='modal'
        options={{
          presentation: 'modal',
          headerTitle: 'Terms of Service',
        }}
      />
    </Stack>
  );
}
