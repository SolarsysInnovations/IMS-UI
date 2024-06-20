import { API_URLS } from '../../constants/api-urls';
import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setDashboardData(state, action) {
            state.data = action.payload;
        },
        setDashboardLoading(state, action) {
            state.loading = action.payload;
        },
        setDashboardError(state, action) {
            state.error = action.payload;
        },
    },
});

export const dashboardApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard:builder.mutation<any, Partial<any>>({
            query: (dashboard) => ({
                url: API_URLS.dashboardGet,
                method: 'POST',
                body: dashboard,
                 }),
        
        }),
    }),
});

export const { setDashboardData, setDashboardLoading, setDashboardError } = dashboardSlice.actions;
export { dashboardSlice };
export const { useGetDashboardMutation } = dashboardApi;
