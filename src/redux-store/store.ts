import { configureStore } from "@reduxjs/toolkit";
import { invoiceApi } from "./invoice/invcoiceApi";
import { serviceApi, serviceSlice } from "./service/serviceApi";
import { customerApi, customerSlice } from "./customer/customerApi";
import authReducer from './auth/authSlice';
import { apiSlice } from "./api/apiSlice";
import { loginApi } from "./auth/loginApi";
import { globalSlice } from "./global/globalState";
import SnackBarUi from "../components/ui/Snackbar";
import snackBarSlice from "./global/snackBarSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [loginApi.reducerPath]: loginApi.reducer, // Add loginApi reducer
    customerState: customerSlice.reducer,
    serviceState: serviceSlice.reducer,
    globalState: globalSlice.reducer,
    auth: authReducer,
    snackbar: snackBarSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    apiSlice.middleware,
    loginApi.middleware, // Add loginApi middleware
    customerApi.middleware,
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
