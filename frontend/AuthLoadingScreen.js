import React, { useEffect } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loadTokenAndAutoLogin } from './redux/actions/authActions';
import { useNavigation } from '@react-navigation/native';

export default function AuthLoadingScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { token, role, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadTokenAndAutoLogin()).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        if (res.payload?.user?.role === 'fortuneteller') {
          navigation.reset({ index: 0, routes: [{ name: 'FalciHome' }] });
        } else {
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        }
      }
    });
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#896CFE" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    alignItems: "center",
    justifyContent: "center",
  },
});
