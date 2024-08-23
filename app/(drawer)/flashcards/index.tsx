import { ActivityIndicator, View } from 'react-native';
import BaseBackground from '../../../components/base-background';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase';
import NavigateButton from '../../../components/navigate-button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../themes/colors';

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
          {flashcards.length > 0 ? (
            <>
              {flashcards.map((flashcard) => (
                <NavigateButton
                  key={flashcard.id}
                  to={`/flashcards/${flashcard.id}`}
                  subject={flashcard.name}
                  LeftIcon={
                    <MaterialCommunityIcons
                      name='card-bulleted'
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

export default FlashcardsPage;
