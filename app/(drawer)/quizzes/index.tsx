import { ScrollView, View } from 'react-native';
import BaseBackground from '../../../components/base-background';
import ListItem from '../../../components/list-item';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

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
          {quizzes.map((quiz) => (
            <ListItem
              key={quiz.id}
              title={quiz.name}
              route={`/quizzes/${quiz.id}`}
            />
          ))}
        </View>
      </ScrollView>
    </BaseBackground>
  );
};

export default QuizzesPage;
