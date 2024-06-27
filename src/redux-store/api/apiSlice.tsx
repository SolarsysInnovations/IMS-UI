import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_LOCAL_URL } from '../../constants/api-urls';
import { logOut, setCredentials } from '../auth/authSlice';


interface Token {
    user: any;
    accessToken: string;
}

interface RootState {
    auth: {
        user: any;
        accessToken: string | null;
        refresh?: string | null;
        userRole?: string | null;
        userName?: string | null;
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
    // If the result is an error and its status is 403, attempt to refresh the accessToken
    if (result?.error?.status === 403 || result?.error?.status === 401) {
        const refreshResult = await baseQuery('/refresh', api, extraOptions);

        // If refresh is successful, update the accessToken and retry the original query
        if (refreshResult?.data) {
            console.log("data", refreshResult.data);
            const { user, userRole, userName } = (api.getState() as RootState).auth;
            api.dispatch(setCredentials({ ...refreshResult.data, user, userRole, userName }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            // If refresh fails, log out the user
            api.dispatch(logOut());
            return refreshResult; // Return the refresh error response
        }
    }
    return result; // Return the original query result
};


export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({})
});
