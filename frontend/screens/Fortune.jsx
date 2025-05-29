import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getUserFortuneRequests } from '../redux/actions/fortuneRequestActions';

const colors = {
    siyah: "#121212",
    beyaz: "#FFFFFF",
    sari: "#E2F163",
    mor: "#896CFE",
    acikmor: "#B3A0FF",
    gri: "#CCCCCC",
};

const Fortune = () => {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.auth.profile);
    const user = useSelector((state) => state.auth);
    const { loading, userRequests } = useSelector(state => state.fortuneRequest);

    useEffect(() => {
    if (profile?.id) {
        dispatch(getUserFortuneRequests(profile.id));
    }
}, [profile]);

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.label}>Mesaj:</Text>
            <Text style={styles.value}>{item.message}</Text>
            <Text style={styles.label}>Durum:</Text>
            <Text style={styles.status}>{item.status === 'pending' ? 'Beklemede' : 'Yanıtlandı'}</Text>
        </View>
    );

    if (loading) {
        return <ActivityIndicator size="large" color={colors.mor} style={{ marginTop: 50 }} />;
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.siyah }}>
            <View style={{ backgroundColor: colors.mor, padding: 20, paddingTop: 50 }}>
                            <Text style={{ color: colors.sari, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Fallarım</Text>
                        </View>
            <FlatList
                data={userRequests}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: 40, marginTop:20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.siyah,
        padding: 16,
    },
    title: {
        color: colors.sari,
        fontSize: 22,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    card: {
        backgroundColor: colors.acikmor,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
    },
    label: {
        color: colors.beyaz,
        fontWeight: 'bold',
    },
    value: {
        color: colors.beyaz,
        marginBottom: 8,
    },
    status: {
        color: colors.sari,
        fontWeight: '600',
    },
});

export default Fortune;
