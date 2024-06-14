import { API_URLS, BASE_LOCAL_URL } from '../../constants/api-urls';
import { apiSlice } from '../api/apiSlice';

export const dashboardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.dashboardGet,
                method: 'POST',

            }),
            // Set caching for 5 minutes (adjust the duration as needed)
            keepUnusedDataFor: 5 * 60 * 1000, // milliseconds
        }),
        getDashboardById: builder.mutation<void, number>({
            query: (id) => ({
                url: `/dashboard`,
                method: 'POST',
            }),
        }),
    }),
});

export const { useGetDashboardQuery, useGetDashboardByIdMutation } = dashboardApi;
