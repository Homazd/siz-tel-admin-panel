import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../services/api";
import authReducer from "@/redux/features/profiles/authSlice"

// To create a store in Redux Toolkit, we'll use the ConfigureStore API. This function provides a standard abstraction,
// over the createStore function
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    authState: authReducer,
  },
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself, they will be updated automatically as we add more state slices, API services,
// or modify middleware settings.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
