import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, FlatList, Image, Button } from 'react-native';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/features/authSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import {
  sortByPriceAsc,
  sortByPriceDesc,
  sortByRatingDesc,
  resetSorting,
} from '../redux/features/fortunetellerSlice';
import { Modal, Pressable } from 'react-native';
import { useMemo } from 'react';
import { fetchAllUsers } from '../redux/actions/fortunetellerActions';


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
  const [sortMenuVisible, setSortMenuVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

const filteredList = filteredFortunetellers.filter(item =>
  item.name?.toLowerCase().includes(searchTerm.toLowerCase())
);



  const handleSort = (type) => {
    setSortMenuVisible(false);
    switch (type) {
      case 'priceAsc':
        dispatch(sortByPriceAsc());
        break;
      case 'priceDesc':
        dispatch(sortByPriceDesc());
        break;
      case 'ratingDesc':
        dispatch(sortByRatingDesc());
        break;
      default:
        dispatch(resetSorting());
    }
  }

  useEffect(() => {
    dispatch(fetchAllUsers()).then((res) => {
      console.log("Gelen falcılar:", res);
    });
  }, [dispatch]);




  const renderCard = ({ item }) => {
    const profileImageUrl = item?.profileImage
      ? `http://192.168.1.15:5000/uploads/${item.profileImage}`
      : 'https://via.placeholder.com/100';

    return (
      <TouchableOpacity style={styles.newCard} onPress={() => navigation.navigate('FortuneTellerDetail', { id: item.id })}>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item?.name ?? 'İsimsiz'}</Text>
          <View style={styles.infoRow}>
            <FontAwesome5 name="coins" size={18} color="#555" />
            <Text style={styles.infoText}>{item?.fortunePrice ?? 50} Kredi</Text>
          </View>
          <View style={styles.infoRow}>
            <AntDesign name="star" size={18} color="black" />
            <Text style={styles.infoText}>{item?.averageRating ? parseFloat(item.averageRating).toFixed(1) : '0.0'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Entypo name="chat" size={24} color="black" />
            <Text style={styles.infoText}>Sohbet</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('sendFortune', { fortuneTellerId: item.id })} style={styles.playButton}>
            <Text style={styles.playButtonText}>Fal Gönder</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri: profileImageUrl }} style={styles.falciImage} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Falzade</Text>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <EvilIcons name="search" size={24} color={colors.siyah} />
        <TextInput placeholder="Falcı Ara" placeholderTextColor="#888" style={styles.textInput} value={searchTerm} onChangeText={setSearchTerm} />
        <TouchableOpacity onPress={() => setSortMenuVisible(true)}>
          <Octicons name="sort-asc" size={20} color={colors.siyah} />
          <Modal
            animationType="fade"
            transparent={true}
            visible={sortMenuVisible}
            onRequestClose={() => setSortMenuVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Sırala</Text>

                <TouchableOpacity style={styles.modalButton} onPress={() => handleSort('priceAsc')}>
                  <Text style={styles.modalButtonText}>💸 Fiyat (Artan)</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalButton} onPress={() => handleSort('priceDesc')}>
                  <Text style={styles.modalButtonText}>💰 Fiyat (Azalan)</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalButton} onPress={() => handleSort('ratingDesc')}>
                  <Text style={styles.modalButtonText}>⭐ Puan (Yüksek)</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalButton} onPress={() => handleSort('reset')}>
                  <Text style={styles.modalButtonText}>🔄 Sıralamayı Sıfırla</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalCloseButton} onPress={() => setSortMenuVisible(false)}>
                  <Text style={styles.modalCloseButtonText}>Kapat</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

        </TouchableOpacity>
      </View>

      {/* Card List */}
      <FlatList
        data={filteredList}
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
  infoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: colors.sari,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
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
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.siyah,
    marginBottom: 20,
  },
  price: {
    padding: 4,
    backgroundColor: colors.gri,
    borderRadius: 8,
    color: "#444",
    marginBottom: 4,
  },
  rating: {
    color: "#b58900",
    padding: 4,
    backgroundColor: colors.gri,
    borderRadius: 8,
    marginBottom: 4,
  },
  error: {
    color: colors.beyaz,
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  profileImage: {
    width: 80,
    height: 100,
    borderRadius: 40,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  priceRatingRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 12,
  },
  button: {
    backgroundColor: colors.mor,
    borderRadius: 8,
    padding: 10,
    alignSelf: 'flex-end',

  },
  buttonText: {
    color: colors.beyaz,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "right",
  },
  newCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 10,
    elevation: 5,
  },
  textContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#121212',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#444',
  },
  imageContainer: {
    width: 140,
    height: 172,
    position: 'relative',
  },
  falciImage: {
    width: '100%',
    height: '100%',
  },
  playIconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#896CFE',
    borderRadius: 20,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  playButton: {
    marginTop: 8,
    backgroundColor: '#896CFE',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  playButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 20,
    width: '80%',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },

  modalButton: {
    backgroundColor: '#896CFE',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginBottom: 10,
    width: '100%',
  },

  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },

  modalCloseButton: {
    marginTop: 10,
    backgroundColor: '#ccc',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    width: '100%',
  },

  modalCloseButtonText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },


});
