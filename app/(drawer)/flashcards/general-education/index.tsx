import { Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import BaseBackground from '../../../../components/base-background';
import BackFloatingButton from '../../../../components/back-floating-button';
import NavigateButton from '../../../../components/navigate-button';
import { colors } from '../../../../themes/colors';

export default function FlashcardsGeneralEducation() {
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
          to='flashcards/general-education/english'
        />
        <NavigateButton
          LeftIcon={
            <FontAwesome5 name='book' size={30} color={colors.primary} />
          }
          subject='Filipino'
          to='flashcards/general-education/filipino'
        />
        <NavigateButton
          LeftIcon={
            <FontAwesome5 name='book' size={30} color={colors.primary} />
          }
          subject='Math'
          to='flashcards/general-education/math'
        />
        <NavigateButton
          LeftIcon={
            <FontAwesome5 name='book' size={30} color={colors.primary} />
          }
          subject='Science'
          to='flashcards/general-education/science'
        />
        <NavigateButton
          LeftIcon={
            <FontAwesome5 name='book' size={30} color={colors.primary} />
          }
          subject='Social Science'
          to='flashcards/general-education/socialScience'
        />
      </View>
    </BaseBackground>
  );
}
