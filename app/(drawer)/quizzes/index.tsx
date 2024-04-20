import { ScrollView, Text, View } from 'react-native';
import BaseBackground from '../../../components/base-background';
import { colors } from '../../../themes/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Quiz = ({ title, id }: { title: string; id: string }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/quizzes/${id}`)}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        width: '100%',
        padding: 16,
        elevation: 20,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        gap: 8,
      }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>{title}</Text>
      <Ionicons
        style={{ marginLeft: 8 }}
        name='arrow-forward'
        size={24}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
};

const QuizzesPage = () => {
  return (
    <BaseBackground>
      <ScrollView>
        <View style={{ gap: 24, padding: 8 }}>
          {new Array(5).fill(null).map((_, index) => (
            <Quiz
              key={index}
              title={`Quiz #${index + 1}`}
              id='jfioewajfioewa'
            />
          ))}
        </View>
      </ScrollView>
    </BaseBackground>
  );
};

export default QuizzesPage;
