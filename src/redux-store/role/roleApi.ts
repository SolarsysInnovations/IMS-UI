import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { API_URLS, BASE_LOCAL_URL } from '../../constants/api-urls';


const roleSlice = createSlice({
    name: 'role',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setRoleData(state: { data: any; }, action: { payload: any; }) {
            state.data = action.payload;
        },
        setRoleLoading(state: { loading: any; }, action: { payload: any; }) {
            state.loading = action.payload;
        },
        setRoleError(state: { error: any; }, action: { payload: any; }) {
            state.error = action.payload;
        },
    },
});

export const roleApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRole: builder.query<any[], void>({
            query: () => ({
                url: API_URLS.rolesList,
                method: 'POST',

            }),
            // Set caching for 5 minutes (adjust the duration as needed)
            keepUnusedDataFor: 5 * 60 * 1000, // milliseconds
        }),

        addRole: builder.mutation<any, Partial<any>>({
            query: (role) => ({
                url: API_URLS.rolesCreate,
                method: 'POST',
                body: role,
            }),
        }),
        updateRole: builder.mutation<any, { id: number; role: Partial<any> }>({
            query: ({ id, role }) => ({
                url: API_URLS.rolesUpdate+`${id}`,
                method: 'POST',
                body: role,
            }),
        }),
        deleteRole: builder.mutation<void, number>({
            query: (id) => ({
                url: API_URLS.rolesDelete+`${id}`,
                method: 'POST',
            }),
        }),

        getRoleById: builder.mutation<void, number>({
            query: (id) => ({
                url: API_URLS.rolesGet+`${id}`,
                method: 'POST',
            }),
        }),
    }),
});


export const { useGetRoleQuery, useAddRoleMutation, useDeleteRoleMutation,useGetRoleByIdMutation,useUpdateRoleMutation } = roleApi;