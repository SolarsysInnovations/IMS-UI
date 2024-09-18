// snackbarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define interface for slice state
interface SnackbarState {
    isOpen: boolean;
    message: string;
    severity: 'error' | 'warning' | 'info' | 'success';
}

// Create slice
const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState: {
        isOpen: false,
        message: '',
        severity: 'info'
    } as SnackbarState, // Ensure initial state type is SnackbarState
    reducers: {
        showSnackbar(state, action: PayloadAction<{ message: string; severity?: 'error' | 'warning' | 'info' | 'success'; }>) {
            state.isOpen = true;
            state.message = action.payload.message;
            state.severity = action.payload.severity || 'info';
        },
        hideSnackbar(state) {
            state.isOpen = false;
            state.message = '';
            state.severity = 'info';
        }
    }
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
