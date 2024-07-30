import { API_URLS } from '../../constants/api-urls';
import { apiSlice } from '../api/apiSlice';

interface DashboardRequestProps {
    startDate?: string;
    endDate?: string;
};

export const dashboardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.mutation<any, DashboardRequestProps>({
            query: (dashboardData) => ({
                url: API_URLS.dashboardGet,
                method: 'POST',
                body: dashboardData,
            }),
        }),
    }),
});

export const { useGetDashboardMutation } = dashboardApi;
