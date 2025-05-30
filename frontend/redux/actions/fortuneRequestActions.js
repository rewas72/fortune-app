import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const sendFortuneRequest = createAsyncThunk(
  'fortune/send',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://192.168.1.15:5000/api/fortune-requests', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Bir hata oluştu');
    }
  }
);
export const getUserFortuneRequests = createAsyncThunk(
  'fortune/getUserRequests',
  async (userId, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log("Fal istekleri çekiliyor: ", userId);

      const res = await axios.get(`http://192.168.1.15:5000/api/fortune-requests/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("Fal istekleri yanıtı:", res.data);

      return res.data;
    } catch (err) {
      console.error("Hata:", err);
      return rejectWithValue(err.response?.data || "Bir hata oluştu");
    }
  }
);



export const getFortuneRequestDetail = createAsyncThunk(
  "fortuneRequest/getDetail",
  async (id, thunkAPI) => {
    try {
      console.log("Detay çekiliyor...", id);
      const response = await axios.get(`http://192.168.1.15:5000/api/fortune-requests/${id}`);
      console.log("Gelen veri:", response.data);
      return response.data;
    } catch (error) {
      console.error("Detay hata:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || "Bir hata oluştu");
    }
  }
);
