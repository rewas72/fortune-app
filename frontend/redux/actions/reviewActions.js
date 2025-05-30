import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReviewsForFortuneTeller = createAsyncThunk(
  'reviews/fetchForFortuneTeller',
  async (fortuneTellerId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://192.168.1.15:5000/api/reviews/fortuneteller/${fortuneTellerId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);