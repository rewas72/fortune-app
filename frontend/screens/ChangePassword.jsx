import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { clearStatus } from '../redux/features/authSlice';
import { changePassword } from '../redux/actions/authActions';
import { jwtDecode } from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';


const colors = {
    siyah: '#121212',
    beyaz: '#FFFFFF',
    sari: '#E2F163',
    mor: '#896CFE',
    acikmor: '#B3A0FF',
    gri: '#CCCCCC',
};


const ChangePassword = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector((state) => state.auth);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureText, setSecureText] = useState({
        current: true,
        new: true,
        confirm: true,
    });
    const [id, setId] = useState(null);
    const [token, setToken] = useState(null);

    const toggleSecure = (field) => {
        setSecureText((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleSubmit = () => {
        console.log("handleSubmit çalıştı");

        if (!currentPassword || !newPassword || !confirmPassword) {
            alert("Lütfen tüm alanları doldurun.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Yeni şifreler eşleşmiyor.");
            return;
        }

        if (!id || !token) {
            alert("Kullanıcı bilgileri alınamadı.");
            return;
        }

        dispatch(changePassword({ id, currentPassword, newPassword, token }));
    };


    useEffect(() => {
        if (success) {
            alert("Şifre başarıyla güncellendi");
            dispatch(clearStatus());
            navigation.goBack();
        }
        if (error) {
            alert(error);
            dispatch(clearStatus());
        }
    }, [success, error]);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const tokenFromStorage = await AsyncStorage.getItem('token');
                if (tokenFromStorage) {
                    const decoded = jwtDecode(tokenFromStorage);
                    setId(decoded.userId || decoded.id); // JWT payload'daki kullanıcı ID'ye göre
                    setToken(tokenFromStorage);
                }
            } catch (err) {
                console.log("Token alınırken hata:", err);
            }
        };

        getUserData();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color={colors.acikmor} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Şifre Değiştir</Text>
            </View>

            <View style={styles.formContainer}>
                {/* Current Password */}
                <Text style={styles.label}>Eski Şifre</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        secureTextEntry={secureText.current}
                        style={styles.input}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        placeholder="Eski şifreyi girin"
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity onPress={() => toggleSecure('current')}>
                        <Icon
                            name={secureText.current ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={colors.acikmor}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ alignSelf: 'center', marginBottom: 16 }}>
                    <Text style={styles.forgotText}>Şifreni mi unuttun?</Text>
                </TouchableOpacity>

                {/* New Password */}
                <Text style={styles.label}>Yeni Şifre</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        secureTextEntry={secureText.new}
                        style={styles.input}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Yeni şifreyi girin"
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity onPress={() => toggleSecure('new')}>
                        <Icon
                            name={secureText.new ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={colors.acikmor}
                        />
                    </TouchableOpacity>
                </View>

                {/* Confirm New Password */}
                <Text style={styles.label}>Yeni Şifreni Onayla</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        secureTextEntry={secureText.confirm}
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Yeni şifreyi onaylayın"
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity onPress={() => toggleSecure('confirm')}>
                        <Icon
                            name={secureText.confirm ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color={colors.acikmor}
                        />
                    </TouchableOpacity>
                </View>

                {/* Submit Button */}
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    <Text style={styles.buttonText}>Şifreyi Değiştir</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111111',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
        gap: 10,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#A084E8',
    },

    inputContainer: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        width: '80%',
        paddingHorizontal: 12,
        paddingVertical: 10,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#000',
    },
    forgotText: {
        color: 'white',
        fontSize: 12,
        alignSelf: 'flex-end',
        textAlign: 'right',

    },
    button: {
        backgroundColor: '#E9F94A',
        padding: 12,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 30,
    },
    buttonText: {
        color: '#000',
        fontWeight: '600',
        fontSize: 16,
    },


    formContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        color: colors.acikmor,
        fontSize: 14,
        marginBottom: 6,
        marginTop: 10,
        marginLeft: 30,
        alignSelf: 'flex-start',
    },
    inputContainer: {
        backgroundColor: colors.beyaz,
        alignItems: 'center',
        height: 50,
        borderRadius: 10,
        flexDirection: 'row',
        width: '85%',
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        marginBottom: 8,
    },

});

export default ChangePassword
