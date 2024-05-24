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
        setServiceData(state, action) {
            state.data = action.payload;
        },
        setServiceLoading(state, action) {
            state.loading = action.payload;
        },
        setServiceError(state, action) {
            state.error = action.payload;
        },
        clearServiceData: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
});


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

        addLink: builder.mutation<any, Partial<any>>({
            query: (link) => ({
                url: `Portal/createLinks`,
                method: 'POST',
                body: link,
            }),
        }),
    }),
});
export const { setServiceData, setServiceLoading, setServiceError, clearServiceData } = linkSlice.actions;
export { linkSlice };
export const { useGetLinkQuery, useAddLinkMutation } = linkApi;
