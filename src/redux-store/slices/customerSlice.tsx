import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setCustomerData(state, action) {
            state.data = action.payload;
        },
        setCustomerLoading(state, action) {
            state.loading = action.payload;
        },
        setCustomerError(state, action) {
            state.error = action.payload;
        },
        clearCustomerData(state) {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { setCustomerData, setCustomerLoading, setCustomerError, clearCustomerData } = customerSlice.actions;
export default customerSlice.reducer;
