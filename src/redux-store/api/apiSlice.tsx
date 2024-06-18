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
        token: string | null;
        refresh?: string | null;
    };
}

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_LOCAL_URL,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const { token, refresh } = (getState() as RootState).auth;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
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
    // If the result is an error and its status is 403, attempt to refresh the token
    if (result?.error?.status === 403 || result?.error?.status === 401) {
        const refreshResult = await baseQuery('/refresh', api, extraOptions);

        // If refresh is successful, update the token and retry the original query
        if (refreshResult?.data) {
            const user = (api.getState() as RootState).auth.user;
            api.dispatch(setCredentials({ ...refreshResult.data, user } as Token));
            result = await baseQuery(args, api, extraOptions);
        }
        else {
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
