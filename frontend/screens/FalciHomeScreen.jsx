import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux';
import { logout } from '../redux/features/authSlice';


export default function FalciHomeScreen() {

  const dispatch = useDispatch();
  const navigation = useNavigation();  // Kullanıcı çıkış yaptıktan sonra yönlendirmek için

  const handleLogout = () => {
    console.log('Çıkış yapılıyor...'); // Çıkış işlemi tetiklendiğini görmek için konsola yazdırıyoruz.
    dispatch(logout());
    navigation.navigate('Start');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Çıkış Yap fortune</Text>
        <Text>sadas</Text>
      </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    width: 200,
    height: 50,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
  },
});


