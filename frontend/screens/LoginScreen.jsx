import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login} from '../redux/actions/authActions';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const handleLogin = () => {
  dispatch(login({
    body: {
      email,
      password
    },
    navigate: (route) => {
      // React Navigation varsa: navigation.navigate(route)
      // Şimdilik console.log ile örnek
      console.log("Navigating to", route);
    },
    sethatamesaji: (msg) => {
      console.log("Hata mesajı:", msg);
    }
  }));
};

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Şifre" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title={loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'} onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
    borderRadius: 4
  },
  error: {
    color: 'red',
    marginTop: 10
  }
});
