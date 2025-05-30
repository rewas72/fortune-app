import { createSlice } from "@reduxjs/toolkit";
import { fetchReviewsForFortuneTeller } from "../actions/reviewActions";

const reviewSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewsForFortuneTeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsForFortuneTeller.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviewsForFortuneTeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default reviewSlice.reducer;