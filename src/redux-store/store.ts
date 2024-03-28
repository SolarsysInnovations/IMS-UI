import { configureStore } from "@reduxjs/toolkit";
import { customerApi } from "./customer/customerApi";
import { invoiceApi } from "./invoice/invcoiceApi";
import { serviceApi } from "./service/serviceApi";
import { loginApi } from "./auth/loginApi";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [invoiceApi.reducerPath]: invoiceApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
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
