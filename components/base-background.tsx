import { View } from 'react-native';
import { colors } from '../themes/colors';
import { PropsWithChildren } from 'react';

const BaseBackground = ({ children }: PropsWithChildren) => {
  return (
    <View style={{ backgroundColor: colors.primary, flex: 1 }}>
      <View
        style={{
          backgroundColor: 'white',
          flex: 1,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 16,
          paddingTop: 16,
        }}>
        {children}
      </View>
    </View>
  );
};

export default BaseBackground;
