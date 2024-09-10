import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BaseBackground from '../../../components/base-background';
import NavigateButton from '../../../components/navigate-button';
import { colors } from '../../../themes/colors';

export default function QuizzesPage() {
  return (
    <BaseBackground>
      <ScrollView>
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Quizzes</Text>
          <NavigateButton
            to='quizzes/general-education'
            subject='General Education'
            LeftIcon={
              <MaterialCommunityIcons
                name='bookshelf'
                size={30}
                color={colors.primary}
              />
            }
          />
          <NavigateButton
            to='quizzes/professional-education'
            subject='Professional Education'
            LeftIcon={
              <MaterialCommunityIcons
                name='bookshelf'
                size={30}
                color={colors.primary}
              />
            }
          />
        </View>
      </ScrollView>
    </BaseBackground>
  );
}
