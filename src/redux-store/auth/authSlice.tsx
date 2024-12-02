import { createSlice } from "@reduxjs/toolkit";

// Define the type for your state
interface AuthState {
    id: string | null;
    user: User | null;
    accessToken: string | null;
    refresh: string | null;
    userName: string | null;
    userEmail: string | null;
    userDetails?: any;
}

// Define the type for your user object
interface User {
    refresh: string | null;
}

// Retrieve token and other details from session storage
const tokenFromStorage = sessionStorage.getItem('accessToken');
const idFromStorage = sessionStorage.getItem('id');
const refreshTokenFromStorage = sessionStorage.getItem('refresh');
const userEmailFromStorage = sessionStorage.getItem("userEmail");
const userNameFromStorage = sessionStorage.getItem("userName");
const userDetailsFromStorage = sessionStorage.getItem("userDetails");

// Define the initial state
const initialState: AuthState = {
    id: idFromStorage,
    user: null,
    accessToken: tokenFromStorage || null,
    refresh: refreshTokenFromStorage || null,
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
            const { id, userEmail, userName, accessToken, refresh } = action.payload;

            // Update state with the new credentials
            state.id = id;
            state.user = { refresh };
            state.accessToken = accessToken;
            state.refresh = refresh;
            state.userName = userName;
            state.userEmail = userEmail;

            // Store credentials in session storage
            sessionStorage.setItem('id', id || "");
            sessionStorage.setItem('accessToken', accessToken || "");
            sessionStorage.setItem('refresh', refresh || "");
            sessionStorage.setItem('userName', userName || "");
            sessionStorage.setItem('userEmail', userEmail || "");
        },
        logOut: (state) => {
            // Reset state values
            state.id = null;
            state.user = null;
            state.accessToken = null;
            state.refresh = null;
            state.userName = null;
            state.userEmail = null;

            // Clear session storage
            sessionStorage.clear();
        },
        updateAccessToken: (state, action) => {
            const { accessToken, refresh } = action.payload;
            state.accessToken = accessToken;
            state.refresh = refresh;

            // Update tokens in session storage
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
export const selectCurrentId = (state: { auth: AuthState }) => state.auth.id;
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.accessToken;
export const selectRefreshToken = (state: { auth: AuthState }) => state.auth.refresh;
export const selectUserName = (state: { auth: AuthState }): string | null => state.auth.userName;
export const selectUserDetails = (state: { auth: AuthState }) => state.auth.userDetails;
