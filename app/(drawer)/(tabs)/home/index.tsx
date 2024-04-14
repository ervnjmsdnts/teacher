import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../../../themes/colors';
import BaseBackground from '../../../../components/base-background';

const HomePage = () => {
  const router = useRouter();
  return (
    <BaseBackground>
      <Text>Hello World</Text>
      <Pressable onPress={() => router.push('/subjects')}>
        <Text>Subjects</Text>
      </Pressable>
    </BaseBackground>
  );
};

export default HomePage;
