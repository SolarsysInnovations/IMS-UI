import { createSlice } from "@reduxjs/toolkit";

const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setServiceData(state, action) {
            state.data = action.payload;
        },
        setServiceLoading(state, action) {
            state.loading = action.payload;
        },
        setServiceError(state, action) {
            state.error = action.payload;
        },
        clearServiceData(state) {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { setServiceData, setServiceError, setServiceLoading, clearServiceData } = serviceSlice.actions;
export default serviceSlice.reducer;
