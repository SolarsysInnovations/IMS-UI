import { API_URLS } from '../../constants/api-urls';
import { apiSlice } from '../api/apiSlice';
import {
  ForgetPwdProps,
  InvoiceInitialValueProps,
  ResetPwdProps,
} from '../../types/types';

interface DashboardRequestProps {
  startDate?: string;
  endDate?: string;
}
interface InvoiceRequestProps {
  startDate?: string;
  endDate?: string;
}

const apiEndPointLists = apiSlice.injectEndpoints({
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

    updateUser: builder.mutation<
      any,
      { id: string | undefined; data: Partial<any> }
    >({
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
    getUserRole: builder.mutation<any, string>({
      query: (id) => ({
        url: `${API_URLS.userRoleGet}/${id}`,
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
    getInvoiceListScreen: builder.mutation<any, InvoiceRequestProps>({
      query: (data) => ({
        url: API_URLS.invoiceListScreen,
        method: 'POST',
        body: data,
      }),
    }),
    createInvoice: builder.mutation<any, Partial<InvoiceInitialValueProps>>({
      query: (data) => ({
        url: API_URLS.invoiceCreate,
        method: 'POST',
        body: data,
      }),
    }),
    updateInvoice: builder.mutation<
      any,
      { id: string; data: Partial<InvoiceInitialValueProps> }
    >({
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
        url: `${API_URLS.sendMail}`, //API_URLS.sendEmail,
        method: 'POST',
        body: data,
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
    updatePaymentTerms: builder.mutation<
      any,
      { id: string | undefined; data: Partial<any> }
    >({
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
    updateGstType: builder.mutation<
      any,
      { id: string | undefined; data: Partial<any> }
    >({
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
    updateTdsTax: builder.mutation<
      any,
      { id: string | undefined; data: Partial<any> }
    >({
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

    getSingleCompanySetting: builder.mutation<void, string>({
      query: (id) => ({
        url: `${API_URLS.settingsGet}/${id}`,
        method: 'POST',
      }),
    }),
    getCompanySettingById: builder.query<void, string>({
      query: (id) => ({
        url: `${API_URLS.settingsCompanyGet}/${id}`,
        method: 'POST',
      }),
    }),

    addCompanySetting: builder.mutation<any, Partial<any>>({
      query: (company) => ({
        url: API_URLS.settingsCreate,
        method: 'POST',
        body: company,
      }),
    }),

    updateCompanySetting: builder.mutation<
      any,
      { id: string | undefined; company: Partial<any> }
    >({
      query: ({ id, company }) => ({
        url: `${API_URLS.settingsUpdate}/${id}`,
        method: 'POST',
        body: company,
      }),
    }),
    // addCompanyLogo: builder.mutation<any[], Partial<any>>({
    //     query: (logo) => ({
    //         url: API_URLS.companyLogo,
    //         method: 'POST',
    //         body: logo,
    //     }),
    // }),
    // getLogo: builder.mutation<any, { id: number; data: Partial<any> }>({
    //     query: (id) => ({
    //         url: `${API_URLS.companyLogo}/${id}`,
    //         method: 'POST',
    //     }),
    // }),
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
    getSinglePortalLink: builder.mutation<void, string>({
      // Changed to query
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

    // ! ----------- settingsPortal end --------------

    // addCompanyLogo: builder.mutation<any[], Partial<any>>({
    //     query: (logo) => ({
    //         url: API_URLS.companyLogo,
    //         method: 'POST',
    //         body: logo,
    //     }),
    // }),
    // getLogo: builder.mutation<any, { id: number; data: Partial<any> }>({
    //     query: (id) => ({
    //         url: `${API_URLS.companyLogo}/${id}`,
    //         method: 'POST',
    //     }),
    // }),
    // ! ----------- Upload Logo --------------

    getCompanyLogoById: builder.query<any, string>({
      query: (id) => ({
        url: `${API_URLS.getCompanyLogo}/${id}`,
        method: 'POST',
      }),
      // Set caching for 5 minutes (300 seconds)
      keepUnusedDataFor: 5 * 60 * 1000, // in seconds
    }),

    getSingleCompanyLogo: builder.mutation<void, number>({
      query: (id) => ({
        url: `${API_URLS.settingsGet}/${id}`,
        method: 'POST',
      }),
    }),

    addCompanyLogo: builder.mutation<any, FormData>({
      query: (companyLogo) => ({
        url: API_URLS.companyLogoUpload,
        method: 'POST',
        body: companyLogo,
      }),
    }),
    deleteCompanyLogo: builder.mutation<void, number>({
      query: (id) => ({
        url: `${API_URLS.companyLogoDelete}/${id}`,
        method: 'POST',
      }),
    }),

    // ! ------------ forget pwd start ---------------

    forgetPwd: builder.mutation<any, ForgetPwdProps>({
      query: (userEmail) => ({
        url: API_URLS.forgetPwd,
        method: 'POST',
        body: userEmail,
      }),
    }),
    // ! ------------ forget pwd end ---------------

    // ! ------------ reset pwd start ---------------
    resetPwd: builder.mutation<any, ResetPwdProps>({
      query: (data) => ({
        url: API_URLS.resetPwd,
        method: 'POST',
        body: data,
      }),
    }),
    // ! ------------ reset pwd end ---------------
  }),
});

// user export
export const {
  useGetUsersListQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetSingleUserMutation,
  useGetUserRoleMutation,
} = apiEndPointLists;

// dashboard export
export const { useGetDashboardMutation } = apiEndPointLists;

// customer export
export const {
  useGetCustomersListQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
  useGetSingleCustomerMutation,
} = apiEndPointLists;

// payment terms export
export const {
  useGetPaymentTermsListQuery,
  useCreatePaymentTermsMutation,
  useDeletePaymentTermsMutation,
  useUpdatePaymentTermsMutation,
  useGetSinglePaymentTermsMutation,
} = apiEndPointLists;

// tdsTax export
export const {
  useGetTdsTaxListQuery,
  useCreateTdsTaxMutation,
  useUpdateTdsTaxMutation,
  useDeleteTdsTaxMutation,
  useGetSingleTdsTaxMutation,
} = apiEndPointLists;

// gstType export
export const {
  useGetGstTypeListQuery,
  useCreateGstTypeMutation,
  useUpdateGstTypeMutation,
  useDeleteGstTypeMutation,
  useGetSingleGstTypeMutation,
} = apiEndPointLists;

// invoice export
export const {
  useGetInvoiceListQuery,
  useGetInvoiceListScreenMutation,
  useCreateInvoiceMutation,
  useDeleteInvoiceMutation,
  useUpdateInvoiceMutation,
  useGetSingleInvoiceMutation,
} = apiEndPointLists;

// invoice reports
export const { useGetReportInvoiceMutation } = apiEndPointLists;

// service export
export const {
  useGetServiceListQuery,
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
  useGetSingleServiceMutation,
} = apiEndPointLists;
//email to customer
export const { useSendEmailNotificationMutation } = apiEndPointLists;

//company Details export
export const {
  useGetCompanySettingByIdQuery,
  useAddCompanySettingMutation,
  useGetSingleCompanySettingMutation,
  useUpdateCompanySettingMutation,
} = apiEndPointLists;

//portal Link export
export const {
  useGetPortalLinkQuery,
  useGetSinglePortalLinkMutation,
  useAddPortalLinkMutation,
  useUpdatePortalLinkMutation,
  useDeletePortalLinkMutation,
} = apiEndPointLists;
export const {
  useAddCompanyLogoMutation,
  useDeleteCompanyLogoMutation,
  useGetCompanyLogoByIdQuery,
} = apiEndPointLists;
export const { useForgetPwdMutation } = apiEndPointLists;
export const { useResetPwdMutation } = apiEndPointLists;
