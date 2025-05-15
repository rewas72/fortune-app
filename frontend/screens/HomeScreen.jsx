import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, FlatList, Image } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../redux/features/fortunetellerSlice';
import { logout } from '../redux/features/authSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const colors = {
  siyah: "#121212",
  beyaz: "#FFFFFF",
  sari: "#E2F163",
  mor: "#896CFE",
  acikmor: "#B3A0FF",
  gri: "#CCCCCC",
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { loading, error, filteredFortunetellers } = useSelector(
    (state) => state.fortuneteller
  );

  useEffect(() => {
    dispatch(fetchAllUsers()).then((res) => {
      console.log("Gelen falcılar:", res);
    });
  }, [dispatch]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(logout());
    navigation.navigate("Start");
  };


const renderCard = ({ item }) => {
  const profileImageUrl = item?.profileImage
    ? `http://192.168.1.100:5000/uploads/${item.profileImage}`
    : 'https://via.placeholder.com/100';

  return (
    <TouchableOpacity style={styles.card}>
      <Image
        source={{ uri: profileImageUrl }}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{item?.name ?? 'İsimsiz'}</Text>
      <Text style={styles.price}>💰 {item?.fortunePrice ? `${item.fortunePrice} TL` : 'Belirsiz'}</Text>
      <Text style={styles.rating}>⭐ {item?.averageRating ? parseFloat(item.averageRating).toFixed(1) : '0.0'}</Text>
    </TouchableOpacity>
  );
};

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Falzade</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Çıkış</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <EvilIcons name="search" size={24} color={colors.siyah} />
        <TextInput placeholder="Falcı Ara" placeholderTextColor="#888" style={styles.textInput} />
        <Octicons name="sort-asc" size={20} color={colors.siyah} />
      </View>

      {/* Card List */}
      <FlatList
        data={filteredFortunetellers}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={<Text style={styles.error}>Hiç falcı bulunamadı.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.siyah,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: colors.beyaz,
    fontSize: 24,
    fontWeight: 'bold',
  },
  logoutText: {
    color: colors.acikmor,
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.beyaz,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 8,
  },
  cardRow: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.beyaz,
    borderRadius: 16,
    padding: 14,
    width: '100%',
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.siyah,
    marginBottom: 6,
  },
  price: {
    color: "#444",
    marginBottom: 4,
  },
  rating: {
    color: "#b58900",
  },
  error: {
    color: colors.beyaz,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 10,
  },
});
