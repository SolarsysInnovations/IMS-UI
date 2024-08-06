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
    },
});
export { customerSlice };
export const { setCustomerData, setCustomerLoading, setCustomerError } = customerSlice.actions;
