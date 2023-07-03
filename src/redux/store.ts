import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { profileApi } from '../services/api';
 
export const store = configureStore({
  reducer: {
    [profileApi.reducerPath]: profileApi.reducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware),
  },
})

setupListeners(store.dispatch)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch