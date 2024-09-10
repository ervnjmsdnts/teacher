import { ScrollView, Text, View } from 'react-native';
import { colors } from '../themes/colors';

type Questions = {
  answer: number;
  options: string[];
  question: string;
};

export default function Result({
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
