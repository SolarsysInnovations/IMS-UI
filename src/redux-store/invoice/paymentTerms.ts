import { API_URLS } from '../../constants/api-urls';
import { apiSlice } from '../api/apiSlice';

export const paymentTermsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
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
    }),
});

export const { useAddPaymentTermsMutation, useDeletePaymentTermsMutation, useGetPaymentTermsQuery, usePaymentTermsGetByIdMutation, useUpdatePaymentTermsMutation } = paymentTermsApi;
