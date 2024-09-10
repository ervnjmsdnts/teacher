import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import BaseBackground from '../../../../../components/base-background';
import BackFloatingButton from '../../../../../components/back-floating-button';
import NavigateButton from '../../../../../components/navigate-button';
import { colors } from '../../../../../themes/colors';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../../firebase';
import RandomizedButton from '../../../../../components/randomized-button';

type Questions = {
  answer: number;
  options: string[];
  question: string;
};

type Quiz = {
  id: string;
  name: string;
  type: string;
  questions: Questions[];
};

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

export default function QuizzesSpecificSubject() {
  const params = useLocalSearchParams<{ subject: string }>();

  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    (async () => {
      const flashcardsRef = collection(db, 'quizzes');
      const q = query(flashcardsRef, where('type', '==', params.subject));
      const snapshot = await getDocs(q);
      let data: Quiz[] = [];
      snapshot.forEach((doc) =>
        data.push({
          id: doc.id,
          name: doc.data().name,
          type: doc.data().type,
          questions: doc.data().questions,
        }),
      );

      setQuizzes(data);
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
          {quizzes.length > 0 ? (
            <>
              <RandomizedButton
                to={`/quizzes/general-education/${params.subject}/random`}
              />
              {quizzes.map((quiz, index) => (
                <NavigateButton
                  key={index}
                  to={`quizzes/general-education/${params.subject}/${quiz.id}`}
                  subject={quiz.name}
                  LeftIcon={
                    <MaterialCommunityIcons
                      name='bookmark-box-multiple'
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
