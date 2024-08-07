import { Pressable, Text, View } from 'react-native';
import BaseBackground from '../../../../components/base-background';
import { colors } from '../../../../themes/colors';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import { storage } from '../../../../firebase';

type ReviewerType = {
  url: string;
  name: string;
};

export default function SubjectsPage() {
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

  return (
    <BaseBackground>
      <ScrollView>
        <View style={{ gap: 16 }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>Reviewers</Text>
          {reviewers.length > 0 ? (
            <View style={{ gap: 8 }}>
              {reviewers.map((reviewer, index) => (
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
}
