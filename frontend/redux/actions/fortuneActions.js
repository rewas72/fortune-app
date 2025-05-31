import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchFortuneTellerRequests = createAsyncThunk(
  'fortune/fetchFortuneTellerRequests',
  async (fortunetellerId, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token;
      const response = await axios.get(
        `http://192.168.1.15:5000/api/fortune-requests/fortuneteller/${fortunetellerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || 'İstek alınamadı.');
    }
  }
);
