import { createSlice } from "@reduxjs/toolkit";

// Define the type for your state
interface AuthState {
    user: User | null;
    accessToken: string | null;
    refresh: string | null; // Add refresh token
    userRole: string | null;
    userName: string | null;
    userEmail: string | null;
    userDetails?: any;
}

// Define the type for your user object
interface User {
    refresh: string | null;
}

// Retrieve token and refresh token from session storage
const tokenFromStorage = sessionStorage.getItem('accessToken');
const refreshTokenFromStorage = sessionStorage.getItem('refresh');
const userRoleFromStorage = sessionStorage.getItem("userRole");
const userEmailFromStorage = sessionStorage.getItem("userEmail");
const userNameFromStorage = sessionStorage.getItem("userName");
const userDetailsFromStorage = sessionStorage.getItem("userDetails");

// Define the initial state
const initialState: AuthState = {
    user: null,
    accessToken: tokenFromStorage || null,
    refresh: refreshTokenFromStorage || null,
    userRole: userRoleFromStorage || null,
    userName: userNameFromStorage || null,
    userEmail: userEmailFromStorage || null,
    userDetails: userDetailsFromStorage ? JSON.parse(userDetailsFromStorage) : null,
};

// Create the authentication slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, refresh, userRole, userName, userEmail, userDetails } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refresh = refresh;
            state.userRole = userRole;
            state.userName = userName;
            state.userEmail = userEmail;
            state.userDetails = userDetails;
            // Store tokens in session storage
            sessionStorage.setItem('accessToken', accessToken || "");
            sessionStorage.setItem('refresh', refresh || "");
            sessionStorage.setItem('userRole', userRole || "");
            sessionStorage.setItem('userName', userName || "");
            sessionStorage.setItem('userEmail', userEmail || "");
            sessionStorage.setItem('userDetails', JSON.stringify(userDetails) || "{}");
        },
        logOut: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refresh = null;
            state.userRole = null; // Reset user role
            state.userName = null; // Reset user name
            state.userEmail = null; // Reset user email
            state.userDetails = null; // Reset user email
            // Remove tokens from session storage
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('refresh');
            sessionStorage.removeItem('userRole');
            sessionStorage.removeItem('userName');
            sessionStorage.removeItem('userEmail');
            sessionStorage.removeItem('userDetails');
        },
        updateAccessToken: (state, action) => {
            const { accessToken, refresh } = action.payload;
            state.accessToken = accessToken;
            state.refresh = refresh;
            // Update token in session storage
            sessionStorage.setItem('accessToken', accessToken || "");
            sessionStorage.setItem('refresh', refresh || "");
        }
    },
});

// Export the actions and reducer
export const { setCredentials, logOut, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;

// Define the selectors with type annotations
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.accessToken;
export const selectRefreshToken = (state: { auth: AuthState }) => state.auth.refresh;
export const selectUserRole = (state: { auth: AuthState }): string | null => state.auth.userRole;
export const selectUserName = (state: { auth: AuthState }): string | null => state.auth.userName;
export const selectUserDetails = (state: { auth: AuthState }) => state.auth.userDetails;
