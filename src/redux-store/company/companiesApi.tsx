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

// url: `${API_URLS.gstTypeDelete}/${id}`,
export const companyApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCompany: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.companyList,
                method: 'POST',
            }),
            // Set caching for 5 minutes (adjust the duration as needed)
            keepUnusedDataFor: 5 * 60 * 1000, // milliseconds
        }),
        addCompany: builder.mutation<any, Partial<any>>({
            query: (company) => ({
                url: API_URLS.companyCreate,
                method: 'POST',
                body: company,
            }),
        }),
        updateCompany: builder.mutation<any, { id: string | undefined; company: Partial<any> }>({
            query: ({ id, company }) => ({
                url: `${API_URLS.companyUpdate}/${id}`,
                method: 'POST',
                body: company,
            }),
        }),
        getCompanyDataById: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.companyGet}/${id}`,
                method: 'POST',
            }),
        }),
        deleteCompany: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.companyDelete}/${id}`,
                method: 'POST',
            }),
        }),
    }),
});
export const { setCompanyData, setCompanyLoading, setCompanyError, clearCompanyData } = companySlice.actions;
export { companySlice };
export const { useGetCompanyQuery, useAddCompanyMutation, useGetCompanyDataByIdMutation, useUpdateCompanyMutation, useDeleteCompanyMutation } = companyApi;
