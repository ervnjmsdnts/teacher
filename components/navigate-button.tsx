import { RouteParamInput, useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../themes/colors';
import { View, Text } from 'react-native';
import React, { ReactNode } from 'react';
import { Ionicons } from '@expo/vector-icons';

type NavigateButtonsProps = {
  params?: RouteParamInput<any>;
  LeftIcon: ReactNode;
  RightIcon?: ReactNode;
  subject: string;
  to: string;
};
export default function NavigateButton({
  subject,
  to,
  LeftIcon,
  params,
  RightIcon = (
    <Ionicons name='arrow-forward' size={30} color={colors.primary} />
  ),
}: NavigateButtonsProps) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: colors['grey'],
        borderRadius: 6,
      }}
      onPress={() => router.push({ pathname: to, params })}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 16,
        }}>
        {LeftIcon}
        <Text style={{ fontSize: 16, fontWeight: 'bold', maxWidth: 200 }}>
          {subject}
        </Text>
      </View>
      {RightIcon}
    </TouchableOpacity>
  );
}
