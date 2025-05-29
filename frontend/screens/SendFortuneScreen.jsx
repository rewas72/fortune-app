import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, Alert, ScrollView, StyleSheet, Platform
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { sendFortuneRequest } from '../redux/actions/fortuneRequestActions';
import { resetFortuneState } from '../redux/features/fortuneRequestSlice';

export default function SendFortuneScreen() {
  const [message, setMessage] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [gender, setGender] = useState('');
  const [relationshipStatus, setRelationshipStatus] = useState('');
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const { fortuneTellerId } = route.params;
  const userId = useSelector(state => state.auth.user?.id);
  const { loading, error, filteredFortunetellers } = useSelector(state => state.fortuneteller);
  const profile = useSelector((state) => state.auth.profile);
  const user = useSelector((state) => state.auth.user);
  const fortuneTeller = filteredFortunetellers.find(ft => ft.id === fortuneTellerId);


  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true
    });
    if (!result.canceled) {
      setImages([...images, result.assets[0]]);
    }
  };

  const handleSubmit = () => {

    if (!profile || !profile.balance) {
      Alert.alert("Hata", "Kullanıcı bakiyesi alınamadı.");
      return;
    }

    if (profile.balance < (fortuneTeller?.fortunePrice || 0)) {
      Alert.alert("Hata", "Bakiyeniz yetersiz.");
      return;
    }

    if (!message || !birthDate || !gender || !relationshipStatus || !userId || !fortuneTellerId) {
      Alert.alert('Uyarı', 'Lütfen tüm alanları doldurun.');
      return;
    }

    const formData = new FormData();
    formData.append('message', message);
    formData.append('birthDate', birthDate);
    formData.append('gender', gender);
    formData.append('relationshipStatus', relationshipStatus);
    formData.append('userId', userId);
    formData.append('fortuneTellerId', String(fortuneTellerId));

    images.forEach((img, index) => {
      formData.append('images', {
        uri: img.uri,
        name: `image_${index}.jpg`,
        type: 'image/jpeg',
      });
    });

    dispatch(sendFortuneRequest({ formData })).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        Alert.alert('Başarılı', 'Fal isteğiniz gönderildi.');
        dispatch(resetFortuneState());
        navigation.goBack();
      } else {
        Alert.alert('Hata', res.payload?.error || 'Fal gönderilemedi.');
      }
    });
    console.log("Gönderilen fortuneTellerId:", fortuneTellerId);

  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setBirthDate(formattedDate);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Falzade</Text>

      <Text style={styles.label}>Mesaj</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Mesajınızı yazın"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Doğum Tarihi</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={{ color: birthDate ? '#000' : '#999' }}>
          {birthDate || 'Doğum tarihi seç'}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={birthDate ? new Date(birthDate) : new Date()}
          mode="date"
          display="default"
          onChange={onDateChange}
          maximumDate={new Date()}
        />
      )}

      <Text style={styles.label}>Cinsiyet</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz" value="" />
          <Picker.Item label="Kadın" value="Kadın" />
          <Picker.Item label="Erkek" value="Erkek" />
        </Picker>
      </View>

      <Text style={styles.label}>İlişki Durumu</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={relationshipStatus}
          onValueChange={(itemValue) => setRelationshipStatus(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Seçiniz" value="" />
          <Picker.Item label="Bekar" value="Bekar" />
          <Picker.Item label="Evli" value="Evli" />
          <Picker.Item label="İlişkisi var" value="İlişkisi var" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.imageButton} onPress={handlePickImage}>
        <Text style={styles.imageButtonText}>Fotoğraf Ekle</Text>
      </TouchableOpacity>

      <View style={styles.imagePreview}>
        {images.map((img, idx) => (
          <Image key={idx} source={{ uri: img.uri }} style={styles.image} />
        ))}
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Fal Gönder</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#232323',
    flex: 1,
    padding: 20,
  },
  title: {
    color: '#E2F163',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#B3A0FF',
    marginTop: 15,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#896CFE',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: '#232323',
  },
  pickerContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#896CFE',
    overflow: 'hidden',
    marginBottom: 10,
  },
  picker: {
    color: '#232323',
  },
  imageButton: {
    backgroundColor: '#B3A0FF',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  imageButtonText: {
    color: '#232323',
    fontWeight: 'bold',
  },
  imagePreview: {
    flexDirection: 'row',
    marginTop: 15,
    flexWrap: 'wrap',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#896CFE',
    padding: 14,
    borderRadius: 10,
    marginTop: 25,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
