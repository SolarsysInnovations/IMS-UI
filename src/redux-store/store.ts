import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import { apiSlice } from "./api/apiSlice";
import { loginApi } from "./auth/loginApi";
import { globalSlice } from "./global/globalState";
import snackBarSlice from "./global/snackBarSlice";
import userSlice from "./slices/userSlice";
import invoiceSlice from "./slices/invoiceSlice";
import customerSlice from "./slices/customerSlice";
import gstTypeSlice from "./slices/gstTypeSlice";
import paymentTermsSlice from "./slices/paymentTermsSlice";
import tdsTaxSlice from "./slices/tdsSlice";
import serviceSlice from "./slices/serviceSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [loginApi.reducerPath]: loginApi.reducer, // Add loginApi reducer
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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    apiSlice.middleware,
    loginApi.middleware, // Add loginApi middleware
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
