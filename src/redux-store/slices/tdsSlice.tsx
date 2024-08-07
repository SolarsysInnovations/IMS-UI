import { createSlice } from "@reduxjs/toolkit";

const tdsTaxSlice = createSlice({
    name: 'tdsTax',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setTdsTaxData(state, action) {
            state.data = action.payload;
        },
        setTdsTaxLoading(state, action) {
            state.loading = action.payload;
        },
        setTdsTaxError(state, action) {
            state.error = action.payload;
        },
        clearTdsTaxData(state) {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { setTdsTaxData, setTdsTaxError, setTdsTaxLoading, clearTdsTaxData } = tdsTaxSlice.actions;
export default tdsTaxSlice.reducer;
