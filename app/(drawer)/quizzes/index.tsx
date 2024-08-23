import { ActivityIndicator, ScrollView, View } from 'react-native';
import BaseBackground from '../../../components/base-background';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import NavigateButton from '../../../components/navigate-button';
import { colors } from '../../../themes/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Quiz = {
  id: string;
  name: string;
  questions: {
    answer: number;
    options: string[];
    question: string;
  }[];
};

const QuizzesPage = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    (async () => {
      const quizzesRef = collection(db, 'quizzes');
      const snapshot = await getDocs(quizzesRef);
      let data: Quiz[] = [];
      snapshot.forEach((doc) =>
        data.push({
          id: doc.id,
          name: doc.data().name,
          questions: doc.data().questions,
        }),
      );
      setQuizzes(data);
    })();
  }, []);

  return (
    <BaseBackground>
      <ScrollView>
        <View style={{ gap: 24, padding: 8 }}>
          {quizzes.length > 0 ? (
            <>
              {quizzes.map((quiz) => (
                <NavigateButton
                  key={quiz.id}
                  to={`/flashcards/${quiz.id}`}
                  subject={quiz.name}
                  LeftIcon={
                    <MaterialCommunityIcons
                      name='note'
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
};

export default QuizzesPage;
