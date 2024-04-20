import { Pressable, Text, View } from 'react-native';
import BaseBackground from '../../../../components/base-background';
import { colors } from '../../../../themes/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function SubjectsPage() {
  const router = useRouter();
  return (
    <BaseBackground>
      <ScrollView>
        <View style={{ gap: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>Subjects</Text>
          <View style={{ gap: 4 }}>
            <View
              style={{
                height: 80,
                backgroundColor: colors.grey,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            />
            <View style={{ padding: 8, gap: 4 }}>
              <Text style={{ fontSize: 18, fontWeight: '500' }}>Subject 1</Text>
              <Text>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. At,
                eaque.
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/subjects/1')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.primary,
                  padding: 8,
                  marginTop: 8,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  Proceed
                </Text>
                <Ionicons
                  style={{ marginLeft: 8 }}
                  name='arrow-forward'
                  size={24}
                  color='white'
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ gap: 4 }}>
            <View
              style={{
                height: 80,
                backgroundColor: colors.grey,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            />
            <View style={{ padding: 8, gap: 4 }}>
              <Text style={{ fontSize: 18, fontWeight: '500' }}>Subject 2</Text>
              <Text>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. At,
                eaque.
              </Text>
              <TouchableOpacity
                onPress={() => router.push('/subjects/2')}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: colors.primary,
                  padding: 8,
                  marginTop: 8,
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  Proceed
                </Text>
                <Ionicons
                  style={{ marginLeft: 8 }}
                  name='arrow-forward'
                  size={24}
                  color='white'
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </BaseBackground>
  );
}
