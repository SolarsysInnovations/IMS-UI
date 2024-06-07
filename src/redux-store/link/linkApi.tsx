import { API_URLS } from '../../constants/api-urls';
import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

const linkSlice = createSlice({
    name: 'link',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setLinkData(state, action) {
            state.data = action.payload;
        },
        setLinkLoading(state, action) {
            state.loading = action.payload;
        },
        setLinkError(state, action) {
            state.error = action.payload;
        },
        clearLinkData: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
});

export const { setLinkData, setLinkLoading, setLinkError, clearLinkData } = linkSlice.actions;

export const linkApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
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
        })
    }),
});

// Adjusted to useGetLinkByIdQuery
export const { useGetLinkQuery, useGetLinkByIdMutation, useAddLinkMutation, useUpdateLinkMutation, useDeleteLinkMutation } = linkApi;
export { linkSlice };
