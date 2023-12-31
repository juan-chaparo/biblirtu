import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/reviewSlice";

export const store = configureStore({
  reducer: {
    userSlice: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
