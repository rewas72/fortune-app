// redux/actions/authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';



function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}


export const login = createAsyncThunk('login', async data => {
  try {
    const response = await fetch(`http://192.168.1.100:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data.body),
    });

    const json = await response.json();
    console.log('Login API Response:', json);

    if (json.token) {
      const decodedToken = parseJwt(json.token);
      console.log('Decoded Token:', decodedToken);

      await AsyncStorage.setItem('token', json.token);

      if (decodedToken && data.navigate) {
        data.navigate(decodedToken);
      }
    } else {
      if (data.setHataMesaji) {
        data.setHataMesaji(json.message || 'Bir hata oluştu');
      }
    }

    return json;
  } catch (error) {
    console.log(error);
    if (data.setHataMesaji) {
      data.setHataMesaji('Sunucu hatası');
    }
    throw error;
  }
});

export const logout = createAsyncThunk('logout', async (_, thunkAPI) => {
  try {
    await AsyncStorage.removeItem('token');
    return true;
  } catch (error) {
    console.error('Logout Error:', error);
    throw error;
  }
});

export const loadTokenAndAutoLogin = createAsyncThunk(
  'auth/loadTokenAndAutoLogin',
  async (_, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) return rejectWithValue('Token bulunamadı');

      const decoded = parseJwt(token);
      if (!decoded) return rejectWithValue('Token geçersiz');

      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        await AsyncStorage.removeItem('token');
        return rejectWithValue('Token süresi dolmuş');
      }

      return { token, user: decoded };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
