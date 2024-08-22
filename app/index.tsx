import { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { colors } from '../themes/colors';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

export default function IndexPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
    } catch (e: any) {
      const err = e as FirebaseError;
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
    } catch (e: any) {
      const err = e as FirebaseError;
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View>
          <View style={{ alignItems: 'center' }}>
            <Image
              style={{ width: 150, height: 150 }}
              source={require('../assets/logo-teacher.png')}
            />
          </View>
          <Text style={styles.headerText}>
            {isRegister ? 'Create Account' : 'Welcome back'}
          </Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            keyboardType='email-address'
            placeholder='Email'
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder='Password'
          />
          {loading ? (
            <ActivityIndicator size={'small'} style={{ margin: 28 }} />
          ) : (
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => (isRegister ? signUp() : signIn())}>
                <Text style={styles.buttonText}>
                  {isRegister ? 'Register' : 'Login'}
                </Text>
              </TouchableOpacity>
              <View style={styles.account}>
                <Text style={styles.noAccount}>
                  {isRegister
                    ? 'Already have an account?'
                    : "Don't have an account?"}
                </Text>
                <TouchableOpacity
                  onPress={() => setIsRegister((prev) => !prev)}>
                  <Text style={styles.accountText}>
                    {isRegister ? 'Login' : 'Register'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors['primary-dark'],
  },
  headerText: {
    padding: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  input: {
    marginVertical: 4,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 10,
  },
  buttons: {
    paddingTop: 10,
  },
  button: {
    padding: 16,
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  account: {
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 4,
  },
  accountText: {
    fontSize: 16,
    color: colors.primary,
  },
  noAccount: {
    fontSize: 16,
    color: 'white',
  },
});
