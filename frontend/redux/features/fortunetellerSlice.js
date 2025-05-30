// src/redux/slices/fortunetellerSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchAllUsers, fetchFortuneTellerDetails } from "../actions/fortunetellerActions";



const fortunetellerSlice = createSlice({
    name: "fortuneteller",
    initialState: {
        loading: false,
        error: null,
        fortunetellers: [],
        allFortunetellers: [],
        filteredFortunetellers: [],
        selectedFortuneTeller: null,
    },
    reducers: {
        sortByPriceAsc: (state) => {
            state.filteredFortunetellers = [...state.allFortunetellers].sort(
                (a, b) => a.fortunePrice - b.fortunePrice
            );
        },
        sortByPriceDesc: (state) => {
            state.filteredFortunetellers = [...state.allFortunetellers].sort(
                (a, b) => b.fortunePrice - a.fortunePrice
            );
        },
        sortByRatingDesc: (state) => {
            state.filteredFortunetellers = [...state.allFortunetellers].sort(
                (a, b) => (b.averageRating || 0) - (a.averageRating || 0)
            );
        },
        resetSorting: (state) => {
            state.filteredFortunetellers = [...state.allFortunetellers];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                const allUsers = action.payload;
                const fortunetellers = allUsers.filter(
                    (user) => user.role === "fortuneteller"
                );
                state.allFortunetellers = fortunetellers;
                state.filteredFortunetellers = fortunetellers;
                state.loading = false;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchFortuneTellerDetails.pending, (s) => {
                s.loading = true; s.error = null; s.selectedFortuneTeller = null;
            })
            .addCase(fetchFortuneTellerDetails.fulfilled, (s, a) => {
                s.loading = false; s.selectedFortuneTeller = a.payload;
            })
            .addCase(fetchFortuneTellerDetails.rejected, (s, a) => {
                s.loading = false; s.error = a.error.message;
            });
    },
});

export const {
    sortByPriceAsc,
    sortByPriceDesc,
    sortByRatingDesc,
    resetSorting,
} = fortunetellerSlice.actions;

export default fortunetellerSlice.reducer;
