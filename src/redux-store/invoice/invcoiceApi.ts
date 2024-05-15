import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { InvoiceInitialValueProps,SendEmailInitialValueProps } from '../../types/types';
import { LocalStorageKeys } from '../../hooks/useLocalStorage';
import { API_URLS, BASE_LOCAL_URL } from '../../constants/api-urls';
import { apiSlice } from '../api/apiSlice';
import { createSlice } from '@reduxjs/toolkit';


const invoiceSlice = createSlice({
    name: 'invoice',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setInvoiceData(state, action) {
            state.data = action.payload;
        },
        setInvoiceLoading(state, action) {
            state.loading = action.payload;
        },
        setInvoiceError(state, action) {
            state.error = action.payload;
        },
    },
});


export const invoiceApi = apiSlice.injectEndpoints({
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
                url: `${API_URLS.invoiceUpdate}/${id}`,
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
        invoiceGetById: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.invoiceGet}/${id}`,
                method: 'POST',
            }),
        }),
        sendEmailNotifiction: builder.mutation<any, Partial<FormData>>({
            query: (emailData) => ({
                url:"https://ims-backend-9ghn.onrender.com/sendPDFByEmail", //API_URLS.sendEmail,
                method: "POST",
                body: emailData
            }),
        }),
    }),
});

export const { useGetInvoiceQuery, useAddInvoiceMutation, useUpdateInvoiceMutation, useDeleteInvoiceMutation, useInvoiceGetByIdMutation,useSendEmailNotifictionMutation } = invoiceApi;
