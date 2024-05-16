import { createSlice } from "@reduxjs/toolkit";

// Define the type for your state
interface AuthState {
    user: User | null;
    token: string | null;
    refreshToken: string | null; // Add refresh token
    userRole: string | null;
}

// Define the type for your user object
interface User {
    refreshToken: string | null;
}

// Retrieve token and refresh token from local storage
const tokenFromStorage = localStorage.getItem('token');
const refreshTokenFromStorage = localStorage.getItem('refreshToken');

// Define the initial state
const initialState: AuthState = { user: null, token: tokenFromStorage || null, refreshToken: refreshTokenFromStorage || null, userRole: null };

// Create the authentication slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken, refreshToken,userRole } = action.payload;
            state.user = user;
            state.token = accessToken;
            state.refreshToken = refreshToken;
            state.userRole = userRole;
            // Store tokens in local storage
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userRole', userRole);
            console.log(localStorage.getItem('userRole'));
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            // Remove tokens from local storage
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('userRole');
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
export const selectRefreshToken = (state: { auth: AuthState }) => state.auth.refreshToken;
