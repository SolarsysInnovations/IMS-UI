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

// Retrieve token and refresh token from local storage
const tokenFromStorage = localStorage.getItem('accessToken');
const refreshTokenFromStorage = localStorage.getItem('refresh');
const userRoleFromStorage = localStorage.getItem("userRole");
const userEmailFromStorage = localStorage.getItem("userEmail");
const userNameFromStorage = localStorage.getItem("userName");
const userDetailsFromStorage = localStorage.getItem("userDetails");

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
            // Store tokens in local storage
            localStorage.setItem('accessToken', accessToken || "");
            localStorage.setItem('refresh', refresh || "");
            localStorage.setItem('userRole', userRole || "");
            localStorage.setItem('userName', userName || "");
            localStorage.setItem('userEmail', userEmail || "");
            localStorage.setItem('userDetails', JSON.stringify(userDetails) || "{}");
        },
        logOut: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refresh = null;
            state.userRole = null; // Reset user role
            state.userName = null; // Reset user name
            state.userEmail = null; // Reset user email
            state.userDetails = null; // Reset user email
            // Remove tokens from local storage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refresh');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userName');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('userDetails');
        },
        updateAccessToken: (state, action) => {
            const { accessToken, refresh } = action.payload;
            state.accessToken = accessToken;
            state.refresh = refresh;
            // Update token in local storage
            localStorage.setItem('accessToken', accessToken || "");
            localStorage.setItem('refresh', refresh || "");
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
