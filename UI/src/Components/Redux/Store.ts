import { configureStore } from "@reduxjs/toolkit";
import Auth from "./Auth/Auth";

export const store = configureStore({
  reducer: {
    Auth
}});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
