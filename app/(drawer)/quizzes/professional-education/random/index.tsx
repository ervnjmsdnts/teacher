import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  CountdownCircleTimer,
  OnComplete,
} from 'react-native-countdown-circle-timer';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';
import { db } from '../../../../../firebase';
import { shuffleArray } from '../../../../../utils';
import BaseBackground from '../../../../../components/base-background';
import ItemHeader from '../../../../../components/item-header';
import { colors } from '../../../../../themes/colors';
import Result from '../../../../../components/result';

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
  const params = useLocalSearchParams<{ subject: string }>();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quiz, setQuiz] = useState<Quiz>({} as Quiz);
  const [showResults, setShowResults] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answerList, setAnswerList] = useState<(number | null)[]>([]);
  const [checked, setChecked] = useState<number | null>(null);
  const [randomNumber, setRandomNumber] = useState(generateRandomString(10));
  const [isLoadingResults, setIsLoadingResults] = useState(false);

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

  useEffect(() => {
    if (quizzes.length > 0) {
      const randomizeQuestions = () => {
        const allQuestions = quizzes.flatMap((quiz) => quiz.questions);

        const shuffledQuestions = shuffleArray([...allQuestions]);

        const limitedQuestions = shuffledQuestions.slice(0, 50);

        const quiz = {
          id: '1',
          name: 'Randomized',
          type: 'random',
          questions: limitedQuestions,
        } as Quiz;

        return quiz;
      };

      setQuiz(randomizeQuestions());
    }
  }, [quizzes.length]);

  const saveResults = async (finalScore: number) => {
    try {
      setIsLoadingResults(true);
    } catch (error) {
      const err = error as FirebaseError;
      alert(err.message);
    } finally {
      setIsLoadingResults(false);
      setShowResults(true);
    }
  };

  const updateQuizState = async () => {
    const currentAnswer = quiz.questions[quizIndex].answer;
    if (currentAnswer === checked) {
      setScore((prev) => {
        const newScore = prev + 1;

        if (quizIndex === quiz.questions.length - 1) {
          saveResults(newScore);
        }

        return newScore;
      });
    } else if (quizIndex === quiz.questions.length - 1) {
      saveResults(score);
    }

    setAnswerList((prev) => [...prev, checked]);

    if (quizIndex < quiz.questions.length - 1) {
      setQuizIndex((prev) => prev + 1);
      setChecked(null);
      setRandomNumber(generateRandomString(10));
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
        {isLoadingResults ? (
          <ActivityIndicator size='large' />
        ) : (
          <>
            {quiz && quiz.id && quiz.questions.length > 0 ? (
              <>
                <ItemHeader
                  title={quiz.name}
                  current={quizIndex + 1}
                  max={quiz.questions.length}
                />
                {!showResults ? (
                  <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                      <CountdownCircleTimer
                        key={randomNumber}
                        onComplete={onCompleteTimer}
                        size={120}
                        isPlaying
                        duration={60}
                        colorsTime={[60, 30, 10, 0]}
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
                    <View style={{ paddingBottom: 8 }}>
                      {quiz.questions[quizIndex].options.map(
                        (option, index) => (
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
                                checked === index
                                  ? colors['primary-muted']
                                  : 'white',
                            }}>
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: '600',
                                maxWidth: 300,
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
                        ),
                      )}
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
                        style={{
                          color: 'white',
                          fontSize: 16,
                          fontWeight: '600',
                        }}>
                        Next
                      </Text>
                    </TouchableOpacity>
                  </ScrollView>
                ) : (
                  <Result
                    numberOfQuestions={quiz.questions.length}
                    score={score}
                    questions={quiz.questions}
                    userAnswers={answerList}
                  />
                )}
              </>
            ) : (
              <ActivityIndicator size='large' />
            )}
          </>
        )}
      </View>
    </BaseBackground>
  );
};

export default QuizPage;
