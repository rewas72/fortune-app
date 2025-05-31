import { createSlice } from '@reduxjs/toolkit';
import { fetchFortuneTellerRequests } from '../actions/fortuneActions';

const initialState = {
  requests: [],
  loading: false,
  error: null,
};

const fortuneSlice = createSlice({
  name: 'fortune',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFortuneTellerRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFortuneTellerRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchFortuneTellerRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default fortuneSlice.reducer;
