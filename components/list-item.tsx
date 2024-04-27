import { useRouter } from 'expo-router';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../themes/colors';
import { Ionicons } from '@expo/vector-icons';

const ListItem = ({ route, title }: { route: string; title: string }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(route)}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        width: '100%',
        padding: 16,
        elevation: 20,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        gap: 8,
      }}>
      <Text style={{ fontSize: 18, fontWeight: '600', maxWidth: 250 }}>
        {title}
      </Text>
      <Ionicons
        style={{ marginLeft: 8 }}
        name='arrow-forward'
        size={24}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
};

export default ListItem;
