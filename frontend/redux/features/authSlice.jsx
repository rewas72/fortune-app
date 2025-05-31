import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  loadTokenAndAutoLogin,
  fetchUserProfile,
  updateUserProfileImage,
  updateUser,
  changePassword,
} from '../actions/authActions';

const initialState = {
  token: null,
  role: null,
  user: null,        // ✅ EKLENDİ
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
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    clearStatus: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
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
        state.user = action.payload.user; // ✅ EKLENDİ
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadTokenAndAutoLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfileImage.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Bir hata oluştu.';
        state.success = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Şifre değiştirilemedi';
        state.success = false;
      });
  },
});

export const { logout, clearStatus } = authSlice.actions;
export default authSlice.reducer;
