import BaseBackground from '../../../../../components/base-background';
import { Text, View } from 'react-native';
import BackFloatingButton from '../../../../../components/back-floating-button';
import NavigateButton from '../../../../../components/navigate-button';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../../../../themes/colors';

export default function GeneralEducation() {
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
          to='subjects/general-education/english'
        />
        <NavigateButton
          LeftIcon={
            <FontAwesome5 name='book' size={30} color={colors.primary} />
          }
          subject='Filipino'
          to='subjects/general-education/filipino'
        />
        <NavigateButton
          LeftIcon={
            <FontAwesome5 name='book' size={30} color={colors.primary} />
          }
          subject='Math'
          to='subjects/general-education/math'
        />
        <NavigateButton
          LeftIcon={
            <FontAwesome5 name='book' size={30} color={colors.primary} />
          }
          subject='Science'
          to='subjects/general-education/science'
        />
        <NavigateButton
          LeftIcon={
            <FontAwesome5 name='book' size={30} color={colors.primary} />
          }
          subject='Social Science'
          to='subjects/general-education/socialScience'
        />
      </View>
    </BaseBackground>
  );
}
