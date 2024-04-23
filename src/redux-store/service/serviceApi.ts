import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { InvoiceInitialValueProps } from '../../types/types';
import { LocalStorageKeys } from '../../hooks/useLocalStorage';
import {API_URLS, BASE_LOCAL_URL } from '../../constants/api-urls';
import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';


const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setServiceData(state, action) {
            state.data = action.payload;
        },
        setServiceLoading(state, action) {
            state.loading = action.payload;
        },
        setServiceError(state, action) {
            state.error = action.payload;
        },
    },
});


export const serviceApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getService: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.serviceList,
                method: 'POST',

            }),
            // Set caching for 5 minutes (adjust the duration as needed)
            keepUnusedDataFor: 5 * 60 * 1000, // milliseconds
        }),

        addService: builder.mutation<any, Partial<any>>({
            query: (service) => ({
                url: API_URLS.serviceCreate,
                method: 'POST',
                body: service,
            }),
        }),
        updateService: builder.mutation<any, { id: number; service: Partial<any> }>({
            query: ({ id, service }) => ({
                url: `/service/update/${id}`,
                method: 'POST',
                body: service,
            }),
        }),
        deleteService: builder.mutation<void, number>({
            query: (id) => ({
                url: `/service/delete/${id}`,
                method: 'POST',
            }),
        }),

        getServiceById: builder.mutation<void, number>({
            query: (id) => ({
                url: `service/get/${id}`,
                method: 'POST',
            }),
        }),
    }),
});
export const { setServiceData, setServiceLoading, setServiceError } = serviceSlice.actions;
export { serviceSlice };
export const { useGetServiceQuery, useAddServiceMutation,useGetServiceByIdMutation, useUpdateServiceMutation, useDeleteServiceMutation } = serviceApi;
