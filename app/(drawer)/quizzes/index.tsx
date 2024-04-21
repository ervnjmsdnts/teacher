import { ScrollView, View } from 'react-native';
import BaseBackground from '../../../components/base-background';
import ListItem from '../../../components/list-item';

const QuizzesPage = () => {
  return (
    <BaseBackground>
      <ScrollView>
        <View style={{ gap: 24, padding: 8 }}>
          {new Array(5).fill(null).map((_, index) => (
            <ListItem
              key={index}
              title={`Quiz #${index + 1}`}
              route='/quizzes/jfioewajfioewa'
            />
          ))}
        </View>
      </ScrollView>
    </BaseBackground>
  );
};

export default QuizzesPage;
