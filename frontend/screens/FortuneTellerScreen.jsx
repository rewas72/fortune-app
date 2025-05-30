import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchFortuneTellerDetails } from '../redux/actions/fortunetellerActions';

const colors = {
    siyah: "#121212",
    beyaz: "#FFFFFF",
    sari: "#E2F163",
    acikmor: "#B3A0FF",
    gri: "#CCCCCC",
};

const FortuneTellerDetailScreen = ({ route }) => {
    const { id } = route.params;
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { loading, selectedFortuneTeller: ft } = useSelector((state) => state.fortuneteller);

    useEffect(() => {
        dispatch(fetchFortuneTellerDetails(id));
    }, [id]);

    if (loading || !ft) {
        return <ActivityIndicator style={{ flex: 1 }} size="large" color={colors.acikmor} />;
    }

    const img = ft.profileImage
        ? `http://192.168.1.15:5000/uploads/${ft.profileImage}`
        : "https://via.placeholder.com/160";

    // Burada falcıya ait yorumlar
    const reviews = ft.ReceivedReviews || [];

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color={colors.acikmor} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Geri</Text>
            </View>

            <View style={styles.imageContainer}>
                <Image source={{ uri: img }} style={styles.image} />
            </View>

            <View style={styles.detailContainer}>
                <Text style={styles.name}>{ft.name}</Text>
                <View style={styles.infoRow}>
                    <FontAwesome name="star" size={20} color={colors.sari} />
                    <Text style={styles.infoText}>
                      {ft.averageRating ? parseFloat(ft.averageRating).toFixed(1) : "0.0"} / 5.0
                    </Text>
                </View>
                <Text style={styles.description}>
                    {ft.fortuneTellerDescription || 'Açıklama bulunmamaktadır.'}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.sendButton}
                onPress={() => navigation.navigate('sendFortune', { fortuneTellerId: ft.id })}
            >
                <Text style={styles.sendButtonText}>✨ Fal Gönder ✨</Text>
            </TouchableOpacity>

            {/* Yorumlar Bölümü */}
            <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <Text style={{ color: colors.beyaz, fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Yorumlar</Text>
                {reviews.length === 0 ? (
                    <Text style={{ color: colors.gri, fontStyle: 'italic' }}>Henüz yorum yok.</Text>
                ) : (
                    reviews.map((review, index) => {
                        const author = review.ReviewAuthor;
                        const authorImage = author?.profileImage
                            ? `http://192.168.1.15:5000/uploads/${author.profileImage}`
                            : "https://via.placeholder.com/50";

                        return (
                            <View
                                key={index}
                                style={{
                                    backgroundColor: '#1E1E1E',
                                    padding: 12,
                                    borderRadius: 10,
                                    marginBottom: 10,
                                }}
                            >
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                                    <Image
                                        source={{ uri: authorImage }}
                                        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
                                    />
                                    <View>
                                        <Text style={{ color: colors.acikmor, fontWeight: 'bold' }}>{author?.name}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <FontAwesome name="star" size={14} color={colors.sari} />
                                            <Text style={{ color: colors.beyaz, marginLeft: 4 }}>{review.rating} / 5</Text>
                                        </View>
                                    </View>
                                </View>
                                <Text style={{ color: colors.gri, fontSize: 14 }}>{review.comment}</Text>
                            </View>
                        );
                    })
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.siyah,
    },
    imageContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: colors.acikmor,
    },
    detailContainer: {
        padding: 20,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.beyaz,
        textAlign: 'center',
        marginBottom: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    infoText: {
        marginLeft: 6,
        fontSize: 16,
        color: colors.sari,
    },
    description: {
        color: colors.gri,
        fontSize: 16,
        lineHeight: 22,
        textAlign: 'center',
    },
    sendButton: {
        marginTop: 30,
        marginHorizontal: 40,
        paddingVertical: 14,
        backgroundColor: colors.acikmor,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 6.27,
        elevation: 10,
    },
    sendButtonText: {
        color: colors.beyaz,
        fontSize: 18,
        fontWeight: 'bold',
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

export default FortuneTellerDetailScreen;
