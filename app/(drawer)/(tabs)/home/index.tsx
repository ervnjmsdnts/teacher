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
              padding: 16,
              gap: 8,
              borderRadius: 20,
              backgroundColor: colors['light-grey'],
            }}>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Pressable
                style={{
                  backgroundColor: colors.primary,
                  flex: 1,
                  padding: 32,
                  justifyContent: 'center',
                  borderRadius: 10,
                  alignItems: 'center',
                }}
                onPress={() => router.push('/(drawer)/(tabs)/subjects')}>
                <Ionicons name='book' size={40} color='white' />
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    paddingTop: 2,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Reviewers
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: colors.primary,
                  flex: 1,
                  padding: 32,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => router.push('/flashcards')}>
                <MaterialCommunityIcons
                  name='card-multiple'
                  size={40}
                  color='white'
                />
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    paddingTop: 2,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Flash Cards
                </Text>
              </Pressable>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <Pressable
                onPress={() => router.push('/quizzes')}
                style={{
                  backgroundColor: colors.primary,
                  flex: 1,
                  padding: 32,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                  name='bookmark-box-multiple'
                  size={40}
                  color='white'
                />
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    paddingTop: 2,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Quizzes
                </Text>
              </Pressable>
              <Pressable
                style={{
                  backgroundColor: colors.primary,
                  flex: 1,
                  padding: 32,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => router.push('/analytics')}>
                <Ionicons name='analytics-sharp' size={40} color='white' />
                <Text
                  style={{
                    fontSize: 12,
                    textAlign: 'center',
                    paddingTop: 2,
                    fontWeight: 'bold',
                    color: 'white',
                  }}>
                  Analytics
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </BaseBackground>
  );
};

export default HomePage;
