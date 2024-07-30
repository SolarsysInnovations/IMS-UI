import { InvoiceInitialValueProps } from '../../types/types';
import { API_URLS } from '../../constants/api-urls';
import { apiSlice } from '../api/apiSlice';

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
        updateInvoice: builder.mutation<any, { id: string; invoiceData: Partial<InvoiceInitialValueProps> }>({
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
        sendEmailNotification: builder.mutation<any, Partial<FormData>>({
            query: (emailData) => ({
                url: "https://ims-backend-9ghn.onrender.com/sendPDFByEmail", //API_URLS.sendEmail,
                method: "POST",
                body: emailData
            }),
        }),
    }),
});

export const { useGetInvoiceQuery, useAddInvoiceMutation, useUpdateInvoiceMutation, useDeleteInvoiceMutation, useInvoiceGetByIdMutation, useSendEmailNotificationMutation } = invoiceApi;
