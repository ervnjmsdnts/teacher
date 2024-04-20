import { useLocalSearchParams, useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../../themes/colors';
import BaseBackground from '../../../../components/base-background';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import BackFloatingButton from '../../../../components/back-floating-button';

const SubjectPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  return (
    <BaseBackground>
      <View style={{ position: 'relative', flex: 1, gap: 8 }}>
        <BackFloatingButton />
        <ScrollView>
          <View style={{ gap: 12 }}>
            <View
              style={{
                backgroundColor: colors['light-grey'],
                padding: 16,
                flexDirection: 'row',
                borderRadius: 20,
                gap: 8,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.primary,
                  height: 56,
                  width: 56,
                  borderRadius: 9999,
                }}>
                <Ionicons size={32} color='white' name='book' />
              </View>
              <View style={{ width: '100%', gap: 2, flex: 1 }}>
                <Text style={{ fontWeight: '600' }}>Subject {id}</Text>
                <Text style={{ fontSize: 12, color: colors.grey }}>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Omnis suscipit esse reprehenderit error voluptates explicabo
                  architecto sit itaque fuga non.
                </Text>
              </View>
            </View>
            {new Array(5).fill(null).map((_, index) => (
              <TouchableOpacity
                onPress={() => router.push(`/subjects/sub-topic/${index + 1}`)}
                key={index}
                style={{
                  padding: 16,
                  borderRadius: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors['light-grey'],
                }}>
                <Text
                  style={{
                    color: colors.grey,
                    fontWeight: 'bold',
                    fontSize: 32,
                  }}>
                  {String(index + 1).padStart(2, '0')}
                </Text>
                <Text
                  style={{ marginLeft: 16, fontWeight: '600', fontSize: 18 }}>
                  TOPIC
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </BaseBackground>
  );
};

export default SubjectPage;
