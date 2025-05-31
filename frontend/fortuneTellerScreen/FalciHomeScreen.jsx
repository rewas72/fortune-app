import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFortuneTellerRequests } from '../redux/actions/fortuneActions';
import { logout } from '../redux/features/authSlice';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

const colors = {
  siyah: '#121212',
  beyaz: '#FFFFFF',
  sari: '#E2F163',
  mor: '#896CFE',
  gri: '#CCCCCC',
  kirmizi: '#FF4D4D',
};

const FalciHomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { requests, loading, error } = useSelector((state) => state.fortune);
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.auth.profile); // varsa
  const fortunetellerId = profile?.id ?? user?.id;

  useEffect(() => {
    if (fortunetellerId) {
      dispatch(fetchFortuneTellerRequests(Number(fortunetellerId)));
    }
  }, [dispatch, fortunetellerId]);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Start');
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.label}>👤 Gönderen:</Text>
        <Text style={styles.value}>{item.Sender?.name || 'Bilinmiyor'}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.label}>📩 Mesaj:</Text>
        <Text style={styles.value}>{item.message}</Text>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.label}>📌 Durum:</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.mor} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Hiç istek bulunamadı.</Text>
        }
      />
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <AntDesign name="logout" size={20} color="#fff" />
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.siyah,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: colors.beyaz,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    marginBottom: 8,
    flexWrap: 'wrap',
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginRight: 4,
  },
  value: {
    color: '#222',
    flexShrink: 1,
  },
  status: {
    fontWeight: 'bold',
    color: colors.mor,
  },
  logoutButton: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: colors.kirmizi,
    padding: 14,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutText: {
    color: colors.beyaz,
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  errorText: {
    color: colors.beyaz,
    fontSize: 16,
  },
  emptyText: {
    color: colors.gri,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
});

export default FalciHomeScreen;
