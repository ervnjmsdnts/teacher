import { ScrollView, Text, View } from 'react-native';
import BaseBackground from '../../../../../components/base-background';
import { useLocalSearchParams } from 'expo-router';
import BackFloatingButton from '../../../../../components/back-floating-button';
import { format } from 'date-fns';
import { Bar, CartesianChart } from 'victory-native';
import { useFont } from '@shopify/react-native-skia';
import { colors } from '../../../../../themes/colors';

type QuizResultsType = {
  id: string;
  createdAt: number;
  score: number;
  quizName: string;
  quizItems: number;
  userId: string;
};
const inter = require('../../../../../assets/inter.ttf');

export default function Result() {
  const params = JSON.parse(
    useLocalSearchParams<{ results: string }>().results,
  ) as QuizResultsType[];

  const font = useFont(inter, 12);

  const totalItemsPerQuiz = params[0].quizItems;
  const quizName = params[0].quizName;
  const data = params
    .sort((a, b) => a.createdAt - b.createdAt)
    .map((result) => ({
      ...result,
      score: result.score,
      date: format(new Date(result.createdAt), 'MMM dd'),
    }));

  return (
    <BaseBackground>
      <BackFloatingButton />
      <ScrollView>
        <View style={{ gap: 16 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{quizName}</Text>
          <View style={{ width: '95%', height: 300 }}>
            <CartesianChart
              data={data}
              padding={5}
              domainPadding={{ left: 50, right: 50, top: 10 }}
              axisOptions={{
                font,
                labelOffset: 5,
                tickCount: {
                  x: data.length,
                  y: totalItemsPerQuiz,
                },
                formatXLabel: (value) => value,
                lineColor: '#71717a',
                labelColor: 'black',
              }}
              xKey='date'
              yKeys={['score']}
              domain={{ y: [0, totalItemsPerQuiz] }}>
              {({ points, chartBounds }) => (
                <Bar
                  barWidth={40}
                  points={points.score}
                  chartBounds={chartBounds}
                  color={colors['primary-start']}
                  roundedCorners={{ topLeft: 10, topRight: 10 }}
                />
              )}
            </CartesianChart>
          </View>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Overview</Text>
          <View style={{ gap: 8 }}>
            {data.map((result) => (
              <View
                key={result.id}
                style={{
                  borderWidth: 1,
                  padding: 8,
                  borderRadius: 10,
                  borderColor: colors.grey,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={{ fontWeight: 'bold' }}>
                    {format(new Date(result.createdAt), 'PP')}
                  </Text>
                  <Text>{format(new Date(result.createdAt), 'pp')}</Text>
                </View>
                <Text
                  style={{
                    color: colors['primary-dark'],
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  {result.score}/{result.quizItems}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </BaseBackground>
  );
}
