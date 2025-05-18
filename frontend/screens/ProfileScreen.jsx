import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchUserProfile,
  updateUserProfileImage,
  updateUser,
} from '../redux/actions/authActions';
import * as ImagePicker from 'expo-image-picker';
import { logout } from '../redux/features/authSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const colors = {
  siyah: '#121212',
  beyaz: '#FFFFFF',
  sari: '#E2F163',
  mor: '#896CFE',
  acikmor: '#B3A0FF',
  gri: '#CCCCCC',
};

export default function ProfileScreen() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.profile);
  const user = useSelector((state) => state.auth.user);

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [editedName, setEditedName] = useState(profile?.name || '');
  const [editedEmail, setEditedEmail] = useState(profile?.email || '');

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchUserProfile(user.id));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (profile) {
      setEditedName(profile.name);
      setEditedEmail(profile.email);
    }
  }, [profile]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const image = result.assets[0];
      dispatch(updateUserProfileImage({ userId: user.id, image }));
    }
  };

  const handleNameSave = () => {
    dispatch(updateUser({ userId: user.id, name: editedName, email: editedEmail }))
      .then(() => dispatch(fetchUserProfile(user.id)));
    setIsEditingName(false);
  };

  const handleEmailSave = () => {
    dispatch(updateUser({ userId: user.id, name: editedName, email: editedEmail }))
      .then(() => dispatch(fetchUserProfile(user.id)));
    setIsEditingEmail(false);
  };
  if (!profile) return <Text>Yükleniyor...</Text>;
  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    dispatch(logout());
    navigation.navigate("Start");
  };

  console.log("Updated profile:", profile);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.topSection}>
          <Text style={styles.heading}>Profil</Text>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={{
                uri: profile.profileImage
                  ? `http://192.168.1.100:5000/uploads/${profile.profileImage}`
                  : 'https://randomuser.me/api/portraits/women/44.jpg',
              }}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <Text style={styles.name}>{profile.name}</Text>
          <Text style={styles.email}>{profile.email}</Text>
          <View style={styles.statsBox}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profile.balance}</Text>
              <Text style={styles.statLabel}>Kredi</Text>
            </View>
          </View>
        </View>

        <View style={styles.list}>
          {renderMenuItem(
            'Ad Soyad',
            profile.name,
            'person-outline',
            'pencil-outline',
            isEditingName,
            () => setIsEditingName(true),
            editedName,
            setEditedName,
            handleNameSave
          )}
          {renderMenuItem(
            'E-mail',
            profile.email,
            'mail-outline',
            'pencil-outline',
            isEditingEmail,
            () => setIsEditingEmail(true),
            editedEmail,
            setEditedEmail,
            handleEmailSave
          )}
          {renderMenuItem('Şifre Değiştir', null, 'key-outline')}
          {renderMenuItem('Gizlilik Politikası', null, 'document-lock-outline')}
          {renderMenuItem('Çıkış Yap', null, 'exit-outline', null, false, null, null, null, null, handleLogout)}
        </View>
      </ScrollView>
    </View>
  );
}

const renderMenuItem = (
  title,
  data,
  icon,
  icon2,
  isEditing,
  onEditToggle,
  value,
  onChangeText,
  onSave,
  onPress
) => (
  <View style={styles.menuItem} key={title}>
  
    <View style={styles.menuIcon}>
      <Ionicons name={icon} size={22} color="#C9A3FF" />
    </View>
    <TouchableOpacity  onPress={onPress}>
       <Text style={styles.menuText}>{title}</Text>
    </TouchableOpacity>
   

    {isEditing ? (
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={title}
          placeholderTextColor="#999"
          style={styles.input}
         
        />
        <TouchableOpacity onPress={onSave}>
          <Ionicons name="checkmark-outline" size={20} color="#C9A3FF" />
        </TouchableOpacity>
      </View>
    ) : (
      <>
        {data && <Text style={styles.menuDataText}>{data}</Text>}
        {icon2 && (
          <TouchableOpacity onPress={onEditToggle}>
            <Ionicons name={icon2} size={20} color="#C9A3FF" style={{ marginLeft: 'auto' }} />
          </TouchableOpacity>
        )}
      </>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  topSection: {
    backgroundColor: '#C9A3FF',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: '#fff',
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#fff',
  },
  statsBox: {
    flexDirection: 'row',
    backgroundColor: '#B98CFF',
    marginTop: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  statItem: {
    padding: 10,
    alignItems: 'center',
    width: 100,
  },
  statValue: {
    color: 'white',
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'white',
    fontSize: 12,
  },
  list: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  menuIcon: {
    marginRight: "15",

  },
  menuText: {
    color: 'white',
    fontSize: 16,
    minWidth: 90,
  },
  menuDataText: {
    color: colors.gri,
    fontSize: 16,
    marginLeft: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#888',
    color: '#fff',
    paddingVertical: 2,
    marginRight: 8,
    fontSize: 16,
  },
});
