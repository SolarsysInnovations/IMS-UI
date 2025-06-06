import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StorageKeys } from '../../hooks/useSessionStorage';
import { API_URLS } from '../../constants/api-urls';
import { LoginProps } from '../../types/types';

const BASE_URL = process.env.REACT_APP_JAVA_URL;

export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = sessionStorage.getItem(StorageKeys.TOKEN);
      if (token) {
        const cleanedToken = token.replace(/^"(.*)"$/, '$1');
        headers.set('Authorization', `Bearer ${cleanedToken}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<any, Partial<LoginProps>>({
      query: (userData) => ({
        url: API_URLS.login,
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
