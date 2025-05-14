import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../redux/features/fortunetellerSlice';
import { logout } from '../redux/features/authSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colors = {
  siyah: "#232323",
  beyaz: "#FFFFFF",
  sari: "#E2F163",
  mor: "#896CFE",
  acikmor: "#B3A0FF",
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error, filteredFortunetellers } = useSelector(
    (state) => state.fortuneteller
  );

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  const handleLogout = async () => {
    console.log('Çıkış yapılıyor...');
    await AsyncStorage.removeItem('token');  // AsyncStorage'dan token'ı sil
    dispatch(logout());                      // Redux'tan çıkış
  };


  return (
    <View style={styles.container}>
      {/* Üst Bar */}
      <View style={styles.header}>
        <Text style={styles.title}>Sembol Fal</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Çıkış Yap</Text> {/* Çıkış yap metni */}
        </TouchableOpacity>
      </View>

      {/* Arama ve Filtre */}
      <View style={styles.searchContainer}>
        <EvilIcons name="search" size={24} color={colors.siyah} />
        <TextInput placeholder="Falcı Ara" placeholderTextColor="#888" style={styles.textInput} />
        <Octicons name="sort-asc" size={24} color="black" />
      </View>

      {/* Falcı Kartları */}
      {filteredFortunetellers?.length > 0 ? (
        filteredFortunetellers.map((item) => (
          <View key={item?.id} style={styles.fortunetellerCard}>
            <Text style={styles.name}>{item?.name ?? 'İsimsiz'}</Text>
            <Text style={styles.price}>Fiyat: {item?.fortunePrice ? `${item.fortunePrice} TL` : 'Belirsiz'}</Text>
            <Text style={styles.rating}>⭐ {item?.averageRating ? parseFloat(item.averageRating).toFixed(1) : '0.0'}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.error}>Hiç falcı bulunamadı.</Text>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.siyah,
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    color: colors.beyaz,
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.beyaz,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 8,
  },
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fortunetellerCard: {
    backgroundColor: colors.beyaz,
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%', // Kartlar arasındaki boşluğu ayarlayabilirsiniz
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.siyah,
  },
  price: {
    color: "#555",
  },
  rating: {
    color: "#b58900",
  },
  error: {
    color: "red",
  },
  logoutButton: {
  },
  logoutText: {
    color: colors.mor,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
