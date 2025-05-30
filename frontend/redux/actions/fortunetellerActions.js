import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUsers = createAsyncThunk(
    "fortuneteller/fetchAllUsers",
    async () => {
        const response = await axios.get("http://192.168.1.15:5000/api/auth/users");
        return response.data;
    }
);

export const fetchFortuneTellerDetails = createAsyncThunk(
  "fortuneteller/fetchDetails",
  async (id) => {
    const res = await axios.get(`http://192.168.1.15:5000/api/fortunetellers/fortunetellers/${id}`);
    return res.data;                 
  }
);