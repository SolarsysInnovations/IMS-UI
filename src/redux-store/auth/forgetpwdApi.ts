import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StorageKeys } from '../../hooks/useSessionStorage';
import { API_URLS, BASE_LOCAL_URL } from '../../constants/api-urls';
import { ForgetPwdProps } from '../../types/types';


export const forgetPwdApi = createApi({
    reducerPath: 'forgetPwdApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_LOCAL_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = sessionStorage.getItem(StorageKeys.TOKEN);
            if (token) {
                const cleanedToken = token.replace(/^"(.*)"$/, '$1');
                headers.set('Authorization', `Bearer ${cleanedToken}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        forgetPwd : builder.mutation<any, Partial<ForgetPwdProps>>({
            query: (userData) => ({
                url: `${API_URLS.forgetPwd}/${userData.userEmail}`,
                method: 'POST',
                body: userData
            }),

        }),
    }),
});

export const { useForgetPwdMutation } = forgetPwdApi;
