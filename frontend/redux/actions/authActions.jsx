// redux/actions/authActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



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
    const response = await fetch(`http://192.168.1.15:5000/api/auth/login`, {
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


export const fetchUserProfile = createAsyncThunk('user/fetchProfile', async (userId, { rejectWithValue }) => {
  try {
    const token = await AsyncStorage.getItem('token');

    const response = await fetch(`http://192.168.1.15:5000/api/auth/users/getUserById/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return rejectWithValue(data.error || 'Bir hata oluştu');
    }

    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});


export const updateUserProfileImage = createAsyncThunk(
  'user/updateProfileImage',
  async ({ userId, image }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token');

      const formData = new FormData();
      formData.append('profileImage', {
        uri: image.uri,
        name: 'profile.jpg',
        type: 'image/jpeg',
      });

      const response = await fetch(`http://192.168.1.15:5000/api/auth/users/${userId}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.error || 'Bir hata oluştu');
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const updateUser = createAsyncThunk('updateUser', async (body, api) => {
  const { userId, ...rest } = body;  // userId’yi ayır
  try {
    const token = await AsyncStorage.getItem('token');  // AsyncStorage kullan (localStorage değil)
    const response = await fetch(`http://192.168.1.15:5000/api/auth/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rest),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Güncelleme hatası');
    }

    return data;
  } catch (error) {
    console.log('Update Error:', error);
    throw error;
  }
});



export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ({ id, currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const res = await axios.put(
        `http://192.168.1.15:5000/api/auth/users/change-password/${id}`,
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.error || 'Şifre güncellenemedi.'
      );
    }
  }
);
