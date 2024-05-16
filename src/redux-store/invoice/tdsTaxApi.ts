import { API_URLS } from '../../constants/api-urls';
import { apiSlice } from '../api/apiSlice';

export const tdsTaxApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
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
    }),
});

export const { useGetTdsTaxQuery, useAddTdsTaxMutation, useDeleteTdsTaxMutation, useTdsTaxGetByIdMutation, useUpdateTdsTaxMutation } = tdsTaxApi;
