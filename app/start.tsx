import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '../themes/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const texts = [
  {
    title: 'Offline Learning',
    description: 'We Provide Classes Offline Quizzes, Flash cards and Lectures',
  },
  {
    title: 'Learn from Anytime',
    description: 'Booked or Same Lectures for Future',
  },
  {
    title: 'Ready to Learn',
    description: 'Analyze and Learn at the Same Time',
  },
];

const StartScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const router = useRouter();

  const handleSkip = async () => {
    await AsyncStorage.setItem('skip-splash', 'true');
    return router.replace('(drawer)/(tabs)/home');
  };

  const handlePress = async () => {
    if (currentIndex === 2) {
      await AsyncStorage.setItem('skip-splash', 'true');
      return router.replace('(drawer)/(tabs)/home');
    }

    setCurrentIndex((prev) => prev + 1);
  };
  return (
    <View
      style={{
        flex: 1,
        padding: 32,
        backgroundColor: colors['primary-start'],
        position: 'relative',
      }}>
      <Pressable onPress={handleSkip} style={{ alignSelf: 'flex-end' }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
          SKIP
        </Text>
      </Pressable>
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'white',
            }}>
            {texts[currentIndex].title}
          </Text>
          <Text style={{ fontSize: 16, color: 'white', textAlign: 'center' }}>
            {texts[currentIndex].description}
          </Text>
        </View>
        <View
          style={{
            marginTop: 200,
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {new Array(3).fill(null).map((_, index) => (
              <View
                key={index}
                style={{
                  width: currentIndex === index ? 16 : 10,
                  height: 10,
                  backgroundColor:
                    currentIndex === index ? colors.primary : 'white',
                  borderRadius: 9999,
                }}
              />
            ))}
          </View>
          <Pressable
            onPress={handlePress}
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 8,
              backgroundColor: colors.primary,
              borderRadius: 9999,
            }}>
            {currentIndex === 2 && (
              <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>
                Get Started
              </Text>
            )}
            <View
              style={{
                backgroundColor: currentIndex === 2 ? 'white' : colors.primary,
                borderRadius: 9999,
              }}>
              <Ionicons
                name='arrow-forward'
                size={currentIndex === 2 ? 28 : 32}
                color={currentIndex === 2 ? colors.primary : 'white'}
              />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default StartScreen;
