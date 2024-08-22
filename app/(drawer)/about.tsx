import { ScrollView, Text, View } from 'react-native';
import BaseBackground from '../../components/base-background';

const AboutPage = () => {
  return (
    <BaseBackground>
      <ScrollView>
        <View style={{ gap: 16 }}>
          <Text style={{ fontSize: 16 }}>
            Welcome to TEACHER—your ultimate companion for acing the Licensure
            Examination for Teachers (LET). Our app is designed to streamline
            your study process with a focus on efficiency and effectiveness.
          </Text>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              What is TEACHER?
            </Text>
            <Text style={{ fontSize: 16 }}>
              TEACHER is a comprehensive study tool crafted specifically for
              future educators preparing for the Licensure Examination for
              Teachers. We understand that preparing for the LET can be
              overwhelming, so we've created an all-in-one platform that offers
              premade flashcards, detailed analytical insights, and essential
              review materials to help you succeed.
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Key Features
            </Text>
            <Text style={{ fontSize: 16 }}>
              Premade Flashcards: Access a vast library of flashcards
              meticulously designed to cover all exam topics. These flashcards
              are crafted to reinforce your knowledge and enhance your
              retention.
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Comprehensive Review Materials
            </Text>
            <Text style={{ fontSize: 16 }}>
              Beyond flashcards, TEACHER provides valuable review materials that
              cover essential concepts and topics, giving you a well-rounded
              preparation strategy.
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Why Choose TEACHER?
            </Text>
            <Text style={{ fontSize: 16 }}>
              Expertly Curated Content: Our flashcards and review materials are
              created by educational experts to ensure they meet the highest
              standards and align with the exam requirements.
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
              Seamless Experience
            </Text>
            <Text style={{ fontSize: 16 }}>
              Built with React, TEACHER offers a smooth and intuitive user
              experience, making your study sessions productive and enjoyable.
            </Text>
          </View>
        </View>
      </ScrollView>
    </BaseBackground>
  );
};

export default AboutPage;
