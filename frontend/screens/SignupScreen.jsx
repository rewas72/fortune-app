import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function SignupScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('')
  const navigation = useNavigation();


  return (
    <View style={styles.container}>
      {/* Üst siyah alan */}
      <View style={styles.topSection}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton}>
            <Text onPress={()=> navigation.navigate("Login")} style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.loginTitle}>Hesap Oluştur</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.welcome}>Haydi Başlayalım!</Text>
      </View>

      {/* Orta mor alan */}
      <View style={styles.middleSection}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[styles.label, { marginTop: 16 }]}>Ad Soyad</Text>
        <TextInput
          style={styles.input}
          placeholder="Ad Soyad"
          placeholderTextColor="#999"
          secureTextEntry
          value={name}
          onChangeText={setName}
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
      </View>

      {/* Alt siyah alan */}
      <View style={styles.bottomSection}>
        <TouchableOpacity style={styles.loginBtn} >
          <Text style={styles.loginBtnText}>Kayıt Ol</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.signupPrompt}>
            Devam ederek,
            <Text style={styles.signupLink}>Kullanım Şartları ve Gizlilik Politikası'nı </Text>
            kabul etmiş olursunuz.
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
    marginTop: 10,
    textAlign: 'center',
  },

  middleSection: {
    backgroundColor: "#B3A0FF",
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
  orText: {
    color: '#fff',
    marginBottom: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  socialIcon: {
    width: 48,
    height: 48,
    backgroundColor: '#B3A0FF',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupPrompt: {
    color: '#fff',
    fontSize: 12,
    justifyContent:"center",
    textAlign:"center"
  },
  signupLink: {
    color: '#E2F163',
    fontWeight: 'bold',
  },
});
