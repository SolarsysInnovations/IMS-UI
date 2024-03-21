import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./demoSlice";
import createClientSlice from "./customer/customerCreateSlice";
import serviceListDataSlice from "./service/serviceSlice";
import customerDataSlice from "./customer/fetchClientList";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    customerList: customerDataSlice.reducer,
    createClient: createClientSlice.reducer,
    serviceList: serviceListDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
