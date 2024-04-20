import { Text, View } from 'react-native';
import BaseBackground from '../../../../../components/base-background';
import BackFloatingButton from '../../../../../components/back-floating-button';
import { useLocalSearchParams } from 'expo-router';
import { colors } from '../../../../../themes/colors';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const SubTopic = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <BaseBackground>
      <View style={{ position: 'relative', flex: 1 }}>
        <BackFloatingButton />
        <ScrollView>
          <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.primary,
                height: 56,
                width: 56,
                borderRadius: 9999,
              }}>
              <Ionicons size={32} color='white' name='bookmark' />
            </View>

            <Text style={{ fontSize: 24, fontWeight: '600' }}>
              SubTopic {id}
            </Text>
          </View>
        </ScrollView>
      </View>
    </BaseBackground>
  );
};

export default SubTopic;
