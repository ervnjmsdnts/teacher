import { Pressable, Text, View } from 'react-native';
import BaseBackground from '../../../components/base-background';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../../../themes/colors';
import { useState } from 'react';
import {
  CountdownCircleTimer,
  OnComplete,
} from 'react-native-countdown-circle-timer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ItemHeader from '../../../components/item-header';

const quiz = [
  {
    question: 'What is my name',
    options: ['hello', 'hi', 'how are you', 'are you gay'],
    answer: 1,
  },
  {
    question: 'What is your name',
    options: ['nigga', 'acoustic', 'diaper', 'man'],
    answer: 3,
  },
];
const generateRandomString = (length: number) => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }
  return randomString;
};

const QuizPage = () => {
  // get quiz from id
  const { id } = useLocalSearchParams<{ id: string }>();
  const [quizIndex, setQuizIndex] = useState(0);
  const [checked, setChecked] = useState<number | null>(null);
  const [randomNumber, setRandomNumber] = useState(generateRandomString(10));
  const router = useRouter();

  const nextQuestion = () => {
    setQuizIndex((prev) => prev + 1);
    setRandomNumber(generateRandomString(10));
  };

  const onCompleteTimer = (): void | OnComplete => {
    if (quizIndex >= quiz.length - 1) {
      return console.log('Quiz Done');
    } else {
      setQuizIndex((prev) => prev + 1);
    }
    return { shouldRepeat: true };
  };

  return (
    <BaseBackground>
      <View style={{ flex: 1, gap: 16 }}>
        <ItemHeader
          title='Quiz Title'
          current={quizIndex + 1}
          max={quiz.length}
        />
        <View style={{ alignItems: 'center' }}>
          <CountdownCircleTimer
            key={randomNumber}
            onComplete={onCompleteTimer}
            size={120}
            isPlaying
            duration={30}
            colorsTime={[30, 15, 5, 0]}
            colors={['#69CCC7', '#F7B801', '#A30000', '#A30000']}>
            {({ remainingTime, color }) => (
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: color }}>
                {remainingTime}
              </Text>
            )}
          </CountdownCircleTimer>
        </View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 18,
            fontWeight: '700',
            paddingVertical: 16,
          }}>
          {`${quiz[quizIndex].question}`}
        </Text>
        {/* Options */}
        <View>
          {quiz[quizIndex].options.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => setChecked(index)}
              style={{
                flexDirection: 'row',
                paddingHorizontal: 16,
                borderRadius: 10,
                paddingVertical: 20,
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor:
                  checked === index ? colors['primary-muted'] : 'white',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  color: checked === index ? 'white' : 'black',
                }}>
                {option}
              </Text>
              <View
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor:
                    checked === index ? colors['primary-dark'] : 'white',
                  borderRadius: 9999,
                  borderColor:
                    checked === index ? 'transparent' : colors['primary-dark'],
                  borderWidth: 2,
                }}
              />
            </Pressable>
          ))}
        </View>
        <TouchableOpacity
          onPress={nextQuestion}
          style={{
            paddingVertical: 16,
            backgroundColor: colors.primary,
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </BaseBackground>
  );
};

export default QuizPage;
