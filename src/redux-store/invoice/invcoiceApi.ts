import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { InvoiceInitialValueProps } from '../../types/types';
import { LocalStorageKeys } from '../../hooks/useLocalStorage';
import { API_URLS, BASE_LOCAL_URL } from '../../constants/api-urls';

export const invoiceApi = createApi({
    reducerPath: 'invoiceApi',
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
        getInvoice: builder.query<InvoiceInitialValueProps[], void>({
            query: () => ({
                url: API_URLS.invoiceList,
                method: 'POST',
            }),
        }),
        addInvoice: builder.mutation<any, Partial<InvoiceInitialValueProps>>({
            query: (invoiceData) => ({
                url: API_URLS.invoiceCreate,
                method: 'POST',
                body: invoiceData,
            }),
        }),
        updateInvoice: builder.mutation<any, { id: number; invoiceData: Partial<InvoiceInitialValueProps> }>({
            query: ({ id, invoiceData }) => ({
                url: `/invoice/update/${id}`,
                method: 'POST',
                body: invoiceData,
            }),
        }),
        deleteInvoice: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.invoiceDelete}/${id}`,
                method: 'POST',
            }),
        }),
    }),
});



export const { useGetInvoiceQuery, useAddInvoiceMutation, useUpdateInvoiceMutation, useDeleteInvoiceMutation } = invoiceApi;
