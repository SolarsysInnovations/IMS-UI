import { createSlice } from "@reduxjs/toolkit";

// Define the type for your state
interface AuthState {
    user: User | null;
    token: string | null;
    refresh: string | null; // Add refresh token
    userRole: string | null;
    userName: string | null;
}

// Define the type for your user object
interface User {
    refresh: string | null;
}

// Retrieve token and refresh token from local storage
const tokenFromStorage = localStorage.getItem('token');
const refreshTokenFromStorage = localStorage.getItem('refresh');

// Define the initial state
const initialState: AuthState = { user: null, token: tokenFromStorage || null, refresh: refreshTokenFromStorage || null, userRole: null, userName: null };

// Create the authentication slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, refresh,userRole,userName } = action.payload;
            state.user = user;
            state.token = accessToken;
            state.refresh = refresh;
            state.userRole = userRole;
            state.userName = userName;
            // Store tokens in local storage
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refresh', refresh);
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('userName', userName);
            // console.log(localStorage.getItem('userRole'));
            // console.log(localStorage.getItem('userName'));
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.refresh = null;
            // Remove tokens from local storage
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userName');
        },
        updateAccessToken: (state, action) => {
            const { accessToken } = action.payload;
            state.token = accessToken;
            // Update token in local storage
            localStorage.setItem('token', accessToken);
        }
    },
});

// Export the actions and reducer
export const { setCredentials, logOut, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;

// Define the selectors with type annotations
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
export const selectRefreshToken = (state: { auth: AuthState }) => state.auth.refresh;
