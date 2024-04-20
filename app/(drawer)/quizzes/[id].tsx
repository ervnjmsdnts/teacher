import { Pressable, Text, View } from 'react-native';
import BaseBackground from '../../../components/base-background';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../../../themes/colors';
import { useState } from 'react';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import { Ionicons } from '@expo/vector-icons';

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

const QuizPage = () => {
  // get quiz from id
  const { id } = useLocalSearchParams<{ id: string }>();
  const [quizIndex, setQuizIndex] = useState(0);
  const [checked, setChecked] = useState<number | null>(null);
  const router = useRouter();

  return (
    <BaseBackground>
      <View style={{ flex: 1, gap: 16 }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Pressable onPress={() => router.back()}>
            <Ionicons name='arrow-back' size={24} color={colors.primary} />
          </Pressable>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '600',
            }}>
            Quiz Title
          </Text>
          <Text style={{ fontSize: 16, fontWeight: '500' }}>{`${
            quizIndex + 1
          }/${quiz.length}`}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <CountdownCircleTimer
            onComplete={() => {
              if (quizIndex >= quiz.length - 1) {
                return console.log('Quiz Done');
              } else {
                setQuizIndex((prev) => prev + 1);
              }
              return { shouldRepeat: true };
            }}
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
      </View>
    </BaseBackground>
  );
};

export default QuizPage;
