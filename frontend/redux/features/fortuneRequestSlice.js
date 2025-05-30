// redux/slices/fortuneRequestSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { sendFortuneRequest, getUserFortuneRequests, getFortuneRequestDetail } from "../actions/fortuneRequestActions";

const fortuneRequestSlice = createSlice({
    name: "fortuneRequest",
    initialState: {
        loading: false,
        error: null,
        success: false,
        userRequests: [],
        selectedRequest: null
    },
    reducers: {
        resetFortuneState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendFortuneRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(sendFortuneRequest.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
                state.success = true;
            })
            .addCase(sendFortuneRequest.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Bir hata oluştu";
                state.success = false;
            })
            .addCase(getUserFortuneRequests.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getUserFortuneRequests.fulfilled, (state, action) => {
                state.loading = false;
                state.userRequests = action.payload;
            })
            .addCase(getUserFortuneRequests.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getFortuneRequestDetail.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getFortuneRequestDetail.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedRequest = action.payload;
            })
            .addCase(getFortuneRequestDetail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetFortuneState } = fortuneRequestSlice.actions;
export default fortuneRequestSlice.reducer;
