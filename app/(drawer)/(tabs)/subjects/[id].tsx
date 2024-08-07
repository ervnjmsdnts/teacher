import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import BaseBackground from '../../../../components/base-background';
import BackFloatingButton from '../../../../components/back-floating-button';
import Pdf, { Source } from 'react-native-pdf';
import { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../../firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { colors } from '../../../../themes/colors';

const SubjectPage = () => {
  const [resource, setResource] = useState<Source>({ uri: '', cache: false });
  const [reload, setReload] = useState(false);
  const { id } = useLocalSearchParams<{ id: string }>();

  const onReloadPDF = () => {
    setReload((prev) => !prev);
  };

  useEffect(() => {
    (async () => {
      setResource({});
      const storageRef = ref(storage, `reviewers/${id}`);

      const url = await getDownloadURL(storageRef);

      setResource({ uri: url, cache: false });
    })();
  }, [id, reload]);

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
          <Text>Loading PDF...</Text>
        )}
      </View>
    </BaseBackground>
  );
};

export default SubjectPage;
