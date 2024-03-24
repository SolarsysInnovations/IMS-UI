import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./demoSlice";
import serviceListDataSlice from "./service/serviceSlice";
import invoiceListDataSlice from "./invoice/invoiceSlice";
import { customerApi } from "./customer/customerApi";

export const store = configureStore({
  reducer: {
    [customerApi.reducerPath]: customerApi.reducer,
    counter: counterSlice.reducer,
    serviceList: serviceListDataSlice.reducer,
    invoiceList: invoiceListDataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customerApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
