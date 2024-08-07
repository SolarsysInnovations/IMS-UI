import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'users',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setUserData(state, action) {
            state.data = action.payload;
        },
        setUserLoading(state, action) {
            state.loading = action.payload;
        },
        setUserError(state, action) {
            state.error = action.payload;
        },
        clearUserData(state) {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { setUserData, setUserError, setUserLoading, clearUserData } = userSlice.actions;
export default userSlice.reducer;
