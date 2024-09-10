import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import BaseBackground from '../../../../../components/base-background';
import BackFloatingButton from '../../../../../components/back-floating-button';
import NavigateButton from '../../../../../components/navigate-button';
import { colors } from '../../../../../themes/colors';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../../firebase';
import RandomizedButton from '../../../../../components/randomized-button';

type FlashcardsType = {
  id: string;
  name: string;
  type: string;
  questions: {
    question: string;
    answer: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
};

export default function FlashcardsSpecificSubject() {
  const params = useLocalSearchParams<{ subject: string }>();

  const [flashcards, setFlashcards] = useState<FlashcardsType[]>([]);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const flashcardsRef = collection(db, 'flashcards');
      const q = query(flashcardsRef, where('type', '==', params.subject));
      const snapshot = await getDocs(q);
      let data: FlashcardsType[] = [];
      snapshot.forEach((doc) =>
        data.push({
          id: doc.id,
          name: doc.data().name,
          type: doc.data().type,
          questions: doc.data().questions,
        }),
      );

      setFlashcards(data);
    })();
  }, []);

  return (
    <BaseBackground>
      <BackFloatingButton />
      <ScrollView>
        <View style={{ gap: 12, paddingBottom: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            {params.subject === 'socialScience'
              ? 'Social Science Cards'
              : params.subject.charAt(0).toUpperCase() +
                params.subject.slice(1) +
                ' Cards'}
          </Text>
          {flashcards.length > 0 ? (
            <>
              <RandomizedButton
                to={`/flashcards/general-education/${params.subject}/random`}
              />
              {flashcards.map((flashcard, index) => (
                <NavigateButton
                  key={index}
                  to={`flashcards/general-education/${params.subject}/${flashcard.id}`}
                  subject={flashcard.name}
                  LeftIcon={
                    <MaterialCommunityIcons
                      name='card-multiple'
                      size={30}
                      color={colors.primary}
                    />
                  }
                />
              ))}
            </>
          ) : (
            <ActivityIndicator size='large' />
          )}
        </View>
      </ScrollView>
    </BaseBackground>
  );
}
