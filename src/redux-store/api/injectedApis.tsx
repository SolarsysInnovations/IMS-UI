import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalStorageKeys } from '../../hooks/useLocalStorage';
import { API_URLS, BASE_LOCAL_URL } from '../../constants/api-urls';
import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { InvoiceInitialValueProps, RoleInitialValueProps } from '../../types/types';
import { get } from 'http';

interface DashboardRequestProps {
    startDate?: string;
    endDate?: string;
};

export const apiEndPointLists = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // ! -------------- users start ----------------
        getUsersList: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.userList,
                method: 'POST',
            }),
            // Set caching for 5 minutes (adjust the duration as needed)
            keepUnusedDataFor: 5 * 60 * 1000, // milliseconds
        }),
        createUser: builder.mutation<any, Partial<any>>({
            query: (data) => ({
                url: API_URLS.userCreate,
                method: 'POST',
                body: data,
            }),
        }),

        updateUser: builder.mutation<any, { id: string | undefined; data: Partial<any> }>({
            query: ({ id, data }) => ({
                url: `${API_URLS.userUpdate}/${id}`,
                method: 'POST',
                body: data,
            }),
        }),

        getSingleUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.userGet}/${id}`,
                method: 'POST',
            }),
        }),

        deleteUser: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.userDelete}/${id}`,
                method: 'POST',
            }),
        }),

        // ! -------------- users start end ----------------



        // ! ------------- dashboard start --------------
        getDashboard: builder.mutation<any, DashboardRequestProps>({
            query: (data) => ({
                url: API_URLS.dashboardGet,
                method: 'POST',
                body: data,
            }),
        }),
        // ! ------------- dashboard end --------------

        // ! ------------ customers start ---------------

        getCustomersList: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.customerList,
                method: 'POST',
            }),
            keepUnusedDataFor: 5 * 60 * 1000,
        }),

        createCustomer: builder.mutation<any, Partial<any>>({
            query: (data) => ({
                url: API_URLS.customerCreate,
                method: 'POST',
                body: data,
            }),
        }),
        updateCustomer: builder.mutation<any, { id: number; data: Partial<any> }>({
            query: ({ id, data }) => ({
                url: `${API_URLS.customerUpdate}/${id}`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteCustomer: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.customerDelete}/${id}`,
                method: 'POST',
            }),
        }),

        getSingleCustomer: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.customerGet}/${id}`,
                method: 'POST',
            }),
        }),

        // ! ------------ customers end ---------------

        // ! ------------- invoice start --------------
        getInvoice: builder.query<InvoiceInitialValueProps[], void>({
            query: () => ({
                url: API_URLS.invoiceList,
                method: 'POST',
            }),
        }),
        createInvoice: builder.mutation<any, Partial<InvoiceInitialValueProps>>({
            query: (data) => ({
                url: API_URLS.invoiceCreate,
                method: 'POST',
                body: data,
            }),
        }),
        updateInvoice: builder.mutation<any, { id: string; data: Partial<InvoiceInitialValueProps> }>({
            query: ({ id, data }) => ({
                url: `${API_URLS.invoiceUpdate}/${id}`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteInvoice: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.invoiceDelete}/${id}`,
                method: 'POST',
            }),
        }),
        getSingleInvoice: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.invoiceGet}/${id}`,
                method: 'POST',
            }),
        }),
        sendEmailNotification: builder.mutation<any, Partial<FormData>>({
            query: (data) => ({
                url: "https://ims-backend-9ghn.onrender.com/sendPDFByEmail", //API_URLS.sendEmail,
                method: "POST",
                body: data
            }),
        }),
        // ! ------------- invoice end --------------

        // ! ------------- payment terms start --------------
        getPaymentTerms: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.paymentTermsList,
                method: 'POST',
            }),
        }),
        createPaymentTerms: builder.mutation<any, Partial<any>>({
            query: (data) => ({
                url: API_URLS.paymentTermsCreate,
                method: 'POST',
                body: data,
            }),
        }),
        updatePaymentTerms: builder.mutation<any, { id: string | undefined; data: Partial<any> }>({
            query: ({ id, data }) => ({
                url: `${API_URLS.paymentTermsUpdate}/${id}`,
                method: 'POST',
                body: data,
            }),
        }),
        deletePaymentTerms: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.paymentTermsDelete}/${id}`,
                method: 'POST',
            }),
        }),
        getSinglePaymentTerms: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.paymentTermsGet}/${id}`,
                method: 'POST',
            }),
        }),
        // ! ------------- payment terms end --------------

        // ! ------------- gst type start --------------
        getGstType: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.gstTypeList,
                method: 'POST',
            }),
        }),
        createGstType: builder.mutation<any, Partial<any>>({
            query: (data) => ({
                url: API_URLS.gstTypeCreate,
                method: 'POST',
                body: data,
            }),
        }),
        updateGstType: builder.mutation<any, { id: string | undefined; data: Partial<any> }>({
            query: ({ id, data }) => ({
                url: `${API_URLS.gstTypeUpdate}/${id}`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteGstType: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.gstTypeDelete}/${id}`,
                method: 'POST',
            }),
        }),
        gstTypeGetById: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.gstTypeGet}/${id}`,
                method: 'POST',
            }),
        }),
        // ! ------------- gst type end --------------

        // ! ------------- tdsTax start --------------
        getTdsTax: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.tdsTaxList,
                method: 'POST',
            }),
        }),
        createTdsTax: builder.mutation<any, Partial<any>>({
            query: (data) => ({
                url: API_URLS.tdsTaxCreate,
                method: 'POST',
                body: data,
            }),
        }),
        updateTdsTax: builder.mutation<any, { id: string | undefined; data: Partial<any> }>({
            query: ({ id, data }) => ({
                url: `${API_URLS.tdsTaxUpdate}/${id}`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteTdsTax: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.tdsTaxDelete}/${id}`,
                method: 'POST',
            }),
        }),
        getSingleTdsTax: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.tdsTaxGet}/${id}`,
                method: 'POST',
            }),
        }),
        // ! ------------- tdsTax end --------------

        // ! ----------- reports start --------------
        getReportInvoiceById: builder.mutation<any, Partial<any>>({
            query: (data) => ({
                url: API_URLS.reportList,
                method: 'POST',
                body: data,
            }),
        }),
        // ! ----------- reports end --------------



    }),
});

export const { } = apiEndPointLists;
