import { API_URLS } from '../../constants/api-urls';
import { apiSlice } from '../api/apiSlice';

export const gstTypeApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
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
    }),
});



export const { useGetGstTypeQuery, useGstTypeGetByIdMutation, useDeleteGstTypeMutation, useUpdateGstTypeMutation, useAddGstTypeMutation } = gstTypeApi;
