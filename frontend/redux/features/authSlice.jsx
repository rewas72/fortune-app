// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { login,loadTokenAndAutoLogin } from '../actions/authActions';

const initialState = {
  token: null,
  role: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.role = action.payload.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadTokenAndAutoLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadTokenAndAutoLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loadTokenAndAutoLogin.rejected, (state, action) => {
        state.loading = false;
        state.token = null;
        state.user = null;
        state.error = action.payload || action.error.message;
      })
      
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
