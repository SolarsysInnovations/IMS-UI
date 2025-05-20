import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux-store/auth/authSlice';
import { apiSlice } from '../redux-store/api/apiSlice';
import { loginApi } from '../redux-store/auth/loginApi';
import { globalSlice } from '../redux-store/global/globalState';
import snackBarSlice from '../redux-store/global/snackBarSlice';
import userSlice from '../redux-store/slices/userSlice';
import invoiceSlice from '../redux-store/slices/invoiceSlice';
import customerSlice from '../redux-store/slices/customerSlice';
import gstTypeSlice from '../redux-store/slices/gstTypeSlice';
import paymentTermsSlice from '../redux-store/slices/paymentTermsSlice';
import tdsTaxSlice from '../redux-store/slices/tdsSlice';
import serviceSlice from '../redux-store/slices/serviceSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    customerState: customerSlice,
    globalState: globalSlice.reducer,
    invoiceState: invoiceSlice,
    gstTypeState: gstTypeSlice,
    tdsTaxState: tdsTaxSlice,
    serviceState: serviceSlice,
    userState: userSlice,
    paymentTermsState: paymentTermsSlice,
    auth: authReducer,
    snackbar: snackBarSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      loginApi.middleware, // Add loginApi middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
