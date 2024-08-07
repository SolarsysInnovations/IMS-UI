import { createSlice } from "@reduxjs/toolkit";

const gstTypeSlice = createSlice({
    name: 'tdsTax',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setGstTypeData(state, action) {
            state.data = action.payload;
        },
        setGstTypeLoading(state, action) {
            state.loading = action.payload;
        },
        setGstTypeError(state, action) {
            state.error = action.payload;
        },
        clearGstTypeData(state) {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { setGstTypeData, setGstTypeLoading, setGstTypeError, clearGstTypeData } = gstTypeSlice.actions;
export default gstTypeSlice.reducer;
