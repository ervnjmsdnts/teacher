import { View } from 'react-native';
import BaseBackground from '../../../components/base-background';
import { ScrollView } from 'react-native-gesture-handler';
import ListItem from '../../../components/list-item';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';

type FlashcardsType = {
  id: string;
  name: string;
  questions: {
    question: string;
    answer: string;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
};

const FlashcardsPage = () => {
  const [flashcards, setFlashcards] = useState<FlashcardsType[]>([]);

  useEffect(() => {
    (async () => {
      const flashcardsRef = collection(db, 'flashcards');
      const snapshot = await getDocs(flashcardsRef);
      let data: FlashcardsType[] = [];
      snapshot.forEach((doc) =>
        data.push({
          id: doc.id,
          name: doc.data().name,
          questions: doc.data().questions,
        }),
      );

      setFlashcards(data);
    })();
  }, []);

  return (
    <BaseBackground>
      <ScrollView>
        <View style={{ gap: 24, padding: 8 }}>
          {flashcards.map((flashcard) => (
            <ListItem
              key={flashcard.id}
              title={flashcard.name}
              route={`/flashcards/${flashcard.id}`}
            />
          ))}
        </View>
      </ScrollView>
    </BaseBackground>
  );
};

export default FlashcardsPage;
