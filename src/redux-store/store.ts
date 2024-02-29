import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./demoSlice";
import clientDataSlice from "./client/fetchClientList";

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    clientList: clientDataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
