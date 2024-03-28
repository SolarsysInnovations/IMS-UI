import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateCustomerProps } from '../../types/types';
import { LocalStorageKeys } from '../../hooks/useLocalStorage';
import { API_URLS, BASE_LOCAL_URL } from '../../constants/api-urls';

export const customerApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_LOCAL_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem(LocalStorageKeys.TOKEN);
            if (token) {
                const cleanedToken = token.replace(/^"(.*)"$/, '$1');
                headers.set('Authorization', `Bearer ${cleanedToken}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCustomers: builder.query<CreateCustomerProps[], void>({
            query: () => ({
                url: API_URLS.customerList,
                method: 'POST',
            }),
        }),
        addCustomer: builder.mutation<any, Partial<CreateCustomerProps>>({
            query: (customer) => ({
                url: API_URLS.customerCreate,
                method: 'POST',
                body: customer,
            }),
        }),
        updateCustomer: builder.mutation<any, { id: number; customer: Partial<CreateCustomerProps> }>({
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
    }),
});

export const { useGetCustomersQuery, useAddCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation } = customerApi;
