import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalStorageKeys } from '../../hooks/useLocalStorage';
import { API_URLS, BASE_LOCAL_URL } from '../../constants/api-urls';
import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { InvoiceInitialValueProps, RoleInitialValueProps } from '../../types/types';


export const customerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // ---------- customer Api starts ------------
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

        // ---------- customer Api ends ------------

        // ---------- gst type endpoints start -------------

        getGstType: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.gstTypeList,
                method: 'POST',
            }),
        }),
        addGstType: builder.mutation<any, Partial<any>>({
            query: (gstTypeData) => ({
                url: API_URLS.gstTypeCreate,
                method: 'POST',
                body: gstTypeData,
            }),
        }),
        updateGstType: builder.mutation<any, { id: string | undefined; gstTypeData: Partial<any> }>({
            query: ({ id, gstTypeData }) => ({
                url: `${API_URLS.gstTypeUpdate}/${id}`,
                method: 'POST',
                body: gstTypeData,
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

        // ---------- gst type endpoints end -------------
        // ---------- invoice Api starts ------------
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
        sendEmailNotifiction: builder.mutation<any, Partial<FormData>>({
            query: (emailData) => ({
                url: "https://ims-backend-9ghn.onrender.com/sendPDFByEmail", //API_URLS.sendEmail,
                method: "POST",
                body: emailData
            }),
        }),
        // ---------- invoice Api ends ------------

        // ---------- payment Terms Api starts ------------
        getPaymentTerms: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.paymentTermsList,
                method: 'POST',
            }),
        }),
        addPaymentTerms: builder.mutation<any, Partial<any>>({
            query: (paymentTermsData) => ({
                url: API_URLS.paymentTermsCreate,
                method: 'POST',
                body: paymentTermsData,
            }),
        }),
        updatePaymentTerms: builder.mutation<any, { id: string | undefined; paymentTermsData: Partial<any> }>({
            query: ({ id, paymentTermsData }) => ({
                url: `${API_URLS.paymentTermsUpdate}/${id}`,
                method: 'POST',
                body: paymentTermsData,
            }),
        }),
        deletePaymentTerms: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.paymentTermsDelete}/${id}`,
                method: 'POST',
            }),
        }),
        paymentTermsGetById: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.paymentTermsGet}/${id}`,
                method: 'POST',
            }),
        }),

        // ---------- payment Terms Api ends ------------

        // ---------- tds tax Api starts ------------

        getTdsTax: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.tdsTaxList,
                method: 'POST',
            }),
        }),
        addTdsTax: builder.mutation<any, Partial<any>>({
            query: (tdsTaxData) => ({
                url: API_URLS.tdsTaxCreate,
                method: 'POST',
                body: tdsTaxData,
            }),
        }),
        updateTdsTax: builder.mutation<any, { id: string | undefined; tdsTaxData: Partial<any> }>({
            query: ({ id, tdsTaxData }) => ({
                url: `${API_URLS.tdsTaxUpdate}/${id}`,
                method: 'POST',
                body: tdsTaxData,
            }),
        }),
        deleteTdsTax: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.tdsTaxDelete}/${id}`,
                method: 'POST',
            }),
        }),
        tdsTaxGetById: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.tdsTaxGet}/${id}`,
                method: 'POST',
            }),
        }),
        // ---------- tds tax Api starts ------------

        // ---------- setting portal links Api starts ------------
        getLink: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.linkList,
                method: 'POST',
            }),
            // Set caching for 5 minutes (adjust the duration as needed)
            keepUnusedDataFor: 5 * 60 * 1000, // milliseconds
        }),
        getLinkById: builder.mutation<void, string>({ // Changed to query
            query: (id) => ({
                url: `/link/list`,
                method: 'POST',
            }),
        }),
        addLink: builder.mutation<any, Partial<any>>({
            query: (link) => ({
                url: `link/create`,
                method: 'POST',
                body: link,
            }),
        }),
        updateLink: builder.mutation<any, { id: number; link: Partial<any> }>({
            query: ({ id, link }) => ({
                url: `/link/update/${id}`,
                method: 'POST',
                body: link,
            }),
        }),
        deleteLink: builder.mutation<void, number>({
            query: (id) => ({
                url: `/link/delete/${id}`,
                method: 'POST',
            }),
        }),

        // ---------- setting portal links Api ends ------------

        // ---------- reports Api starts ------------

        getReport: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.reportList,
                method: 'POST',


            }), keepUnusedDataFor: 5 * 60 * 1000,
        }),
        getReportById: builder.mutation<any, Partial<any>>({
            query: (reports) => ({
                url: `invoice/arReport`,
                method: 'POST',
                body: reports,
            }),
        }),
        getReportInvoiceById: builder.mutation<any, Partial<any>>({
            query: (reports) => ({
                url: `invoice/invoiceReport`,
                method: 'POST',
                body: reports,
            }),
        }),

        // ---------- reports Api ends ------------

        // ---------- roles Api starts ------------

        getRole: builder.query<RoleInitialValueProps[], void>({
            query: () => ({
                url: API_URLS.rolesList,
                method: 'POST',
            }),
            // Set caching for 5 minutes (adjust the duration as needed)
            keepUnusedDataFor: 5 * 60 * 1000, // milliseconds
        }),
        addRole: builder.mutation<any, Partial<any>>({
            query: (role) => ({
                url: API_URLS.rolesCreate,
                method: 'POST',
                body: role,
            }),
        }),
        deleteRole: builder.mutation<void, string>({
            query: (id) => ({
                url: API_URLS.rolesDelete + `${id}`,
                method: 'POST',
            }),
        }),
        getRoleById: builder.mutation<void, string>({
            query: (id) => ({
                url: API_URLS.rolesGet + `${id}`,
                method: 'POST',
            }),
        }),
        updateRole: builder.mutation<any, { id: string; roles: Partial<any> }>({
            query: ({ id, roles }) => ({
                url: `role/update/${id}`,
                method: 'POST',
                body: roles,
            }),
        }),
        rolesGetUser: builder.mutation<void, string>({
            query: (userName) => ({
                url: API_URLS.rolesGetUser + `${userName}`,
                method: 'POST',
                body: userName,
            }),
        }),
        changePassword: builder.mutation<any, { userName: string; values: Partial<any> }>({
            query: ({ userName, values }) => ({
                url: API_URLS.changePassword + `${userName}`,
                method: 'POST',
                body: values,
            }),
        }),

        // ---------- roles Api ends ------------

        // ---------- service Api starts ------------

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

        // ---------- service Api ends ------------

        // ---------- settings Api starts ------------

        getSetting: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.settingsList,
                method: 'POST',

            }),
            // Set caching for 5 minutes (adjust the duration as needed)
            keepUnusedDataFor: 5 * 60 * 1000, // milliseconds
        }),

        addSetting: builder.mutation<any, Partial<any>>({
            query: (settings) => ({
                url: `/setting/create`,
                method: 'POST',
                body: settings,
            }),
        }),

        updateSetting: builder.mutation<any, { id: number; settings: Partial<any> }>({
            query: ({ id, settings }) => ({
                url: `/setting/update/${id}`,
                method: 'POST',
                body: settings,
            }),
        }),
        getSettingById: builder.mutation<void, number>({
            query: (id) => ({
                url: `setting/get`,
                method: 'POST',
            }),
        }),
        getSettingByIdMutation: builder.mutation<void, number>({
            query: (id) => ({
                url: `setting/get/${id}`,
                method: 'POST',
            }),
        }),

        // ---------- settings Api ends ------------

    }),
});

export const { useGetCustomersQuery, useAddCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation, useGetCustomerByIdMutation } = customerApi;
