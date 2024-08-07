import { createSlice } from "@reduxjs/toolkit";

const paymentTermsSlice = createSlice({
    name: 'paymentTerms',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setPaymentTermsData(state, action) {
            state.data = action.payload;
        },
        setPaymentTermsLoading(state, action) {
            state.loading = action.payload;
        },
        setPaymentTermsError(state, action) {
            state.error = action.payload;
        },
        clearPaymentTermsData(state) {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { setPaymentTermsData, setPaymentTermsError, setPaymentTermsLoading, clearPaymentTermsData } = paymentTermsSlice.actions;
export default paymentTermsSlice.reducer;
