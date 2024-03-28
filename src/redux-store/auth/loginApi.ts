import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LoginData } from '../../types/types';
import { LocalStorageKeys } from '../../hooks/useLocalStorage';
import { API_URLS, BASE_LOCAL_URL } from '../../constants/api-urls';


export const loginApi = createApi({
    reducerPath: 'loginApi',
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
        login: builder.mutation<LoginData, Partial<LoginData>>({
            query: (userData) => ({
                url: API_URLS.login,
                method: 'POST',
                body: userData
            }),

        }),
    }),
});

export const { useLoginMutation } = loginApi;
