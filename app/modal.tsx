import { ScrollView, StyleSheet, Text, View } from 'react-native';

const terms = [
  {
    title: 'Acceptance of Terms',
    description:
      'By accessing and using the Teacher App (the "App"), you agree to be bound by these Terms of Service (the "Terms"). If you do not agree with these Terms, please do not use the App.',
  },
  {
    title: 'Intellectual Property Rights',
    description:
      'The content provided in the App, including but not limited to quizzes, flashcards, educational materials, and other resources, may be sourced from third-party creators. We do not claim ownership of this third-party content. If you are the creator or owner of any material used in the App and do not wish for it to be included, please contact us immediately at service@teacherapp.org. Upon receiving your request, we will take appropriate action to remove the content from the App.',
  },
  {
    title: 'Use of Content',
    description:
      'The materials available in the App are for educational purposes only. While the App is designed to help users prepare for examinations such as the Licensure Examination for Teachers (LET), the content provided cannot be legally filed or used as official study material. Users are encouraged to verify all information with official sources.',
  },
  {
    title: 'User Conduct',
    description:
      'You agree not to use the App for any unlawful or prohibited purposes. This includes but is not limited to unauthorized copying, distribution, or alteration of content available on the App.',
  },
  {
    title: 'Content Removal and Reporting',
    description:
      'If you believe any content in the App infringes upon your rights or is otherwise inappropriate, you may contact us at service@teacherapp.org. We will investigate and, if necessary, remove the content in question.',
  },
  {
    title: 'Modifications to the Terms',
    description:
      'We reserve the right to modify these Terms at any time. Continued use of the App constitutes your acceptance of the updated Terms.',
  },
  {
    title: 'Limitation of Liability',
    description:
      'The App and its content are provided "as is," and we make no warranties, express or implied, regarding the accuracy, reliability, or completeness of the materials available.',
  },
];

export default function TermsOfServiceModal() {
  return (
    <ScrollView>
      <View style={{ padding: 16, gap: 8 }}>
        {terms.map((term, index) => (
          <View key={index}>
            <Text style={styles.header}>{term.title}</Text>
            <Text>{term.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 2,
  },
});
