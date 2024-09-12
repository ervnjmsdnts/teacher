import { ActivityIndicator, Text, View } from 'react-native';
import BaseBackground from '../../../../components/base-background';
import { useEffect, useState } from 'react';
import Pdf, { Source } from 'react-native-pdf';
import { useLocalSearchParams } from 'expo-router';
import { storage } from '../../../../firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import BackFloatingButton from '../../../../components/back-floating-button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../../themes/colors';

const Concepts = () => {
  const [resource, setResource] = useState<Source>({ uri: '', cache: false });
  const [reload, setReload] = useState(false);
  const params = useLocalSearchParams<{ subject: string; id: string }>();

  const onReloadPDF = () => {
    setReload((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      setResource({});
      const storageRef = ref(storage, 'Types of Learning Methods.pdf');

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
};

export default Concepts;
