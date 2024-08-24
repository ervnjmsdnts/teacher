import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Pdf, { Source } from 'react-native-pdf';
import { getDownloadURL, ref } from 'firebase/storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { storage } from '../../../../../firebase';
import BaseBackground from '../../../../../components/base-background';
import BackFloatingButton from '../../../../../components/back-floating-button';
import { colors } from '../../../../../themes/colors';

export default function SubjectPDF() {
  const [resource, setResource] = useState<Source>({ uri: '', cache: false });
  const [reload, setReload] = useState(false);
  const params = useLocalSearchParams<{ id: string }>();

  const onReloadPDF = () => {
    setReload((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      setResource({});
      const storageRef = ref(storage, `professionalEducation/${params.id}`);

      const url = await getDownloadURL(storageRef);

      setResource({ uri: url, cache: false });
    })();
  }, [reload, params.id]);

  return (
    <BaseBackground>
      <View style={{ position: 'relative', flex: 1, gap: 8 }}>
        <BackFloatingButton />
        <TouchableOpacity
          onPress={onReloadPDF}
          style={{
            alignSelf: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
            padding: 8,
            backgroundColor: colors.primary,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: 'white',
              fontWeight: '600',
            }}>
            Reload PDF
          </Text>
        </TouchableOpacity>
        {resource.uri ? (
          <Pdf
            trustAllCerts={false}
            source={resource}
            style={{
              flex: 1,
              alignSelf: 'stretch',
            }}
            onLoadComplete={(numPages) => console.log(numPages)}
          />
        ) : (
          <ActivityIndicator size='large' />
        )}
      </View>
    </BaseBackground>
  );
}
