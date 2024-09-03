import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalStorageKeys } from '../../hooks/useLocalStorage';
import { API_URLS, BASE_LOCAL_URL } from '../../constants/api-urls';
import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { InvoiceInitialValueProps, RoleInitialValueProps, SendEmailInitialValueProps } from '../../types/types';
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
        getInvoiceList: builder.query<InvoiceInitialValueProps[], void>({
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
                url: `${API_URLS.sendEmail}`, //API_URLS.sendEmail,
                method: "POST",
                body: data
            }),
        }),
        // ! ------------- invoice end --------------

        // ! ------------- payment terms start --------------
        getPaymentTermsList: builder.query<any[], void>({
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
        getGstTypeList: builder.query<any[], void>({
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
        getSingleGstType: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.gstTypeGet}/${id}`,
                method: 'POST',
            }),
        }),
        // ! ------------- gst type end --------------

        // ! ------------- tdsTax start --------------
        getTdsTaxList: builder.query<any[], void>({
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
        getReportInvoice: builder.mutation<any, Partial<any>>({
            query: (data) => ({
                url: API_URLS.reportList,
                method: 'POST',
                body: data,
            }),
        }),
        // ! ----------- reports end --------------

        // ! ----------- service start --------------

        getServiceList: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.serviceList,
                method: 'POST',

            }),
            // Set caching for 5 minutes (adjust the duration as needed)
            keepUnusedDataFor: 5 * 60 * 1000, // milliseconds
        }),

        createService: builder.mutation<any, Partial<any>>({
            query: (data) => ({
                url: API_URLS.serviceCreate,
                method: 'POST',
                body: data,
            }),
        }),
        updateService: builder.mutation<any, { id: number; data: Partial<any> }>({
            query: ({ id, data }) => ({
                url: `${API_URLS.serviceUpdate}/${id}`,
                method: 'POST',
                body: data,
            }),
        }),
        deleteService: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.serviceDelete}/${id}`,
                method: 'POST',
            }),
        }),

        getSingleService: builder.mutation<void, number>({
            query: (id) => ({
                url: `${API_URLS.serviceGet}/${id}`,
                method: 'POST',
            }),
        }),

                // ! ----------- companyDetails start --------------

            getSingleCompanySetting: builder.mutation<void, number>({
                    query: (id) => ({
                        url: `${API_URLS.settingsGet}/${id}`,
                        method: 'POST',
                    }),
                }),

                getCompanySetting: builder.query<any[], void>({
                    query: () => ({
                        url: API_URLS.settingsGet,
                        method: 'POST',
        
                    }),
                    // Set caching for 5 minutes (adjust the duration as needed)
                    keepUnusedDataFor: 5 * 60 * 1000, // milliseconds
                }),

                addCompanySetting: builder.mutation<any, Partial<any>>({
                    query: (company) => ({
                        url: API_URLS.settingsCreate,
                        method: 'POST',
                        body: company,
                    }),
                }),

                updateCompanySetting: builder.mutation<any, { id: string | undefined; company: Partial<any> }>({
                    query: ({ id, company }) => ({
                        url: `${API_URLS.settingsUpdate}/${id}`,
                        method: 'POST',
                        body: company,
                    }),
                }),

               // ! ----------- companyDetails end --------------

               // ! ----------- settingsPortal start --------------

               getPortalLink: builder.query<any[], void>({
                query: () => ({
                    url: API_URLS.linkList,
                    method: 'POST',
                }),
                // Set caching for 5 minutes (adjust the duration as needed)
                keepUnusedDataFor: 5 * 60 * 1000, // milliseconds
            }),
            getSinglePortalLink: builder.mutation<void, string>({ // Changed to query
                query: (id) => ({
                    url: `${API_URLS.linkGet}/${id}`,
                    method: 'POST',
                }),
            }),
            addPortalLink: builder.mutation<any, Partial<any>>({
                query: (link) => ({
                    url: API_URLS.linkCreate,
                    method: 'POST',
                    body: link,
                }),
            }),
            updatePortalLink: builder.mutation<any, { id: any; link: Partial<any> }>({
                query: ({ id, link }) => ({
                    url: `${API_URLS.linkUpdate}/${id}`,
                    method: 'POST',
                    body: link,
                }),
            }),
            deletePortalLink: builder.mutation<void, number>({
                query: (id) => ({
                    url: `${API_URLS.linkDelete}/${id}`,
                    method: 'POST',
    
                }),
    

    }),

    }),
});

// user export
export const { useGetUsersListQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation, useGetSingleUserMutation } = apiEndPointLists;

// dashboard export 
export const { useGetDashboardMutation } = apiEndPointLists;

// customer export 
export const { useGetCustomersListQuery, useCreateCustomerMutation, useUpdateCustomerMutation, useDeleteCustomerMutation, useGetSingleCustomerMutation } = apiEndPointLists;

// payment terms export
export const { useGetPaymentTermsListQuery, useCreatePaymentTermsMutation, useDeletePaymentTermsMutation, useUpdatePaymentTermsMutation, useGetSinglePaymentTermsMutation } = apiEndPointLists;

// tdsTax export
export const { useGetTdsTaxListQuery, useCreateTdsTaxMutation, useUpdateTdsTaxMutation, useDeleteTdsTaxMutation, useGetSingleTdsTaxMutation } = apiEndPointLists;

// gstType export
export const { useGetGstTypeListQuery, useCreateGstTypeMutation, useUpdateGstTypeMutation, useDeleteGstTypeMutation, useGetSingleGstTypeMutation } = apiEndPointLists;

// invoice export 
export const { useGetInvoiceListQuery, useCreateInvoiceMutation, useDeleteInvoiceMutation, useUpdateInvoiceMutation, useGetSingleInvoiceMutation } = apiEndPointLists;

// invoice reports
export const { useGetReportInvoiceMutation } = apiEndPointLists;

// service export
export const { useGetServiceListQuery, useCreateServiceMutation, useDeleteServiceMutation, useUpdateServiceMutation, useGetSingleServiceMutation } = apiEndPointLists;
//email to customer 
export const { useSendEmailNotificationMutation } = apiEndPointLists;


//company Details export
export const { useGetCompanySettingQuery, useAddCompanySettingMutation, useGetSingleCompanySettingMutation, useUpdateCompanySettingMutation } = apiEndPointLists;

//portal Link export
export const { useGetPortalLinkQuery, useGetSinglePortalLinkMutation, useAddPortalLinkMutation, useUpdatePortalLinkMutation, useDeletePortalLinkMutation } = apiEndPointLists;
