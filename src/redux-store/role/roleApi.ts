import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import { API_URLS, BASE_LOCAL_URL } from '../../constants/api-urls';
import { RoleInitialValueProps } from '../../types/types';


const roleSlice = createSlice({
    name: 'role',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {
        setRoleData(state, action) {
            state.data = action.payload;
        },
        setRoleLoading(state, action) {
            state.loading = action.payload;
        },
        setRoleError(state, action) {
            state.error = action.payload;
        },
    },
});

export const roleApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getRole: builder.query<RoleInitialValueProps[], void>({
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
        deleteRole: builder.mutation<void, string>({
            query: (id) => ({
                url: API_URLS.rolesDelete+`${id}`,
                method: 'POST',
            }),
        }),
        getRoleById: builder.mutation<void, string>({
            query: (id) => ({
                url: API_URLS.rolesGet+`${id}`,
                method: 'POST',
            }),
        }),
        updateRole: builder.mutation<string, Partial<any>>({
            query: (role) => ({
                url: API_URLS.rolesUpdate+`${role.id}`,
                method: 'POST',
                body: role,
            }),
        })
    }),
});

export const { setRoleData, setRoleLoading, setRoleError } = roleSlice.actions;
export { roleSlice };
export const { useGetRoleQuery, useAddRoleMutation, useDeleteRoleMutation,useGetRoleByIdMutation,useUpdateRoleMutation } = roleApi;