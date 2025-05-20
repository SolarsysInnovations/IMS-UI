import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logOut, updateAccessToken } from '../auth/authSlice';

interface RootState {
  auth: {
    user: any;
    accessToken: string | null;
    refresh?: string | null;
    userRole?: string | null;
    userName?: string | null;
    userEmail?: string | null;
  };
}

const BASE_URL = process.env.REACT_APP_JAVA_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const { accessToken, refresh } = (getState() as RootState).auth;
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    if (refresh) {
      headers.set('refresh', refresh);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: any,
  api: any,
  extraOptions: any,
): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 403 || result?.error?.status === 401) {
    const errorMessage = (result.error.data as any)?.message;

    if (errorMessage === 'Token expired.') {
      const refreshResult = await baseQuery('/refresh', api, extraOptions);

      if (refreshResult?.data) {
        const { accessToken, refresh } = refreshResult.data as {
          accessToken: string;
          refresh: string;
        };
        api.dispatch(updateAccessToken({ refresh, accessToken }));
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(logOut());
        return refreshResult;
      }
    } else {
      if (errorMessage === 'Invalid token.') {
        api.dispatch(logOut());
      }
      return result;
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
