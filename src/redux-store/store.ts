import { configureStore } from "@reduxjs/toolkit";
import { invoiceApi } from "./invoice/invcoiceApi";
import { serviceApi } from "./service/serviceApi";
import { loginApi } from "./auth/loginApi";
import { customerApi, customerSlice } from "./customer/customerApi";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [invoiceApi.reducerPath]: invoiceApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    customerState: customerSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    loginApi.middleware,
    customerApi.middleware,
    invoiceApi.middleware,
    serviceApi.middleware,
  ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
