import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateCustomerProps } from '../../types/types';

export const customerApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://node-js-invoice.onrender.com',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getCustomers: builder.query<CreateCustomerProps[], void>({
            query: () => ({
                url: '/customer/list',
                method: 'POST',
            }),
        }),
        addCustomer: builder.mutation<any, Partial<CreateCustomerProps>>({
            query: (customer) => ({
                url: 'customer/create',
                method: 'POST',
                body: customer,
            }),
        }),
        updateCustomer: builder.mutation<any, { id: number; customer: Partial<CreateCustomerProps> }>({
            query: ({ id, customer }) => ({
                url: `customer/update/${id}`,
                method: 'POST',
                body: customer,
            }),
        }),
        deleteCustomer: builder.mutation<void, number>({
            query: (id) => ({
                url: `customer/delete/${id}`,
                method: 'POST',
            }),
        }),
    }),
});

export const { useGetCustomersQuery, useAddCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation } = customerApi;
