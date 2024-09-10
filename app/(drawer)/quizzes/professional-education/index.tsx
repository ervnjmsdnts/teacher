import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../../../firebase';
import BaseBackground from '../../../../components/base-background';
import BackFloatingButton from '../../../../components/back-floating-button';
import NavigateButton from '../../../../components/navigate-button';
import { colors } from '../../../../themes/colors';
import RandomizedButton from '../../../../components/randomized-button';

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

export default function QuizzesProfessionalEducation() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    (async () => {
      const quizzesRef = collection(db, 'quizzes');
      const q = query(quizzesRef, where('type', '==', 'professionalEducation'));
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
            Professional Education Cards
          </Text>
          {quizzes.length > 0 ? (
            <>
              <RandomizedButton to='quizzes/professional-education/random' />
              {quizzes.map((quiz, index) => (
                <NavigateButton
                  key={index}
                  to={`quizzes/professional-education/${quiz.id}`}
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
