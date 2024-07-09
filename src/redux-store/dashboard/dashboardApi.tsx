import { API_URLS } from '../../constants/api-urls';
import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';



export const dashboardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.mutation<any, Partial<any>>({
            query: (dashboard) => ({
                url: API_URLS.dashboardGet,
                method: 'POST',
                body: dashboard,
            }),

        }),
        getSuperAdminDashboard: builder.mutation<any, void>({
            query: () => ({
                url: API_URLS.dashboardSuperAdmin,
                method: 'POST',
            }),
        }),
    }),
});

export const { useGetDashboardMutation, useGetSuperAdminDashboardMutation } = dashboardApi;
