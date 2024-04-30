import {API_URLS } from '../../constants/api-urls';
import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';


const reportSlice = createSlice({
    name: 'reports',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setReportData(state, action) {
            state.data = action.payload;
        },
        setReportLoading(state, action) {
            state.loading = action.payload;
        },
        setReportError(state, action) {
            state.error = action.payload;
        },
    },
});


export const reportApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReport: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.reportList,
                method: 'POST',

            }),
            // Set caching for 5 minutes (adjust the duration as needed)
            keepUnusedDataFor: 5 * 60 * 1000, // milliseconds
        }),
        getReportById: builder.mutation<void, number>({
            query: (id) => ({
                url: `report/get/${id}`,
                method: 'POST',
            }),
        }),
    }),
});
export const { setReportData, setReportLoading, setReportError } = reportSlice.actions;
export { reportSlice };
export const { useGetReportByIdMutation, useGetReportQuery } = reportApi;
