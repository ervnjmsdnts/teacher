import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../../../../themes/colors';
import BaseBackground from '../../../../components/base-background';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useMemo, useState } from 'react';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../../../firebase';

type ReviewerType = {
  url: string;
  name: string;
};

const getRandomThree = (arr: ReviewerType[]): ReviewerType[] => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr.slice(0, 3);
};

const HomePage = () => {
  const [reviewers, setReviewers] = useState<ReviewerType[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const storageRef = ref(storage, 'reviewers');
      const result = await listAll(storageRef);

      const urls = await Promise.all(
        result.items.map(async (pdfRef) => ({
          url: await getDownloadURL(pdfRef),
          name: pdfRef.name,
        })),
      );

      setReviewers(urls);
    })();
  }, []);

  const randomReviewers = useMemo(
    () => getRandomThree(reviewers ?? []),
    [reviewers],
  );

  return (
    <BaseBackground>
      <ScrollView>
        <View
          style={{
            height: 150,
            backgroundColor: colors.grey,
            borderRadius: 20,
            marginBottom: 16,
          }}
        />
        <View style={{ gap: 8, marginBottom: 16 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
            Technology Enabled Application for Coaching and Holistic Exam
            Readiness
          </Text>
          <View
            style={{
              height: 8,
              width: 64,
              backgroundColor: colors.primary,
              borderRadius: 20,
            }}
          />
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
        {/* Reviewers */}
        <View style={{ gap: 8 }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>Reviewers</Text>
          {reviewers &&
          reviewers.length > 0 &&
          randomReviewers &&
          randomReviewers.length > 0 ? (
            <View
              style={{
                gap: 8,
              }}>
              {randomReviewers.map((reviewer, index) => (
                <TouchableOpacity
                  onPress={() => router.push(`/subjects/${reviewer.name}`)}
                  key={index}
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    gap: 4,
                    justifyContent: 'space-between',
                    borderWidth: 2,
                    borderColor: colors['primary-muted'],
                    flexDirection: 'row',
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{ fontSize: 18, flex: 1, fontWeight: '500' }}>
                    {reviewer.name}
                  </Text>
                  <Ionicons
                    name='arrow-forward'
                    size={24}
                    color={colors.primary}
                  />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <Text>Loading reviewers...</Text>
          )}
        </View>
      </ScrollView>
    </BaseBackground>
  );
};

export default HomePage;
