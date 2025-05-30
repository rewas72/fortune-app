import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getFortuneRequestDetail } from '../redux/actions/fortuneRequestActions';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const colors = {
    siyah: "#121212",
    beyaz: "#FFFFFF",
    sari: "#E2F163",
    mor: "#896CFE",
    acikmor: "#B3A0FF",
    gri: "#CCCCCC",
};

const FortuneScreen = ({ route }) => {
    const { id } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { selectedRequest, loading, error } = useSelector(state => state.fortuneRequest);

    useEffect(() => {
        console.log("Detay isteği atılıyor ID:", id);
        dispatch(getFortuneRequestDetail(id));
    }, [dispatch, id]);

    if (loading || !selectedRequest) {
        return <ActivityIndicator size="large" color={colors.mor} style={{ marginTop: 50 }} />;
    }
    if (error) {
        return <Text style={{ color: 'red', marginTop: 50 }}>Bir hata oluştu: {error}</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color={colors.acikmor} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Geri</Text>
            </View>
            <Text style={styles.label}>Mesaj:</Text>
            <Text style={styles.value}>{selectedRequest.message}</Text>

            <Text style={styles.label}>Durum:</Text>
            <Text style={styles.status}>
                {selectedRequest.status === 'pending' ? 'Beklemede' : 'Yanıtlandı'}
            </Text>

            {selectedRequest.response && (
                <>
                    <Text style={styles.label}>Fal Yanıtı:</Text>
                    <Text style={styles.response}>{selectedRequest.response}</Text>
                </>
            )}

           {selectedRequest.images && selectedRequest.images.length > 0 && (
    <>
        <Text style={styles.label}>Yüklenen Fotoğraflar:</Text>
        {selectedRequest.images.map((img, index) => {
            const fileName = img.replace(/\\/g, '/').split('/').pop(); // ters slash'ları düz yap ve sadece dosya adını al
            const imageUrl = `http://192.168.1.15:5000/uploads/${fileName}`;
            return (
                <Image
                    key={index}
                    source={{ uri: imageUrl }}
                    style={styles.image}
                />
            );
        })}
    </>
)}
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.siyah,
        padding: 20,
    },
    label: {
        color: colors.beyaz,
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 16,
        marginBottom: 4,
    },
    value: {
        color: colors.beyaz,
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 12,
    },
    status: {
        color: colors.sari,
        fontWeight: '600',
        fontSize: 15,
        marginBottom: 12,
    },
    response: {
        color: colors.acikmor,
        fontStyle: 'italic',
        fontSize: 15,
        lineHeight: 22,
        marginTop: 8,
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 220,
        borderRadius: 12,
        marginTop: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: colors.gri,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        gap: 10,
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#A084E8',
    },
});


export default FortuneScreen;
