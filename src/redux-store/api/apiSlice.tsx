import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_LOCAL_URL } from '../../constants/api-urls';
import { logOut, setCredentials, updateAccessToken } from '../auth/authSlice';

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

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_LOCAL_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const { accessToken, refresh } = (getState() as RootState).auth;
        if (accessToken) {
            headers.set('authorization', `Bearer ${accessToken}`);
        }
        if (refresh) {
            headers.set('refresh', refresh);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (
    args: any,
    api: any,
    extraOptions: any
): Promise<any> => {
    // Execute the base query
    let result = await baseQuery(args, api, extraOptions);

    // If the result is an error and its status is 403 or 401, check for token expiration
    if (result?.error?.status === 403 || result?.error?.status === 401) {
        const errorMessage = (result.error.data as any)?.message;

        if (errorMessage === 'Token expired.') {
            // Attempt to refresh the accessToken
            const refreshResult = await baseQuery('/refresh', api, extraOptions);

            // If refresh is successful, update the accessToken and retry the original query
            if (refreshResult?.data) {
                const { accessToken, refresh } = refreshResult.data as { accessToken: string, refresh: string };
                // Update only the accessToken and refreshToken in the store
                api.dispatch(updateAccessToken({ refresh, accessToken }));

                // Retry the original query with the new access token
                result = await baseQuery(args, api, extraOptions);
            } else {
                // If refresh fails, log out the user
                api.dispatch(logOut());
                return refreshResult; // Return the refresh error response
            }
        } else {
            // If the error is not related to token expiration, handle it as is
            if (errorMessage === 'Invalid token.') {
                api.dispatch(logOut());
            }
            return result; // Return the original error response
        }
    }
    return result; // Return the original or retried query result
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({})
});
