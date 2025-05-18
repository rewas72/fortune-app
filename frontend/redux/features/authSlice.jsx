// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { login, loadTokenAndAutoLogin, fetchUserProfile, updateUserProfileImage, updateUser } from '../actions/authActions';


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
    setUserInfo: (state, action) => {
      state.user = action.payload
     
    }
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
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        console.log("Profil yükleme hatası:", action.payload);
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfileImage.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Bir hata oluştu.";
        state.success = false;
      });

  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
