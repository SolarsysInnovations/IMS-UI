import { API_URLS } from '../../constants/api-urls';
import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';


const companySlice = createSlice({
    name: 'company',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setCompanyData(state, action) {
            state.data = action.payload;
        },
        setCompanyLoading(state, action) {
            state.loading = action.payload;
        },
        setCompanyError(state, action) {
            state.error = action.payload;
        },
        clearCompanyData: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
});


export const { setCompanyData, setCompanyLoading, setCompanyError, clearCompanyData } = companySlice.actions;
export default companySlice.reducer;
