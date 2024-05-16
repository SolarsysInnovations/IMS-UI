import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setData(state, action) {
            state.data = action.payload;
        },
        clearData(state) {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
    },
});

export const { setData, clearData, setError, setLoading } = globalSlice.actions;

