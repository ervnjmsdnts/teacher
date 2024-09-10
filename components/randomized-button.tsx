import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../themes/colors';
import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function RandomizedButton({ to }: { to: string }) {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.primary,
        borderRadius: 6,
      }}
      onPress={() => router.push({ pathname: to })}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}>
        <FontAwesome5 name='random' size={30} color='white' />
        <Text
          style={{
            fontSize: 16,
            color: 'white',
            fontWeight: 'bold',
            maxWidth: 200,
          }}>
          Randomized
        </Text>
      </View>
      <Ionicons name='arrow-forward' size={30} color='white' />
    </TouchableOpacity>
  );
}
