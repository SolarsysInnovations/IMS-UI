import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { InvoiceInitialValueProps } from '../../types/types';
import { LocalStorageKeys } from '../../hooks/useLocalStorage';
import { BASE_LOCAL_URL } from '../../constants/api-urls';
import { createSlice } from '@reduxjs/toolkit';


const serviceSlice = createSlice({
    name: 'service',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setServiceData(state, action) {
            state.data = action.payload;
        },
        setServiceLoading(state, action) {
            state.loading = action.payload;
        },
        setServiceError(state, action) {
            state.error = action.payload;
        },
    },
});
export const serviceApi = createApi({
    reducerPath: 'serviceApi',
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
        getService: builder.query<InvoiceInitialValueProps[], void>({
            query: () => ({
                url: '/service/list',
                method: 'POST',
            }),
        }),
        addService: builder.mutation<any, Partial<InvoiceInitialValueProps>>({
            query: (serviceData) => ({
                url: '/service/create',
                method: 'POST',
                body: serviceData,
            }),
        }),
        updateService: builder.mutation<any, { id: number; serviceData: Partial<InvoiceInitialValueProps> }>({
            query: ({ id, serviceData }) => ({
                url: `/service/update/${id}`,
                method: 'POST',
                body: serviceData,
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
                    url: `/service/get/${id}`,
                    method: 'POST',
                }),
        }),
    }),
});

export const { setServiceData, setServiceLoading, setServiceError } = serviceSlice.actions;
export { serviceSlice };
export const { useGetServiceQuery, useAddServiceMutation,useGetServiceByIdMutation, useUpdateServiceMutation, useDeleteServiceMutation } = serviceApi;
