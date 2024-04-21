import { Text, View } from 'react-native';
import BaseBackground from '../../../components/base-background';
import { useLocalSearchParams } from 'expo-router';
import ItemHeader from '../../../components/item-header';
import { useState } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../themes/colors';
import { Ionicons } from '@expo/vector-icons';

const cards = [
  { question: 'What is my name?', difficulty: 'easy', answer: 'yes' },
  { question: 'What is your name?', difficulty: 'medium', answer: 'no' },
  { question: 'What is our name?', difficulty: 'hard', answer: 'why' },
];

interface Props {
  question: string;
  answer: string;
  isFront: boolean;
  textHidden?: boolean;
}

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

const FlashcardPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [currentCard, setCurrentCard] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [textHidden, setTextHidden] = useState(false);

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
    setTextHidden(true);
    setTimeout(() => {
      setCurrentCard((prev) => prev + 1);
      setTextHidden(false);
    }, 600);
  };

  return (
    <BaseBackground>
      <View style={{ flex: 1, gap: 16 }}>
        <ItemHeader
          title='Flashcard title'
          current={currentCard + 1}
          max={cards.length}
        />
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <Animated.View
            style={[
              { backfaceVisibility: 'hidden', position: 'absolute' },
              frontAnimatedStyles,
            ]}>
            <LearnCard
              question={cards[currentCard].question}
              answer={cards[currentCard].answer}
              isFront={true}
              textHidden={textHidden}
            />
          </Animated.View>
          <Animated.View
            style={[{ backfaceVisibility: 'hidden' }, backAnimatedStyles]}>
            <LearnCard
              question={cards[currentCard].question}
              answer={cards[currentCard].answer}
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
            onPress={() => (!showFront ? onShowQuestion() : onShowAnswer())}>
            <Text
              style={{
                color: colors.primary,
                fontSize: 18,
                fontWeight: '600',
              }}>
              {!showFront ? 'Show Questions' : 'Show Answers'}
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
            <Text style={{ fontSize: 18, color: 'white', fontWeight: '600' }}>
              Next
            </Text>
            <Ionicons name='arrow-forward' size={24} color='white' />
          </TouchableOpacity>
        </View>
      </View>
    </BaseBackground>
  );
};

export default FlashcardPage;
