import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./demoSlice";
import clientDataSlice from "./client/fetchClientList";
import createClientSlice from "./client/createClientSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    clientList: clientDataSlice.reducer,
    createClient : createClientSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
