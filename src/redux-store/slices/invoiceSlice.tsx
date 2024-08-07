import { createSlice } from "@reduxjs/toolkit";

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setInvoiceData(state, action) {
            state.data = action.payload;
        },
        setInvoiceLoading(state, action) {
            state.loading = action.payload;
        },
        setInvoiceError(state, action) {
            state.error = action.payload;
        },
        clearInvoiceData(state) {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { setInvoiceData, setInvoiceLoading, setInvoiceError, clearInvoiceData } = invoiceSlice.actions;
export default invoiceSlice.reducer;
