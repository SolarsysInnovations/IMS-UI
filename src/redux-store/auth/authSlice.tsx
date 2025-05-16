import { createSlice } from '@reduxjs/toolkit';

// Define the type for your state
interface AuthState {
  id: string | null;
  user: User | null;
  accessToken: string | null;
  refresh: string | null;
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
const userDetailsFromStorage = sessionStorage.getItem('userDetails');

// Define the initial state
const initialState: AuthState = {
  id: idFromStorage,
  user: null,
  accessToken: tokenFromStorage ?? null,
  refresh: refreshTokenFromStorage ?? null,
  userDetails: userDetailsFromStorage
    ? JSON.parse(userDetailsFromStorage)
    : null,
};

// Create the authentication slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { id, accessToken, refresh } = action.payload;

      // Update state with the new credentials
      state.id = id;
      state.user = { refresh };
      state.accessToken = accessToken;
      state.refresh = refresh;

      // Store credentials in session storage
      sessionStorage.setItem('id', id ?? '');
      sessionStorage.setItem('accessToken', accessToken ?? '');
      sessionStorage.setItem('refresh', refresh ?? '');
    },
    logOut: (state) => {
      // Reset state values
      state.id = null;
      state.user = null;
      state.accessToken = null;
      state.refresh = null;

      // Clear session storage
      sessionStorage.clear();
    },
    updateAccessToken: (state, action) => {
      const { accessToken, refresh } = action.payload;
      state.accessToken = accessToken;
      state.refresh = refresh;

      // Update tokens in session storage
      sessionStorage.setItem('accessToken', accessToken ?? '');
      sessionStorage.setItem('refresh', refresh ?? '');
    },
  },
});

// Export the actions and reducer
export const { setCredentials, logOut, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;

// Define the selectors with type annotations
export const selectCurrentId = (state: { auth: AuthState }) => state.auth.id;
export const selectCurrentToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;
