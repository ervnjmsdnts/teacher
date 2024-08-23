import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import BaseBackground from '../../../../components/base-background';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase';
import { FirebaseError } from 'firebase/app';
import NavigateButton from '../../../../components/navigate-button';
import { FontAwesome } from '@expo/vector-icons';
import { colors } from '../../../../themes/colors';

type QuizResultsType = {
  id: string;
  createdAt: number;
  score: number;
  quizName: string;
  quizItems: number;
  userId: string;
};

export default function Analytics() {
  const { currentUser } = getAuth();
  const [quizResults, setQuizResults] = useState<QuizResultsType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser?.uid) return;

    const fetchQuizResultsRealtime = () => {
      try {
        const quizResultsRef = collection(db, 'user-result-quizzes');
        const q = query(quizResultsRef, where('userId', '==', currentUser.uid));

        // Set up real-time listener for quiz results
        const unsubscribe = onSnapshot(q, async (snapshot) => {
          const data: QuizResultsType[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            createdAt: doc.data().createdAt,
            score: doc.data().score,
            userId: doc.data().userId,
            quizName: doc.data().quizName,
            quizItems: doc.data().quizItems,
          }));

          setQuizResults(data);
          setLoading(false);
        });

        // Cleanup listener on unmount
        return () => unsubscribe();
      } catch (err) {
        const error = err as FirebaseError;
        setError(error.message);
        setLoading(false);
      }
    };

    const unsubscribe = fetchQuizResultsRealtime();

    return () => unsubscribe && unsubscribe();
  }, [currentUser?.uid]);

  if (loading) {
    return (
      <BaseBackground>
        <ActivityIndicator size='large' />
      </BaseBackground>
    );
  }

  if (error) {
    return (
      <BaseBackground>
        <Text>Error: {error}</Text>
      </BaseBackground>
    );
  }

  if (quizResults.length === 0) {
    return (
      <BaseBackground>
        <Text>No quiz results found.</Text>
      </BaseBackground>
    );
  }

  const uniqueQuiz = Array.from(
    new Set(quizResults.map((result) => result.quizName)),
  );

  return (
    <BaseBackground>
      <ScrollView>
        <View style={{ gap: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Quizzes</Text>
          {uniqueQuiz.map((name) => {
            const filteredQuiz = quizResults.filter(
              (quiz) => quiz.quizName === name,
            );
            const totalUserScore = filteredQuiz.reduce(
              (acc, value) => acc + value.score,
              0,
            );
            const numberOfTries = filteredQuiz.length;
            const totalPossibleScores =
              filteredQuiz[0].quizItems * numberOfTries;
            const percentage = parseFloat(
              ((totalUserScore / totalPossibleScores) * 100).toFixed(2),
            );
            return (
              <NavigateButton
                params={{ results: JSON.stringify(filteredQuiz) }}
                key={name}
                LeftIcon={
                  <FontAwesome
                    name='bar-chart'
                    size={30}
                    color={colors.primary}
                  />
                }
                RightIcon={
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 24,
                      fontWeight: 'bold',
                    }}>
                    {percentage}%
                  </Text>
                }
                subject={name}
                to='/analytics/result'
              />
            );
          })}
        </View>
      </ScrollView>
    </BaseBackground>
  );
}
