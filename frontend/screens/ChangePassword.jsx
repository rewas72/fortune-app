import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const colors = {
    siyah: '#121212',
    beyaz: '#FFFFFF',
    sari: '#E2F163',
    mor: '#896CFE',
    acikmor: '#B3A0FF',
    gri: '#CCCCCC',
};


const ChangePassword = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureText, setSecureText] = useState({
        current: true,
        new: true,
        confirm: true,
    });

    const toggleSecure = (field) => {
        setSecureText((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back" size={24} color={colors.acikmor} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Password Settings</Text>
            </View>

            <View style={styles.formContainer}>
                {/* Current Password */}
                <Text style={styles.label}>Current Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        secureTextEntry={secureText.current}
                        style={styles.input}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        placeholder="Enter current password"
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
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                </TouchableOpacity>

                {/* New Password */}
                <Text style={styles.label}>New Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        secureTextEntry={secureText.new}
                        style={styles.input}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        placeholder="Enter new password"
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
                <Text style={styles.label}>Confirm New Password</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        secureTextEntry={secureText.confirm}
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholder="Confirm new password"
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
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Change Password</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Navigation Placeholder */}
            <View style={styles.bottomBar}>
                <Icon name="home-outline" size={24} color="white" />
                <Icon name="receipt-outline" size={24} color="white" />
                <Icon name="star-outline" size={24} color="white" />
                <Icon name="headset-outline" size={24} color="white" />
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
    label: {
        color: '#A084E8',
        fontSize: 14,
        marginBottom: 6,
        marginTop: 10,
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
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#A084E8',
        paddingVertical: 14,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
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
        alignSelf: 'center',
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
