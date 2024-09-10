import { Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BaseBackground from '../../../../components/base-background';
import BackFloatingButton from '../../../../components/back-floating-button';
import NavigateButton from '../../../../components/navigate-button';
import { colors } from '../../../../themes/colors';

export default function QuizzesGeneralEducation() {
  return (
    <BaseBackground>
      <BackFloatingButton />
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Subjects</Text>
        <NavigateButton
          LeftIcon={
            <FontAwesome5 name='book' size={30} color={colors.primary} />
          }
          subject='English'
          to='quizzes/general-education/english'
        />
        <NavigateButton
          LeftIcon={
            <FontAwesome5 name='book' size={30} color={colors.primary} />
          }
          subject='Filipino'
          to='quizzes/general-education/filipino'
        />
        <NavigateButton
          LeftIcon={
            <FontAwesome5 name='book' size={30} color={colors.primary} />
          }
          subject='Math'
          to='quizzes/general-education/math'
        />
        <NavigateButton
          LeftIcon={
            <FontAwesome5 name='book' size={30} color={colors.primary} />
          }
          subject='Science'
          to='quizzes/general-education/science'
        />
        <NavigateButton
          LeftIcon={
            <FontAwesome5 name='book' size={30} color={colors.primary} />
          }
          subject='Social Science'
          to='quizzes/general-education/socialScience'
        />
      </View>
    </BaseBackground>
  );
}
