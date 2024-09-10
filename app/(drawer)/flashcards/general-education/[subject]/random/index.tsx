import { Text, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { colors } from '../../../../../../themes/colors';
import { db } from '../../../../../../firebase';
import BaseBackground from '../../../../../../components/base-background';
import ItemHeader from '../../../../../../components/item-header';
import { shuffleArray } from '../../../../../../utils';

interface Props {
  question: string;
  answer: string;
  isFront: boolean;
  textHidden?: boolean;
}

type FlashcardsType = {
  id: string;
  name: string;
  type: string;
  questions: {
    question: string;
    answer: string;
  }[];
};

const LearnCard = ({ question, isFront, textHidden, answer }: Props) => {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 10,
        width: 300,
        height: 400,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      }}>
      {isFront && !textHidden && (
        <Text
          style={{
            fontSize: 18,
            alignSelf: 'center',
          }}>
          {question}
        </Text>
      )}
      {!isFront && (
        <Text
          style={{
            color: colors['primary-dark'],
            fontWeight: '600',
            fontSize: 18,
            alignSelf: 'center',
          }}>
          {answer}
        </Text>
      )}
    </View>
  );
};

const FlashcardsRandom = () => {
  const params = useLocalSearchParams<{ subject: string }>();
  const [cards, setCards] = useState<FlashcardsType[]>([]);
  const [card, setCard] = useState<FlashcardsType>({} as FlashcardsType);
  const [isDone, setIsDone] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [textHidden, setTextHidden] = useState(false);

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

      setCards(data);
    })();
  }, []);

  useEffect(() => {
    if (cards.length > 0) {
      const randomizeQuestions = () => {
        const allQuestions = cards.flatMap((card) => card.questions);

        const shuffledQuestions = shuffleArray([...allQuestions]);

        const limitedQuestions = shuffledQuestions.slice(0, 50);

        const card = {
          id: '1',
          name: 'Randomized',
          type: 'random',
          questions: limitedQuestions,
        } as FlashcardsType;

        return card;
      };

      setCard(randomizeQuestions());
    }
  }, [cards.length]);

  const rotate = useSharedValue(0);

  const frontAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 600 }),
        },
      ],
    };
  });

  const backAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 600 }),
        },
      ],
    };
  });

  const onShowAnswer = () => {
    rotate.value = 1;
    setShowFront(false);
  };

  const onShowQuestion = () => {
    rotate.value = 0;
    setShowFront(true);
  };

  const onNextCard = () => {
    if (currentCard < card.questions.length - 1) {
      onShowQuestion();
      setTextHidden(true);
      setTimeout(() => {
        setCurrentCard((prev) => prev + 1);
        setTextHidden(false);
      }, 600);
    } else {
      setIsDone(true);
    }
  };

  return (
    <BaseBackground>
      <View style={{ flex: 1, gap: 16 }}>
        {cards && card.id && card.questions.length > 0 && (
          <>
            <ItemHeader
              title={card.name}
              current={currentCard + 1}
              max={card.questions.length}
            />
            {!isDone ? (
              <>
                <View
                  style={{
                    paddingTop: 24,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Animated.View
                    style={[
                      { backfaceVisibility: 'hidden', position: 'absolute' },
                      frontAnimatedStyles,
                    ]}>
                    <LearnCard
                      question={card.questions[currentCard].question}
                      answer={card.questions[currentCard].answer}
                      isFront={true}
                      textHidden={textHidden}
                    />
                  </Animated.View>
                  <Animated.View
                    style={[
                      { backfaceVisibility: 'hidden' },
                      backAnimatedStyles,
                    ]}>
                    <LearnCard
                      question={card.questions[currentCard].question}
                      answer={card.questions[currentCard].answer}
                      isFront={false}
                    />
                  </Animated.View>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{
                      padding: 8,
                    }}
                    onPress={() =>
                      !showFront ? onShowQuestion() : onShowAnswer()
                    }>
                    <Text
                      style={{
                        color: colors.primary,
                        fontSize: 18,
                        fontWeight: '600',
                      }}>
                      {!showFront ? 'Show Question' : 'Show Answer'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onNextCard}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 8,
                      padding: 8,
                      backgroundColor: colors.primary,
                      borderRadius: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'white',
                        fontWeight: '600',
                      }}>
                      Next
                    </Text>
                    <Ionicons name='arrow-forward' size={24} color='white' />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                }}>
                <Text style={{ fontSize: 20, fontWeight: '600' }}>Done</Text>
                <TouchableOpacity
                  onPress={() => router.back()}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                  }}>
                  <Ionicons
                    name='arrow-back'
                    size={20}
                    color={colors.primary}
                  />
                  <Text
                    style={{
                      color: colors.primary,
                      fontSize: 16,
                      fontWeight: '500',
                    }}>
                    Go Back
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </BaseBackground>
  );
};

export default FlashcardsRandom;
