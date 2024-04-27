import { Pressable, Text, View } from 'react-native';
import BaseBackground from '../../../components/base-background';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors } from '../../../themes/colors';
import { useEffect, useState } from 'react';
import {
  CountdownCircleTimer,
  OnComplete,
} from 'react-native-countdown-circle-timer';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import ItemHeader from '../../../components/item-header';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

type Questions = {
  answer: number;
  options: string[];
  question: string;
};

type Quiz = {
  id: string;
  name: string;
  questions: Questions[];
};

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

function Result({
  score,
  numberOfQuestions,
  userAnswers,
  questions,
}: {
  score: number;
  numberOfQuestions: number;
  userAnswers: (number | null)[];
  questions: Questions[];
}) {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            marginBottom: 8,
            borderRadius: 10,
            padding: 8,
            backgroundColor: colors.primary,
          }}>
          <Text style={{ fontSize: 16, marginBottom: 4, color: 'white' }}>
            Your Score
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 40, fontWeight: '700', color: 'white' }}>
              {score}
            </Text>
            <Text
              style={{
                fontSize: 24,
                color: 'white',
                marginBottom: 4,
                alignSelf: 'flex-end',
              }}>
              /{numberOfQuestions}
            </Text>
          </View>
        </View>
        <View style={{ gap: 8 }}>
          {questions.map((question, questionIndex) => (
            <View key={questionIndex}>
              <Text
                style={{ fontWeight: '700', fontSize: 18, marginBottom: 4 }}>
                {questionIndex + 1}. {question.question}
              </Text>
              <View style={{ gap: 8 }}>
                {question.options.map((option, optionIndex) => (
                  <View
                    key={optionIndex}
                    style={{
                      padding: 8,
                      borderRadius: 10,
                      backgroundColor:
                        userAnswers[questionIndex] === optionIndex
                          ? question.answer === optionIndex
                            ? 'green'
                            : 'red'
                          : question.answer === optionIndex
                          ? colors.primary
                          : 'white',
                    }}>
                    <Text
                      style={{
                        color:
                          userAnswers[questionIndex] !== optionIndex &&
                          question.answer !== optionIndex
                            ? 'black'
                            : 'white',
                      }}>
                      {option}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const QuizPage = () => {
  // get quiz from id
  const { id } = useLocalSearchParams<{ id: string }>();
  const [quiz, setQuiz] = useState<Quiz>({} as Quiz);
  const [showResults, setShowResults] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerList, setAnswerList] = useState<(number | null)[]>([]);
  const [checked, setChecked] = useState<number | null>(null);
  const [randomNumber, setRandomNumber] = useState(generateRandomString(10));

  useEffect(() => {
    (async () => {
      const quizRef = doc(db, 'quizzes', `${id}`);
      const snapshot = await getDoc(quizRef);
      setQuiz({
        id: snapshot.id,
        name: snapshot.data()?.name,
        questions: snapshot.data()?.questions,
      });
    })();
  }, [id]);

  const updateQuizState = () => {
    const currentAnswer = quiz.questions[quizIndex].answer;
    if (currentAnswer === checked) {
      setScore((prev) => prev + 1);
    }

    setAnswerList((prev) => [...prev, checked]);

    if (quizIndex < quiz.questions.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setChecked(null);
      setRandomNumber(generateRandomString(10));
    } else {
      setShowResults(true);
    }
  };

  const nextQuestion = () => {
    if (checked === null) return;
    updateQuizState();
  };

  const onCompleteTimer = (): void | OnComplete => {
    updateQuizState();
    return { shouldRepeat: true };
  };

  return (
    <BaseBackground>
      <View style={{ flex: 1, gap: 16 }}>
        {quiz && quiz.id && (
          <>
            <ItemHeader
              title={quiz.name}
              current={quizIndex + 1}
              max={quiz.questions.length}
            />
            {!showResults ? (
              <>
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
                      <Text
                        style={{
                          fontSize: 20,
                          fontWeight: 'bold',
                          color: color,
                        }}>
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
                  {`${quiz.questions[quizIndex].question}`}
                </Text>
                {/* Options */}
                <View>
                  {quiz.questions[quizIndex].options.map((option, index) => (
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
                            checked === index
                              ? colors['primary-dark']
                              : 'white',
                          borderRadius: 9999,
                          borderColor:
                            checked === index
                              ? 'transparent'
                              : colors['primary-dark'],
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
                  <Text
                    style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
                    Next
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <Result
                numberOfQuestions={quiz.questions.length}
                score={score}
                questions={quiz.questions}
                userAnswers={answerList}
              />
            )}
          </>
        )}
      </View>
    </BaseBackground>
  );
};

export default QuizPage;
