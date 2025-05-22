import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';

const colors = {
    siyah: '#121212',
    beyaz: '#FFFFFF',
    sari: '#E2F163',
    mor: '#896CFE',
    acikmor: '#B3A0FF',
    gri: '#CCCCCC',
};

const creditPackages = [
    { label: '75 Kredi', price: '₺79,99' },
    { label: '150 Kredi', price: '₺149,99' },
    { label: '300 Kredi', price: '₺249,99' },
    { label: '600 Kredi', price: '₺499,99' },
    { label: '1200 Kredi', price: '₺999,99' },
];
export default function BalanceScreen() {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth);
    const profile = useSelector((state) => state.auth.profile);
    return (
        <View style={{ flex: 1, backgroundColor: colors.siyah }}>
            <View style={{ backgroundColor: colors.mor, padding: 20, paddingTop: 50 }}>
                <Text style={{ color: colors.sari, fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Kredilerim</Text>
            </View>

            <View style={{ backgroundColor: colors.acikmor, margin: 16, borderRadius: 12, padding: 20 }}>
                <Text style={{ color: colors.beyaz, fontSize: 16, marginBottom: 8 }}>Kredin</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="server" size={32} color={colors.beyaz} />
                    <Text style={{ color: colors.beyaz, fontSize: 28, marginLeft: 10 }}>
                        {profile?.balance}
                    </Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                {creditPackages.map((item, index) => (
                    <View key={index} style={{ marginBottom: 12 }}>
                        {item.amount ? (
                            <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>{item.label}</Text>
                        ) : null}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.beyaz, padding: 20, borderRadius: 3, borderWidth: 1, borderColor: colors.acikmor }}>
                            <Text style={{ fontSize: 16 }}>{item.amount || item.label}</Text>
                            <Text style={{ fontSize: 16 }}>{item.price}</Text>
                            <TouchableOpacity style={{ backgroundColor: colors.mor, paddingVertical: 6, paddingHorizontal: 14, borderRadius: 6 }}>
                                <Text style={{ color: colors.beyaz }}>Satın Al</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}