import { Text, View } from 'react-native';
import BaseBackground from '../../../../../../components/base-background';
import { useLocalSearchParams } from 'expo-router';
import BackFloatingButton from '../../../../../../components/back-floating-button';
import { AntDesign } from '@expo/vector-icons';
import NavigateButton from '../../../../../../components/navigate-button';
import { colors } from '../../../../../../themes/colors';
import { useEffect, useState } from 'react';
import { listAll, ref } from 'firebase/storage';
import { storage } from '../../../../../../firebase';

export default function SpecificSubject() {
  const [modules, setModules] = useState<string[]>([]);
  const params = useLocalSearchParams<{ subject: string }>();

  useEffect(() => {
    (async () => {
      const storageRef = ref(storage, `generalEducation/${params.subject}`);
      const result = await listAll(storageRef);

      const names = result.items.map((pdfRef) => pdfRef.name);

      setModules(names);
    })();
  }, []);

  return (
    <BaseBackground>
      <BackFloatingButton />
      <View style={{ gap: 12 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {params.subject === 'socialScience'
            ? 'Social Science Modules'
            : params.subject.charAt(0).toUpperCase() +
              params.subject.slice(1) +
              ' Modules'}
        </Text>
        {modules.length > 0 ? (
          <>
            {modules.map((module, index) => (
              <NavigateButton
                key={index}
                to={`subjects/general-education/${params.subject}/${module}`}
                subject={module.split('.')[0]}
                LeftIcon={
                  <AntDesign name='pdffile1' size={30} color={colors.primary} />
                }
              />
            ))}
          </>
        ) : (
          <Text>Loading Modules...</Text>
        )}
      </View>
    </BaseBackground>
  );
}
