import AsyncStorage from '@react-native-async-storage/async-storage';
import { Redirect, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { View } from 'react-native';

export default function IndexPage() {
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const value = await AsyncStorage.getItem('skip-splash');
      if (value !== null) {
        router.replace('(drawer)/(tabs)/home');
      } else {
        router.replace('start');
      }
    })();
  }, []);

  return <Redirect href='start' />;
}
