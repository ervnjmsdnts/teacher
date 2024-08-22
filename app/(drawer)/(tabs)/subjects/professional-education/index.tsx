import { useEffect, useState } from 'react';
import BaseBackground from '../../../../../components/base-background';
import { listAll, ref } from 'firebase/storage';
import { storage } from '../../../../../firebase';
import BackFloatingButton from '../../../../../components/back-floating-button';
import { ScrollView, Text, View } from 'react-native';
import NavigateButton from '../../../../../components/navigate-button';
import { AntDesign } from '@expo/vector-icons';
import { colors } from '../../../../../themes/colors';

export default function ProfessionalEducation() {
  const [modules, setModules] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const storageRef = ref(storage, `professionalEducation`);
      const result = await listAll(storageRef);

      const names = result.items.map((pdfRef) => pdfRef.name);

      setModules(names);
    })();
  }, []);

  return (
    <BaseBackground>
      <BackFloatingButton />
      <ScrollView>
        <View style={{ gap: 12, paddingBottom: 8 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Professional Education Modules
          </Text>
          {modules.length > 0 ? (
            <>
              {modules.map((module, index) => (
                <NavigateButton
                  key={index}
                  to={`subjects/professional-education/${module}`}
                  subject={module.split('.')[0]}
                  LeftIcon={
                    <AntDesign
                      name='pdffile1'
                      size={30}
                      color={colors.primary}
                    />
                  }
                />
              ))}
            </>
          ) : (
            <Text>Loading Modules...</Text>
          )}
        </View>
      </ScrollView>
    </BaseBackground>
  );
}
