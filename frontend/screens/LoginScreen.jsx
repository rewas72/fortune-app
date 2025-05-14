import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authActions';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hataMesaji, setHataMesaji] = useState('');

  const handleLogin = () => {
    dispatch(
      login({
        body: {
          email,
          password,
        },
        setHataMesaji,
        navigate: decodedToken => {
          const role = decodedToken.role;
          if (role === 'user') {
            navigation.navigate('Home');
          } else if (role === 'fortuneteller') {
            navigation.navigate('FalciHome');
          }
        },
      })
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.navigate('Start')}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.loginTitle}>Giriş Yap</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.welcome}>Hoşgeldin</Text>
        <Text style={styles.subtitle}>
          Bu uygulamada fincan fotoğrafı göndererek gerçek falcılardan samimi yorumlar alabilirsin.
        </Text>
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[styles.label, { marginTop: 16 }]}>Şifre</Text>
        <TextInput
          style={styles.input}
          placeholder="*************"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.forgotButton}>
          <Text style={styles.forgotText}>Şifreni mi unuttun?</Text>
        </TouchableOpacity>

        {hataMesaji ? (
          <Text style={{ color: 'red', marginTop: 10 }}>{hataMesaji}</Text>
        ) : null}
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginBtnText}>Giriş Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupPrompt}>
            Halen bir hesabın yok mu?{' '}
            <Text style={styles.signupLink}>Kayıt Ol</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
  },
  topSection: {
    flex: 2,
    backgroundColor: '#232323',
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  backButton: {
    padding: 4,
  },
  backArrow: {
    color: '#E2F163',
    fontSize: 24,
  },
  loginTitle: {
    color: '#E2F163',
    fontSize: 20,
    fontWeight: 'bold',
  },
  welcome: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  middleSection: {
    backgroundColor: '#B3A0FF',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  label: {
    color: '#232323',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
  },
  forgotButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  forgotText: {
    color: '#232323',
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  bottomSection: {
    flex: 2,
    alignItems: 'center',
    paddingTop: 32,
    paddingHorizontal: 24,
  },
  loginBtn: {
    backgroundColor: '#232323',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 16,
  },
  loginBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signupPrompt: {
    color: '#fff',
    fontSize: 12,
  },
  signupLink: {
    color: '#E2F163',
    fontWeight: 'bold',
  },
});
