import React from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';

export default function StartScreen({navigation}) {

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logowhite.png")} />
       <TouchableOpacity onPress={()=> navigation.navigate('Login')} style={styles.button}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232323',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#E2F163',
    fontSize: 24,
    fontWeight: 'bold',
  },
  logo:{
    width:400,
    height:70,
    marginBottom:120
  },
  button:{
    width:180,
    height:44,
    backgroundColor:"#E2F163",
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center",
    
  },
  buttonText:{
    fontSize: 16,
    fontWeight: 'bold',
  }
});
