import { useRouter } from 'expo-router';
import { Pressable, Text, View, Image } from 'react-native';
import { colors } from '../../../../themes/colors';
import BaseBackground from '../../../../components/base-background';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const HomePage = () => {
  const router = useRouter();

  return (
    <BaseBackground>
      <ScrollView>
        <Image
          style={{
            height: 150,
            width: '100%',
            borderWidth: 1,
            borderColor: colors.grey,
            borderRadius: 20,
            marginBottom: 16,
            resizeMode: 'cover',
          }}
          source={require('../../../../assets/cover.png')}
        />
        <View style={{ gap: 8, marginBottom: 16 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            Technology Enabled Application for Coaching and Holistic Exam
            Readiness
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View
              style={{
                height: 4,
                width: 250,
                backgroundColor: colors.primary,
                borderRadius: 20,
              }}
            />
          </View>
        </View>
        <View style={{ gap: 8, paddingBottom: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>Activities</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              paddingHorizontal: 8,
              paddingVertical: 16,
              borderRadius: 20,
              backgroundColor: colors['light-grey'],
            }}>
            <Pressable onPress={() => router.push('/(drawer)/(tabs)/subjects')}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 9999,
                }}>
                <Ionicons name='book' size={40} color='white' />
              </View>
              <Text
                style={{ fontSize: 12, textAlign: 'center', paddingTop: 2 }}>
                Reviewers
              </Text>
            </Pressable>
            <Pressable onPress={() => router.push('/flashcards')}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 9999,
                }}>
                <MaterialCommunityIcons
                  name='card-multiple'
                  size={40}
                  color='white'
                />
              </View>
              <Text
                style={{ fontSize: 12, textAlign: 'center', paddingTop: 2 }}>
                Flash Cards
              </Text>
            </Pressable>
            <Pressable onPress={() => router.push('/quizzes')}>
              <View
                style={{
                  width: 64,
                  height: 64,
                  backgroundColor: colors.primary,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 9999,
                }}>
                <MaterialCommunityIcons
                  name='bookmark-box-multiple'
                  size={40}
                  color='white'
                />
              </View>
              <Text
                style={{ fontSize: 12, textAlign: 'center', paddingTop: 2 }}>
                Quizzes
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </BaseBackground>
  );
};

export default HomePage;
