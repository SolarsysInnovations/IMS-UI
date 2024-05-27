import { API_URLS } from '../../constants/api-urls';
import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';


const settingSlice = createSlice({
    name: 'settings',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setSettingsData(state, action) {
            state.data = action.payload;
        },
        setSettingsLoading(state, action) {
            state.loading = action.payload;
        },
        setSettingsError(state, action) {
            state.error = action.payload;
        },
        clearSettingsData: (state) => {
            state.data = null;
            state.loading = false;
            state.error = null;
        },
    },
});


export const settingsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getSetting: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.settingsList,
                method: 'POST',

            }),
            // Set caching for 5 minutes (adjust the duration as needed)
            keepUnusedDataFor: 5 * 60 * 1000, // milliseconds
        }),

        addSetting: builder.mutation<any, Partial<any>>({
            query: (settings) => ({
                url: `/setting/create`,
                method: 'POST',
                body: settings,
            }),
        }),
        updateSetting: builder.mutation<any, { id: number; settings: Partial<any> }>({
            query: ({ id, settings }) => ({
                url: `/setting/update/${id}`,
                method: 'POST',
                body: settings,
            }),
        }),
        getSettingById: builder.mutation<void, number>({
            query: (id) => ({
                 url: `setting/get/${id}`,
                method: 'GET',
            }),
        }),
    }),
});
export const { setSettingsData, setSettingsLoading, setSettingsError, clearSettingsData } = settingSlice.actions;
export { settingSlice };
export const { useGetSettingQuery, useAddSettingMutation, useGetSettingByIdMutation, useUpdateSettingMutation } = settingsApi;
