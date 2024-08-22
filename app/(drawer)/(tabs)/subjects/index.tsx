import { Text, View } from 'react-native';
import BaseBackground from '../../../../components/base-background';
import { ScrollView } from 'react-native-gesture-handler';
import NavigateButton from '../../../../components/navigate-button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../../../themes/colors';

export default function SubjectsPage() {
  return (
    <BaseBackground>
      <ScrollView>
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Reviewers</Text>
          <NavigateButton
            to='subjects/general-education'
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
            to='subjects/professional-education'
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
