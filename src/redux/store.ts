import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { userSlice } from "./Reducers/ProfileReducer";

export const store = configureStore({
  reducer: {
   users: userSlice.reducer
  },
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {users: UsersState }
export type AppDispatch = typeof store.dispatch;
