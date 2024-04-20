import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';
import { colors } from '../themes/colors';
import { Ionicons } from '@expo/vector-icons';

const BackFloatingButton = () => {
  const router = useRouter();
  return (
    <Pressable
      onPress={() => router.back()}
      style={{
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 20,
        zIndex: 10,
        right: 10,
        backgroundColor: colors.primary,
        height: 48,
        width: 48,
        borderRadius: 9999,
      }}>
      <Ionicons name='arrow-back' size={32} color='white' />
    </Pressable>
  );
};

export default BackFloatingButton;
