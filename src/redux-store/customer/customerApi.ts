import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalStorageKeys } from '../../hooks/useLocalStorage';
import { API_URLS, BASE_LOCAL_URL } from '../../constants/api-urls';
import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setCustomerData(state, action) {
            state.data = action.payload;
        },
        setCustomerLoading(state, action) {
            state.loading = action.payload;
        },
        setCustomerError(state, action) {
            state.error = action.payload;
        },
    },
});



export const customerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCustomers: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.customerList,
                method: 'POST',

            }),
            // Set caching for 5 minutes (adjust the duration as needed)
            keepUnusedDataFor: 5 * 60 * 1000, // milliseconds
        }),

        addCustomer: builder.mutation<any, Partial<any>>({
            query: (customer) => ({
                url: API_URLS.customerCreate,
                method: 'POST',
                body: customer,
            }),
        }),
        updateCustomer: builder.mutation<any, { id: number; customer: Partial<any> }>({
            query: ({ id, customer }) => ({
                url: `/customer/update/${id}`,
                method: 'POST',
                body: customer,
            }),
        }),
        deleteCustomer: builder.mutation<void, number>({
            query: (id) => ({
                url: `/customer/delete/${id}`,
                method: 'POST',
            }),
        }),

        getCustomerById: builder.mutation<void, number>({
            query: (id) => ({
                url: `/customer/get/${id}`,
                method: 'POST',
            }),
        }),
    }),
});

export const { setCustomerData, setCustomerLoading, setCustomerError } = customerSlice.actions;
export { customerSlice };
export const { useGetCustomersQuery, useAddCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation, useGetCustomerByIdMutation } = customerApi;
