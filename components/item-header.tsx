import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../themes/colors';
import { Ionicons } from '@expo/vector-icons';

const ItemHeader = ({
  title,
  current,
  max = 1,
}: {
  title: string;
  current: number;
  max: number;
}) => {
  const router = useRouter();
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <Pressable onPress={() => router.back()}>
        <Ionicons name='arrow-back' size={24} color={colors.primary} />
      </Pressable>
      <Text
        style={{
          maxWidth: 280,
          textAlign: 'center',
          fontSize: 20,
          fontWeight: '600',
        }}>
        {title}
      </Text>
      <Text
        style={{ fontSize: 16, fontWeight: '500' }}>{`${current}/${max}`}</Text>
    </View>
  );
};

export default ItemHeader;
