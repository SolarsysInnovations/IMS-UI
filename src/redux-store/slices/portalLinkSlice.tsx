import { createSlice } from '@reduxjs/toolkit';

const portalLinkSlice = createSlice({
    name: 'link',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setLinkData(state, action) {
            state.data = action.payload;
        },
        setLinkLoading(state, action) {
            state.loading = action.payload;
        },
        setLinkError(state, action) {
            state.error = action.payload;
        },
        clearLinkData: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { setLinkData, setLinkLoading, setLinkError, clearLinkData } = portalLinkSlice.actions;

export default portalLinkSlice.reducer;
