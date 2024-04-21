import { Text, View } from 'react-native';
import BaseBackground from '../../../components/base-background';
import { ScrollView } from 'react-native-gesture-handler';
import ListItem from '../../../components/list-item';

const FlashcardsPage = () => {
  return (
    <BaseBackground>
      <ScrollView>
        <View style={{ gap: 24, padding: 8 }}>
          {new Array(5).fill(null).map((_, index) => (
            <ListItem
              key={index}
              title={`Flashcard #${index + 1}`}
              route={'/flashcards/jfioweajifoewa'}
            />
          ))}
        </View>
      </ScrollView>
    </BaseBackground>
  );
};

export default FlashcardsPage;
